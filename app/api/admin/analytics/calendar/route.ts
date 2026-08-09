import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getAnalyticsService } from "@/lib/services/analytics";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const year = parseInt(request.nextUrl.searchParams.get("year") || String(new Date().getFullYear()), 10);
    const month = parseInt(request.nextUrl.searchParams.get("month") || String(new Date().getMonth() + 1), 10);
    const service = getAnalyticsService();
    const data = await service.getCalendarData(year, month);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Calendar analytics error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch calendar data" }, { status: 500 });
  }
}
