import { cookies } from "next/headers";
import { signAccessToken, signRefreshToken, verifyAccessToken, type JwtPayload } from "./jwt";

const TOKEN_NAME = "token";
const REFRESH_TOKEN_NAME = "refreshToken";

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax" as const,
};

export async function setAuthCookies(payload: JwtPayload, refreshToken: string) {
  const cookieStore = await cookies();

  const accessToken = await signAccessToken(payload);

  cookieStore.set(TOKEN_NAME, accessToken, {
    ...cookieOptions,
    path: "/",
    maxAge: 15 * 60,
  });

  cookieStore.set(REFRESH_TOKEN_NAME, refreshToken, {
    ...cookieOptions,
    path: "/api/auth/refresh",
    maxAge: 7 * 24 * 60 * 60,
  });
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_NAME);
  cookieStore.delete(REFRESH_TOKEN_NAME);
}

export async function getAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_NAME)?.value;
}

export async function getRefreshToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_TOKEN_NAME)?.value;
}

export async function getSessionFromCookie() {
  const token = await getAccessToken();
  if (!token) return null;
  try {
    return await verifyAccessToken(token);
  } catch {
    return null;
  }
}
