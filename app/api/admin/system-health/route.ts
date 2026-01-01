import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { dbConnect } from "@/config/db";
import mongoose from "mongoose";
import os from "os";
import { redis } from "@/lib/redis";

export async function GET() {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    // Database status
    const dbStatus = mongoose.connection.readyState === 1 ? "Healthy" : "Unhealthy";

    // Redis status
    let redisStatus = "Disabled";
    try {
      if (redis) {
        const ping = await redis.ping();
        if (ping === "PONG") redisStatus = "Healthy";
        else redisStatus = "Unhealthy";
      }
    } catch (error) {
      console.error("Redis health check failed:", error);
      redisStatus = "Error";
    }

    // Server Info
    const systemInfo = {
      platform: os.platform(),
      cpuUsage: (os.loadavg()[0] * 10).toFixed(2) + "%",
      totalMemory: (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2) + " GB",
      freeMemory: (os.freemem() / (1024 * 1024 * 1024)).toFixed(2) + " GB",
      uptime: (os.uptime() / 3600).toFixed(2) + " hours",
    };

    return NextResponse.json({
      success: true,
      health: {
        database: dbStatus,
        redis: redisStatus,
        system: systemInfo,
      },
    });
  } catch (error: any) {
    console.error("System health check error:", error);
    return NextResponse.json({ 
      error: "Internal Server Error",
      details: error.message || "Unknown error"
    }, { status: 500 });
  }
}
