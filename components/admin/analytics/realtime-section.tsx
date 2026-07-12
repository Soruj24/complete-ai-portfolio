"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Globe, ArrowUp, Activity, Loader2 } from "lucide-react";

interface RealtimeEvent {
  path: string;
  country?: string;
  city?: string;
  deviceType?: string;
  browser?: string;
  os?: string;
  timestamp: Date;
}

interface RealtimeData {
  liveVisitors: number;
  peakToday: number;
  totalToday: number;
  recentEvents: RealtimeEvent[];
}

export function RealtimeSection() {
  const [data, setData] = useState<RealtimeData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/analytics/realtime");
      if (!res.ok) return;
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="border-border-subtle bg-surface lg:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${data && data.liveVisitors > 0 ? "bg-success animate-pulse" : "bg-text-tertiary"}`} />
            Live Visitors
          </CardTitle>
          <CardDescription>Real-time active users on your site</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 size={20} className="animate-spin text-text-tertiary" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-end gap-3">
                <div className="text-5xl font-bold text-text-primary">
                  {data?.liveVisitors ?? 0}
                </div>
                {data && data.liveVisitors > 0 && (
                  <div className="flex items-center gap-1 mb-1.5 text-success">
                    <ArrowUp className="h-4 w-4" />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Peak Today", value: String(data?.peakToday ?? 0), color: "text-amber-500" },
                  { label: "Total Today", value: String(data?.totalToday ?? 0), color: "text-accent" },
                  { label: "Avg Session", value: "--", color: "text-info" },
                ].map((stat) => (
                  <div key={stat.label} className="p-2.5 rounded-lg bg-surface-hover text-center">
                    <p className="text-xs font-semibold text-text-primary">{stat.value}</p>
                    <p className="text-[9px] text-text-tertiary mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
              {data && data.totalToday > 0 && (
                <div className="flex items-center gap-2 text-[10px] text-text-tertiary">
                  <Globe className="h-3 w-3" />
                  <span>Data from tracked page views</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-border-subtle bg-surface lg:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <Activity className="h-4 w-4 text-accent" />
            Realtime Events
          </CardTitle>
          <CardDescription>Latest visitor interactions across your site</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[220px] overflow-y-auto no-scrollbar space-y-1">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 size={20} className="animate-spin text-text-tertiary" />
              </div>
            ) : data && data.recentEvents.length > 0 ? (
              data.recentEvents.slice(0, 20).map((event, i) => (
                <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-surface-hover transition-colors text-[10px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-success shrink-0" />
                  <span className="text-text-secondary font-mono shrink-0">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </span>
                  <span className="text-text-primary font-medium truncate max-w-[200px]">
                    {event.path}
                  </span>
                  {event.country && (
                    <span className="text-text-tertiary shrink-0">{event.country}</span>
                  )}
                  {event.deviceType && (
                    <span className="text-text-tertiary shrink-0 text-[8px]">{event.deviceType}</span>
                  )}
                  {event.browser && (
                    <span className="text-text-tertiary shrink-0 text-[8px]">{event.browser}</span>
                  )}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-text-tertiary">
                <Activity className="h-8 w-8 mb-2 opacity-40" />
                <p className="text-sm">No events yet</p>
                <p className="text-xs mt-0.5">Real-time events will appear here as visitors browse</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
