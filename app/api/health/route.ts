import { NextResponse } from "next/server";
import { ollamaModel } from "@/lib/ollama";

export async function GET() {
  try {
    // Simple check to see if Ollama is reachable
    // We don't want to wait too long, so we can't really do a full model check here
    // but we can check if the base URL is reachable.
    const baseUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
    const response = await fetch(`${baseUrl}/api/tags`, { signal: AbortSignal.timeout(2000) });
    
    if (response.ok) {
      return NextResponse.json({ status: "ok", message: "Ollama is reachable" });
    }
    
    return NextResponse.json({ status: "error", message: "Ollama unreachable" }, { status: 503 });
  } catch (error) {
    return NextResponse.json({ status: "error", message: "Health check failed" }, { status: 500 });
  }
}
