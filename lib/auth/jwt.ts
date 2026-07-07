import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  (() => {
    const secret = process.env.AUTH_SECRET;
    if (!secret) throw new Error("AUTH_SECRET environment variable is required");
    return secret;
  })()
);

export interface JwtPayload {
  sub: string;
  role: string;
  email: string;
  name: string;
}

export interface AccessTokenPayload extends JwtPayload {
  iat: number;
  exp: number;
}

export interface RefreshTokenPayload {
  sub: string;
  jti: string;
  iat: number;
  exp: number;
}

export async function signAccessToken(payload: JwtPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(SECRET);
}

export async function signRefreshToken(userId: string, jti: string): Promise<string> {
  return new SignJWT({ sub: userId, jti })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);
}

export async function verifyAccessToken(token: string): Promise<AccessTokenPayload> {
  const { payload } = await jwtVerify(token, SECRET);
  return payload as unknown as AccessTokenPayload;
}

export async function verifyRefreshToken(token: string): Promise<RefreshTokenPayload> {
  const { payload } = await jwtVerify(token, SECRET);
  return payload as unknown as RefreshTokenPayload;
}
