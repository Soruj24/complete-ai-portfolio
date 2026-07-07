"use client";

import { Eye, Download, MessageSquare, GitCommit, BarChart3 } from "lucide-react";
import { StatCard } from "./stat-card";
import { SkeletonCard } from "./skeleton-card";
import { ErrorState } from "./error-state";
import type { CommandCenterStats } from "@/shared/types/command-center";

interface AnalyticsCardsProps {
  stats?: CommandCenterStats;
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
}

const statConfigs = [
  { key: "visitors" as const, title: "Visitors", icon: Eye, color: "blue" },
  { key: "resumeDownloads" as const, title: "Resume Downloads", icon: Download, color: "green" },
  { key: "contactMessages" as const, title: "Contact Messages", icon: MessageSquare, color: "purple" },
  { key: "githubContributions" as const, title: "GitHub Contributions", icon: GitCommit, color: "slate" },
  { key: "projectViews" as const, title: "Project Views", icon: BarChart3, color: "amber" },
];

export function AnalyticsCards({ stats, loading, error, onRetry }: AnalyticsCardsProps) {
  if (error) {
    return <ErrorState onRetry={onRetry} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-text-primary">Portfolio Analytics</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {loading
          ? statConfigs.map((_, i) => <SkeletonCard key={i} />)
          : statConfigs.map((cfg, i) => (
              <StatCard
                key={cfg.key}
                title={cfg.title}
                value={stats?.[cfg.key] ?? 0}
                change={stats ? stats[`${cfg.key}Change` as keyof CommandCenterStats] as number : 0}
                icon={cfg.icon}
                colorClass={cfg.color}
                index={i}
              />
            ))
        }
      </div>
    </div>
  );
}
