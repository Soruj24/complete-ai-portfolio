"use client";

import { motion } from "framer-motion";
import type { CityData } from "@/components/admin/analytics/types";

export function CityRow({ item, index }: { item: CityData; index: number }) {
  return (
    <motion.tr key={`${item.name}-${index}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.03 }}
      className="group border-b border-border-subtle/50 last:border-0 hover:bg-surface-hover/50 transition-colors"
    >
      <td className="py-2.5 pr-3">
        <span className="text-xs font-semibold text-text-primary">{item.name}</span>
      </td>
      <td className="py-2.5 px-3 text-right hidden sm:table-cell">
        <span className="text-[10px] text-text-tertiary">{item.country}</span>
      </td>
      <td className="py-2.5 px-3 text-right">
        <span className="text-xs font-mono text-text-primary">{item.visitors.toLocaleString()}</span>
      </td>
      <td className="py-2.5 pl-3 text-right">
        <span className="text-[10px] font-mono text-text-tertiary">{item.duration}</span>
      </td>
    </motion.tr>
  );
}
