"use server";

import { loginSchema } from "@/lib/validations/auth";
import { loginUser, revokeRefreshToken } from "@/lib/services/auth-service";
import { setAuthCookies, clearAuthCookies, getSessionFromCookie } from "@/lib/auth/cookies";

export type ActionResult =
  | { success: true; redirect: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export async function loginAction(formData: FormData): Promise<ActionResult> {
  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0].message,
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    const { user, refreshToken } = await loginUser(parsed.data.email, parsed.data.password);
    await setAuthCookies(user, refreshToken);
    return { success: true, redirect: "/admin/dashboard" };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Authentication failed",
    };
  }
}

export async function logoutAction(): Promise<ActionResult> {
  try {
    const session = await getSessionFromCookie();
    if (session) {
      await revokeRefreshToken(session.sub);
    }
  } catch {
    // Proceed with cookie cleanup even if DB operation fails
  }
  await clearAuthCookies();
  return { success: true, redirect: "/login" };
}
