import { NextResponse } from "next/server";
import { dbConnect } from "@/config/db";
import { PageView } from "@/models/PageView";

export async function handleAnalyticsGET() {
  await dbConnect();
  const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000);
  const pipeline = [
    { $match: { timestamp: { $gte: thirtyDaysAgo } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
        pageViews: { $sum: 1 },
        uniqueIPs: { $addToSet: "$ip" },
      },
    },
    { $sort: { _id: 1 as const } },
    {
      $project: {
        _id: 0,
        date: "$_id",
        pageViews: 1,
        uniqueVisitors: { $size: "$uniqueIPs" },
      },
    },
  ];

  const dailyData = await PageView.aggregate(pipeline);

  const sourcePipeline = [
    { $match: { timestamp: { $gte: thirtyDaysAgo } } },
    { $group: { _id: "$path", views: { $sum: 1 } } },
    { $sort: { views: -1 as const } },
    { $limit: 10 },
  ];
  const topPages = await PageView.aggregate(sourcePipeline);

  return NextResponse.json({
    success: true,
    data: { daily: dailyData, topPages },
  });
}
