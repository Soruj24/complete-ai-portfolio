import { dbConnect } from "@/config/db";
import Settings from "@/models/Settings";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const settings = await Settings.findOne().select("-updatedBy -createdAt -updatedAt -__v");

    if (!settings) {
      // Return default settings if none exist yet
      const defaultSettings = {
        siteName: "Portfolio",
        fullName: "Soruj Mahmud",
        professionalTitle: "Aspiring Full-Stack Developer",
        bio: "Self-taught developer with comprehensive project-based learning in modern web technologies and AI applications",
        location: "Tangail, Dhaka, Bangladesh",
        phone: "+8801795397598",
        githubUrl: "https://github.com/",
        linkedinUrl: "https://linkedin.com/",
        twitterUrl: "https://twitter.com/",
        specializations: [
          "LangChain and AI Applications",
          "MCP Server Development",
          "Next.js, React, TypeScript",
          "MongoDB, Node.js",
          "Modern Web Technologies",
        ],
      };
      return NextResponse.json({ success: true, settings: defaultSettings });
    }

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("Public settings fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
