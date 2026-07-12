import { NextResponse } from "next/server";
import { getGitHubService } from "@/lib/services/github";

interface RouteParams {
  params: Promise<{ repo: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { repo } = await params;
    const github = getGitHubService();
    const [contributors, releases, deployments, issues, prs] = await Promise.all([
      github.getContributors(repo),
      github.getReleases(repo),
      github.getDeployments(repo),
      github.getIssues(repo),
      github.getPullRequests(repo),
    ]);

    return NextResponse.json({
      success: true,
      data: { contributors, releases, deployments, issues, pullRequests: prs },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch repo data";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
