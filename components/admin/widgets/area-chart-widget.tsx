"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { WidgetShell } from "./widget-shell";
import { cn } from "@/lib/utils";
import type { TimeSeriesPoint } from "@/types/widgets";

interface AreaChartWidgetProps {
  title: string;
  description?: string;
  data: TimeSeriesPoint[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  trend?: number;
  trendLabel?: string;
  color?: string;
  height?: number;
  gradientId?: string;
}

export function AreaChartWidget({ title, description, data, loading, error, onRetry, trend, trendLabel, color, height = 200, gradientId = "area-gradient" }: AreaChartWidgetProps) {
  const trendColor = color || "var(--color-accent)";
  const isPositive = trend !== undefined && trend >= 0;

  return (
    <WidgetShell title={title} description={description} loading={loading} error={error} onRetry={onRetry}>
      {trend !== undefined && (
        <div className="flex items-center gap-2 mb-3">
          <span className={cn("text-lg font-bold", isPositive ? "text-success" : "text-error")}>
            {isPositive ? "+" : ""}{trend}%
          </span>
          {trendLabel && <span className="text-[11px] text-text-tertiary">{trendLabel}</span>}
        </div>
      )}
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={trendColor} stopOpacity={0.25} />
                <stop offset="100%" stopColor={trendColor} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
            <YAxis tick={{ fontSize: 10, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "var(--color-surface)", border: "1px solid var(--color-border-subtle)",
                borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", fontSize: "12px",
              }}
              labelStyle={{ color: "var(--color-text-secondary)", fontWeight: 600, marginBottom: 4 }}
            />
            <Area type="monotone" dataKey="value" stroke={trendColor} strokeWidth={2.5} fill={`url(#${gradientId})`} dot={false} activeDot={{ r: 4, fill: trendColor, stroke: "var(--color-background)", strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </WidgetShell>
  );
}
