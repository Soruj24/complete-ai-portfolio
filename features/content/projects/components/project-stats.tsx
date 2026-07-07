"use client";

import { motion } from "framer-motion";
import { FolderOpen, CheckCircle2, Clock, Trash2, Star, Eye, Clock4, BarChart3 } from "lucide-react";
import type { ProjectStats } from "../types";

interface Props {
  stats: ProjectStats | null;
  loading: boolean;
}

const statCards = [
  { key: "total", label: "Total Projects", icon: FolderOpen, color: "text-accent" },
  { key: "published", label: "Published", icon: CheckCircle2, color: "text-success" },
  { key: "inProgress", label: "In Progress", icon: Clock, color: "text-warning" },
  { key: "archived", label: "Archived", icon: Trash2, color: "text-error" },
  { key: "featured", label: "Featured", icon: Star, color: "text-accent" },
  { key: "totalViews", label: "Total Views", icon: Eye, color: "text-success" },
  { key: "totalHours", label: "Hours Spent", icon: Clock4, color: "text-warning" },
  { key: "avgRating", label: "Avg Rating", icon: BarChart3, color: "text-error" },
];

export function ProjectStats({ stats, loading }: Props) {
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.slice(0, 4).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl bg-surface-hover" />
        ))}
      </div>
    );
  }

  const values = stats ? [
    stats.total, stats.published, stats.inProgress, stats.archived,
    stats.featured, stats.totalViews.toLocaleString(), stats.totalHours.toLocaleString(), stats.avgRating.toFixed(1),
  ] : [];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((s, i) => (
        <motion.div
          key={s.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
          className="flex items-center gap-4 rounded-xl border border-border-primary bg-surface-primary p-4"
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-surface-hover ${s.color}`}>
            <s.icon size={20} />
          </div>
          <div>
            <p className="text-sm text-text-tertiary">{s.label}</p>
            <p className="text-xl font-semibold text-text-primary">{values[i] ?? "--"}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
