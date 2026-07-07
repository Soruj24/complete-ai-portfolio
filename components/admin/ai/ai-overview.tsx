"use client";

import { motion } from "framer-motion";
import { AreaChartWidget } from "@/components/admin/widgets/area-chart-widget";
import { ProgressWidget } from "@/components/admin/widgets/progress-widget";
import { StatusWidget } from "@/components/admin/widgets/status-widget";
import { RealtimeWidget } from "@/components/admin/widgets/realtime-widget";
import {
  Brain, Sparkles, Activity, Clock, DollarSign, TrendingUp,
  Zap, Server, Database, Cpu, Wifi, BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

function generateDays(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    date: new Date(Date.now() - (n - 1 - i) * 86400000).toISOString(),
    label: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i%7],
    value: Math.floor(Math.random() * 300) + 100,
  }));
}

const quickActions = [
  { label: "Test a Prompt", href: "/admin/ai/playground", icon: Zap, color: "text-accent", bg: "bg-accent/10" },
  { label: "New Provider", href: "/admin/ai/providers", icon: Server, color: "text-success", bg: "bg-success/10" },
  { label: "MCP Servers", href: "/admin/ai/mcp", icon: Wifi, color: "text-purple-500", bg: "bg-purple-500/10" },
  { label: "Workflows", href: "/admin/ai/workflows", icon: Activity, color: "text-amber-500", bg: "bg-amber-500/10" },
];

const statsData = [
  { label: "Total Requests", value: "284,502", trend: 12.5, icon: Activity, color: "text-accent" },
  { label: "Active Models", value: "8", trend: 0, icon: Brain, color: "text-purple-500" },
  { label: "Avg Latency", value: "342ms", trend: -8.2, icon: Clock, color: "text-amber-500", invert: true },
  { label: "Monthly Cost", value: "$1,284", trend: 5.3, icon: DollarSign, color: "text-success" },
  { label: "Tokens Today", value: "1.2M", trend: 18.7, icon: TrendingUp, color: "text-accent" },
  { label: "Prompts Stored", value: "156", trend: 8, icon: BookOpen, color: "text-info" },
];

export function AIOverviewDashboard() {
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AreaChartWidget title="Token Usage" description="Daily token consumption" data={generateDays(14)} trend={12.3} trendLabel="vs last week" color="var(--color-accent)" height={180} />
        <AreaChartWidget title="API Latency" description="Average response time (ms)" data={generateDays(14)} trend={-8.2} trendLabel="improvement" color="#10b981" height={180} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <StatusWidget title="Service Status" description="AI infrastructure health" layout="list"
          data={[
            { label: "OpenAI API", status: "healthy", uptime: "99.9%", responseTime: "124ms" },
            { label: "Anthropic API", status: "healthy", uptime: "99.8%", responseTime: "210ms" },
            { label: "Ollama (Local)", status: "warning", uptime: "97.2%", responseTime: "890ms" },
            { label: "Vector DB", status: "healthy", uptime: "100%", responseTime: "8ms" },
          ]}
        />
        <ProgressWidget title="Resource Usage" description="System resource consumption" layout="grid"
          data={[
            { label: "GPU", used: 72, total: 100, unit: "%", color: "var(--color-accent)" },
            { label: "VRAM", used: 18, total: 24, unit: "GB", color: "#10b981" },
            { label: "Context Cache", used: 3.2, total: 10, unit: "GB", color: "#f59e0b" },
            { label: "Rate Limit", used: 42, total: 100, unit: "%", color: "#8b5cf6" },
          ]}
        />
        <RealtimeWidget title="Active Requests" description="Real-time API calls" />
      </div>
    </div>
  );
}
