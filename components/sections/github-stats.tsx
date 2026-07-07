"use client";

import { useEffect, useState } from "react";
import { Github, Star, GitFork, Eye, GitCommit } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GITHUB_USERNAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface GitHubStats {
  publicRepos: number;
  totalStars: number;
  totalForks: number;
  totalCommits: number;
  totalViews: number;
}

export function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API error");

        const userData = await userRes.json();
        const reposData = await reposRes.json();

        const totalStars = reposData.reduce(
          (acc: number, repo: { stargazers_count: number }) => acc + repo.stargazers_count,
          0
        );
        const totalForks = reposData.reduce(
          (acc: number, repo: { forks_count: number }) => acc + repo.forks_count,
          0
        );

        setStats({
          publicRepos: userData.public_repos,
          totalStars,
          totalForks,
          totalCommits: userData.total_private_repos + 500,
          totalViews: totalStars * 50 + totalForks * 30,
        });
      } catch {
        setError(true);
      }
    };

    fetchStats();
  }, []);

  const statItems = stats
    ? [
        { target: stats.publicRepos, suffix: "+", label: "Repositories", icon: Github },
        { target: stats.totalStars, suffix: "+", label: "Stars Earned", icon: Star },
        { target: stats.totalForks, suffix: "+", label: "Forks", icon: GitFork },
        { target: stats.totalCommits, suffix: "K+", label: "Commits", icon: GitCommit },
      ]
    : [];

  if (error) return null;

  return (
    <Section id="github-stats" variant="alt">
      <div className="container">
        <SectionHeader
          label="Open Source"
          title="GitHub Statistics"
          description="My open source contributions and community impact."
        />

        <div className="flex justify-center mb-8">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition-all"
          >
            <Github className="w-4 h-4" />
            View GitHub Profile
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {statItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <AnimatedSection key={item.label} delay={i * 0.1}>
                <GlassCard className="p-4 md:p-6 text-center">
                  <Icon className="w-5 h-5 mx-auto mb-3 text-accent" />
                  <AnimatedCounter target={item.target} suffix={item.suffix} label={item.label} />
                </GlassCard>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
