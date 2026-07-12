import { NextResponse } from "next/server";
import { getGitHubService } from "@/lib/services/github";

export async function GET() {
  try {
    const github = getGitHubService();
    const activity = await github.getRecentActivity(30);
    const commits = activity
      .filter((a) => a.type === "PushEvent")
      .slice(0, 10);
    return NextResponse.json({ success: true, data: commits });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch GitHub commits";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
