"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

interface ActivityDataPoint {
  date: string;
  count: number;
}

interface Props {
  data: ActivityDataPoint[];
}

export function ActivityChart({ data }: Props) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <Card className="border border-border-subtle shadow-none rounded-xl bg-surface">
        <CardContent className="p-6">
          <div className="h-[300px] shimmer rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  const isDark = theme === "dark";
  const accent = isDark ? "var(--accent)" : "var(--accent)";
  const textSecondary = isDark ? "var(--text-tertiary)" : "var(--text-tertiary)";
  const surface = isDark ? "var(--surface)" : "var(--surface)";

  return (
    <Card className="border border-border-subtle shadow-none rounded-xl bg-surface">
      <CardHeader className="pb-4 px-6 pt-6">
        <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
          <Activity className="h-4 w-4 text-text-tertiary" />
          Activity Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 pb-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.length > 0 ? data : [{ date: "No data", count: 0 }]} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: "var(--text-tertiary)", fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fill: "var(--text-tertiary)", fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "var(--text-primary)",
                }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="var(--accent)"
                strokeWidth={2}
                fill="url(#activityGradient)"
                dot={false}
                activeDot={{ r: 4, stroke: "var(--accent)", strokeWidth: 2, fill: "var(--background)" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
