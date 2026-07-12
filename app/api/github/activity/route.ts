import { NextResponse } from "next/server";
import { getGitHubService } from "@/lib/services/github";

export async function GET() {
  try {
    const github = getGitHubService();
    const activity = await github.getRecentActivity(20);
    return NextResponse.json({ success: true, data: activity });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch GitHub activity";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
