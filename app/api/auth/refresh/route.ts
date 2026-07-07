import { NextResponse } from "next/server";
import { refreshUserTokens } from "@/lib/services/auth-service";
import { setAuthCookies, clearAuthCookies, getRefreshToken } from "@/lib/auth/cookies";

export async function POST() {
  try {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "No refresh token" },
        { status: 401 }
      );
    }

    const { user, refreshToken: newRefreshToken } =
      await refreshUserTokens(refreshToken);

    await setAuthCookies(user, newRefreshToken);

    return NextResponse.json({ success: true });
  } catch {
    await clearAuthCookies();
    return NextResponse.json(
      { success: false, message: "Refresh failed" },
      { status: 401 }
    );
  }
}
