import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { dbConnect } from "@/config/db";
import { Project } from "@/models/Project";
import { Skill } from "@/models/Skill";
import { Experience } from "@/models/Experience";
import { BlogPost } from "@/models/BlogPost";
import { Testimonial } from "@/models/Testimonial";
import { AdminResource } from "@/models/AdminResource";

interface SearchResult {
  id: string;
  name: string;
  type: string;
  status: string;
  icon: string;
  editPath: string;
  meta?: string;
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const q = request.nextUrl.searchParams.get("q")?.trim();
    if (!q || q.length < 1) {
      return NextResponse.json({ data: [] });
    }

    await dbConnect();

    const regex = new RegExp(q, "i");
    const results: Record<string, SearchResult[]> = {
      projects: [],
      skills: [],
      experience: [],
      blog: [],
      testimonials: [],
      media: [],
      settings: [],
    };

    // Search Projects
    const projects = await Project.find({
      $or: [{ title: regex }, { description: regex }, { technologies: regex }],
    })
      .limit(5)
      .lean();
    results.projects = projects.map((p) => ({
      id: String(p._id),
      name: p.title || "Untitled Project",
      type: "project",
      status: p.status || "completed",
      icon: "FolderKanban",
      editPath: "/admin/projects",
      meta: p.category,
    }));

    // Search Skills
    const skills = await Skill.find({
      $or: [{ name: regex }, { description: regex }, { category: regex }],
    })
      .limit(5)
      .lean();
    results.skills = skills.map((s) => ({
      id: String(s._id),
      name: s.name || "Untitled Skill",
      type: "skill",
      status: s.enabled !== false ? "active" : "disabled",
      icon: "Code2",
      editPath: "/admin/skills",
      meta: s.category,
    }));

    // Search Experience
    const experiences = await Experience.find({
      $or: [{ role: regex }, { company: regex }, { description: regex }],
    })
      .limit(5)
      .lean();
    results.experience = experiences.map((e) => ({
      id: String(e._id),
      name: `${e.role || ""} at ${e.company || ""}`.trim() || "Untitled Experience",
      type: "experience",
      status: e.current ? "current" : "past",
      icon: "Briefcase",
      editPath: "/admin/experience",
      meta: e.location,
    }));

    // Search Blog Posts
    const blogs = await BlogPost.find({
      $or: [{ title: regex }, { excerpt: regex }, { tags: regex }],
    })
      .limit(5)
      .lean();
    results.blog = blogs.map((b) => ({
      id: String(b._id),
      name: b.title || "Untitled Post",
      type: "blog",
      status: b.status || "draft",
      icon: "BookOpen",
      editPath: "/admin/blogs",
      meta: b.category,
    }));

    // Search Testimonials
    const testimonials = await Testimonial.find({
      $or: [{ name: regex }, { content: regex }, { company: regex }],
    })
      .limit(5)
      .lean();
    results.testimonials = testimonials.map((t) => ({
      id: String(t._id),
      name: t.name || "Anonymous",
      type: "testimonial",
      status: t.enabled !== false ? "active" : "disabled",
      icon: "MessageSquare",
      editPath: "/admin/testimonials",
      meta: t.company,
    }));

    // Search Media (AdminResource with resource=media)
    const media = await AdminResource.find({
      resource: "media",
      $or: [{ "data.name": regex }, { "data.tags": regex }],
    })
      .limit(5)
      .lean();
    results.media = media.map((m) => ({
      id: String(m._id),
      name: ((m.data as Record<string, unknown>)?.name as string) || "Untitled File",
      type: "media",
      status: "active",
      icon: "Image",
      editPath: "/admin/media",
      meta: (m.data as Record<string, unknown>)?.type as string,
    }));

    // Search Settings (check if query matches setting labels)
    const settingLabels = [
      "heroTitle", "professionalTitle", "bio", "about", "contactEmail",
      "fullName", "siteName", "location", "phone",
    ];
    if (settingLabels.some((l) => l.toLowerCase().includes(q.toLowerCase()))) {
      results.settings = [{
        id: "settings",
        name: "Site Settings",
        type: "setting",
        status: "active",
        icon: "Settings",
        editPath: "/admin/settings/general",
        meta: "General settings",
      }];
    }

    return NextResponse.json({ data: results });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ data: {} });
  }
}
