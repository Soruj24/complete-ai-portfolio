"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, MousePointerClick, BarChart3, ArrowUp, ArrowDown, Loader2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";
import type { SearchQuery, SearchTrend } from "../types";

export function SearchAnalyticsPage() {
  const { data: response, isLoading } = useGetAdminResourceQuery({ resource: "analytics/search" });
  const items = response?.data ?? [];

  const TRENDS: SearchTrend[] = items.length > 0 ? (items[0]?.trends ?? []) : [];
  const QUERIES: SearchQuery[] = items.length > 0 ? (items[0]?.queries ?? []) : [];

  const [tab, setTab] = useState<"trends" | "queries">("trends");

  const totalClicks = QUERIES.reduce((a, q) => a + q.clicks, 0);
  const avgClickRate = QUERIES.length > 0 ? Math.round(QUERIES.reduce((a, q) => a + q.clickRate, 0) / QUERIES.length) : 0;

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 size={24} className="animate-spin text-accent" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="space-y-6">
        <div><h1 className="text-2xl font-bold text-text-primary">Search Analytics</h1><p className="text-sm text-text-tertiary">Track search performance and popular queries</p></div>
        <div className="flex h-64 items-center justify-center rounded-xl border border-border-primary bg-surface-primary">
          <p className="text-sm text-text-tertiary">No search data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-text-primary">Search Analytics</h1><p className="text-sm text-text-tertiary">Track search performance and popular queries</p></div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total Queries", value: "847", icon: Search, color: "text-accent", change: "+12.3%", up: true },
          { label: "Total Clicks", value: totalClicks.toString(), icon: MousePointerClick, color: "text-success", change: "+8.1%", up: true },
          { label: "Avg. Click Rate", value: `${avgClickRate}%`, icon: TrendingUp, color: "text-accent", change: "+2.4%", up: true },
          { label: "Avg. Results", value: "18.2", icon: BarChart3, color: "text-warning", change: "-1.8%", up: false },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="rounded-xl border border-border-primary bg-surface-primary p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-surface-hover ${s.color}`}><s.icon size={18} /></div>
              <span className={`flex items-center gap-0.5 text-xs font-medium ${s.up ? "text-success" : "text-error"}`}>
                {s.up ? <ArrowUp size={12} /> : <ArrowDown size={12} />}{s.change}
              </span>
            </div>
            <p className="text-xs text-text-tertiary">{s.label}</p>
            <p className="text-lg font-semibold text-text-primary">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-1 rounded-lg border border-border-primary bg-surface-primary p-1 w-fit">
        {(["trends", "queries"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`rounded-md px-4 py-1.5 text-xs font-medium capitalize ${tab === t ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"}`}>{t}</button>
        ))}
      </div>

      {tab === "trends" ? (
        <div className="rounded-xl border border-border-primary bg-surface-primary p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Search Queries (14 days)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TRENDS}>
                <defs><linearGradient id="sqGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.3" /><stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }} tickFormatter={(v) => new Date(v).toLocaleDateString("en-US", { month: "short", day: "numeric" })} />
                <YAxis tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }} />
                <Tooltip contentStyle={{ backgroundColor: "var(--color-surface-primary)", border: "1px solid var(--color-border-primary)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="queries" stroke="var(--color-accent)" fill="url(#sqGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-border-primary bg-surface-primary overflow-hidden">
          <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-border-primary bg-surface-secondary text-left text-xs text-text-tertiary">
            <th className="p-3 font-medium">Search Query</th><th className="p-3 font-medium">Results</th><th className="p-3 font-medium">Clicks</th><th className="p-3 font-medium">Click Rate</th><th className="p-3 font-medium">Date</th>
          </tr></thead><tbody>
            {QUERIES.map((q, i) => (
              <motion.tr key={q.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.01 }}
                className="border-b border-border-primary last:border-0 hover:bg-surface-hover transition-colors">
                <td className="p-3 font-medium text-text-primary">{q.query}</td>
                <td className="p-3 text-text-secondary">{q.results}</td>
                <td className="p-3 text-text-secondary">{q.clicks}</td>
                <td className="p-3"><div className="flex items-center gap-2"><div className="h-1.5 w-16 rounded-full bg-surface-hover"><div className="h-full rounded-full bg-accent" style={{ width: `${q.clickRate}%` }} /></div><span className="text-xs text-text-secondary">{q.clickRate}%</span></div></td>
                <td className="p-3 text-xs text-text-tertiary">{new Date(q.date).toLocaleDateString()}</td>
              </motion.tr>
            ))}
          </tbody></table></div>
        </div>
      )}
    </div>
  );
}
