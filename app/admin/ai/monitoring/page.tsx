"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChartWidget } from "@/components/admin/widgets/area-chart-widget";
import { BarChart3, DollarSign, Activity, TrendingUp, Clock, AlertTriangle, Download, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";

export default function MonitoringPage() {
  const { data: response, isLoading, refetch } = useGetAdminResourceQuery({ resource: "ai/monitoring" });
  const monitoringData = Array.isArray(response?.data) ? response?.data?.[0] : response?.data;

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
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-border-subtle" onClick={() => refetch()}>
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-border-subtle">
            <Download className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="border-border-subtle bg-surface">
              <CardContent className="p-4 animate-pulse">
                <div className="h-4 w-4 bg-surface-hover rounded mb-2" />
                <div className="h-6 bg-surface-hover rounded w-1/2 mb-1" />
                <div className="h-3 bg-surface-hover rounded w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(monitoringData?.stats ?? []).map((stat: any) => (
            <Card key={stat.label} className="border-border-subtle bg-surface">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Activity className={cn("h-4 w-4", stat.color ?? "text-accent")} />
                  <span className={cn(
                    "text-[10px] font-semibold rounded-full px-1.5 py-0.5",
                    (stat.trend ?? 0) >= 0 ? "text-success bg-success/10" : "text-error bg-error/10",
                  )}>
                    {(stat.trend ?? 0) >= 0 ? "+" : ""}{stat.trend ?? 0}%
                  </span>
                </div>
                <p className="text-lg font-bold text-text-primary">{stat.value ?? "--"}</p>
                <p className="text-[10px] text-text-tertiary mt-0.5">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AreaChartWidget title="API Requests" description="Daily API call volume" data={[]} trend={0} trendLabel="vs last month" color="var(--color-accent)" height={200} loading={isLoading} />
        <AreaChartWidget title="Token Usage" description="Daily token consumption" data={[]} trend={0} trendLabel="vs last month" color="#10b981" height={200} loading={isLoading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AreaChartWidget title="Cost Breakdown" description="Daily API cost ($)" data={[]} trend={0} trendLabel="vs last month" color="#f59e0b" height={200} loading={isLoading} />
        <AreaChartWidget title="Latency P95" description="95th percentile response time (ms)" data={[]} trend={0} trendLabel="improvement" color="#8b5cf6" height={200} loading={isLoading} />
      </div>

      {/* Model Performance */}
      <Card className="border-border-subtle bg-surface">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-text-primary">Model Performance</CardTitle>
          <CardDescription>Per-model latency and error rate breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-12 rounded-xl bg-surface-hover animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {(monitoringData?.models ?? []).map((m: any) => (
                <div key={m.model} className="flex items-center gap-4 p-3 rounded-xl bg-background border border-border-subtle">
                  <div className="min-w-[100px]">
                    <p className="text-xs font-semibold text-text-primary">{m.model}</p>
                  </div>
                  <div className="flex-1 grid grid-cols-5 gap-2 text-[10px] font-mono text-text-tertiary">
                    <span className="text-text-primary">{m.requests}</span>
                    <span>{m.latency}</span>
                    <span>{m.errorRate}</span>
                    <span>{m.cost}</span>
                    <span>{m.tokens}</span>
                  </div>
                  <div className="w-24">
                    <div className="h-1.5 rounded-full bg-background overflow-hidden">
                      <div className={cn("h-full rounded-full", m.color ?? "bg-accent")} style={{ width: `${m.progress ?? 0}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-10 rounded-xl bg-surface-hover animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {(monitoringData?.alerts ?? []).map((alert: any, i: number) => (
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
              {(monitoringData?.alerts ?? []).length === 0 && (
                <p className="text-xs text-text-tertiary text-center py-4">No alerts</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
