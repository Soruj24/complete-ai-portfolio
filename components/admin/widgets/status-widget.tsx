"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle, Clock, Zap, Wifi, Database, Server as ServerIcon, Cpu, HardDrive, Activity, Globe } from "lucide-react";
import { WidgetShell } from "./widget-shell";
import { cn } from "@/lib/utils";
import type { StatusData } from "@/types/widgets";

interface StatusWidgetProps {
  title: string;
  description?: string;
  data: StatusData[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  layout?: "grid" | "list";
}

const statusConfig = {
  healthy: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
  warning: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10" },
  critical: { icon: XCircle, color: "text-error", bg: "bg-error/10" },
  offline: { icon: XCircle, color: "text-text-tertiary", bg: "bg-surface-hover" },
};

export function StatusWidget({ title, description, data, loading, error, onRetry, layout = "grid" }: StatusWidgetProps) {
  return (
    <WidgetShell title={title} description={description} loading={loading} error={error} onRetry={onRetry}>
      <div className={cn(layout === "grid" ? "grid grid-cols-2 gap-3" : "space-y-2")}>
        {data.map((item, i) => {
          const cfg = statusConfig[item.status];
          const Icon = cfg.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group cursor-default"
            >
              <div className={cn("flex items-start gap-3 p-3 rounded-lg transition-colors", cfg.bg, "hover:brightness-95 hover:dark:brightness-110")}>
                <div className={cn("p-1.5 rounded-md shrink-0", cfg.bg)}>
                  <Icon className={cn("h-4 w-4", cfg.color)} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-text-primary truncate">{item.label}</span>
                    <span className={cn("h-2 w-2 rounded-full shrink-0 animate-pulse", item.status === "healthy" ? "bg-success" : item.status === "warning" ? "bg-warning" : "bg-error")} />
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-[10px] text-text-tertiary">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {item.uptime}</span>
                    <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> {item.responseTime}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </WidgetShell>
  );
}
