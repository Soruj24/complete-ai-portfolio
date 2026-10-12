import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import {
  getOpenRouterApiKey,
  OPENROUTER_BASE_URL,
  OPENROUTER_MODEL,
  openRouterHeaders,
} from "@/lib/openrouter";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const apiKey = getOpenRouterApiKey();
    if (!apiKey) {
      return NextResponse.json(
        { status: "offline", configured: false, error: "OPENROUTER_API_KEY is not configured" },
        { status: 503 }
      );
    }

    const [keyRes, modelsRes] = await Promise.all([
      fetch(`${OPENROUTER_BASE_URL}/key`, {
        headers: { Authorization: `Bearer ${apiKey}`, ...openRouterHeaders() },
        signal: AbortSignal.timeout(5000),
      }),
      fetch(`${OPENROUTER_BASE_URL}/models`, {
        headers: { Authorization: `Bearer ${apiKey}` },
        signal: AbortSignal.timeout(5000),
      }),
    ]);

    if (!keyRes.ok) {
      return NextResponse.json(
        { status: "offline", configured: true, error: "OpenRouter rejected the API key" },
        { status: 503 }
      );
    }

    const keyData = await keyRes.json();
    const usage = keyData?.data?.usage ?? null;
    const limit = keyData?.data?.limit ?? null;
    const limitRemaining = keyData?.data?.limit_remaining ?? null;

    const models: string[] = modelsRes.ok ? ((await modelsRes.json())?.data ?? []).map((m: { id: string }) => m.id) : [];
    const hasModel = models.length === 0 || models.includes(OPENROUTER_MODEL);

    return NextResponse.json({
      status: "online",
      configured: true,
      model: OPENROUTER_MODEL,
      hasModel,
      usage,
      limit,
      limitRemaining,
      modelCount: models.length,
    });
  } catch (error) {
    return NextResponse.json({ status: "offline", error: "Connection failed" }, { status: 500 });
  }
}