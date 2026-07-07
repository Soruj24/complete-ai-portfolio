"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChartWidget } from "@/components/admin/widgets/area-chart-widget";
import { StatWidget } from "@/components/admin/widgets/stat-widget";
import { StatusWidget } from "@/components/admin/widgets/status-widget";
import { BarChart3, DollarSign, Activity, TrendingUp, Clock, AlertTriangle, Download, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

function generateDays(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    date: new Date(Date.now() - (n - 1 - i) * 86400000).toISOString(),
    label: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i%7],
    value: Math.floor(Math.random() * 500) + 200,
  }));
}

export default function MonitoringPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Monitoring & Analytics</h1>
          <p className="text-sm text-text-secondary mt-1">Track AI usage, costs, and performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="7d">
            <SelectTrigger className="w-28 h-9 border-border-subtle bg-surface rounded-xl text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-border-subtle">
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-border-subtle">
            <Download className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Requests", value: "284,502", trend: 12.5, icon: Activity, color: "text-accent" },
          { label: "Avg Latency", value: "342ms", trend: -8.2, icon: Clock, color: "text-amber-500", invert: true },
          { label: "Total Cost", value: "$1,284.42", trend: 5.3, icon: DollarSign, color: "text-success" },
          { label: "Error Rate", value: "0.8%", trend: -0.3, icon: AlertTriangle, color: "text-error", invert: true },
        ].map((stat) => (
          <Card key={stat.label} className="border-border-subtle bg-surface">
            <CardContent className="p-4">
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AreaChartWidget title="API Requests" description="Daily API call volume" data={generateDays(14)} trend={18.3} trendLabel="vs last month" color="var(--color-accent)" height={200} />
        <AreaChartWidget title="Token Usage" description="Daily token consumption" data={generateDays(14)} trend={22.1} trendLabel="vs last month" color="#10b981" height={200} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AreaChartWidget title="Cost Breakdown" description="Daily API cost ($)" data={generateDays(14)} trend={8.5} trendLabel="vs last month" color="#f59e0b" height={200} />
        <AreaChartWidget title="Latency P95" description="95th percentile response time (ms)" data={generateDays(14)} trend={-5.2} trendLabel="improvement" color="#8b5cf6" height={200} />
      </div>

      {/* Model Performance */}
      <Card className="border-border-subtle bg-surface">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-text-primary">Model Performance</CardTitle>
          <CardDescription>Per-model latency and error rate breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { model: "GPT-4o", requests: "142,850", latency: "245ms", errorRate: "0.3%", cost: "$682.40", tokens: "42.5M", color: "bg-accent" },
              { model: "GPT-4o Mini", requests: "89,200", latency: "180ms", errorRate: "0.5%", cost: "$89.20", tokens: "28.1M", color: "bg-success" },
              { model: "Claude 3 Opus", requests: "32,100", latency: "410ms", errorRate: "0.8%", cost: "$385.20", tokens: "12.8M", color: "bg-purple-500" },
              { model: "Claude 3 Sonnet", requests: "18,200", latency: "320ms", errorRate: "0.4%", cost: "$109.20", tokens: "6.2M", color: "bg-amber-500" },
              { model: "Gemini Pro", requests: "2,152", latency: "290ms", errorRate: "1.2%", cost: "$18.42", tokens: "0.8M", color: "bg-info" },
            ].map((m) => (
              <div key={m.model} className="flex items-center gap-4 p-3 rounded-xl bg-background border border-border-subtle">
                <div className="min-w-[100px]">
                  <p className="text-xs font-semibold text-text-primary">{m.model}</p>
                </div>
                <div className="flex-1 grid grid-cols-5 gap-2 text-[10px] font-mono text-text-tertiary">
                  <span className="text-text-primary">{m.requests}</span>
                  <span>{m.latency}</span>
                  <span className={m.errorRate === "0.3%" ? "text-success" : "text-error"}>{m.errorRate}</span>
                  <span>{m.cost}</span>
                  <span>{m.tokens}</span>
                </div>
                <div className="w-24">
                  <div className="h-1.5 rounded-full bg-background overflow-hidden">
                    <div className={cn("h-full rounded-full", m.color)} style={{ width: `${(Number(m.requests.replace(",", "")) / 142850) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card className="border-border-subtle bg-surface">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            Recent Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { severity: "warning", message: "Anthropic API latency spike detected - 890ms average over 5 min", time: "5m ago" },
              { severity: "info", message: "Token usage exceeded 80% of daily quota", time: "1h ago" },
              { severity: "error", message: "Cohere API returned 503 errors for 2 min window", time: "3h ago" },
              { severity: "info", message: "New model deployment: GPT-4o-mini-2024-07-18", time: "1d ago" },
            ].map((alert, i) => (
              <div key={i} className={cn(
                "flex items-center justify-between p-3 rounded-xl border text-xs",
                alert.severity === "error" ? "border-error/20 bg-error/5" :
                alert.severity === "warning" ? "border-warning/20 bg-warning/5" :
                "border-info/20 bg-info/5",
              )}>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    alert.severity === "error" ? "bg-error" :
                    alert.severity === "warning" ? "bg-warning" : "bg-info",
                  )} />
                  <span className={cn(
                    alert.severity === "error" ? "text-error" :
                    alert.severity === "warning" ? "text-warning" : "text-text-primary",
                  )}>
                    {alert.message}
                  </span>
                </div>
                <span className="text-[10px] text-text-tertiary shrink-0 ml-2">{alert.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
