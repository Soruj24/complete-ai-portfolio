import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export const OPENROUTER_BASE_URL = process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1";
/**
 * Default model id. `openrouter/free` auto-routes to whatever free model is
 * currently available (works on a zero-credit OpenRouter account).
 * Set OPENROUTER_MODEL to any provider/model id from https://openrouter.ai/models
 * for a paid model, e.g. `google/gemini-2.5-flash`.
 */
export const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "openrouter/free";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const APP_TITLE = process.env.OPENROUTER_APP_TITLE || "Soruj Mahmud Portfolio";

/** Headers OpenRouter uses for app attribution (ranked in leaderboards). */
export function openRouterHeaders(): Record<string, string> {
  return {
    "HTTP-Referer": APP_URL,
    "X-Title": APP_TITLE,
  };
}

export function getOpenRouterApiKey(): string | undefined {
  return process.env.OPENROUTER_API_KEY;
}

export function isOpenRouterConfigured(): boolean {
  return Boolean(getOpenRouterApiKey());
}

/**
 * Creates a chat model bound to OpenRouter's OpenAI-compatible API.
 * Cheap to construct (no network call), so callers can create per-request instances.
 */
export function getChatModel(temperature = 0.7, model: string = OPENROUTER_MODEL): ChatOpenAI {
  const apiKey = getOpenRouterApiKey();
  if (!apiKey) {
    throw new Error(
      "OpenRouter is not configured. Add OPENROUTER_API_KEY to your environment (see .env.example)."
    );
  }

  return new ChatOpenAI({
    model,
    temperature,
    apiKey,
    configuration: {
      baseURL: OPENROUTER_BASE_URL,
      defaultHeaders: openRouterHeaders(),
    },
  });
}

/** Maps raw OpenRouter/OpenAI SDK errors to actionable messages. */
export function describeOpenRouterError(error: unknown): string {
  const err = error as {
    message?: string;
    status?: number;
    status_code?: number;
    error?: { message?: string; code?: number | string };
    response?: { data?: { error?: { message?: string } } };
  };

  const status = err?.status ?? err?.status_code ?? err?.error?.code;
  const detail = err?.error?.message ?? err?.response?.data?.error?.message ?? err?.message;

  if (status === 401) {
    return "OpenRouter rejected the API key. Check that OPENROUTER_API_KEY is valid.";
  }
  if (status === 402) {
    return "OpenRouter credits are exhausted. Add credits at https://openrouter.ai/credits.";
  }
  if (status === 429) {
    return "OpenRouter rate limit reached. Please retry in a moment.";
  }
  if (status === 404) {
    return `Model "${OPENROUTER_MODEL}" is not available on OpenRouter. Check OPENROUTER_MODEL.`;
  }

  return detail || "Failed to get a response from OpenRouter.";
}

export async function getAIStream(
  userMessage: string,
  history: { role: string; content: string }[] = [],
  context?: string
) {
  try {
    const systemPrompt = context || `You are "Soruj AI", the highly intelligent and friendly assistant for Soruj Mahmud's portfolio.

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

    const chain = prompt.pipe(getChatModel()).pipe(new StringOutputParser());

    return await chain.stream({ input: userMessage });
  } catch (error: unknown) {
    console.error("OpenRouter AI Error:", error);
    throw new Error(describeOpenRouterError(error));
  }
}