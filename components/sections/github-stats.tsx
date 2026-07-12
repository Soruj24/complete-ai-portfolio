"use client";

import { useEffect, useState } from "react";
import { Github, Star, GitFork, Users, UserPlus, GitCommit } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GITHUB_USERNAME } from "@/lib/constants";
import type { GitHubDashboardData } from "@/lib/types/github";

export function GitHubStats() {
  const [data, setData] = useState<GitHubDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/github/stats");
        if (!res.ok) throw new Error("Failed to fetch GitHub stats");
        const json = await res.json();
        if (!json.success) throw new Error(json.error);
        setData(json.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (error) return null;
  if (loading || !data) {
    return (
      <Section id="github-stats" variant="alt">
        <div className="container">
          <SectionHeader
            label="Open Source"
            title="GitHub Statistics"
            description="My open source contributions and community impact."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <GlassCard key={i} className="p-4 md:p-6 text-center">
                <div className="w-5 h-5 mx-auto mb-3 rounded bg-muted animate-pulse" />
                <div className="w-16 h-6 mx-auto mb-1 rounded bg-muted animate-pulse" />
                <div className="w-12 h-3 mx-auto rounded bg-muted animate-pulse" />
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>
    );
  }

  const { stats } = data;

  const statItems = [
    { target: stats.totalRepos, label: "Repositories", icon: Github },
    { target: stats.totalStars, label: "Stars", icon: Star },
    { target: stats.totalForks, label: "Forks", icon: GitFork },
    { target: stats.followers, label: "Followers", icon: Users },
    { target: stats.following, label: "Following", icon: UserPlus },
    { target: stats.contributionCount, label: "Contributions", icon: GitCommit },
  ];

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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {statItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <AnimatedSection key={item.label} delay={i * 0.1}>
                <GlassCard className="p-4 md:p-6 text-center">
                  <Icon className="w-5 h-5 mx-auto mb-3 text-accent" />
                  <AnimatedCounter target={item.target} suffix="+" label={item.label} />
                </GlassCard>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
