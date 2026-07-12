import { NextResponse } from "next/server";
import { getAnalyticsService } from "@/lib/services/analytics";

export async function GET() {
  try {
    const service = getAnalyticsService();
    const data = await service.getRealtimeData();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Realtime analytics error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch realtime data" }, { status: 500 });
  }
}
