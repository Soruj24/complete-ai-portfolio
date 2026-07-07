"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Users, ArrowUp, ArrowDown } from "lucide-react";
import { WidgetShell } from "./widget-shell";
import { cn } from "@/lib/utils";

interface RealtimeWidgetProps {
  title: string;
  description?: string;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function RealtimeWidget({ title, description, loading, error, onRetry }: RealtimeWidgetProps) {
  const [count, setCount] = useState(0);
  const [peak, setPeak] = useState(142);
  const [trend, setTrend] = useState<"up" | "down">("up");

  useEffect(() => {
    const interval = setInterval(() => {
      const newVal = Math.floor(Math.random() * 30) + 5;
      setCount(newVal);
      setTrend(Math.random() > 0.5 ? "up" : "down");
      if (newVal > peak) setPeak(newVal);
    }, 2000);
    return () => clearInterval(interval);
  }, [peak]);

  return (
    <WidgetShell title={title} description={description} loading={loading} error={error} onRetry={onRetry}>
      <div className="space-y-4">
        <div className="flex items-end gap-4">
          <motion.div
            key={count}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl font-bold text-text-primary"
          >
            {count}
          </motion.div>
          <div className={cn("flex items-center gap-1 mb-1.5 text-sm font-semibold", trend === "up" ? "text-success" : "text-error")}>
            {trend === "up" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            Active Now
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Peak Today", value: peak, icon: ArrowUp, color: "text-warning" },
            { label: "Avg Session", value: "4m 12s", icon: Activity, color: "text-accent" },
            { label: "Bounce Rate", value: "32%", icon: Users, color: "text-info" },
          ].map((stat) => (
            <div key={stat.label} className="p-2.5 rounded-lg bg-surface-hover text-center">
              <stat.icon className={cn("h-3.5 w-3.5 mx-auto mb-1", stat.color)} />
              <p className="text-xs font-semibold text-text-primary">{stat.value}</p>
              <p className="text-[9px] text-text-tertiary mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-text-tertiary">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span>Live data updating every 2 seconds</span>
        </div>
      </div>
    </WidgetShell>
  );
}
