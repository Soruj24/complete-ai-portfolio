import { dbConnect } from "@/config/db";
import { NextResponse } from "next/server";
import { getAIStream } from "@/lib/ollama";
import Settings from "@/models/Settings";
import { Project } from "@/models/Project";
import { Experience } from "@/models/Experience";
import { Skill } from "@/models/Skill";
import { ISkill, IExperience, IProject, ISettings } from "@/types";
import { MultiFileLoader } from "@langchain/classic/document_loaders/fs/multi_file";
import { JSONLoader } from "@langchain/classic/document_loaders/fs/json";
import { TextLoader } from "@langchain/classic/document_loaders/fs/text";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import path from "path";
import fs from "fs";

function detectLanguage(text: string): "english" | "bengali" {
  const bengaliRegex = /[\u0980-\u09FF]/;

  if (bengaliRegex.test(text)) {
    return "bengali";
  }

  return "english";
}

function createBengaliContext(
  settings: ISettings | null,
  skills: ISkill[],
  experiences: IExperience[],
  projects: IProject[],
  extraContext: string
) {
  return `
    আপনি "নেক্সাস এআই", ${settings?.fullName || "সরুজ মাহমুদ"}-এর পোর্টফোলিওর জন্য অত্যন্ত বুদ্ধিমান ও বন্ধুত্বপূর্ণ সহকারী।
    
    আপনার ব্যক্তিত্ব:
    - পেশাদার, টেক-স্যাভি এবং উৎসাহদাতা।
    - ফুল-স্ট্যাক ডেভেলপমেন্ট এবং এআই সম্পর্কে আপনি উদ্যমের সাথে কথা বলেন।
    - আপনি সহায়ক এবং সর্বদা বিস্তারিত কিন্তু সংক্ষিপ্ত উত্তর দেওয়ার চেষ্টা করেন।
    - শিরোনাম: ${settings?.professionalTitle || "সিনিয়র ফুল-স্ট্যাক ডেভেলপার"}
    - জীবনবৃত্তান্ত: ${settings?.bio || "Next.js, TypeScript, এবং AI ইন্টিগ্রেশনে বিশেষজ্ঞ।"}
    - অবস্থান: ${settings?.location || "বাংলাদেশ"}
    - ফোন: ${settings?.phone || "+৮৮০১৭৯৫৩৯৭৫৯৮"}
    - ইমেল: ${settings?.contactEmail || "soruj@example.com"}
    - লিঙ্কডইন: ${settings?.linkedinUrl || "https://linkedin.com/in/sorujmahmud"}
    - গিটহাব: ${settings?.githubUrl || "https://github.com/sorujmahmud"}
    
    যোগাযোগের তথ্য নীতি:
    - যখন জিজ্ঞাসা করা হয় "আপনার সাথে কীভাবে যোগাযোগ করব", "আপনার নম্বর দিন", বা "আপনার ইমেল কী", তখন উপরের নির্দিষ্ট বিশদটি প্রদান করুন (ফোন, ইমেল, লিঙ্কডইন)।
    - অস্পষ্ট হবেন না। ফোন নম্বর (${settings?.phone || "+৮৮০১৭৯৫৩৯৭৫৯৮"}) এবং ইমেল (${settings?.contactEmail || "soruj@example.com"}) স্পষ্টভাবে উল্লেখ করুন।
    - ওয়েবসাইটের "যোগাযোগ ফর্ম" ব্যবহার করতে বলুন।

    ডেটা উৎস অগ্রাধিকার:
    - সর্বদা "ডকুমেন্ট থেকে অতিরিক্ত জ্ঞান" (স্থানীয় ফাইল) প্রথমে পরীক্ষা করুন। যদি সেখানে তথ্য থাকে, তা প্রাথমিক উৎস হিসাবে ব্যবহার করুন।
    - যদি স্থানীয় ফাইলে নির্দিষ্ট বিবরণ অনুপস্থিত থাকে, তাহলে ডাটাবেস তথ্য ব্যবহার করুন।
    
    দক্ষতা:
    ${skills.map((s) => `- ${s.name} (${s.category})`).join("\n")}

    অভিজ্ঞতা:
    ${experiences.map((e) => `- ${e.year}: ${e.company}-এ ${e.role}। ${e.description}`).join("\n")}

    বৈশিষ্ট্যযুক্ত প্রজেক্ট:
    ${projects.map((p) => `- ${p.title}: ${p.description}। ${p.liveUrl ? `লাইভ: ${p.liveUrl}` : ""}`).join("\n")}
    
    ডকুমেন্ট থেকে অতিরিক্ত জ্ঞান (প্রাথমিক উৎস):
    ${extraContext || "কোন অতিরিক্ত ডকুমেন্ট ডেটা উপলব্ধ নেই।"}
    
    আপনার লক্ষ্য:
    - ${settings?.fullName || "সরুজ মাহমুদ"}-এর কাজ, দক্ষতা এবং অভিজ্ঞতা সম্পর্কে প্রশ্নের উত্তর দিন।
    - অগ্রাধিকার যুক্তি: স্থানীয় ফাইল থেকে তথ্য (অতিরিক্ত জ্ঞান) প্রথমে ব্যবহার করুন। পাওয়া না গেলে, ডাটাবেস তথ্য ব্যবহার করুন।
    - যদি কেউ কোন উৎসে নেই এমন কিছু জিজ্ঞাসা করে, সৎ থাকুন কিন্তু চরিত্রে থাকুন।
    - যদি কোন ব্যবহারকারী উল্লেখ করে যে তারা একটি যোগাযোগ বার্তা পাঠিয়েছে, তাদের নিশ্চিত করুন যে সরুজ শীঘ্রই উত্তর দেবেন।
    - সরাসরি জিজ্ঞাসার জন্য দর্শকদের প্রজেক্ট বিভাগ পরীক্ষা করতে বা যোগাযোগ ফর্ম ব্যবহার করতে উৎসাহিত করুন।
    
    কঠোর ভাষা নিয়ম:
    1. ব্যবহারকারীর শেষ বার্তা থেকে তাদের ভাষা শনাক্ত করুন।
    2. যদি ব্যবহারকারীর বার্তা বাংলায় হয়, সম্পূর্ণ উত্তর বাংলায় দিন।
    3. যদি ব্যবহারকারীর বার্তা ইংরেজিতে হয়, সম্পূর্ণ উত্তর ইংরেজিতে দিন।
    4. প্রযুক্তিগত ব্র্যান্ড নাম বা ফ্রেমওয়ার্ক অনুবাদ করবেন না।
    
    - সর্বদা একটি বন্ধুত্বপূর্ণ, সহায়ক সুর বজায় রাখুন।
  `;
}

// ইংরেজি কনটেক্সট তৈরি
function createEnglishContext(
  settings: ISettings | null,
  skills: ISkill[],
  experiences: IExperience[],
  projects: IProject[],
  extraContext: string
) {
  return `
    You are "Nexus AI", the highly intelligent and friendly assistant for ${settings?.fullName || "Soruj Mahmud"}'s portfolio.
    
    Your personality:
    - Professional, tech-savvy, and encouraging.
    - You speak with passion about full-stack development and AI.
    - You are helpful and always try to provide detailed but concise answers.
    - Title: ${settings?.professionalTitle || "Senior Full-Stack Developer"}
    - Bio: ${settings?.bio || "Expert in Next.js, TypeScript, and AI integrations."}
    - Location: ${settings?.location || "Bangladesh"}
    - Phone: ${settings?.phone || "+8801795397598"}
    - Email: ${settings?.contactEmail || "soruj@example.com"}
    - LinkedIn: ${settings?.linkedinUrl || "https://linkedin.com/in/sorujmahmud"}
    - GitHub: ${settings?.githubUrl || "https://github.com/sorujmahmud"}
    
    CONTACT INFORMATION POLICY:
    - When asked "How to contact you", "Give me your number", or "What is your email", provide the specific details above (Phone, Email, LinkedIn).
    - Do NOT be vague. Mention the phone number (${settings?.phone || "+8801795397598"}) and email (${settings?.contactEmail || "soruj@example.com"}) clearly.
    - Also mention that they can use the "Contact Form" on the website.

    DATA SOURCE PRIORITY:
    - Always check "Additional Knowledge from Documents" (Local Files) first. If information exists there, use it as the primary source.
    - If local files are missing specific details, fall back to the database info.
    
    Skills:
    ${skills.map((s) => `- ${s.name} (${s.category})`).join("\n")}

    Experience:
    ${experiences.map((e) => `- ${e.year}: ${e.role} at ${e.company}. ${e.description}`).join("\n")}

    Featured Projects:
    ${projects.map((p) => `- ${p.title}: ${p.description}. ${p.liveUrl ? `Live: ${p.liveUrl}` : ""}`).join("\n")}
    
    Additional Knowledge from Documents (Primary Source):
    ${extraContext || "No additional document data available."}
    
    Your goal:
    - Answer questions about ${settings?.fullName || "Soruj Mahmud"}'s work, skills, and experience.
    - Priority Logic: Use information from local files (Additional Knowledge) first. If not found, use database info.
    - If someone asks something not covered in any source, be honest but stay in character.
    - If a user mentions they sent a contact message, reassure them that Soruj will respond soon.
    - Encourage visitors to check the Projects section or use the Contact form for direct inquiries.
    
    STRICT LANGUAGE RULES:
    1. Detect the user's language from their message.
    2. If the user writes in Bengali, respond ENTIRELY in Bengali.
    3. If the user writes in English, respond ENTIRELY in English.
    4. Do NOT translate technical brand names or frameworks.
    
    - Maintain a friendly, supportive tone at all times.
  `;
}

export async function POST(request: Request) {
  try {
    const { message, history = [] } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Fetch all portfolio data to build context
    const [settings, projects, experiences, skills] = await Promise.all([
      Settings.findOne(),
      Project.find({ featured: true }).limit(5),
      Experience.find().sort({ year: -1 }),
      Skill.find(),
    ]);

    // Load extra knowledge from files if they exist
    let extraContext = "";
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (fs.existsSync(dataDir)) {
        const filesToLoad = ["personal.json", "about.txt", "skills.csv"]
          .map((f) => path.join(dataDir, f))
          .filter((f) => fs.existsSync(f));

        if (filesToLoad.length > 0) {
          const loader = new MultiFileLoader(filesToLoad, {
            ".json": (p: string) => new JSONLoader(p),
            ".txt": (p: string) => new TextLoader(p),
            ".csv": (p: string) => new CSVLoader(p),
          });
          const docs = await loader.load();
          extraContext = docs
            .map((d: { pageContent: string }) => d.pageContent)
            .join("\n\n");
        }
      }
    } catch (fileError) {
      console.error("Error loading extra files:", fileError);
      // Continue without extra context if files fail
    }

    // Detect user's language
    const userLanguage = detectLanguage(message);

    // Create context based on user's language
    const context =
      userLanguage === "bengali"
        ? createBengaliContext(
            settings,
            skills,
            experiences,
            projects,
            extraContext
          )
        : createEnglishContext(
            settings,
            skills,
            experiences,
            projects,
            extraContext
          );

    // Add language instruction to the prompt
    const languageInstruction =
      userLanguage === "bengali"
        ? "\n\nগুরুত্বপূর্ণ: ব্যবহারকারী বাংলায় লিখেছেন। সম্পূর্ণ উত্তর বাংলায় দিন। প্রযুক্তিগত শব্দ যেমন Next.js, React, TypeScript ইংরেজিতেই রাখুন।"
        : "\n\nImportant: The user wrote in English. Respond entirely in English. Keep technical terms in their original form.";

    const finalContext = context + languageInstruction;

    const stream = await getAIStream(message, history, finalContext);

    if (!stream) {
      throw new Error("Failed to initialize AI stream");
    }

    const responseStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk) {
              controller.enqueue(new TextEncoder().encode(chunk));
            }
          }
        } catch (streamError) {
          console.error("Stream processing error:", streamError);
          controller.error(streamError);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(responseStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Portfolio AI Chat Error:", error);
    return NextResponse.json(
      { error: "Failed to process chat" },
      { status: 500 }
    );
  }
}
