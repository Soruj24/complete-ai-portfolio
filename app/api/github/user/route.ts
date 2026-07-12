import { NextResponse } from "next/server";
import { getGitHubService } from "@/lib/services/github";

export async function GET() {
  try {
    const github = getGitHubService();
    const user = await github.getUser();
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch user";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
