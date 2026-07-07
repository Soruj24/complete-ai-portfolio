"use client";

import { useState, useEffect } from "react";
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
import type { TimeSeriesPoint, WidgetDataPoint, UsageData, StatusData, ListItem } from "@/types/widgets";

function generateDays(n: number): TimeSeriesPoint[] {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return Array.from({ length: n }, (_, i) => ({
    date: new Date(Date.now() - (n - 1 - i) * 86400000).toISOString(),
    label: days[i % 7],
    value: Math.floor(Math.random() * 500) + 100,
  }));
}

function generateMonths(n: number): TimeSeriesPoint[] {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return Array.from({ length: n }, (_, i) => ({
    date: new Date(2025, i, 1).toISOString(),
    label: months[i],
    value: Math.floor(Math.random() * 3000) + 500,
  }));
}

function generateSources(): WidgetDataPoint[] {
  return [
    { label: "Organic Search", value: 4520, color: "var(--color-accent)" },
    { label: "Direct", value: 2890, color: "#10b981" },
    { label: "Social Media", value: 2100, color: "#f59e0b" },
    { label: "Referral", value: 1560, color: "#8b5cf6" },
    { label: "Email", value: 980, color: "#06b6d4" },
    { label: "Other", value: 450, color: "#ec4899" },
  ];
}

function generateDevices(): WidgetDataPoint[] {
  return [
    { label: "Desktop", value: 8240, color: "var(--color-accent)" },
    { label: "Mobile", value: 5120, color: "#10b981" },
    { label: "Tablet", value: 980, color: "#f59e0b" },
  ];
}

function generateBrowsers(): WidgetDataPoint[] {
  return [
    { label: "Chrome", value: 6240, color: "var(--color-accent)" },
    { label: "Safari", value: 2840, color: "#06b6d4" },
    { label: "Firefox", value: 1560, color: "#f59e0b" },
    { label: "Edge", value: 980, color: "#10b981" },
    { label: "Other", value: 420, color: "#ec4899" },
  ];
}

function generateCountries(): WidgetDataPoint[] {
  return [
    { label: "United States", value: 4520, color: "var(--color-accent)" },
    { label: "United Kingdom", value: 1820, color: "#10b981" },
    { label: "Germany", value: 1450, color: "#f59e0b" },
    { label: "India", value: 1280, color: "#8b5cf6" },
    { label: "Canada", value: 940, color: "#06b6d4" },
    { label: "Others", value: 2150, color: "#ec4899" },
  ];
}

function generateUsage(): UsageData[] {
  return [
    { label: "CPU", used: 62, total: 100, unit: "%", color: "var(--color-accent)" },
    { label: "Memory", used: 7.2, total: 16, unit: "GB", color: "#10b981" },
    { label: "Storage", used: 128, total: 512, unit: "GB", color: "#f59e0b" },
    { label: "API Rate Limit", used: 45, total: 100, unit: "%", color: "#8b5cf6" },
  ];
}

function generatePopularProjects(): ListItem[] {
  return [
    { id: "1", label: "E-Commerce Platform", value: 12540, secondary: "Next.js, Stripe", trend: 12 },
    { id: "2", label: "AI Chat Assistant", value: 9820, secondary: "LangChain, GPT-4", trend: 28 },
    { id: "3", label: "Portfolio Website", value: 7450, secondary: "Next.js, Tailwind", trend: -3 },
    { id: "4", label: "Task Management App", value: 5230, secondary: "React, Firebase", trend: 8 },
    { id: "5", label: "Real-time Dashboard", value: 3890, secondary: "Next.js, WebSocket", trend: 15 },
  ];
}

function generateTechnologies(): ListItem[] {
  return [
    { id: "1", label: "TypeScript", value: 85, secondary: "Used in 12 projects", trend: 5 },
    { id: "2", label: "Next.js", value: 72, secondary: "Used in 10 projects", trend: 8 },
    { id: "3", label: "React", value: 68, secondary: "Used in 9 projects", trend: -1 },
    { id: "4", label: "Python", value: 45, secondary: "Used in 6 projects", trend: 15 },
    { id: "5", label: "Node.js", value: 38, secondary: "Used in 5 projects", trend: 3 },
  ];
}

function generateStatuses(): StatusData[] {
  return [
    { label: "Web Server", status: "healthy", uptime: "99.9%", responseTime: "45ms" },
    { label: "Database", status: "healthy", uptime: "99.8%", responseTime: "12ms" },
    { label: "Redis Cache", status: "healthy", uptime: "100%", responseTime: "2ms" },
    { label: "AI Service", status: "warning", uptime: "98.5%", responseTime: "340ms" },
  ];
}

function generateAIUsage(): UsageData[] {
  return [
    { label: "Token Usage (Today)", used: 245000, total: 500000, unit: "tokens", color: "var(--color-accent)" },
    { label: "Embedding Count", used: 12500, total: 50000, unit: "embeddings", color: "#10b981" },
    { label: "Vector DB Storage", used: 1.8, total: 5, unit: "GB", color: "#f59e0b" },
    { label: "AI Requests/Min", used: 28, total: 60, unit: "req/min", color: "#8b5cf6" },
  ];
}

function generateSocketData(): UsageData[] {
  return [
    { label: "Active Connections", used: 147, total: 500, unit: "connections", color: "var(--color-accent)" },
    { label: "Messages/Min", used: 320, total: 1000, unit: "msg/min", color: "#10b981" },
    { label: "Channels", used: 12, total: 50, unit: "channels", color: "#f59e0b" },
  ];
}

export function DashboardWidgets() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const triggerError = () => {
    setError("Failed to load widget data");
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Analytics Overview</h2>
          <p className="text-xs text-text-tertiary mt-0.5">Real-time dashboard with key metrics and insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={triggerError} className="h-8 text-xs gap-1.5 rounded-lg text-error hover:text-error hover:bg-error/10">
            Simulate Error
          </Button>
          <Button variant="outline" size="sm" onClick={handleRetry} className="h-8 text-xs gap-1.5 rounded-lg">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <WidgetGrid className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        <StatWidget title="Total Visitors" value={48250} trend={12.5} trendLabel="vs last month" comparison="42,890 last month" icon="users" chart={generateDays(7)} loading={loading} error={error} onRetry={handleRetry} format={(v) => v.toLocaleString()} />
        <StatWidget title="Unique Visitors" value={28430} trend={8.3} trendLabel="vs last month" comparison="26,240 last month" icon="eye" chart={generateDays(7)} loading={loading} error={error} onRetry={handleRetry} format={(v) => v.toLocaleString()} />
        <StatWidget title="Returning Users" value={12450} trend={-2.1} trendLabel="vs last month" comparison="12,720 last month" icon="userPlus" chart={generateDays(7)} loading={loading} error={error} onRetry={handleRetry} format={(v) => v.toLocaleString()} />
        <StatWidget title="Project Views" value={18720} trend={22.4} trendLabel="vs last month" comparison="15,290 last month" icon="folder" chart={generateDays(7)} loading={loading} error={error} onRetry={handleRetry} format={(v) => v.toLocaleString()} />
        <StatWidget title="Resume Downloads" value={1240} trend={15.8} trendLabel="vs last month" comparison="1,070 last month" icon="download" chart={generateDays(7)} loading={loading} error={error} onRetry={handleRetry} format={(v) => v.toLocaleString()} />
      </WidgetGrid>

      <WidgetGrid className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        <StatWidget title="GitHub Clicks" value={3450} trend={5.2} trendLabel="vs last month" comparison="3,280 last month" icon="external" chart={generateDays(7)} loading={loading} error={error} onRetry={handleRetry} format={(v) => v.toLocaleString()} />
        <StatWidget title="LinkedIn Clicks" value={2150} trend={-1.4} trendLabel="vs last month" comparison="2,180 last month" icon="external" chart={generateDays(7)} loading={loading} error={error} onRetry={handleRetry} format={(v) => v.toLocaleString()} />
        <StatWidget title="Contact Requests" value={128} trend={32.5} trendLabel="vs last month" comparison="96 last month" icon="message" loading={loading} error={error} onRetry={handleRetry} format={(v) => v.toLocaleString()} />
        <StatWidget title="Newsletter Subs" value={2450} trend={8.7} trendLabel="vs last month" comparison="2,254 last month" icon="mail" chart={generateDays(7)} loading={loading} error={error} onRetry={handleRetry} format={(v) => v.toLocaleString()} />
        <StatWidget title="Blog Views" value={28900} trend={18.2} trendLabel="vs last month" comparison="24,450 last month" icon="book" chart={generateDays(7)} loading={loading} error={error} onRetry={handleRetry} format={(v) => v.toLocaleString()} />
      </WidgetGrid>

      {/* Charts Row */}
      <WidgetGrid className="grid-cols-1 lg:grid-cols-2">
        <AreaChartWidget title="Monthly Visitors" description="Total visitors over the past 12 months" data={generateMonths(12)} loading={loading} error={error} onRetry={handleRetry} trend={14.2} trendLabel="vs last year" />
        <PieChartWidget title="Traffic Sources" description="Where your visitors come from" data={generateSources()} loading={loading} error={error} onRetry={handleRetry} />
      </WidgetGrid>

      {/* Device / Browser / Country Stats */}
      <WidgetGrid className="grid-cols-1 md:grid-cols-3">
        <PieChartWidget title="Device Statistics" description="Devices used by visitors" data={generateDevices()} loading={loading} error={error} onRetry={handleRetry} height={180} colors={["var(--color-accent)", "#10b981", "#f59e0b"]} />
        <PieChartWidget title="Browser Statistics" description="Browser market share" data={generateBrowsers()} loading={loading} error={error} onRetry={handleRetry} height={180} />
        <PieChartWidget title="Country Statistics" description="Visitor locations" data={generateCountries()} loading={loading} error={error} onRetry={handleRetry} height={180} />
      </WidgetGrid>

      {/* Lists + Realtime */}
      <WidgetGrid className="grid-cols-1 lg:grid-cols-3">
        <ListWidget title="Most Popular Projects" description="By total page views" data={generatePopularProjects()} loading={loading} error={error} onRetry={handleRetry} formatValue={(v) => v.toLocaleString()} />
        <ListWidget title="Top Technologies" description="By project usage" data={generateTechnologies()} loading={loading} error={error} onRetry={handleRetry} formatValue={(v) => `${v}%`} maxItems={5} />
        <RealtimeWidget title="Real-time Visitors" description="Active users right now" loading={loading} error={error} onRetry={handleRetry} />
      </WidgetGrid>

      {/* Status + System */}
      <WidgetGrid className="grid-cols-1 lg:grid-cols-2">
        <StatusWidget title="Server & Service Status" description="System health overview" data={generateStatuses()} loading={loading} error={error} onRetry={handleRetry} />
        <ProgressWidget title="System Resources" description="Current system usage" data={generateUsage()} loading={loading} error={error} onRetry={handleRetry} />
      </WidgetGrid>

      {/* AI + Socket */}
      <WidgetGrid className="grid-cols-1 lg:grid-cols-3">
        <ProgressWidget title="AI Usage" description="Token and model usage metrics" data={generateAIUsage()} loading={loading} error={error} onRetry={handleRetry} layout="grid" />
        <ProgressWidget title="Realtime Socket Connections" description="WebSocket connection stats" data={generateSocketData()} loading={loading} error={error} onRetry={handleRetry} layout="grid" />
        <div className="space-y-4">
          <AreaChartWidget title="API Response Time" description="Average response time (ms)" data={generateDays(7)} loading={loading} error={error} onRetry={handleRetry} color="#10b981" height={140} />
          <ProgressWidget title="Vector Database Health" description="Vector storage and indexing" data={[
            { label: "Index Usage", used: 3.2, total: 10, unit: "GB", color: "#10b981" },
            { label: "Query Latency", used: 45, total: 100, unit: "ms", color: "var(--color-accent)" },
          ]} loading={loading} error={error} onRetry={handleRetry} />
        </div>
      </WidgetGrid>
    </div>
  );
}
