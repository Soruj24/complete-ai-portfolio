"use client";

import { motion } from "framer-motion";
import { WidgetShell } from "./widget-shell";
import { cn } from "@/lib/utils";
import type { UsageData } from "@/types/widgets";

interface ProgressWidgetProps {
  title: string;
  description?: string;
  data: UsageData[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  layout?: "stacked" | "grid";
}

export function ProgressWidget({ title, description, data, loading, error, onRetry, layout = "stacked" }: ProgressWidgetProps) {
  return (
    <WidgetShell title={title} description={description} loading={loading} error={error} onRetry={onRetry}>
      <div className={cn(layout === "grid" ? "grid grid-cols-2 gap-4" : "space-y-4")}>
        {data.map((item) => {
          const pct = Math.min(100, Math.round((item.used / item.total) * 100));
          return (
            <div key={item.label} className="space-y-1.5 group cursor-default">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary font-medium">{item.label}</span>
                <span className="text-text-primary font-semibold">{pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-surface-hover overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full transition-all group-hover:brightness-110"
                  style={{ backgroundColor: item.color }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-text-tertiary">
                <span>{item.used.toLocaleString()} {item.unit}</span>
                <span>{item.total.toLocaleString()} {item.unit}</span>
              </div>
            </div>
          );
        })}
      </div>
    </WidgetShell>
  );
}
