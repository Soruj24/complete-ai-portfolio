"use client";

import { motion } from "framer-motion";
import { STAT_CARDS } from "../constants";
import type { BlogStats } from "../types";

interface Props { stats: BlogStats | null; loading: boolean; }

export function BlogStats({ stats, loading }: Props) {
  if (loading) {
    return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
      {STAT_CARDS.map((_, i) => <div key={i} className="h-24 animate-pulse rounded-xl bg-surface-hover" />)}
    </div>;
  }
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
    {STAT_CARDS.map((s, i) => (
      <motion.div key={s.key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
        className="rounded-xl border border-border-primary bg-surface-primary p-4"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-hover text-accent">
            <s.icon size={18} />
          </div>
          <div>
            <p className="text-xs text-text-tertiary">{s.label}</p>
            <p className="text-lg font-semibold text-text-primary">{stats ? stats[s.key as keyof BlogStats] : "--"}</p>
          </div>
        </div>
      </motion.div>
    ))}
  </div>;
}
