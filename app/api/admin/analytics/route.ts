import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/config/db";
import { PageView } from "@/models/PageView";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const days = parseInt(request.nextUrl.searchParams.get("days") || "30", 10);
    const since = new Date(Date.now() - days * 86400000);

    const [dailyData, totalViews, totalVisitors, topPaths, userAgentStats] = await Promise.all([
      PageView.aggregate([
        { $match: { timestamp: { $gte: since } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
            pageViews: { $sum: 1 },
            uniqueIPs: { $addToSet: "$ip" },
          },
        },
        { $sort: { _id: 1 } },
        {
          $project: {
            _id: 0,
            date: "$_id",
            pageViews: 1,
            visitors: { $size: "$uniqueIPs" },
          },
        },
      ]),
      PageView.countDocuments({ timestamp: { $gte: since } }),
      PageView.aggregate([
        { $match: { timestamp: { $gte: since } } },
        { $group: { _id: "$ip" } },
        { $count: "total" },
      ]).then((r) => r[0]?.total || 0),
      PageView.aggregate([
        { $match: { timestamp: { $gte: since } } },
        { $group: { _id: "$path", views: { $sum: 1 } } },
        { $sort: { views: -1 } },
        { $limit: 10 },
      ]),
      PageView.aggregate([
        { $match: { timestamp: { $gte: since } } },
        {
          $addFields: {
            parsedUA: {
              $switch: {
                branches: [
                  { case: { $regexMatch: { input: "$userAgent", regex: /mobile|android|iphone/i } }, then: "Mobile" },
                  { case: { $regexMatch: { input: "$userAgent", regex: /tablet|ipad/i } }, then: "Tablet" },
                ],
                default: "Desktop",
              },
            },
          },
        },
        { $group: { _id: "$parsedUA", count: { $sum: 1 } } },
      ]),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        daily: dailyData,
        totalViews,
        totalVisitors,
        topPages: topPaths.map((p) => ({ path: p._id, views: p.views })),
        devices: userAgentStats.map((d) => ({ name: d._id, count: d.count })),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { message: "Failed to fetch analytics" } },
      { status: 500 }
    );
  }
}
