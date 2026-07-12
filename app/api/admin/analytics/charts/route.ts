import { NextRequest, NextResponse } from "next/server";
import { getAnalyticsService } from "@/lib/services/analytics";

export async function GET(request: NextRequest) {
  try {
    const days = parseInt(request.nextUrl.searchParams.get("days") || "30", 10);
    const service = getAnalyticsService();
    const data = await service.getChartsData(days);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Charts analytics error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch charts data" }, { status: 500 });
  }
}
