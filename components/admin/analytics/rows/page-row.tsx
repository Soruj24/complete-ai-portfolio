"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import type { PageData } from "@/components/admin/analytics/types";

export function PageRow({ item, index }: { item: PageData; index: number }) {
  return (
    <motion.tr key={item.path} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.03 }}
      className="group border-b border-border-subtle/50 last:border-0 hover:bg-surface-hover/50 transition-colors"
    >
      <td className="py-2.5 pr-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded-md bg-accent/10 shrink-0">
            <FileText className="h-3 w-3 text-accent" />
          </div>
          <div>
            <span className="text-xs font-semibold text-text-primary">{item.title}</span>
            <span className="text-[9px] font-mono text-text-tertiary block">{item.path}</span>
          </div>
        </div>
      </td>
      <td className="py-2.5 px-3 text-right">
        <span className="text-xs font-mono text-text-primary">{item.views.toLocaleString()}</span>
      </td>
      <td className="py-2.5 px-3 text-right hidden sm:table-cell">
        <span className="text-[10px] font-mono text-text-tertiary">{item.visitors.toLocaleString()}</span>
      </td>
    </motion.tr>
  );
}
