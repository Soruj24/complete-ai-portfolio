import { NextResponse } from "next/server";

export async function GET() {
  try {
    const baseUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
    const res = await fetch(`${baseUrl}/api/tags`);
    
    if (res.ok) {
      const data = await res.json();
      const models = data.models || [];
      const hasLlama32 = models.some((m: any) => m.name.includes("llama3.2"));
      
      return NextResponse.json({ 
        status: "online", 
        hasLlama32,
        models: models.map((m: any) => m.name)
      });
    }
    
    return NextResponse.json({ status: "offline", error: "Ollama not responding" }, { status: 503 });
  } catch (error) {
    return NextResponse.json({ status: "offline", error: "Connection failed" }, { status: 500 });
  }
}
