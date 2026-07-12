"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Users, Eye, ArrowRight, Clock, Globe, Loader2 } from "lucide-react";
import { AreaChart, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from "recharts";

interface TrafficDay {
  date: string;
  visitors: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
}

interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
  color: string;
}

interface TopPage {
  path: string;
  title: string;
  views: number;
  avgTime: number;
  bounceRate: number;
}

interface TrafficResponse {
  daily: TrafficDay[];
  stats: {
    totalVisitors: number;
    totalPageViews: number;
    avgBounceRate: number;
    avgSessionDuration: number;
    visitorsTrend: number;
    pageViewsTrend: number;
  };
  sources: TrafficSource[];
  topPages: TopPage[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border-primary bg-surface-primary p-3 text-sm shadow-lg">
      <p className="font-medium text-text-primary">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="text-text-secondary" style={{ color: p.color }}>{p.name}: {p.value.toLocaleString()}</p>
      ))}
    </div>
  );
};

export function TrafficPage() {
  const [data, setData] = useState<TrafficResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"7d" | "30d">("30d");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/analytics/traffic?days=30");
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch {
        //
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartData = useMemo(() => {
    if (!data) return [];
    return period === "7d" ? data.daily.slice(-7) : data.daily;
  }, [period, data]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 size={24} className="animate-spin text-accent" />
      </div>
    );
  }

  if (!data || data.daily.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Traffic Analytics</h1>
            <p className="text-sm text-text-tertiary">Detailed website traffic data and trends</p>
          </div>
        </div>
        <div className="flex h-64 items-center justify-center rounded-xl border border-border-primary bg-surface-primary">
          <p className="text-sm text-text-tertiary">No traffic data available</p>
        </div>
      </div>
    );
  }

  const { stats, sources, topPages } = data;

  const statCards = [
    { label: "Visitors", value: stats.totalVisitors.toLocaleString(), trend: stats.visitorsTrend, icon: Users },
    { label: "Page Views", value: stats.totalPageViews.toLocaleString(), trend: stats.pageViewsTrend, icon: Eye },
    { label: "Bounce Rate", value: stats.avgBounceRate > 0 ? `${stats.avgBounceRate}%` : "--", trend: 0, icon: ArrowRight },
    { label: "Avg Session", value: stats.avgSessionDuration > 0 ? `${Math.floor(stats.avgSessionDuration / 60)}m ${stats.avgSessionDuration % 60}s` : "--", trend: 0, icon: Clock },
  ];

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
              <span>{Math.abs(s.trend)}% vs previous period</span>
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
              <Pie data={sources} dataKey="visitors" nameKey="source" cx="50%" cy="50%" innerRadius={50} outerRadius={90}>
                {sources.map((s) => <Cell key={s.source} fill={s.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {sources.map((s) => (
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
              {topPages.map((p) => (
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
