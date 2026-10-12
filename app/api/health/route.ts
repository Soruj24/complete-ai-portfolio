import { NextResponse } from "next/server";
import { getOpenRouterApiKey, OPENROUTER_BASE_URL, openRouterHeaders } from "@/lib/openrouter";

export async function GET() {
  const apiKey = getOpenRouterApiKey();
  if (!apiKey) {
    return NextResponse.json(
      { status: "error", message: "OPENROUTER_API_KEY is not configured" },
      { status: 503 }
    );
  }

  try {
    // /key validates the credential and reports usage/credits without spending tokens.
    const response = await fetch(`${OPENROUTER_BASE_URL}/key`, {
      headers: { Authorization: `Bearer ${apiKey}`, ...openRouterHeaders() },
      signal: AbortSignal.timeout(3000),
    });

    if (response.ok) {
      return NextResponse.json({ status: "ok", message: "OpenRouter is reachable" });
    }

    if (response.status === 401) {
      return NextResponse.json({ status: "error", message: "OpenRouter rejected the API key" }, { status: 503 });
    }

    return NextResponse.json({ status: "error", message: "OpenRouter unreachable" }, { status: 503 });
  } catch {
    return NextResponse.json({ status: "error", message: "Health check failed" }, { status: 500 });
  }
}