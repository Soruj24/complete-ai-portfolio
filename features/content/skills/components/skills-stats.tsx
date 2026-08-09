"use client";

import { Code2, BarChart3, Star, ToggleLeft } from "lucide-react";

interface Stats {
  total: number;
  enabled: number;
  featured: number;
  categories: number;
}

export function SkillsStats({ stats }: { stats: Stats }) {
  const items = [
    { label: "Total", value: stats.total, icon: Code2 },
    { label: "Enabled", value: stats.enabled, icon: ToggleLeft },
    { label: "Featured", value: stats.featured, icon: Star },
    { label: "Categories", value: stats.categories, icon: BarChart3 },
  ];

  return (
    <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="flex items-center gap-3 rounded-lg border border-border-subtle bg-surface p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent/10 text-accent">
            <s.icon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[11px] text-text-tertiary">{s.label}</p>
            <p className="text-[15px] font-semibold text-text-primary tabular-nums">{s.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
