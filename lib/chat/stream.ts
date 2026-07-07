import { getAIStream } from "@/lib/ollama";

export function createResponseStream(message: string, history: { role: string; content: string }[], context: string): Response {
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const aiStream = await getAIStream(message, history, context);
        if (!aiStream) throw new Error("Failed to initialize AI stream");
        for await (const chunk of aiStream) {
          if (chunk) controller.enqueue(new TextEncoder().encode(chunk));
        }
      } catch (streamError) {
        console.error("Stream processing error:", streamError);
        controller.error(streamError);
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
