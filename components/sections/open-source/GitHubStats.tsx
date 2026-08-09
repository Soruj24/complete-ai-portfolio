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
      <Section id="github-stats">
        <div className="container">
          <SectionHeader
            label="Open Source"
            title="GitHub Statistics"
            description="My open source contributions and community impact."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <GlassCard key={i} className="p-4 text-center">
                <div className="w-4 h-4 mx-auto mb-2 rounded bg-surface animate-pulse" />
                <div className="w-12 h-5 mx-auto mb-1 rounded bg-surface animate-pulse" />
                <div className="w-10 h-2.5 mx-auto rounded bg-surface animate-pulse" />
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
    <Section id="github-stats">
      <div className="container">
        <SectionHeader
          label="Open Source"
          title="GitHub Statistics"
          description="My open source contributions and community impact."
        />

        <div className="flex justify-center mb-6">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground font-medium text-[13px] hover:brightness-110 transition-all duration-200"
          >
            <Github className="w-3.5 h-3.5" />
            View GitHub Profile
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {statItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <AnimatedSection key={item.label} delay={i * 0.08}>
                <GlassCard className="p-4 text-center">
                  <Icon className="w-4 h-4 mx-auto mb-2 text-accent" />
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
