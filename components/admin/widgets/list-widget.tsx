"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { WidgetShell } from "./widget-shell";
import { cn } from "@/lib/utils";
import type { ListItem } from "@/types/widgets";

interface ListWidgetProps {
  title: string;
  description?: string;
  data: ListItem[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  maxItems?: number;
  formatValue?: (v: number) => string;
}

export function ListWidget({ title, description, data, loading, error, onRetry, maxItems = 5, formatValue }: ListWidgetProps) {
  const items = data.slice(0, maxItems);
  const maxVal = Math.max(...items.map((i) => i.value), 1);

  return (
    <WidgetShell title={title} description={description} loading={loading} error={error} onRetry={onRetry}>
      <div className="space-y-2">
        {items.map((item, i) => {
          const barWidth = (item.value / maxVal) * 100;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group cursor-default"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="text-[10px] font-medium text-text-tertiary w-4 shrink-0 text-right">{i + 1}</span>
                  {item.image && (
                    <div className="h-6 w-6 rounded-md bg-surface-hover overflow-hidden shrink-0">
                      <img src={item.image} alt="" className="h-full w-full object-cover" />
                    </div>
                  )}
                  <span className="text-text-primary font-medium truncate">{item.label}</span>
                  {item.secondary && <span className="text-text-tertiary truncate hidden sm:inline">{item.secondary}</span>}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-semibold text-text-primary">{formatValue ? formatValue(item.value) : item.value.toLocaleString()}</span>
                  {item.trend !== undefined && (
                    <span className={cn("flex items-center text-[10px]", item.trend >= 0 ? "text-success" : "text-error")}>
                      {item.trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    </span>
                  )}
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-surface-hover overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${barWidth}%` }}
                  transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                  className="h-full rounded-full bg-accent/60 group-hover:bg-accent/80 transition-colors"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </WidgetShell>
  );
}
