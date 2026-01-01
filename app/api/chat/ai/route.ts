import { auth } from "@/auth";
import { dbConnect } from "@/config/db";
import { ChatMessage } from "@/models/ChatMessage";
import { NextResponse } from "next/server";
import { getAIStream } from "@/lib/ollama";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message } = await request.json();
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    await dbConnect();

    // 1. Save user message
    await ChatMessage.create({
      senderId: session.user.id,
      senderName: session.user.name,
      senderImage: session.user.image,
      receiverId: "ai-assistant", // Special ID for AI
      message,
      isAdmin: false,
      isRead: true,
    });

    // 2. Get AI Stream
    const history = await ChatMessage.find({
      $or: [
        { senderId: session.user.id, receiverId: "ai-assistant" },
        { senderId: "ai-assistant", receiverId: session.user.id }
      ]
    })
    .sort({ createdAt: -1 })
    .limit(5);

    const formattedHistory = history.reverse().map(m => ({
      role: m.senderId.toString() === session.user?.id ? "user" : "assistant",
      content: m.message
    }));

    const stream = await getAIStream(message, formattedHistory);

    // Create a ReadableStream to pass back to the client
    const responseStream = new ReadableStream({
      async start(controller) {
        let fullResponse = "";
        for await (const chunk of stream) {
          fullResponse += chunk;
          controller.enqueue(new TextEncoder().encode(chunk));
        }

        // 3. Save full AI response once stream finishes
        await ChatMessage.create({
          senderId: "ai-assistant",
          senderName: "AI Assistant (Llama 3.2)",
          senderImage: "/ai-avatar.png",
          receiverId: session.user.id,
          message: fullResponse,
          isAdmin: true,
          isRead: false,
        });

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
    console.error("AI Chat Error:", error);
    return NextResponse.json({ error: "Failed to process AI chat" }, { status: 500 });
  }
}

export async function GET(request: Request) {
    try {
      const session = await auth();
      if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      await dbConnect();
      
      const messages = await ChatMessage.find({
        $or: [
          { senderId: session.user.id, receiverId: "ai-assistant" },
          { senderId: "ai-assistant", receiverId: session.user.id }
        ]
      }).sort({ createdAt: 1 });
  
      return NextResponse.json(messages);
    } catch (error) {
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }
