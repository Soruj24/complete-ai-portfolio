import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { ollamaModel } from "@/lib/ollama";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { description, techStack } = await request.json();

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", `You are a professional technical writer and recruiter. Optimize the following project description to make it more impactful for a portfolio.
      Focus on:
      1. Using action verbs.
      2. Highlighting technical achievements.
      3. Mentioning specific technologies from the tech stack: ${techStack?.join(", ")}.
      4. Keeping it concise yet descriptive (2-3 sentences).`],
      ["user", `Original Description: ${description}`],
    ]);

    const chain = prompt.pipe(ollamaModel).pipe(new StringOutputParser());
    const stream = await chain.stream({
      description,
      techStack: techStack?.join(", "),
    });

    const responseStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          controller.enqueue(new TextEncoder().encode(chunk));
        }
        controller.close();
      },
    });

    return new Response(responseStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("AI Project Optimizer Error:", error);
    return NextResponse.json({ error: "Failed to optimize description" }, { status: 500 });
  }
}
