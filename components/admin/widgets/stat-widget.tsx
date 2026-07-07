"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Users, Eye, Download, ExternalLink, MessageSquare, Mail, BookOpen, RefreshCw, Globe, UserPlus, FolderKanban } from "lucide-react";
import { cn } from "@/lib/utils";
import { WidgetShell } from "./widget-shell";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import type { TimeSeriesPoint } from "@/types/widgets";

const iconMap: Record<string, React.ElementType> = {
  users: Users, eye: Eye, download: Download, external: ExternalLink,
  message: MessageSquare, mail: Mail, book: BookOpen, refresh: RefreshCw,
  globe: Globe, userPlus: UserPlus, folder: FolderKanban,
};

interface StatWidgetProps {
  title: string;
  value: string | number;
  trend: number;
  trendLabel: string;
  comparison: string;
  icon: string;
  chart?: TimeSeriesPoint[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  format?: (v: number) => string;
}

export function StatWidget({ title, value, trend, trendLabel, comparison, icon, chart, loading, error, onRetry, format }: StatWidgetProps) {
  const Icon = iconMap[icon] || Users;
  const isPositive = trend > 0;
  const isNeutral = trend === 0;

  return (
    <WidgetShell title={title} loading={loading} error={error} onRetry={onRetry} className="group">
      <div className="flex items-start justify-between mb-3">
        <div className="space-y-1">
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight block"
          >
            {format && typeof value === "number" ? format(value) : value}
          </motion.span>
          <div className="flex items-center gap-2 text-[11px]">
            <span className={cn(
              "inline-flex items-center gap-0.5 font-semibold rounded-full px-1.5 py-0.5",
              isPositive ? "text-success bg-success/10" : isNeutral ? "text-text-tertiary bg-surface-hover" : "text-error bg-error/10",
            )}>
              {isPositive ? <TrendingUp className="h-3 w-3" /> : isNeutral ? <Minus className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {Math.abs(trend)}%
            </span>
            <span className="text-text-tertiary">{trendLabel}</span>
          </div>
        </div>
        <div className="p-2.5 rounded-lg bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors">
          <Icon className="h-4 w-4" />
        </div>
      </div>

      {chart && chart.length > 0 && (
        <div className="h-12 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chart} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={`gradient-${title.replace(/\s+/g, "-")}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip
                contentStyle={{ background: "var(--color-surface)", border: "1px solid var(--color-border-subtle)", borderRadius: "8px", fontSize: "11px" }}
                labelStyle={{ color: "var(--color-text-secondary)" }}
              />
              <Area type="monotone" dataKey="value" stroke="var(--color-accent)" strokeWidth={2} fill={`url(#gradient-${title.replace(/\s+/g, "-")})`} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      <p className="text-[10px] text-text-tertiary mt-2">{comparison}</p>
    </WidgetShell>
  );
}
