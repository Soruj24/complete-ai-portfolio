import { Octokit } from "octokit";
import { GITHUB_USERNAME } from "@/lib/constants";
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
} from "@/lib/types/github";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  Rust: "#dea584",
  Go: "#00add8",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Dockerfile: "#384d54",
  HCL: "#844FBA",
  Lua: "#000080",
  VimScript: "#199f4b",
  Nix: "#7e7eff",
  Svelte: "#ff3e00",
  Vue: "#41b883",
};

function createOctokit(): Octokit {
  const token = process.env.GITHUB_TOKEN;
  return new Octokit(token ? { auth: token } : {});
}

function toGitHubRepo(repo: Record<string, unknown>): GitHubRepo {
  return {
    id: Number(repo.id),
    name: String(repo.name ?? ""),
    full_name: String(repo.full_name ?? ""),
    html_url: String(repo.html_url ?? ""),
    description: repo.description as string | null,
    fork: Boolean(repo.fork),
    language: repo.language as string | null,
    stargazers_count: Number(repo.stargazers_count ?? 0),
    watchers_count: Number(repo.watchers_count ?? 0),
    forks_count: Number(repo.forks_count ?? 0),
    open_issues_count: Number(repo.open_issues_count ?? 0),
    topics: Array.isArray(repo.topics) ? (repo.topics as string[]) : [],
    created_at: String(repo.created_at ?? ""),
    updated_at: String(repo.updated_at ?? ""),
    pushed_at: String(repo.pushed_at ?? ""),
    size: Number(repo.size ?? 0),
    default_branch: String(repo.default_branch ?? "main"),
    homepage: repo.homepage as string | null,
  };
}

function toGitHubUser(data: Record<string, unknown>): GitHubUser {
  return {
    login: String(data.login ?? ""),
    id: Number(data.id ?? 0),
    avatar_url: String(data.avatar_url ?? ""),
    html_url: String(data.html_url ?? ""),
    name: data.name as string | null,
    company: data.company as string | null,
    blog: data.blog as string | null,
    location: data.location as string | null,
    email: data.email as string | null,
    bio: data.bio as string | null,
    public_repos: Number(data.public_repos ?? 0),
    public_gists: Number(data.public_gists ?? 0),
    followers: Number(data.followers ?? 0),
    following: Number(data.following ?? 0),
    created_at: String(data.created_at ?? ""),
    updated_at: String(data.updated_at ?? ""),
  };
}

export class GitHubService {
  private octokit: Octokit;
  private username: string;

  constructor(username: string = GITHUB_USERNAME) {
    this.octokit = createOctokit();
    this.username = username;
  }

  async getUser(): Promise<GitHubUser> {
    const { data } = await this.octokit.rest.users.getByUsername({
      username: this.username,
    });
    return toGitHubUser(data as Record<string, unknown>);
  }

  async getAllRepos(perPage: number = 100): Promise<GitHubRepo[]> {
    const repos: GitHubRepo[] = [];
    let page = 1;

    while (true) {
      const { data } = await this.octokit.rest.repos.listForUser({
        username: this.username,
        per_page: perPage,
        page,
        sort: "pushed",
        direction: "desc",
      });

      const mapped = data.map((r) => toGitHubRepo(r as unknown as Record<string, unknown>));
      repos.push(...mapped);

      if (data.length < perPage) break;
      page++;
    }

    return repos;
  }

  async getRepoLanguages(repoName: string): Promise<Record<string, number>> {
    const { data } = await this.octokit.rest.repos.listLanguages({
      owner: this.username,
      repo: repoName,
    });
    return data as Record<string, number>;
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
      .map(([name, bytes]) => ({
        name,
        bytes,
        color: LANGUAGE_COLORS[name] ?? "#6b7280",
      }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 10);
  }

  async getContributors(repoName: string): Promise<GitHubContributor[]> {
    const { data } = await this.octokit.rest.repos.listContributors({
      owner: this.username,
      repo: repoName,
      per_page: 10,
    });

    return data.map((c) => ({
      login: String(c.login ?? ""),
      id: Number(c.id ?? 0),
      avatar_url: String(c.avatar_url ?? ""),
      contributions: Number(c.contributions ?? 0),
      html_url: String(c.html_url ?? ""),
    }));
  }

  async getReleases(repoName: string): Promise<GitHubRelease[]> {
    const { data } = await this.octokit.rest.repos.listReleases({
      owner: this.username,
      repo: repoName,
      per_page: 10,
    });

    return data.map((r) => ({
      id: Number(r.id ?? 0),
      tag_name: String(r.tag_name ?? ""),
      name: r.name as string | null,
      body: r.body as string | null,
      draft: Boolean(r.draft),
      prerelease: Boolean(r.prerelease),
      created_at: String(r.created_at ?? ""),
      published_at: String(r.published_at ?? ""),
      html_url: String(r.html_url ?? ""),
    }));
  }

  async getDeployments(repoName: string): Promise<GitHubDeployment[]> {
    const { data } = await this.octokit.rest.repos.listDeployments({
      owner: this.username,
      repo: repoName,
      per_page: 10,
    });

    return data.map((d) => ({
      id: Number(d.id ?? 0),
      sha: String(d.sha ?? ""),
      ref: String(d.ref ?? ""),
      environment: String(d.environment ?? ""),
      state: "active",
      created_at: String(d.created_at ?? ""),
      updated_at: String(d.updated_at ?? ""),
    }));
  }

  async getIssues(repoName: string, state: "open" | "closed" | "all" = "all"): Promise<GitHubIssue[]> {
    const { data } = await this.octokit.rest.issues.listForRepo({
      owner: this.username,
      repo: repoName,
      state,
      per_page: 30,
    });

    return data
      .filter((i) => !i.pull_request)
      .map((i) => ({
        id: Number(i.id ?? 0),
        number: Number(i.number ?? 0),
        title: String(i.title ?? ""),
        state: i.state as "open" | "closed",
        html_url: String(i.html_url ?? ""),
        created_at: String(i.created_at ?? ""),
        updated_at: String(i.updated_at ?? ""),
        labels: (i.labels as Array<{ name: string; color: string }>).map((l) => ({
          name: String(l.name ?? ""),
          color: String(l.color ?? ""),
        })),
      }));
  }

  async getPullRequests(repoName: string, state: "open" | "closed" | "all" = "all"): Promise<GitHubPullRequest[]> {
    const { data } = await this.octokit.rest.pulls.list({
      owner: this.username,
      repo: repoName,
      state,
      per_page: 30,
    });

    return data.map((pr) => ({
      id: Number(pr.id ?? 0),
      number: Number(pr.number ?? 0),
      title: String(pr.title ?? ""),
      state: pr.state as "open" | "closed",
      html_url: String(pr.html_url ?? ""),
      created_at: String(pr.created_at ?? ""),
      updated_at: String(pr.updated_at ?? ""),
      merged_at: pr.merged_at as string | null,
      head: { ref: String(pr.head?.ref ?? "") },
      base: { ref: String(pr.base?.ref ?? "") },
    }));
  }

  async getTraffic(repoName: string): Promise<{
    views: GitHubTraffic;
    clones: GitHubTraffic;
    referrers: GitHubTrafficReferrer[];
    popular: GitHubTrafficPopularity[];
  }> {
    const [viewsRes, clonesRes, referrersRes, popularRes] = await Promise.allSettled([
      this.octokit.request("GET /repos/{owner}/{repo}/traffic/views", {
        owner: this.username,
        repo: repoName,
      }),
      this.octokit.request("GET /repos/{owner}/{repo}/traffic/clones", {
        owner: this.username,
        repo: repoName,
      }),
      this.octokit.request("GET /repos/{owner}/{repo}/traffic/popular/referrers", {
        owner: this.username,
        repo: repoName,
      }),
      this.octokit.request("GET /repos/{owner}/{repo}/traffic/popular/paths", {
        owner: this.username,
        repo: repoName,
      }),
    ]);

    const views = viewsRes.status === "fulfilled" ? viewsRes.value.data : { count: 0, uniques: 0 };
    const clones = clonesRes.status === "fulfilled" ? clonesRes.value.data : { count: 0, uniques: 0 };
    const referrers = referrersRes.status === "fulfilled" ? referrersRes.value.data : [];
    const popular = popularRes.status === "fulfilled" ? popularRes.value.data : [];

    return {
      views: { count: Number(views.count ?? 0), uniques: Number(views.uniques ?? 0) },
      clones: { count: Number(clones.count ?? 0), uniques: Number(clones.uniques ?? 0) },
      referrers: referrers.map((r) => ({
        referrer: String(r.referrer ?? ""),
        count: Number(r.count ?? 0),
        uniques: Number(r.uniques ?? 0),
      })),
      popular: popular.map((p) => ({
        path: String(p.path ?? ""),
        title: String(p.title ?? ""),
        count: Number(p.count ?? 0),
        uniques: Number(p.uniques ?? 0),
      })),
    };
  }

  async getContributionCount(): Promise<number> {
    try {
      const query = `query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
          }
        }
      }`;

      const data = await this.octokit.graphql<{ user: { contributionsCollection: { contributionCalendar: { totalContributions: number } } } }>(query, {
        username: this.username,
      });

      return data.user.contributionsCollection.contributionCalendar.totalContributions;
    } catch {
      return 0;
    }
  }

  async getStats(): Promise<GitHubStats> {
    const [user, repos, contributionCount] = await Promise.all([
      this.getUser(),
      this.getAllRepos(),
      this.getContributionCount(),
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
      .map(([name, count]) => ({
        name,
        bytes: count,
        color: LANGUAGE_COLORS[name] ?? "#6b7280",
      }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 10)
      .map((l) => ({ ...l, bytes: Math.round((l.bytes / totalLangs) * 100) }));

    return { user, repos, totalStars, totalForks, totalIssues, topLanguages, contributionCount };
  }

  async getDashboardData(): Promise<GitHubDashboardData> {
    const stats = await this.getStats();

    const sortedByStars = [...stats.repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
    const recentRepos = stats.repos
      .filter((r) => !r.fork)
      .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
      .slice(0, 10);

    return {
      user: stats.user,
      repos: stats.repos,
      stats: {
        totalRepos: stats.repos.length,
        totalStars: stats.totalStars,
        totalForks: stats.totalForks,
        totalIssues: stats.totalIssues,
        totalPRs: 0,
        followers: stats.user.followers,
        following: stats.user.following,
        contributionCount: stats.contributionCount,
      },
      recentRepos,
      topRepos: sortedByStars.slice(0, 10),
      languages: stats.topLanguages,
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
