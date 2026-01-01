import { dbConnect } from "@/config/db";
import Settings from "@/models/Settings";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    }

    // Only return public settings
    return NextResponse.json({
      success: true,
      settings: {
        siteName: settings.siteName,
        allowRegistration: settings.allowRegistration,
        maintenanceMode: settings.maintenanceMode,
      },
    });
  } catch (error) {
    console.error("Public settings fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
