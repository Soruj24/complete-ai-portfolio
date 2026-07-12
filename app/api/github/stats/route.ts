import { NextResponse } from "next/server";
import { getGitHubService } from "@/lib/services/github";

export async function GET() {
  try {
    const github = getGitHubService();
    const data = await github.getDashboardData();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch GitHub stats";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
