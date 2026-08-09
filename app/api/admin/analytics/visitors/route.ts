import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getAnalyticsService } from "@/lib/services/analytics";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const days = parseInt(request.nextUrl.searchParams.get("days") || "30", 10);
    const service = getAnalyticsService();
    const data = await service.getVisitorData(days);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Visitors analytics error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch visitor data" }, { status: 500 });
  }
}
