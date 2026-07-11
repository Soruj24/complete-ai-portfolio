"use client";

import { StatWidget } from "./stat-widget";
import { AreaChartWidget } from "./area-chart-widget";
import { PieChartWidget } from "./pie-chart-widget";
import { ProgressWidget } from "./progress-widget";
import { ListWidget } from "./list-widget";
import { StatusWidget } from "./status-widget";
import { RealtimeWidget } from "./realtime-widget";
import { WidgetGrid } from "./widget-shell";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetAdminStatsQuery } from "@/lib/store/api/admin-api";

export function DashboardWidgets() {
  const { data: response, isLoading, error: queryError, refetch } = useGetAdminStatsQuery();
  const stats = response?.data?.stats;
  const error = queryError ? "Failed to load widget data" : null;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Analytics Overview</h2>
          <p className="text-xs text-text-tertiary mt-0.5">Real-time dashboard with key metrics and insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => refetch()} className="h-8 text-xs gap-1.5 rounded-lg">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <WidgetGrid className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        <StatWidget title="Total Visitors" value={stats?.visitors ?? 0} trend={stats?.visitorsChange ?? 0} trendLabel="vs last month" comparison="" icon="users" chart={[]} loading={isLoading} error={error} onRetry={refetch} format={(v) => v.toLocaleString()} />
        <StatWidget title="Project Views" value={stats?.projectViews ?? 0} trend={stats?.projectViewsChange ?? 0} trendLabel="vs last month" comparison="" icon="folder" chart={[]} loading={isLoading} error={error} onRetry={refetch} format={(v) => v.toLocaleString()} />
        <StatWidget title="Resume Downloads" value={stats?.resumeDownloads ?? 0} trend={stats?.resumeDownloadsChange ?? 0} trendLabel="vs last month" comparison="" icon="download" chart={[]} loading={isLoading} error={error} onRetry={refetch} format={(v) => v.toLocaleString()} />
        <StatWidget title="Contact Requests" value={stats?.contactMessages ?? 0} trend={stats?.contactMessagesChange ?? 0} trendLabel="vs last month" comparison="" icon="message" loading={isLoading} error={error} onRetry={refetch} format={(v) => v.toLocaleString()} />
        <StatWidget title="GitHub Contributions" value={stats?.githubContributions ?? 0} trend={stats?.githubContributionsChange ?? 0} trendLabel="vs last month" comparison="" icon="external" chart={[]} loading={isLoading} error={error} onRetry={refetch} format={(v) => v.toLocaleString()} />
      </WidgetGrid>

      {/* Charts Row */}
      <WidgetGrid className="grid-cols-1 lg:grid-cols-2">
        <AreaChartWidget title="Monthly Visitors" description="Total visitors over the past 12 months" data={[]} loading={isLoading} error={error} onRetry={refetch} trend={0} trendLabel="vs last year" />
        <PieChartWidget title="Traffic Sources" description="Where your visitors come from" data={[]} loading={isLoading} error={error} onRetry={refetch} />
      </WidgetGrid>

      {/* Device / Browser / Country Stats */}
      <WidgetGrid className="grid-cols-1 md:grid-cols-3">
        <PieChartWidget title="Device Statistics" description="Devices used by visitors" data={[]} loading={isLoading} error={error} onRetry={refetch} height={180} colors={["var(--color-accent)", "#10b981", "#f59e0b"]} />
        <PieChartWidget title="Browser Statistics" description="Browser market share" data={[]} loading={isLoading} error={error} onRetry={refetch} height={180} />
        <PieChartWidget title="Country Statistics" description="Visitor locations" data={[]} loading={isLoading} error={error} onRetry={refetch} height={180} />
      </WidgetGrid>

      {/* Lists + Realtime */}
      <WidgetGrid className="grid-cols-1 lg:grid-cols-3">
        <ListWidget title="Most Popular Projects" description="By total page views" data={[]} loading={isLoading} error={error} onRetry={refetch} formatValue={(v) => v.toLocaleString()} />
        <ListWidget title="Top Technologies" description="By project usage" data={[]} loading={isLoading} error={error} onRetry={refetch} formatValue={(v) => `${v}%`} maxItems={5} />
        <RealtimeWidget title="Real-time Visitors" description="Active users right now" loading={isLoading} error={error} onRetry={refetch} />
      </WidgetGrid>

      {/* Status + System */}
      <WidgetGrid className="grid-cols-1 lg:grid-cols-2">
        <StatusWidget title="Server & Service Status" description="System health overview" data={[]} loading={isLoading} error={error} onRetry={refetch} />
        <ProgressWidget title="System Resources" description="Current system usage" data={[]} loading={isLoading} error={error} onRetry={refetch} />
      </WidgetGrid>

      {/* AI + Socket */}
      <WidgetGrid className="grid-cols-1 lg:grid-cols-3">
        <ProgressWidget title="AI Usage" description="Token and model usage metrics" data={[]} loading={isLoading} error={error} onRetry={refetch} layout="grid" />
        <ProgressWidget title="Realtime Socket Connections" description="WebSocket connection stats" data={[]} loading={isLoading} error={error} onRetry={refetch} layout="grid" />
        <div className="space-y-4">
          <AreaChartWidget title="API Response Time" description="Average response time (ms)" data={[]} loading={isLoading} error={error} onRetry={refetch} color="#10b981" height={140} />
          <ProgressWidget title="Vector Database Health" description="Vector storage and indexing" data={[]} loading={isLoading} error={error} onRetry={refetch} />
        </div>
      </WidgetGrid>
    </div>
  );
}
