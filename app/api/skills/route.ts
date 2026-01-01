import { auth } from "@/auth";
import { dbConnect } from "@/config/db";
import { Skill } from "@/models/Skill";
import { NextResponse } from "next/server";
import { skillCategories as initialSkillCategories } from "@/data/skills";

export async function GET() {
  try {
    await dbConnect();
    const skills = await Skill.find({}).sort({ category: 1, name: 1 });
    
    // If no skills in database, return initial demo skills
    if (skills.length === 0) {
      const demoSkills = initialSkillCategories.flatMap(cat => 
        cat.skills.map(skill => ({
          ...skill,
          category: cat.title
        }))
      );
      return NextResponse.json({ success: true, skills: demoSkills });
    }
    
    return NextResponse.json({ success: true, skills });
  } catch (error) {
    console.error("Skills fetch error:", error);
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
    const skill = (await Skill.create(body)) as any;

    return NextResponse.json({ success: true, skill });
  } catch (error) {
    console.error("Skill create error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
