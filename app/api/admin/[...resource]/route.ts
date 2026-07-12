import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/config/db";
import { getResourceKey, ANALYTICS_RESOURCES, isDedicatedModel } from "@/lib/admin/route-utils";
import { handleAnalyticsGET } from "@/lib/admin/analytics-handler";
import {
  handleDedicatedGET,
  handleGenericGET,
  handleDedicatedPOST,
  handleGenericPOST,
  handleDedicatedPUT,
  handleGenericPUT,
  handleDedicatedDELETE,
  handleGenericDELETE,
  handleBulkDELETE,
} from "@/lib/admin/crud-handlers";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const key = getResourceKey(request.nextUrl.pathname);
    const search = request.nextUrl.searchParams.get("search")?.toLowerCase();
    const page = parseInt(request.nextUrl.searchParams.get("page") || "1", 10);
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "50", 10);

    if (ANALYTICS_RESOURCES.includes(key)) {
      return handleAnalyticsGET();
    }

    return isDedicatedModel(key)
      ? handleDedicatedGET(key, search, page, limit)
      : handleGenericGET(key, search, page, limit);
  } catch {
    return NextResponse.json(
      { success: false, error: { message: "Failed to fetch resources" } },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json().catch(() => ({}));
    const key = getResourceKey(request.nextUrl.pathname);

    return isDedicatedModel(key)
      ? handleDedicatedPOST(key, body)
      : handleGenericPOST(key, body);
  } catch {
    return NextResponse.json(
      { success: false, error: { message: "Failed to create resource" } },
      { status: 500 },
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
        { status: 400 },
      );
    }

    const key = getResourceKey(request.nextUrl.pathname);
    return isDedicatedModel(key) ? handleDedicatedPUT(key, id, body) : handleGenericPUT(id, body);
  } catch {
    return NextResponse.json(
      { success: false, error: { message: "Failed to update resource" } },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const parts = request.nextUrl.pathname.split("/").filter(Boolean);
    const key = getResourceKey(request.nextUrl.pathname);
    const lastPart = parts[parts.length - 1];

    if (lastPart === "bulk") {
      const body = await request.json().catch(() => ({}));
      return handleBulkDELETE(key, body.ids || []);
    }

    return isDedicatedModel(key) ? handleDedicatedDELETE(key, lastPart) : handleGenericDELETE(lastPart);
  } catch {
    return NextResponse.json(
      { success: false, error: { message: "Failed to delete resource" } },
      { status: 500 },
    );
  }
}
