"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReferrerData } from "@/components/admin/analytics/types";

export function ReferrerRow({ item, index }: { item: ReferrerData; index: number }) {
  return (
    <motion.tr key={item.domain} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.03 }}
      className="group border-b border-border-subtle/50 last:border-0 hover:bg-surface-hover/50 transition-colors"
    >
      <td className="py-2.5 pr-3">
        <div className="flex items-center gap-2.5">
          <ExternalLink className="h-3 w-3 text-text-tertiary shrink-0" />
          <span className="text-xs font-semibold text-text-primary">{item.domain}</span>
        </div>
      </td>
      <td className="py-2.5 px-3 text-right">
        <span className="text-xs font-mono text-text-primary">{item.visitors.toLocaleString()}</span>
      </td>
      <td className="py-2.5 px-3 text-right hidden md:table-cell">
        <div className="flex items-center gap-2 justify-end">
          <div className="h-1.5 w-20 rounded-full bg-background overflow-hidden">
            <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${item.percentage * 10}%` }} />
          </div>
          <span className="text-[10px] font-mono text-text-tertiary">{item.percentage}%</span>
        </div>
      </td>
      <td className="py-2.5 pl-3 text-right">
        <Badge variant="outline" className={cn(
          "text-[9px] px-1.5 py-0 rounded-full border-0 font-medium",
          parseInt(item.bounce) <= 25 ? "text-success bg-success/10" :
          parseInt(item.bounce) <= 40 ? "text-warning bg-warning/10" : "text-error bg-error/10",
        )}>
          {item.bounce}
        </Badge>
      </td>
    </motion.tr>
  );
}
