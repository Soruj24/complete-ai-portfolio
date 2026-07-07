"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Users, Globe, ArrowUp, ArrowDown, MousePointerClick, Download, Search, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateRealtimeEvent, type RealtimeEvent } from "./data";

const typeConfig = {
  pageview: { icon: Eye, color: "text-accent", bg: "bg-accent/10", label: "Page View" },
  click: { icon: MousePointerClick, color: "text-amber-500", bg: "bg-amber-500/10", label: "Click" },
  download: { icon: Download, color: "text-success", bg: "bg-success/10", label: "Download" },
  search: { icon: Search, color: "text-purple-500", bg: "bg-purple-500/10", label: "Search" },
  visit: { icon: Users, color: "text-info", bg: "bg-info/10", label: "Visit" },
};

export function RealtimeSection() {
  const [liveCount, setLiveCount] = useState(0);
  const [peak, setPeak] = useState(142);
  const [trend, setTrend] = useState<"up" | "down">("up");
  const [events, setEvents] = useState<RealtimeEvent[]>([]);
  const [todayTotal, setTodayTotal] = useState(0);
  const eventsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newVal = Math.floor(Math.random() * 35) + 8;
      setLiveCount(newVal);
      setTrend(Math.random() > 0.5 ? "up" : "down");
      if (newVal > peak) setPeak(newVal);
      setTodayTotal((prev) => prev + Math.floor(Math.random() * 3) + 1);

      const newEvent = generateRealtimeEvent();
      setEvents((prev) => [newEvent, ...prev].slice(0, 50));
    }, 2500);
    return () => clearInterval(interval);
  }, [peak]);

  useEffect(() => {
    eventsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [events]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Live Visitors */}
      <Card className="border-border-subtle bg-surface lg:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            Live Visitors
          </CardTitle>
          <CardDescription>Real-time active users on your site</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-end gap-3">
              <motion.div
                key={liveCount}
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-5xl font-bold text-text-primary"
              >
                {liveCount}
              </motion.div>
              <div className={cn("flex items-center gap-1 mb-1.5", trend === "up" ? "text-success" : "text-error")}>
                {trend === "up" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Peak Today", value: peak, color: "text-amber-500" },
                { label: "Total Today", value: todayTotal.toLocaleString(), color: "text-accent" },
                { label: "Avg Session", value: "4m 12s", color: "text-info" },
              ].map((stat) => (
                <div key={stat.label} className="p-2.5 rounded-lg bg-surface-hover text-center">
                  <p className="text-xs font-semibold text-text-primary">{stat.value}</p>
                  <p className="text-[9px] text-text-tertiary mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-[10px] text-text-tertiary">
              <Globe className="h-3 w-3" />
              <span>18 countries currently active</span>
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
            <AnimatePresence initial={false}>
              {events.map((event) => {
                const cfg = typeConfig[event.type];
                const Icon = cfg.icon;
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, height: 0, x: -20 }}
                    animate={{ opacity: 1, height: "auto", x: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-hover transition-colors"
                  >
                    <div className={cn("p-1.5 rounded-lg shrink-0", cfg.bg)}>
                      <Icon className={cn("h-3.5 w-3.5", cfg.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Badge className={cn("text-[8px] px-1 py-0 rounded border-0 font-medium", cfg.bg, cfg.color)}>
                          {cfg.label}
                        </Badge>
                        <span className="text-xs text-text-primary truncate">{event.page}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] text-text-tertiary">
                        <span>{event.country}</span>
                        <span>⏱ {event.duration}</span>
                      </div>
                    </div>
                    <span className="text-[9px] text-text-tertiary/60 shrink-0 font-mono">{event.timestamp}</span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            <div ref={eventsEndRef} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
