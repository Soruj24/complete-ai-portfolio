"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { EngagementData } from "./types";

export function EngagementCards({ items }: { items: EngagementData[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {items.map((item, i) => (
        <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
          className="p-3 rounded-xl border border-border-subtle bg-surface-hover text-center"
        >
          <p className="text-lg font-bold text-text-primary">{item.count.toLocaleString()}</p>
          <p className="text-[9px] text-text-tertiary mt-0.5">{item.label}</p>
          <div className="flex items-center justify-center gap-0.5 mt-1">
            <span className={cn("text-[9px] font-semibold", item.change >= 0 ? "text-success" : "text-error")}>
              {item.change >= 0 ? "+" : ""}{item.change}%
            </span>
            <span className="text-[8px] text-text-tertiary">vs {item.previous.toLocaleString()}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
