import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/config/db";
import { AdminResource } from "@/models/AdminResource";
import { PageView } from "@/models/PageView";

function getResourceKey(pathname: string): string {
  const parts = pathname.replace(/^\/api\/admin\//, "").split("/").filter(Boolean);
  if (parts.length >= 2 && ["ai", "analytics", "security", "system"].includes(parts[0])) {
    return `${parts[0]}/${parts[1]}`;
  }
  return parts[0] || "";
}

const ANALYTICS_RESOURCES = ["analytics/traffic", "analytics/search", "analytics/visitors", "analytics/github", "analytics/ai"];

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const pathname = request.nextUrl.pathname;
    const key = getResourceKey(pathname);
    const search = request.nextUrl.searchParams.get("search")?.toLowerCase();
    const page = parseInt(request.nextUrl.searchParams.get("page") || "1", 10);
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "50", 10);

    if (ANALYTICS_RESOURCES.includes(key)) {
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
        {
          $group: {
            _id: "$path",
            views: { $sum: 1 },
          },
        },
        { $sort: { views: -1 as const } },
        { $limit: 10 },
      ];
      const topPages = await PageView.aggregate(sourcePipeline);

      return NextResponse.json({
        success: true,
        data: { daily: dailyData, topPages },
      });
    }

    const filter: Record<string, unknown> = { resource: key };
    if (search) {
      filter.$text = { $search: search };
    }

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      AdminResource.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      AdminResource.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: items.map((item) => ({ _id: item._id, ...item.data })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { message: "Failed to fetch resources" } },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json().catch(() => ({}));
    const pathname = request.nextUrl.pathname;
    const key = getResourceKey(pathname);

    const resource = await AdminResource.create({
      resource: key,
      data: body,
    });

    return NextResponse.json(
      { success: true, data: { _id: resource._id, ...resource.data }, message: "Created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { message: "Failed to create resource" } },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json().catch(() => ({}));
    const { id } = body;
    if (!id) {
      return NextResponse.json(
        { success: false, error: { message: "ID is required" } },
        { status: 400 }
      );
    }

    const { _id, ...updateData } = body;
    const resource = await AdminResource.findByIdAndUpdate(
      id,
      { $set: { data: updateData } },
      { new: true, runValidators: true }
    ).lean();

    if (!resource) {
      return NextResponse.json(
        { success: false, error: { message: "Not found" } },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { _id: resource._id, ...resource.data },
      message: "Updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { message: "Failed to update resource" } },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const pathname = request.nextUrl.pathname;
    const parts = pathname.split("/").filter(Boolean);
    const lastPart = parts[parts.length - 1];

    if (lastPart === "bulk") {
      const body = await request.json().catch(() => ({}));
      const ids: string[] = body.ids || [];
      if (ids.length > 0) {
        await AdminResource.deleteMany({ _id: { $in: ids } });
      }
      return NextResponse.json({ success: true, message: "Bulk delete completed" });
    }

    const id = lastPart;
    const resource = await AdminResource.findByIdAndDelete(id).lean();
    if (!resource) {
      return NextResponse.json(
        { success: false, error: { message: "Not found" } },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { message: "Failed to delete resource" } },
      { status: 500 }
    );
  }
}
