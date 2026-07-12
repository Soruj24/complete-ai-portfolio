"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { ProjectData } from "@/components/admin/analytics/types";

export function ProjectRow({ item, index }: { item: ProjectData; index: number }) {
  return (
    <motion.tr key={item._id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.03 }}
      className="group border-b border-border-subtle/50 last:border-0 hover:bg-surface-hover/50 transition-colors"
    >
      <td className="py-2.5 pr-3">
        <span className="text-xs font-semibold text-text-primary">{item.name}</span>
      </td>
      <td className="py-2.5 px-3 text-right">
        <span className="text-xs font-mono text-text-primary">{item.views.toLocaleString()}</span>
      </td>
      <td className="py-2.5 px-3 text-right">
        <span className="text-xs font-mono text-text-primary">{item.downloads > 0 ? item.downloads.toLocaleString() : "-"}</span>
      </td>
      <td className="py-2.5 pl-3 text-right">
        {item.trend > 0 ? (
          <span className="text-[10px] font-semibold text-success inline-flex items-center gap-0.5">
            <ArrowUpRight className="h-2.5 w-2.5" /> {Math.abs(item.trend)}%
          </span>
        ) : item.trend < 0 ? (
          <span className="text-[10px] font-semibold text-error inline-flex items-center gap-0.5">
            <ArrowDownRight className="h-2.5 w-2.5" /> {Math.abs(item.trend)}%
          </span>
        ) : (
          <span className="text-[10px] text-text-tertiary">-</span>
        )}
      </td>
    </motion.tr>
  );
}
