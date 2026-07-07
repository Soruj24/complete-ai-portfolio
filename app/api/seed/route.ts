import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSession } from "@/lib/auth/session";
import { dbConnect } from "@/config/db";
import { Project } from "@/models/Project";
import { Skill } from "@/models/Skill";
import { Experience } from "@/models/Experience";
import { BlogPost } from "@/models/BlogPost";
import { User } from "@/models/User";
import { projects as initialProjects } from "@/data/projects";
import { skillCategories as initialSkillCategories } from "@/data/skills";
import { experiences as initialExperiences } from "@/data/experience";
import { sampleBlogs } from "@/data/blogs";

async function seedDatabase(body: Record<string, unknown> = {}) {
  await dbConnect();

  const session = await getSession();
  const adminExists = await User.exists({ role: "admin" });

  if (!session && adminExists) {
    return { status: 401, error: "Unauthorized" };
  }
  if (session && session.user.role !== "admin") {
    return { status: 403, error: "Forbidden" };
  }

  const results: Record<string, { count: number; action: string }> = {};

  if (!adminExists) {
    const name = (body.name as string) || "Soruj Mahmud";
    const email = ((body.email as string) || "admin@portfolio.dev").toLowerCase().trim();
    const password = (body.password as string) || "Admin@123";
    const hashed = await bcrypt.hash(password, 12);
    await User.create({ name, email, password: hashed, role: "admin", status: "active" });
    results.admin = { count: 1, action: `created (email: ${email})` };
  } else {
    results.admin = { count: 0, action: "already exists" };
  }

  if (body.seed === false) {
    return { status: 200, data: { success: true, message: "Admin only, no seed", results } };
  }

  if (body.projects !== false) {
    await Project.deleteMany({});
    const projectData = initialProjects.map(({ id, ...rest }) => rest);
    await Project.insertMany(projectData);
    results.projects = { count: projectData.length, action: "replaced" };
  }

  if (body.skills !== false) {
    await Skill.deleteMany({});
    const skillData = initialSkillCategories.flatMap((cat) =>
      cat.skills.map((s) => ({ ...s, category: cat.title }))
    );
    await Skill.insertMany(skillData);
    results.skills = { count: skillData.length, action: "replaced" };
  }

  if (body.experience !== false) {
    await Experience.deleteMany({});
    const expData = initialExperiences.map((e) => ({
      year: e.period, role: e.role, company: e.company,
      description: e.description, technologies: e.technologies, icon: e.icon,
    }));
    await Experience.insertMany(expData);
    results.experience = { count: expData.length, action: "replaced" };
  }

  if (body.blogs !== false) {
    await BlogPost.deleteMany({});
    const blogData = sampleBlogs.map((b) => ({ ...b, authorId: "seed", authorName: "Soruj Mahmud" }));
    await BlogPost.insertMany(blogData);
    results.blogs = { count: blogData.length, action: "replaced" };
  }

  return { status: 200, data: { success: true, message: "Database seeded", results } };
}

const page = (message: string, results: Record<string, { count: number; action: string }> | null) => `<!DOCTYPE html>
<html><head><title>Seed Database</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body { font-family: system-ui, sans-serif; max-width: 600px; margin: 40px auto; padding: 0 20px; }
h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
pre { background: #f5f5f5; padding: 1rem; border-radius: 8px; overflow-x: auto; }
.btn { display: inline-block; padding: 10px 20px; background: #000; color: #fff;
  text-decoration: none; border-radius: 8px; font-size: 0.9rem; border: none; cursor: pointer; }
.btn:hover { opacity: 0.8; }
.btn-group { display: flex; gap: 10px; flex-wrap: wrap; margin: 20px 0; }
code { font-size: 0.85rem; }
</style></head><body>
<h1>Seed Database</h1>
<p>Populate the database with sample data.</p>
${message ? `<pre>${message}</pre>` : ""}
${results ? `<pre>${JSON.stringify(results, null, 2)}</pre>` : ""}
<div class="btn-group">
  <a href="/api/seed?all=1" class="btn">Seed All</a>
  <a href="/api/seed?projects=1" class="btn">Seed Projects</a>
  <a href="/api/seed?skills=1" class="btn">Seed Skills</a>
  <a href="/api/seed?experience=1" class="btn">Seed Experience</a>
  <a href="/api/seed?blogs=1" class="btn">Seed Blogs</a>
  <a href="/api/seed?admin=1" class="btn">Create Admin</a>
</div>
<p><small>Or POST with JSON: <code>curl -X POST /api/seed -H 'Content-Type: application/json' -d '{"email":"admin@x.com","password":"Pass@123"}'</code></small></p>
</body></html>`;

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const params: Record<string, unknown> = {};

    if (url.searchParams.has("all")) params.seed = true;
    if (url.searchParams.has("admin")) params.admin = true;
    if (url.searchParams.has("projects")) params.seed = true, params.skills = false, params.experience = false, params.blogs = false;
    if (url.searchParams.has("skills")) params.seed = true, params.projects = false, params.experience = false, params.blogs = false;
    if (url.searchParams.has("experience")) params.seed = true, params.projects = false, params.skills = false, params.blogs = false;
    if (url.searchParams.has("blogs")) params.seed = true, params.projects = false, params.skills = false, params.experience = false;

    if (Object.keys(params).length === 0) {
      return new NextResponse(page("", null), { headers: { "Content-Type": "text/html" } });
    }

    const result = await seedDatabase(params);
    if (result.status !== 200) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }
    return new NextResponse(
      page("Seeded successfully", result.data!.results),
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (error) {
    console.error("Seed error:", error);
    return new NextResponse(page("Error: " + (error as Error).message, null),
      { headers: { "Content-Type": "text/html" } });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const result = await seedDatabase(body);
    if (result.status !== 200) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }
    return NextResponse.json(result.data);
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
