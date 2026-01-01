"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ActivityChartProps {
  data: { date: string; count: number }[];
}

export function ActivityChart({ data }: ActivityChartProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // SSR guard: mark component as mounted on the client
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card className="border-none shadow-xl shadow-gray-200/50 dark:shadow-none dark:bg-slate-900/50 rounded-[32px] overflow-hidden">
        <div className="h-[400px] w-full animate-pulse bg-gray-100 dark:bg-slate-800" />
      </Card>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Card className="border-none shadow-xl shadow-gray-200/50 dark:shadow-none dark:bg-slate-900/50 dark:border dark:border-slate-800 rounded-[24px] md:rounded-[32px] overflow-hidden transition-all duration-300">
      <CardHeader className="bg-white dark:bg-slate-900/80 border-b border-gray-100 dark:border-slate-800 py-3 md:py-6 px-4 md:px-8">
        <div className="flex items-center gap-2.5 md:gap-3">
          <div className="p-1.5 md:p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg md:rounded-xl">
            <Activity className="h-3.5 w-3.5 md:h-5 md:w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-base md:text-xl font-black text-gray-900 dark:text-white">User Activity</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-2 md:p-8 h-[200px] sm:h-[250px] md:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={isDark ? 0.3 : 0.1} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke={isDark ? "#1e293b" : "#f1f5f9"} 
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: isDark ? "#64748b" : "#94a3b8", fontSize: 10 }}
              minTickGap={30}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: isDark ? "#64748b" : "#94a3b8", fontSize: 10 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#0f172a" : "#ffffff",
                borderRadius: "12px",
                border: isDark ? "1px solid #1e293b" : "none",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                padding: "8px 12px",
              }}
              itemStyle={{
                color: isDark ? "#f8fafc" : "#1e293b",
                fontSize: "12px",
                fontWeight: "bold",
              }}
              labelStyle={{
                color: isDark ? "#64748b" : "#94a3b8",
                fontSize: "10px",
                marginBottom: "4px",
                textTransform: "uppercase",
                fontWeight: "black",
              }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
