"use client";

import { useEffect, useState } from "react";
import {
  Github,
  Star,
  GitFork,
  Users,
  GitCommit,
  ArrowUpRight,
  Loader2,
  BookOpen,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GITHUB_USERNAME } from "@/lib/constants";
import type { GitHubDashboardData } from "@/lib/types/github";

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Vue: "#41b883",
  Svelte: "#ff3e00",
};

function StatCard({ icon: Icon, value, label }: { icon: React.ElementType; value: number; label: string }) {
  return (
    <div className="p-4 rounded-xl bg-surface border border-border-subtle text-center">
      <Icon className="w-4 h-4 mx-auto mb-2 text-accent" aria-hidden="true" />
      <div className="text-[20px] font-bold text-text-primary tabular-nums">
        {value.toLocaleString()}
      </div>
      <div className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider mt-0.5">
        {label}
      </div>
    </div>
  );
}

function LanguageBar({ languages }: { languages: { name: string; bytes: number; color: string | null }[] }) {
  const total = languages.reduce((sum, l) => sum + l.bytes, 0);
  if (total === 0) return null;

  return (
    <div className="space-y-3">
      {/* Bar */}
      <div className="flex h-2 rounded-full overflow-hidden bg-surface" role="img" aria-label="Language distribution">
        {languages.map((lang) => {
          const pct = (lang.bytes / total) * 100;
          if (pct < 1) return null;
          return (
            <div
              key={lang.name}
              className="h-full first:rounded-l-full last:rounded-r-full"
              style={{
                width: `${pct}%`,
                backgroundColor: lang.color || LANG_COLORS[lang.name] || "#6e7681",
              }}
              title={`${lang.name}: ${pct.toFixed(1)}%`}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        {languages.map((lang) => {
          const pct = (lang.bytes / total) * 100;
          if (pct < 1) return null;
          return (
            <div key={lang.name} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: lang.color || LANG_COLORS[lang.name] || "#6e7681" }}
              />
              <span className="text-[11.5px] text-text-secondary">{lang.name}</span>
              <span className="text-[10.5px] text-text-tertiary tabular-nums">{pct.toFixed(0)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RepoCard({ repo }: { repo: { name: string; html_url: string; description: string | null; language: string | null; stargazers_count: number; forks_count: number; topics?: string[]; pushed_at?: string } }) {
  const timeAgo = repo.pushed_at
    ? (() => {
        const diff = Date.now() - new Date(repo.pushed_at).getTime();
        const days = Math.floor(diff / 86400000);
        if (days === 0) return "today";
        if (days === 1) return "yesterday";
        if (days < 30) return `${days}d ago`;
        if (days < 365) return `${Math.floor(days / 30)}mo ago`;
        return `${Math.floor(days / 365)}y ago`;
      })()
    : null;

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-4 rounded-xl bg-surface border border-border-subtle hover:border-border transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <Github className="w-3.5 h-3.5 text-text-tertiary shrink-0" aria-hidden="true" />
          <h3 className="text-[13px] font-semibold text-text-primary truncate group-hover:text-accent transition-colors duration-200">
            {repo.name}
          </h3>
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 text-text-tertiary group-hover:text-accent transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
      </div>

      <p className="text-[11.5px] text-text-secondary line-clamp-2 leading-relaxed mb-3">
        {repo.description || "No description provided."}
      </p>

      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {repo.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="px-1.5 py-0.5 text-[9.5px] font-medium rounded-md bg-accent/8 text-accent border border-accent/15"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 text-[11px] text-text-tertiary">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: LANG_COLORS[repo.language] || "#6e7681" }}
            />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3" aria-hidden="true" />
            {repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1">
            <GitFork className="w-3 h-3" aria-hidden="true" />
            {repo.forks_count}
          </span>
        )}
        {timeAgo && (
          <span className="ml-auto tabular-nums">{timeAgo}</span>
        )}
      </div>
    </a>
  );
}

export function OpenSource() {
  const [data, setData] = useState<GitHubDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/github/stats")
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((json) => {
        if (json.success) setData(json.data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (error || (!loading && !data)) return null;

  const stats = data?.stats;
  const languages = data?.languages || [];
  const repos = data?.recentRepos || data?.repos?.slice(0, 6) || [];

  return (
    <Section id="opensource">
      <div className="container">
        <SectionHeader
          label="Open Source"
          title="GitHub Activity"
          description="Real-time data from my GitHub profile. Repositories, contributions, and languages."
        />

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-5 h-5 animate-spin text-text-tertiary" role="status" aria-label="Loading GitHub data" />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Profile + Stats */}
            {data?.user && (
              <AnimatedSection>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-surface border border-border-subtle">
                  <img
                    src={data.user.avatar_url}
                    alt={data.user.login}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-border-subtle shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-[14px] sm:text-[15px] font-semibold text-text-primary">
                        {data.user.name || data.user.login}
                      </h3>
                      <a
                        href={data.user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] sm:text-[12px] text-text-tertiary hover:text-accent transition-colors"
                      >
                        @{data.user.login}
                      </a>
                    </div>
                    {data.user.bio && (
                      <p className="text-[12px] sm:text-[12.5px] text-text-secondary mt-0.5 line-clamp-1">
                        {data.user.bio}
                      </p>
                    )}
                  </div>
                  <a
                    href={data.user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-accent-foreground text-[13px] font-medium hover:brightness-110 transition-all shrink-0 min-h-[44px]"
                  >
                    <Github className="w-3.5 h-3.5" aria-hidden="true" />
                    View GitHub Profile
                  </a>
                </div>
              </AnimatedSection>
            )}

            {/* Stats Grid */}
            {stats && (
              <AnimatedSection delay={0.05}>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                  <StatCard icon={BookOpen} value={stats.totalRepos} label="Repos" />
                  <StatCard icon={Star} value={stats.totalStars} label="Stars" />
                  <StatCard icon={GitFork} value={stats.totalForks} label="Forks" />
                  <StatCard icon={Users} value={stats.followers} label="Followers" />
                  <StatCard icon={GitCommit} value={stats.contributionCount} label="Contributions" />
                  <StatCard icon={ArrowUpRight} value={stats.following} label="Following" />
                </div>
              </AnimatedSection>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <AnimatedSection delay={0.1}>
                <div className="p-5 rounded-2xl bg-surface border border-border-subtle">
                  <h3 className="text-[13px] font-semibold text-text-primary mb-4">
                    Top Languages
                  </h3>
                  <LanguageBar languages={languages.slice(0, 8)} />
                </div>
              </AnimatedSection>
            )}

            {/* Repositories */}
            {repos.length > 0 && (
              <AnimatedSection delay={0.15}>
                <div>
                  <h3 className="text-[13px] font-semibold text-text-primary mb-4">
                    Recent Repositories
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {repos.map((repo) => (
                      <RepoCard key={repo.id} repo={repo} />
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* Fallback CTA if no user data but we have repos */}
            {!data?.user && repos.length > 0 && (
              <AnimatedSection delay={0.2}>
                <div className="text-center">
                  <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border-subtle text-text-secondary text-[13px] font-medium hover:bg-surface hover:text-text-primary hover:border-border transition-all"
                  >
                    <Github className="w-4 h-4" aria-hidden="true" />
                    View GitHub Profile
                  </a>
                </div>
              </AnimatedSection>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}
