import { NextResponse } from "next/server";
import { getGitHubService } from "@/lib/services/github";

export async function GET() {
  try {
    const github = getGitHubService();
    const repos = await github.getAllRepos();
    return NextResponse.json({ success: true, data: repos });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch repos";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
