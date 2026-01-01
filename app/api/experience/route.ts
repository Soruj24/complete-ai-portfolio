import { auth } from "@/auth";
import { dbConnect } from "@/config/db";
import { Experience } from "@/models/Experience";
import { NextResponse } from "next/server";
import { experiences as initialExperiences } from "@/data/experience";

export async function GET() {
  try {
    await dbConnect();
    const experiences = await Experience.find({}).sort({ year: -1 });
    
    // If no experiences in database, return initial demo experiences
    if (experiences.length === 0) {
      return NextResponse.json({ success: true, experiences: initialExperiences });
    }
    
    return NextResponse.json({ success: true, experiences });
  } catch (error) {
    console.error("Experience fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    await dbConnect();
    const experience = (await Experience.create(body)) as any;

    return NextResponse.json({ success: true, experience });
  } catch (error) {
    console.error("Experience create error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
