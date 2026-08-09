"use client";

import { FolderOpen, CheckCircle2, FileEdit, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { ProjectStats } from "../types";

interface Props {
  stats: ProjectStats;
  loading: boolean;
}

const cards = [
  { key: "total" as const, label: "Total Projects", icon: FolderOpen, color: "text-blue-500", bg: "bg-blue-500/10" },
  { key: "published" as const, label: "Published", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { key: "draft" as const, label: "Drafts", icon: FileEdit, color: "text-amber-500", bg: "bg-amber-500/10" },
  { key: "featured" as const, label: "Featured", icon: Star, color: "text-accent", bg: "bg-accent/10" },
];

export function ProjectsStats({ stats, loading }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((card) => (
        <div
          key={card.key}
          className="flex items-center gap-3 rounded-lg border border-border-subtle bg-surface p-3.5"
        >
          {loading ? (
            <Skeleton className="h-9 w-9 rounded-md" />
          ) : (
            <div className={`flex h-9 w-9 items-center justify-center rounded-md ${card.bg}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">{card.label}</p>
            {loading ? (
              <Skeleton className="h-5 w-12 mt-1" />
            ) : (
              <p className="text-lg font-semibold text-text-primary tabular-nums">{stats[card.key]}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
