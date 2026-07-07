import { dbConnect } from "@/config/db";
import { NextResponse } from "next/server";
import Settings from "@/models/Settings";
import { Project } from "@/models/Project";
import { Experience } from "@/models/Experience";
import { Skill } from "@/models/Skill";
import { detectLanguage } from "@/lib/chat/language";
import { createBengaliContext, createEnglishContext } from "@/lib/chat/context";
import { createResponseStream } from "@/lib/chat/stream";
import { loadExtraContext } from "@/lib/chat/documents";

export async function POST(request: Request) {
  try {
    const { message, history = [] } = await request.json();
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    await dbConnect();

    const [settings, projects, experiences, skills] = await Promise.all([
      Settings.findOne(),
      Project.find({ featured: true }).limit(5),
      Experience.find().sort({ year: -1 }),
      Skill.find(),
    ]);

    const [extraContext, userLanguage] = await Promise.all([
      loadExtraContext(),
      Promise.resolve(detectLanguage(message)),
    ]);

    const context = (userLanguage === "bengali" ? createBengaliContext : createEnglishContext)(
      settings, skills, experiences, projects, extraContext
    );

    const langInstruction = userLanguage === "bengali"
      ? "\n\nগুরুত্বপূর্ণ: ব্যবহারকারী বাংলায় লিখেছেন। সম্পূর্ণ উত্তর বাংলায় দিন। প্রযুক্তিগত শব্দ যেমন Next.js, React, TypeScript ইংরেজিতেই রাখুন।"
      : "\n\nImportant: The user wrote in English. Respond entirely in English. Keep technical terms in their original form.";

    return createResponseStream(message, history, context + langInstruction);
  } catch (error) {
    console.error("Portfolio AI Chat Error:", error);
    return NextResponse.json({ error: "Failed to process chat" }, { status: 500 });
  }
}
