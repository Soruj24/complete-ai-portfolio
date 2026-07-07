import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { dbConnect } from "@/config/db";
import mongoose from "mongoose";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const dbState = mongoose.connection.readyState;
    const dbStatus = dbState === 1 ? "connected" : "disconnected";

    const health = {
      status: dbStatus === "connected" ? ("healthy" as const) : ("down" as const),
      uptime: Math.round(process.uptime()),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        percentage: Math.round((process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) * 100),
      },
      cpu: { load: 0, cores: 1 },
      database: {
        status: dbStatus as "connected" | "disconnected",
        latency: 0,
      },
    };

    return NextResponse.json({ success: true, data: health });
  } catch (error) {
    console.error("System Health API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
