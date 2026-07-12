import { NextResponse } from "next/server";
import { getGitHubService } from "@/lib/services/github";

export async function GET() {
  try {
    const github = getGitHubService();
    const languages = await github.getTopLanguages();
    return NextResponse.json({ success: true, data: languages });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch languages";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
