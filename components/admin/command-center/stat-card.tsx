"use client";

import { motion } from "framer-motion";
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

const colorMap: Record<string, { bg: string; text: string; ring: string }> = {
  blue: { bg: "bg-blue-500/10", text: "text-blue-500", ring: "ring-blue-500/20" },
  green: { bg: "bg-emerald-500/10", text: "text-emerald-500", ring: "ring-emerald-500/20" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-500", ring: "ring-purple-500/20" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-500", ring: "ring-amber-500/20" },
  slate: { bg: "bg-slate-500/10", text: "text-slate-500", ring: "ring-slate-500/20" },
};

export function StatCard({ title, value, change, icon: Icon, colorClass, index = 0 }: StatCardProps) {
  const colors = colorMap[colorClass] || colorMap.blue;
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
      className="group relative rounded-xl border border-border-subtle bg-surface p-5 hover:shadow-md hover:border-border transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-tertiary uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-text-primary tabular-nums">{value}</p>
          <div className="flex items-center gap-1.5">
            <span className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold",
              isPositive ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500",
            )}>
              {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {Math.abs(change).toFixed(1)}%
            </span>
            <span className="text-[11px] text-text-tertiary">vs last month</span>
          </div>
        </div>
        <div className={cn(
          "flex h-10 w-10 items-center justify-center rounded-lg ring-1 transition-colors group-hover:ring-2",
          colors.bg, colors.text, colors.ring,
        )}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}
