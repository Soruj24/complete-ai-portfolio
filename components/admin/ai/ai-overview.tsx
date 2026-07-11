"use client";

import { motion } from "framer-motion";
import { AreaChartWidget } from "@/components/admin/widgets/area-chart-widget";
import { ProgressWidget } from "@/components/admin/widgets/progress-widget";
import { StatusWidget } from "@/components/admin/widgets/status-widget";
import { RealtimeWidget } from "@/components/admin/widgets/realtime-widget";
import {
  Brain, Sparkles, Activity, Clock, TrendingUp,
  Zap, Server, Wifi,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useGetAdminStatsQuery, useGetAdminResourceQuery } from "@/lib/store/api/admin-api";

const quickActions = [
  { label: "Test a Prompt", href: "/admin/ai/playground", icon: Zap, color: "text-accent", bg: "bg-accent/10" },
  { label: "New Provider", href: "/admin/ai/providers", icon: Server, color: "text-success", bg: "bg-success/10" },
  { label: "MCP Servers", href: "/admin/ai/mcp", icon: Wifi, color: "text-purple-500", bg: "bg-purple-500/10" },
  { label: "Workflows", href: "/admin/ai/workflows", icon: Activity, color: "text-amber-500", bg: "bg-amber-500/10" },
];

export function AIOverviewDashboard() {
  const { data: statsResponse, isLoading: statsLoading } = useGetAdminStatsQuery();
  const { data: metricsResponse, isLoading: metricsLoading } = useGetAdminResourceQuery({ resource: "ai/metrics" });
  const { data: statusResponse, isLoading: statusLoading } = useGetAdminResourceQuery({ resource: "ai/status" });
  const { data: resourcesResponse, isLoading: resourcesLoading } = useGetAdminResourceQuery({ resource: "ai/resources" });

  const stats = statsResponse?.data?.stats;
  const chartData = metricsResponse?.data ?? [];
  const serviceStatus = statusResponse?.data ?? [];
  const resources = resourcesResponse?.data ?? [];

  const statsData = stats
    ? [
        { label: "Total Visitors", value: stats.visitors?.toLocaleString() ?? "0", trend: stats.visitorsChange ?? 0, icon: Activity, color: "text-accent" },
        { label: "Resume Downloads", value: stats.resumeDownloads?.toLocaleString() ?? "0", trend: stats.resumeDownloadsChange ?? 0, icon: TrendingUp, color: "text-success" },
        { label: "Contact Messages", value: stats.contactMessages?.toLocaleString() ?? "0", trend: stats.contactMessagesChange ?? 0, icon: Clock, color: "text-amber-500" },
        { label: "GitHub Contributions", value: stats.githubContributions?.toLocaleString() ?? "0", trend: stats.githubContributionsChange ?? 0, icon: Brain, color: "text-purple-500" },
        { label: "Project Views", value: stats.projectViews?.toLocaleString() ?? "0", trend: stats.projectViewsChange ?? 0, icon: Sparkles, color: "text-info" },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">AI Control Center</h1>
          <p className="text-sm text-text-secondary mt-1">Manage models, prompts, workflows, and monitor AI operations</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <Link key={action.label} href={action.href}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 p-4 rounded-xl border border-border-subtle bg-surface hover:border-accent/20 transition-all cursor-pointer group"
            >
              <div className={cn("p-2.5 rounded-lg transition-colors group-hover:brightness-110", action.bg)}>
                <action.icon className={cn("h-5 w-5", action.color)} />
              </div>
              <span className="text-sm font-medium text-text-primary">{action.label}</span>
            </motion.div>
          </Link>
        ))}
      </div>

      {statsLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-surface animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {statsData.map((stat) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border border-border-subtle bg-surface"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={cn("h-4 w-4", stat.color)} />
                <span className={cn(
                  "text-[10px] font-semibold rounded-full px-1.5 py-0.5",
                  stat.trend >= 0 ? "text-success bg-success/10" : "text-error bg-error/10",
                )}>
                  {stat.trend >= 0 ? "+" : ""}{stat.trend}%
                </span>
              </div>
              <p className="text-lg font-bold text-text-primary">{stat.value}</p>
              <p className="text-[10px] text-text-tertiary mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AreaChartWidget title="Token Usage" description="Daily token consumption" data={chartData} loading={metricsLoading} trend={12.3} trendLabel="vs last week" color="var(--color-accent)" height={180} />
        <AreaChartWidget title="API Latency" description="Average response time (ms)" data={chartData} loading={metricsLoading} trend={-8.2} trendLabel="improvement" color="#10b981" height={180} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <StatusWidget title="Service Status" description="AI infrastructure health" layout="list"
          data={serviceStatus} loading={statusLoading}
        />
        <ProgressWidget title="Resource Usage" description="System resource consumption" layout="grid"
          data={resources} loading={resourcesLoading}
        />
        <RealtimeWidget title="Active Requests" description="Real-time API calls" />
      </div>
    </div>
  );
}
