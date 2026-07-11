"use client";

import { motion } from "framer-motion";
import { Globe, Users, Eye, Clock, TrendingUp, Loader2 } from "lucide-react";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";
import type { VisitorStat } from "../types";

export function VisitorsPage() {
  const { data: response, isLoading } = useGetAdminResourceQuery({ resource: "analytics/visitors" });
  const items: VisitorStat[] = response?.data ?? [];

  const totalVisitors = items.reduce((a, s) => a + s.visitors, 0);
  const totalViews = items.reduce((a, s) => a + s.pageViews, 0);

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
        <div><h1 className="text-2xl font-bold text-text-primary">Visitor Map</h1><p className="text-sm text-text-tertiary">Geographic distribution of site visitors</p></div>
        <div className="flex h-64 items-center justify-center rounded-xl border border-border-primary bg-surface-primary">
          <p className="text-sm text-text-tertiary">No visitor data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-text-primary">Visitor Map</h1><p className="text-sm text-text-tertiary">Geographic distribution of site visitors</p></div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total Visitors", value: totalVisitors.toLocaleString(), icon: Users, color: "text-accent" },
          { label: "Page Views", value: totalViews.toLocaleString(), icon: Eye, color: "text-success" },
          { label: "Avg. Duration", value: `${Math.round(items.reduce((a, s) => a + s.avgDuration, 0) / items.length)}s`, icon: Clock, color: "text-accent" },
          { label: "Avg. Bounce Rate", value: `${Math.round(items.reduce((a, s) => a + s.bounceRate, 0) / items.length)}%`, icon: TrendingUp, color: "text-warning" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="rounded-xl border border-border-primary bg-surface-primary p-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-surface-hover ${s.color}`}><s.icon size={18} /></div>
              <div><p className="text-xs text-text-tertiary">{s.label}</p><p className="text-lg font-semibold text-text-primary">{s.value}</p></div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative rounded-xl border border-border-primary bg-surface-primary p-5 overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <Globe size={16} className="text-accent" />
          <h3 className="text-sm font-semibold text-text-primary">Worldwide Distribution</h3>
        </div>
        <div className="relative h-48 mb-6 flex items-center justify-center">
          <div className="text-center">
            <Globe size={80} className="mx-auto text-text-tertiary opacity-20" />
            <p className="mt-2 text-xs text-text-tertiary">Interactive map placeholder</p>
          </div>
          {[{ top: "15%", left: "20%" }, { top: "25%", left: "45%" }, { top: "40%", left: "55%" }, { top: "55%", left: "35%" }, { top: "30%", left: "70%" }].map((dot, i) => (
            <div key={i} className="absolute h-2 w-2 rounded-full bg-accent/60 animate-pulse" style={{ top: dot.top, left: dot.left }} />
          ))}
        </div>
        <div className="space-y-1">
          {items.map((s, i) => {
            const maxVisitors = items[0].visitors;
            return (
              <motion.div key={s.code} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                className="flex items-center gap-3 py-1.5">
                <span className="text-lg">{s.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-medium text-text-primary truncate">{s.country}</span>
                    <span className="text-[10px] text-text-tertiary">{s.visitors.toLocaleString()} visitors</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-surface-hover">
                    <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${(s.visitors / maxVisitors) * 100}%` }} />
                  </div>
                </div>
                <div className="flex gap-3 text-[10px] text-text-tertiary text-right shrink-0">
                  <span>{s.pageViews} views</span>
                  <span>{s.avgDuration}s</span>
                  <span>{s.bounceRate}% bounce</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
