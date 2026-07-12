import { GITHUB_USERNAME } from "@/lib/constants";
import { LANGUAGE_COLORS } from "@/lib/github/constants";
import { githubFetch, githubGraphql } from "@/lib/github/client";
import {
  PULL_REQUEST_CONTRIBUTIONS_QUERY,
  CONTRIBUTION_COUNT_QUERY,
  CONTRIBUTION_GRAPH_QUERY,
  PINNED_REPOS_QUERY,
} from "@/lib/github/queries";
import type {
  GitHubUser,
  GitHubRepo,
  GitHubStats,
  GitHubDashboardData,
  GitHubLanguage,
  GitHubContributor,
  GitHubRelease,
  GitHubDeployment,
  GitHubIssue,
  GitHubPullRequest,
  GitHubTraffic,
  GitHubTrafficReferrer,
  GitHubTrafficPopularity,
  GitHubContributionWeek,
  GitHubActivity,
  GitHubPinnedRepo,
} from "@/lib/types/github";

export class GitHubService {
  private username: string;

  constructor(username: string = GITHUB_USERNAME) {
    this.username = username;
  }

  async getUser(): Promise<GitHubUser> {
    return githubFetch(`/users/${this.username}`) as Promise<GitHubUser>;
  }

  async getAllRepos(perPage: number = 100): Promise<GitHubRepo[]> {
    const repos: GitHubRepo[] = [];
    let page = 1;
    while (true) {
      const data = await githubFetch(`/users/${this.username}/repos?per_page=${perPage}&page=${page}&sort=pushed&direction=desc`);
      const mapped = data as GitHubRepo[];
      repos.push(...mapped);
      if (mapped.length < perPage) break;
      page++;
    }
    return repos;
  }

  async getRepoLanguages(repoName: string): Promise<Record<string, number>> {
    return githubFetch(`/repos/${this.username}/${repoName}/languages`) as Promise<Record<string, number>>;
  }

  async getTopLanguages(): Promise<GitHubLanguage[]> {
    const repos = await this.getAllRepos();
    const langBytes: Record<string, number> = {};
    for (const repo of repos) {
      if (!repo.language) continue;
      try {
        const langs = await this.getRepoLanguages(repo.name);
        for (const [lang, bytes] of Object.entries(langs)) {
          langBytes[lang] = (langBytes[lang] ?? 0) + bytes;
        }
      } catch {
        continue;
      }
    }
    const total = Object.values(langBytes).reduce((a, b) => a + b, 0);
    if (total === 0) return [];
    return Object.entries(langBytes)
      .map(([name, bytes]) => ({ name, bytes, color: LANGUAGE_COLORS[name] ?? "#6b7280" }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 10);
  }

  async getContributors(repoName: string): Promise<GitHubContributor[]> {
    return githubFetch(`/repos/${this.username}/${repoName}/contributors?per_page=10`) as Promise<GitHubContributor[]>;
  }

  async getReleases(repoName: string): Promise<GitHubRelease[]> {
    return githubFetch(`/repos/${this.username}/${repoName}/releases?per_page=10`) as Promise<GitHubRelease[]>;
  }

  async getDeployments(repoName: string): Promise<GitHubDeployment[]> {
    return githubFetch(`/repos/${this.username}/${repoName}/deployments?per_page=10`) as Promise<GitHubDeployment[]>;
  }

  async getIssues(repoName: string, state: "open" | "closed" | "all" = "all"): Promise<GitHubIssue[]> {
    const data = await githubFetch(`/repos/${this.username}/${repoName}/issues?state=${state}&per_page=30`);
    return (data as GitHubIssue[]).filter((i) => !("pull_request" in i));
  }

  async getPullRequests(repoName: string, state: "open" | "closed" | "all" = "all"): Promise<GitHubPullRequest[]> {
    return githubFetch(`/repos/${this.username}/${repoName}/pulls?state=${state}&per_page=30`) as Promise<GitHubPullRequest[]>;
  }

  async getTotalPullRequests(): Promise<number> {
    try {
      const data = await githubGraphql<{
        user: { contributionsCollection: { totalPullRequestContributions: number; totalPullRequestReviewContributions: number } };
      }>(PULL_REQUEST_CONTRIBUTIONS_QUERY, { username: this.username });
      return (
        data.user.contributionsCollection.totalPullRequestContributions +
        data.user.contributionsCollection.totalPullRequestReviewContributions
      );
    } catch {
      return 0;
    }
  }

  async getTraffic(repoName: string) {
    const [views, clones, referrers, popular] = await Promise.allSettled([
      githubFetch(`/repos/${this.username}/${repoName}/traffic/views`),
      githubFetch(`/repos/${this.username}/${repoName}/traffic/clones`),
      githubFetch(`/repos/${this.username}/${repoName}/traffic/popular/referrers`),
      githubFetch(`/repos/${this.username}/${repoName}/traffic/popular/paths`),
    ]);
    return {
      views: views.status === "fulfilled" ? views.value as GitHubTraffic : { count: 0, uniques: 0 },
      clones: clones.status === "fulfilled" ? clones.value as GitHubTraffic : { count: 0, uniques: 0 },
      referrers: referrers.status === "fulfilled" ? referrers.value as GitHubTrafficReferrer[] : [],
      popular: popular.status === "fulfilled" ? popular.value as GitHubTrafficPopularity[] : [],
    };
  }

  async getContributionCount(): Promise<number> {
    try {
      const data = await githubGraphql<{
        user: { contributionsCollection: { contributionCalendar: { totalContributions: number } } };
      }>(CONTRIBUTION_COUNT_QUERY, { username: this.username });
      return data.user.contributionsCollection.contributionCalendar.totalContributions;
    } catch {
      return 0;
    }
  }

  async getContributionGraph(): Promise<GitHubContributionWeek[]> {
    try {
      const data = await githubGraphql<{
        user: { contributionsCollection: { contributionCalendar: { weeks: GitHubContributionWeek[] } } };
      }>(CONTRIBUTION_GRAPH_QUERY, { username: this.username });
      return data.user.contributionsCollection.contributionCalendar.weeks;
    } catch {
      return [];
    }
  }

  async getRecentActivity(count: number = 10): Promise<GitHubActivity[]> {
    try {
      const data = await githubFetch(`/users/${this.username}/events/public?per_page=${count}`);
      return (data as GitHubActivity[]).map((event: any) => ({
        id: String(event.id ?? ""),
        type: String(event.type ?? ""),
        repo: { name: String(event.repo?.name ?? "") },
        created_at: String(event.created_at ?? ""),
        payload: event.payload as Record<string, unknown>,
      }));
    } catch {
      return [];
    }
  }

  async getPinnedRepos(): Promise<GitHubPinnedRepo[]> {
    try {
      const data = await githubGraphql<{
        user: { pinnedItems: { nodes: Array<Record<string, unknown>> } };
      }>(PINNED_REPOS_QUERY, { username: this.username });
      return (data.user.pinnedItems.nodes || []).map((node: any) => ({
        id: String(node.id ?? ""),
        name: String(node.name ?? ""),
        description: (node.description as string) || null,
        url: String(node.url ?? ""),
        stars: Number(node.stargazerCount ?? 0),
        forks: Number(node.forkCount ?? 0),
        language: node.primaryLanguage
          ? { name: String(node.primaryLanguage.name ?? ""), color: (node.primaryLanguage.color as string) || null }
          : null,
        languages: ((node.languages as Record<string, unknown>)?.nodes as Array<Record<string, unknown>> || []).map(
          (l: any) => String(l.name ?? "")
        ),
      }));
    } catch {
      return [];
    }
  }

  async getStats(): Promise<GitHubStats> {
    const [user, repos, contributionCount, totalPRs] = await Promise.all([
      this.getUser(),
      this.getAllRepos(),
      this.getContributionCount(),
      this.getTotalPullRequests(),
    ]);
    const totalStars = repos.reduce((a, r) => a + r.stargazers_count, 0);
    const totalForks = repos.reduce((a, r) => a + r.forks_count, 0);
    const totalIssues = repos.reduce((a, r) => a + r.open_issues_count, 0);
    const langBytes: Record<string, number> = {};
    for (const repo of repos) {
      if (!repo.language) continue;
      langBytes[repo.language] = (langBytes[repo.language] ?? 0) + 1;
    }
    const totalLangs = Object.values(langBytes).reduce((a, b) => a + b, 0);
    const topLanguages: GitHubLanguage[] = Object.entries(langBytes)
      .map(([name, count]) => ({ name, bytes: count, color: LANGUAGE_COLORS[name] ?? "#6b7280" }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 10)
      .map((l) => ({ ...l, bytes: Math.round((l.bytes / totalLangs) * 100) }));
    return { user, repos, totalStars, totalForks, totalIssues, totalPRs, topLanguages, contributionCount };
  }

  async getDashboardData(): Promise<GitHubDashboardData> {
    const [stats, contributionGraph, recentActivity, pinnedRepos] = await Promise.all([
      this.getStats(),
      this.getContributionGraph(),
      this.getRecentActivity(20),
      this.getPinnedRepos(),
    ]);
    const sortedByStars = [...stats.repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
    const recentRepos = stats.repos
      .filter((r) => !r.fork)
      .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
      .slice(0, 10);
    const latestCommits = recentActivity.filter((a) => a.type === "PushEvent").slice(0, 10);
    return {
      user: stats.user,
      repos: stats.repos,
      stats: {
        totalRepos: stats.repos.length,
        totalStars: stats.totalStars,
        totalForks: stats.totalForks,
        totalIssues: stats.totalIssues,
        totalPRs: stats.totalPRs,
        followers: stats.user.followers,
        following: stats.user.following,
        contributionCount: stats.contributionCount,
      },
      recentRepos,
      topRepos: sortedByStars.slice(0, 10),
      languages: stats.topLanguages,
      contributionGraph,
      recentActivity,
      latestCommits,
      pinnedRepos,
    };
  }
}

let instance: GitHubService | null = null;

export function getGitHubService(): GitHubService {
  if (!instance) {
    instance = new GitHubService();
  }
  return instance;
}
