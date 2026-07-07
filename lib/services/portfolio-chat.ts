import type { ChatMessage, ChatHistoryEntry } from "@/types/chat";

export async function sendChatMessage(
  message: string,
  history: ChatMessage[]
): Promise<Response> {
  const res = await fetch("/api/chat/portfolio", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      history: history.slice(-8).map((m) => ({
        role: m.role,
        content: m.content,
      })),
    }),
  });

  if (!res.ok) throw new Error("Failed to get response");
  return res;
}

export async function readStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  onChunk: (text: string) => void
): Promise<string> {
  const decoder = new TextDecoder();
  let accumulated = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    accumulated += decoder.decode(value, { stream: true });
    onChunk(accumulated);
  }

  return accumulated;
}
