import { auth } from "@/auth";
import { dbConnect } from "@/config/db";
import { Project } from "@/models/Project";
import { Skill } from "@/models/Skill";
import { Experience } from "@/models/Experience";
import { projects as initialProjects } from "@/data/projects";
import { skillCategories as initialSkillCategories } from "@/data/skills";
import { experiences as initialExperiences } from "@/data/experience";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await dbConnect();

    // Seed Projects
    await Project.deleteMany({});
    const projectsToSeed = initialProjects.map(p => {
        const { id, ...rest } = p; // remove static id
        return rest;
    });
    await Project.insertMany(projectsToSeed);

    // Seed Skills
    await Skill.deleteMany({});
    const skillsToSeed = initialSkillCategories.flatMap(cat => 
      cat.skills.map(skill => ({
        ...skill,
        category: cat.title
      }))
    );
    await Skill.insertMany(skillsToSeed);

    // Seed Experiences
    await Experience.deleteMany({});
    await Experience.insertMany(initialExperiences);

    return NextResponse.json({ success: true, message: "Database seeded successfully" });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
