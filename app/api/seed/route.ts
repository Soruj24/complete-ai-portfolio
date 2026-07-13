import { NextResponse } from "next/server";
import { dbConnect } from "@/config/db";
import { Project } from "@/models/Project";
import { Skill } from "@/models/Skill";
import { Experience } from "@/models/Experience";
import { BlogPost } from "@/models/BlogPost";
import { seedProjects as seedProjectsData } from "@/lib/seed-data/projects";
import { seedSkills as seedSkillsData } from "@/lib/seed-data/skills";
import { seedExperience as seedExperienceData } from "@/lib/seed-data/experience";
import { seedBlogPosts as seedBlogPostsData } from "@/lib/seed-data/blogs";

async function runSeedProjects() {
  await dbConnect();
  await Project.deleteMany({});
  const projects = seedProjectsData.map((p) => ({ ...p, createdAt: new Date(), updatedAt: new Date() }));
  await Project.insertMany(projects);
  return projects.length;
}

async function runSeedSkills() {
  await dbConnect();
  await Skill.deleteMany({});
  const skills = seedSkillsData.map((s) => ({ ...s, createdAt: new Date(), updatedAt: new Date() }));
  await Skill.insertMany(skills);
  return skills.length;
}

async function runSeedExperience() {
  await dbConnect();
  await Experience.deleteMany({});
  const exp = seedExperienceData.map((e) => ({ ...e, createdAt: new Date(), updatedAt: new Date() }));
  await Experience.insertMany(exp);
  return exp.length;
}

async function runSeedBlogs() {
  await dbConnect();
  await BlogPost.deleteMany({});
  const blogs = seedBlogPostsData.map((b) => ({ ...b, createdAt: new Date(), updatedAt: new Date() }));
  await BlogPost.insertMany(blogs);
  return blogs.length;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all");
  const projects = searchParams.get("projects");
  const skills = searchParams.get("skills");
  const experience = searchParams.get("experience");
  const blogs = searchParams.get("blogs");

  const results: Record<string, number> = {};

  try {
    if (all || projects) {
      results.projects = await runSeedProjects();
    }
    if (all || skills) {
      results.skills = await runSeedSkills();
    }
    if (all || experience) {
      results.experience = await runSeedExperience();
    }
    if (all || blogs) {
      results.blogs = await runSeedBlogs();
    }

    return NextResponse.json({
      success: true,
      message: "Seeding completed successfully",
      results,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Seeding failed" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  return GET(request);
}