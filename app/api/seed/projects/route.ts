import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { dbConnect } from "@/config/db";
import { Project } from "@/models/Project";
import { User } from "@/models/User";
import { projects as initialProjects } from "@/data/projects";

export async function POST() {
  try {
    await dbConnect();

    const session = await getSession();
    const adminExists = await User.exists({ role: "admin" });

    if (!session && adminExists) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session && session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const count = await Project.countDocuments();
    const inserted = [];

    for (const p of initialProjects) {
      const { id, ...rest } = p;
      const existing = await Project.findOne({ title: rest.title });
      if (existing) {
        await Project.findByIdAndUpdate(existing._id, rest);
        inserted.push({ title: rest.title, action: "updated" });
      } else {
        await Project.create(rest);
        inserted.push({ title: rest.title, action: "created" });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Seeded ${inserted.length} projects`,
      projects: inserted,
      previousCount: count,
    });
  } catch (error) {
    console.error("Seed projects error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
