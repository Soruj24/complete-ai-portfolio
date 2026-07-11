"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Globe, ArrowUp, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export function RealtimeSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Live Visitors */}
      <Card className="border-border-subtle bg-surface lg:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-text-tertiary" />
            Live Visitors
          </CardTitle>
          <CardDescription>Real-time active users on your site</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-end gap-3">
              <div className="text-5xl font-bold text-text-primary">0</div>
              <div className="flex items-center gap-1 mb-1.5 text-success">
                <ArrowUp className="h-4 w-4" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Peak Today", value: "0", color: "text-amber-500" },
                { label: "Total Today", value: "0", color: "text-accent" },
                { label: "Avg Session", value: "--", color: "text-info" },
              ].map((stat) => (
                <div key={stat.label} className="p-2.5 rounded-lg bg-surface-hover text-center">
                  <p className="text-xs font-semibold text-text-primary">{stat.value}</p>
                  <p className="text-[9px] text-text-tertiary mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-[10px] text-text-tertiary">
              <Globe className="h-3 w-3" />
              <span>No live data available</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Realtime Events */}
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
            <div className="flex flex-col items-center justify-center h-full text-text-tertiary">
              <Activity className="h-8 w-8 mb-2 opacity-40" />
              <p className="text-sm">No events yet</p>
              <p className="text-xs mt-0.5">Real-time events will appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
