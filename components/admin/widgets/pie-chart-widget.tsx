"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { WidgetShell } from "./widget-shell";
import type { WidgetDataPoint } from "@/types/widgets";

interface PieChartWidgetProps {
  title: string;
  description?: string;
  data: WidgetDataPoint[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  height?: number;
  donut?: boolean;
  showLegend?: boolean;
  colors?: string[];
}

const DEFAULT_COLORS = ["var(--color-accent)", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#ec4899", "#f97316"];

export function PieChartWidget({ title, description, data, loading, error, onRetry, height = 220, donut = true, showLegend = true, colors = DEFAULT_COLORS }: PieChartWidgetProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <WidgetShell title={title} description={description} loading={loading} error={error} onRetry={onRetry}>
      <div className="flex items-start gap-4">
        <div style={{ width: height, height }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={donut ? 45 : 0}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={colors[i % colors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "var(--color-surface)", border: "1px solid var(--color-border-subtle)",
                  borderRadius: "10px", fontSize: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
                formatter={(value: number, name: string) => [`${value.toLocaleString()} (${((value / total) * 100).toFixed(1)}%)`, name]}
              />
              {showLegend && (
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  iconSize={8}
                  formatter={(value: string) => <span style={{ color: "var(--color-text-secondary)", fontSize: 11 }}>{value}</span>}
                />
              )}
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2 pt-2">
          {data.map((d, i) => {
            const pct = ((d.value / total) * 100).toFixed(1);
            return (
              <div key={d.label} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: colors[i % colors.length] }} />
                  <span className="text-text-secondary truncate">{d.label}</span>
                </div>
                <span className="font-medium text-text-primary">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </WidgetShell>
  );
}
