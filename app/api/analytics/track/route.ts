import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/config/db";
import { PageView } from "@/models/PageView";
import { Download } from "@/models/Download";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, path, file } = body;

    await dbConnect();

    if (type === "pageview" && path) {
      await PageView.create({
        path,
        ip: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || undefined,
        userAgent: req.headers.get("user-agent") || undefined,
      });
    }

    if (type === "download" && file) {
      await Download.create({
        file,
        ip: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || undefined,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics track error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
