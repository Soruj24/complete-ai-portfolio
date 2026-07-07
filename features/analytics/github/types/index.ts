export interface GithubRepo {
  id: string;
  name: string;
  stars: number;
  forks: number;
  issues: number;
  language: string;
  description: string;
  updatedAt: string;
}
export interface GithubEvent {
  date: string;
  commits: number;
  stars: number;
  forks: number;
}
