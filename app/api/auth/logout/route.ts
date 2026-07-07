import { NextResponse } from "next/server";
import { getSessionFromCookie, clearAuthCookies } from "@/lib/auth/cookies";
import { revokeRefreshToken } from "@/lib/services/auth-service";

export async function POST() {
  try {
    const session = await getSessionFromCookie();
    if (session) {
      await revokeRefreshToken(session.sub);
    }
  } catch {
    // Proceed with cookie cleanup
  }
  await clearAuthCookies();
  return NextResponse.json({ success: true });
}
