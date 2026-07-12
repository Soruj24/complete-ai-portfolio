export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  language: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  default_branch: string;
  homepage: string | null;
}

export interface GitHubCommitActivity {
  total: number;
  week: number;
  days: number[];
}

export interface GitHubContributionsCollection {
  totalCommitContributions: number;
  totalIssueContributions: number;
  totalPullRequestContributions: number;
  totalPullRequestReviewContributions: number;
  contributionCalendar: {
    totalContributions: number;
    weeks: GitHubContributionWeek[];
  };
}

export interface GitHubContributionWeek {
  firstDay: string;
  contributionDays: Array<{
    date: string;
    contributionCount: number;
    color: string;
  }>;
}

export interface GitHubTraffic {
  count: number;
  uniques: number;
}

export interface GitHubTrafficReferrer {
  referrer: string;
  count: number;
  uniques: number;
}

export interface GitHubTrafficPopularity {
  path: string;
  title: string;
  count: number;
  uniques: number;
}

export interface GitHubContributor {
  login: string;
  id: number;
  avatar_url: string;
  contributions: number;
  html_url: string;
}

export interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string | null;
  body: string | null;
  draft: boolean;
  prerelease: boolean;
  created_at: string;
  published_at: string;
  html_url: string;
}

export interface GitHubDeployment {
  id: number;
  sha: string;
  ref: string;
  environment: string;
  state: string;
  created_at: string;
  updated_at: string;
}

export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  state: "open" | "closed";
  html_url: string;
  created_at: string;
  updated_at: string;
  labels: Array<{ name: string; color: string }>;
}

export interface GitHubPullRequest {
  id: number;
  number: number;
  title: string;
  state: "open" | "closed";
  html_url: string;
  created_at: string;
  updated_at: string;
  merged_at: string | null;
  head: { ref: string };
  base: { ref: string };
}

export interface GitHubLanguage {
  name: string;
  bytes: number;
  color: string | null;
}

export interface GitHubStats {
  user: GitHubUser;
  repos: GitHubRepo[];
  totalStars: number;
  totalForks: number;
  totalIssues: number;
  totalPRs: number;
  topLanguages: GitHubLanguage[];
  contributionCount: number;
}

export interface GitHubActivity {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: Record<string, unknown>;
}

export interface GitHubPinnedRepo {
  id: string;
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  language: { name: string; color: string | null } | null;
  languages: string[];
}

export interface GitHubDashboardData {
  user: GitHubUser;
  repos: GitHubRepo[];
  stats: {
    totalRepos: number;
    totalStars: number;
    totalForks: number;
    totalIssues: number;
    totalPRs: number;
    followers: number;
    following: number;
    contributionCount: number;
  };
  recentRepos: GitHubRepo[];
  topRepos: GitHubRepo[];
  languages: GitHubLanguage[];
  contributionGraph: GitHubContributionWeek[];
  recentActivity: GitHubActivity[];
  latestCommits: GitHubActivity[];
  pinnedRepos: GitHubPinnedRepo[];
}
