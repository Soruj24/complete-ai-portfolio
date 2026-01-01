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

    const { topic, keywords, style = "professional" } = await request.json();

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", `You are an expert tech blogger. Generate a high-quality blog post about the given topic. 
      The post should be in markdown format and include:
      1. A catchy title.
      2. A compelling introduction.
      3. Key points or sections with headings.
      4. A concluding summary.
      5. A short excerpt (50-100 characters) for the post.
      
      Return the response in JSON format with the following structure:
      {{
        "title": "...",
        "content": "markdown content...",
        "excerpt": "...",
        "category": "Technology"
      }}`],
      ["user", `Topic: ${topic}\nKeywords: ${keywords?.join(", ")}\nStyle: ${style}`],
    ]);

    const chain = prompt.pipe(ollamaModel).pipe(new StringOutputParser());
    const stream = await chain.stream({
      topic,
      keywords: keywords?.join(", "),
      style
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
    console.error("AI Blog Generator Error:", error);
    return NextResponse.json({ error: "Failed to generate blog post" }, { status: 500 });
  }
}
