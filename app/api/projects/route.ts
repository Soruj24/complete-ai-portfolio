import { auth } from "@/auth";
import { dbConnect } from "@/config/db";
import { Project } from "@/models/Project";
import { NextResponse } from "next/server";
import { projects as initialProjects } from "@/data/projects";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const featured = searchParams.get("featured") === "true";

    const query = featured ? { featured: true } : {};

    const totalProjects = await Project.countDocuments(query);
    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    // If no projects in database and it's page 1, return initial demo projects
    if (projects.length === 0 && page === 1) {
      const paginatedInitial = initialProjects.slice(skip, skip + limit);
      return NextResponse.json({ 
        success: true, 
        projects: paginatedInitial,
        pagination: {
          total: initialProjects.length,
          page,
          limit,
          pages: Math.ceil(initialProjects.length / limit)
        }
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      projects,
      pagination: {
        total: totalProjects,
        page,
        limit,
        pages: Math.ceil(totalProjects / limit)
      }
    });
  } catch (error) {
    console.error("Projects fetch error:", error);
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
    const project = (await Project.create(body)) as any;

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("Project create error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
