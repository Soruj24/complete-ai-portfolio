"use client";

import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  colorClass: string;
  index?: number;
}

const colorMap: Record<string, { bg: string; text: string }> = {
  blue: { bg: "bg-blue-500/10", text: "text-blue-500" },
  green: { bg: "bg-emerald-500/10", text: "text-emerald-500" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-500" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-500" },
  slate: { bg: "bg-slate-500/10", text: "text-slate-500" },
};

export function StatCard({ title, value, change, icon: Icon, colorClass }: StatCardProps) {
  const colors = colorMap[colorClass] || colorMap.blue;
  const isPositive = change >= 0;

  return (
    <div className="group rounded-lg border border-border-subtle bg-surface p-4 hover:border-border transition-colors">
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">{title}</p>
          <p className="text-xl font-bold text-text-primary tabular-nums">{value}</p>
          <div className="flex items-center gap-1">
            <span className={cn(
              "inline-flex items-center gap-0.5 rounded text-[10px] font-semibold",
              isPositive ? "text-emerald-500" : "text-red-500",
            )}>
              {isPositive ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
              {Math.abs(change).toFixed(1)}%
            </span>
            <span className="text-[10px] text-text-tertiary">vs last month</span>
          </div>
        </div>
        <div className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
          colors.bg, colors.text,
        )}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
