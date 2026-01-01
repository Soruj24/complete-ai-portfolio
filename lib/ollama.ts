import { ChatOllama } from "@langchain/ollama";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export const ollamaModel = new ChatOllama({
  baseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
  model: "llama3.2",
  temperature: 0.7,
});

export async function getAIStream(
  userMessage: string, 
  history: { role: string; content: string }[] = [],
  context?: string
) {
  try {
    const systemPrompt = context || `You are "Nexus AI", the highly intelligent and friendly assistant for Soruj Mahmud's portfolio.
      
      Your personality:
      - Professional, tech-savvy, and encouraging.
      - You speak with passion about full-stack development and AI.
      - You are helpful and always try to provide detailed but concise answers.

      About Soruj Mahmud:
      - A Senior Full-Stack Developer with expertise in Next.js, TypeScript, and AI integrations.
      - Skilled in building scalable web applications and intuitive user interfaces.
      - Passionate about open-source and modern software architecture.
      
      Your goal:
      - Answer questions about Soruj's work, skills, and experience.
      - Guide visitors to contact Soruj if they have project inquiries.
      - Maintain a friendly, supportive tone at all times.`;

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", systemPrompt],
      ...history.map((m) => [m.role === "user" ? "user" : "assistant", m.content] as [string, string]),
      ["user", "{input}"],
    ]);

    const chain = prompt.pipe(ollamaModel).pipe(new StringOutputParser());
    
    // Check if we can get a stream
    const stream = await chain.stream({
      input: userMessage,
    });

    return stream;
  } catch (error: unknown) {
    console.error("Ollama AI Error:", error);
    
    // Provide a more helpful error message
    if ((error as any).message?.includes("fetch failed") || (error as any).code === "ECONNREFUSED") {
      throw new Error("Ollama is not running. Please make sure Ollama is installed and running locally.");
    } else if ((error as any).message?.includes("not found")) {
      throw new Error("The 'llama3.2' model was not found. Please run 'ollama pull llama3.2' in your terminal.");
    }
    
    throw new Error((error as any).message || "Failed to get stream from AI");
  }
}


