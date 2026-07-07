"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Users, Eye, ArrowRight, Clock, Globe } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from "recharts";
import type { TrafficDay, TrafficSource, TopPage, TrafficStats } from "../types";

const DAYS: TrafficDay[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(Date.now() - (29 - i) * 86400000);
  return {
    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    visitors: 200 + Math.floor(Math.random() * 800) + (i > 20 ? 100 : 0),
    pageViews: 400 + Math.floor(Math.random() * 2000) + (i > 20 ? 300 : 0),
    bounceRate: +(30 + Math.random() * 30).toFixed(1),
    avgSessionDuration: Math.floor(120 + Math.random() * 180),
  };
});

const SOURCES: TrafficSource[] = [
  { source: "Organic Search", visitors: 8450, percentage: 38, color: "#3b82f6" },
  { source: "Direct", visitors: 4200, percentage: 19, color: "#10b981" },
  { source: "Social Media", visitors: 3800, percentage: 17, color: "#8b5cf6" },
  { source: "Referral", visitors: 2900, percentage: 13, color: "#f59e0b" },
  { source: "Email", visitors: 1800, percentage: 8, color: "#06b6d4" },
  { source: "Other", visitors: 1100, percentage: 5, color: "#ec4899" },
];

const TOP_PAGES: TopPage[] = [
  { path: "/", title: "Home", views: 42300, avgTime: 185, bounceRate: 32 },
  { path: "/projects", title: "Projects", views: 28900, avgTime: 245, bounceRate: 28 },
  { path: "/blog", title: "Blog", views: 21500, avgTime: 310, bounceRate: 22 },
  { path: "/about", title: "About", views: 12400, avgTime: 175, bounceRate: 38 },
  { path: "/contact", title: "Contact", views: 8900, avgTime: 120, bounceRate: 45 },
  { path: "/admin", title: "Admin", views: 5600, avgTime: 420, bounceRate: 15 },
];

const currentVisitors = DAYS[DAYS.length - 1].visitors;
const prevVisitors = DAYS[DAYS.length - 2].visitors;
const currentPageViews = DAYS[DAYS.length - 1].pageViews;
const prevPageViews = DAYS[DAYS.length - 2].pageViews;

const STATS: TrafficStats = {
  totalVisitors: currentVisitors,
  totalPageViews: currentPageViews,
  avgBounceRate: +(DAYS.reduce((s, d) => s + d.bounceRate, 0) / DAYS.length).toFixed(1),
  avgSessionDuration: Math.floor(DAYS.reduce((s, d) => s + d.avgSessionDuration, 0) / DAYS.length),
  visitorsTrend: +((currentVisitors - prevVisitors) / prevVisitors * 100).toFixed(1),
  pageViewsTrend: +((currentPageViews - prevPageViews) / prevPageViews * 100).toFixed(1),
};

const statCards = [
  { label: "Visitors", value: STATS.totalVisitors.toLocaleString(), trend: STATS.visitorsTrend, icon: Users, format: "number" as const },
  { label: "Page Views", value: STATS.totalPageViews.toLocaleString(), trend: STATS.pageViewsTrend, icon: Eye, format: "number" as const },
  { label: "Bounce Rate", value: `${STATS.avgBounceRate}%`, trend: -2.1, icon: ArrowRight, format: "percent" as const },
  { label: "Avg Session", value: `${Math.floor(STATS.avgSessionDuration / 60)}m ${STATS.avgSessionDuration % 60}s`, trend: 5.3, icon: Clock, format: "time" as const },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return <div className="rounded-lg border border-border-primary bg-surface-primary p-3 text-sm shadow-lg">
    <p className="font-medium text-text-primary">{label}</p>
    {payload.map((p: any) => (
      <p key={p.name} className="text-text-secondary" style={{ color: p.color }}>{p.name}: {p.value.toLocaleString()}</p>
    ))}
  </div>;
};

export function TrafficPage() {
  const [period, setPeriod] = useState<"7d" | "30d">("30d");
  const chartData = useMemo(() => period === "7d" ? DAYS.slice(-7) : DAYS, [period]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Traffic Analytics</h1>
          <p className="text-sm text-text-tertiary">Detailed website traffic data and trends</p>
        </div>
        <div className="flex rounded-lg border border-border-primary p-0.5">
          {["7d", "30d"].map((p) => (
            <button key={p} onClick={() => setPeriod(p as "7d" | "30d")}
              className={`rounded-md px-4 py-1.5 text-xs font-medium transition-colors ${period === p ? "bg-accent text-white" : "text-text-tertiary hover:text-text-primary"}`}>{p}</button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border-primary bg-surface-primary p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-text-tertiary">{s.label}</span>
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${s.trend >= 0 ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}>
                <s.icon size={16} />
              </div>
            </div>
            <p className="text-2xl font-bold text-text-primary">{s.value}</p>
            <div className={`mt-1 flex items-center gap-1 text-xs ${s.trend >= 0 ? "text-success" : "text-error"}`}>
              {s.trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              <span>{Math.abs(s.trend)}% vs previous day</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-border-primary bg-surface-primary p-5">
          <h3 className="mb-4 text-sm font-semibold text-text-primary">Traffic Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="visitorsGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                <linearGradient id="pageViewsGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "var(--text-tertiary)" }} />
              <YAxis tick={{ fontSize: 11, fill: "var(--text-tertiary)" }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="pageViews" stroke="#10b981" fill="url(#pageViewsGrad)" name="Page Views" strokeWidth={2} />
              <Area type="monotone" dataKey="visitors" stroke="#3b82f6" fill="url(#visitorsGrad)" name="Visitors" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-border-primary bg-surface-primary p-5">
          <h3 className="mb-4 text-sm font-semibold text-text-primary">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={SOURCES} dataKey="visitors" nameKey="source" cx="50%" cy="50%" innerRadius={50} outerRadius={90}>
                {SOURCES.map((s) => <Cell key={s.source} fill={s.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {SOURCES.map((s) => (
              <div key={s.source} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-text-secondary">{s.source}</span>
                </div>
                <span className="text-text-primary font-medium">{s.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border-primary bg-surface-primary">
        <div className="border-b border-border-primary px-5 py-3">
          <h3 className="text-sm font-semibold text-text-primary">Top Pages</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-primary text-left text-xs text-text-tertiary">
                <th className="px-5 py-3 font-medium">Page</th>
                <th className="px-5 py-3 font-medium">Path</th>
                <th className="px-5 py-3 font-medium">Views</th>
                <th className="px-5 py-3 font-medium">Avg Time</th>
                <th className="px-5 py-3 font-medium">Bounce Rate</th>
              </tr>
            </thead>
            <tbody>
              {TOP_PAGES.map((p) => (
                <tr key={p.path} className="border-b border-border-primary transition-colors hover:bg-surface-hover">
                  <td className="px-5 py-3 font-medium text-text-primary">{p.title}</td>
                  <td className="px-5 py-3 text-text-secondary font-mono text-xs">{p.path}</td>
                  <td className="px-5 py-3 text-text-secondary">{p.views.toLocaleString()}</td>
                  <td className="px-5 py-3 text-text-secondary">{Math.floor(p.avgTime / 60)}m {p.avgTime % 60}s</td>
                  <td className="px-5 py-3"><span className={`rounded-md px-2 py-0.5 text-xs font-medium ${p.bounceRate > 35 ? "bg-error/10 text-error" : "bg-success/10 text-success"}`}>{p.bounceRate}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
