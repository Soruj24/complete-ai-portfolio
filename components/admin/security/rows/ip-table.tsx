"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ShieldX, Trash2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IPEntry } from "../types";

export function IPTable({ items, type }: { items: IPEntry[]; type: "whitelist" | "blacklist" }) {
  const Icon = type === "whitelist" ? ShieldCheck : ShieldX;
  const color = type === "whitelist" ? "text-success" : "text-error";
  const bg = type === "whitelist" ? "bg-success/10" : "bg-error/10";

  return (
    <div className="space-y-2 mt-2">
      {items.map((item, i) => (
        <motion.div key={item.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
          className="flex items-center gap-3 p-3 rounded-xl border border-border-subtle bg-surface-hover"
        >
          <div className={cn("p-1.5 rounded-lg", bg)}>
            <Icon className={cn("h-4 w-4", color)} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <code className="text-xs font-mono font-semibold text-text-primary">{item.address}</code>
              <Badge className={cn("text-[7px] px-1 py-0 rounded border-0", item.status === "active" ? "bg-success/10 text-success" : "bg-surface-hover text-text-tertiary")}>
                {item.status}
              </Badge>
            </div>
            <div className="flex items-center gap-3 mt-0.5 text-[9px] text-text-tertiary">
              <span>Reason: {item.reason}</span>
              <span>Added by: {item.addedBy}</span>
              {item.expiresAt && <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5" /> Expires {item.expiresAt}</span>}
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-text-tertiary hover:text-error">
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
