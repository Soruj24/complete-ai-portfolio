import { NextResponse } from "next/server";
import { getGitHubService } from "@/lib/services/github";

export async function GET() {
  try {
    const github = getGitHubService();
    const pinned = await github.getPinnedRepos();
    return NextResponse.json({ success: true, data: pinned });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch pinned repos";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
