"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CountryData } from "@/components/admin/analytics/types";

export function CountryRow({ item, index }: { item: CountryData; index: number }) {
  return (
    <motion.tr key={item.code} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.03 }}
      className="group border-b border-border-subtle/50 last:border-0 hover:bg-surface-hover/50 transition-colors"
    >
      <td className="py-2.5 pr-3">
        <div className="flex items-center gap-2.5">
          <span className="text-base shrink-0">{item.flag}</span>
          <span className="text-xs font-semibold text-text-primary">{item.name}</span>
        </div>
      </td>
      <td className="py-2.5 px-3 text-right">
        <span className="text-xs font-mono text-text-primary">{item.visitors.toLocaleString()}</span>
      </td>
      <td className="py-2.5 px-3 hidden md:table-cell">
        <div className="flex items-center gap-2">
          <div className="h-1.5 flex-1 rounded-full bg-background overflow-hidden max-w-[100px]">
            <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${item.percentage * 2.5}%` }} />
          </div>
          <span className="text-[10px] font-mono text-text-tertiary w-10 text-right">{item.percentage}%</span>
        </div>
      </td>
      <td className="py-2.5 pl-3 text-right">
        <span className={cn("text-[10px] font-semibold inline-flex items-center gap-0.5", item.change >= 0 ? "text-success" : "text-error")}>
          {item.change >= 0 ? <ArrowUpRight className="h-2.5 w-2.5" /> : <ArrowDownRight className="h-2.5 w-2.5" />}
          {Math.abs(item.change)}%
        </span>
      </td>
    </motion.tr>
  );
}
