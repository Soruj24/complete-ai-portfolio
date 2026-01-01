import { auth } from "@/auth";
import { dbConnect } from "@/config/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await dbConnect();
    
    // Aggregate user registration by date for the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const activity = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Fill in missing dates with zero count
    const activityMap = new Map(activity.map(item => [item._id, item.count]));
    const data = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const dateStr = date.toISOString().split('T')[0];
      data.push({
        date: dateStr,
        count: activityMap.get(dateStr) || 0
      });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Activity API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
