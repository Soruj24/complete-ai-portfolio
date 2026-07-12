import { NextResponse } from "next/server";
import { getGitHubService } from "@/lib/services/github";

export async function GET() {
  try {
    const github = getGitHubService();
    const [graph, count] = await Promise.all([
      github.getContributionGraph(),
      github.getContributionCount(),
    ]);
    return NextResponse.json({ success: true, data: { graph, totalContributions: count } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch GitHub contributions";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
