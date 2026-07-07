import bcrypt from "bcryptjs";
import crypto from "crypto";
import { User } from "@/models/User";
import { dbConnect } from "@/config/db";
import { signRefreshToken, verifyRefreshToken } from "@/lib/auth/jwt";
import { UnauthorizedError, ForbiddenError } from "@/lib/errors/app-error";

export interface AuthResult {
  user: { sub: string; role: string; email: string; name: string };
  refreshToken: string;
}

export async function loginUser(email: string, password: string): Promise<AuthResult> {
  await dbConnect();

  const user = await User.findOne({ email }).select("+password +refreshTokenHash");
  if (!user) throw new UnauthorizedError("Invalid email or password");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new UnauthorizedError("Invalid email or password");

  if (user.status === "banned") throw new ForbiddenError("Account has been banned");

  const jti = crypto.randomUUID();
  const refreshToken = await signRefreshToken(user._id.toString(), jti);
  const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
  user.refreshTokenHash = refreshTokenHash;
  user.lastLoginAt = new Date();
  await user.save();

  return {
    user: { sub: user._id.toString(), role: user.role, email: user.email, name: user.name },
    refreshToken,
  };
}

export async function refreshUserTokens(refreshToken: string): Promise<AuthResult> {
  await dbConnect();

  let payload;
  try {
    payload = await verifyRefreshToken(refreshToken);
  } catch {
    throw new UnauthorizedError("Invalid or expired refresh token");
  }

  const user = await User.findById(payload.sub).select("+refreshTokenHash");
  if (!user || user.status === "banned") throw new UnauthorizedError("Account unavailable");

  const tokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
  if (user.refreshTokenHash !== tokenHash) throw new UnauthorizedError("Refresh token has been revoked");

  const jti = crypto.randomUUID();
  const newRefreshToken = await signRefreshToken(user._id.toString(), jti);
  const newRefreshTokenHash = crypto.createHash("sha256").update(newRefreshToken).digest("hex");
  user.refreshTokenHash = newRefreshTokenHash;
  await user.save();

  return {
    user: { sub: user._id.toString(), role: user.role, email: user.email, name: user.name },
    refreshToken: newRefreshToken,
  };
}

export async function revokeRefreshToken(userId: string) {
  await dbConnect();
  await User.findByIdAndUpdate(userId, { $unset: { refreshTokenHash: "" } });
}
