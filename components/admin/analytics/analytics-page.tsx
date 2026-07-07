"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Download, CalendarRange, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { RealtimeSection } from "./realtime-section";
import { MetricsChartsSection } from "./metrics-charts";
import { TablesSection } from "./tables-section";
import { CalendarHeatmap } from "./calendar-heatmap";
import { ClickHeatmap } from "./click-heatmap";

export function AnalyticsPage() {
  const [isRealtime, setIsRealtime] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState("30d");

  useEffect(() => {
    if (!isRealtime) return;
    const interval = setInterval(() => setLastUpdated(new Date()), 5000);
    return () => clearInterval(interval);
  }, [isRealtime]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Analytics</h1>
          <p className="text-sm text-text-secondary mt-1 flex items-center gap-2">
            Comprehensive visitor analytics and engagement metrics
            {isRealtime && (
              <span className="flex items-center gap-1 text-[10px] text-success font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                Live
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-28 h-9 border-border-subtle bg-surface rounded-xl text-xs">
              <CalendarRange className="h-3 w-3 mr-1" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsRealtime(!isRealtime)}
            className={cn("h-9 rounded-xl border-border-subtle text-xs gap-1.5", isRealtime && "bg-success/10 border-success/30 text-success")}
          >
            {isRealtime ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
            {isRealtime ? "Live" : "Paused"}
          </Button>

          <Button variant="outline" size="sm" className="h-9 rounded-xl border-border-subtle text-xs gap-1.5">
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
        </div>
      </div>

      {/* Live indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[10px] text-text-tertiary">
          <RefreshCw className={cn("h-3 w-3", isRealtime && "animate-spin")} />
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
        <Badge variant="outline" className="text-[8px] px-1.5 py-0 rounded-full border-border-subtle text-text-tertiary">
          Auto-refresh every 5s
        </Badge>
      </div>

      {/* 1. Live Section */}
      <RealtimeSection />

      {/* 2. Metrics + Charts */}
      <MetricsChartsSection />

      {/* 3. Tables - Geo, Traffic, Content, Engagement */}
      <TablesSection />

      {/* 4. Calendar Heatmap */}
      <CalendarHeatmap />

      {/* 5. Click Heatmap */}
      <ClickHeatmap />
    </div>
  );
}
