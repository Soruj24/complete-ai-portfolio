"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ShieldAlert, Info, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AuditLog } from "../types";

const severityConfig = {
  info: { icon: Info, color: "text-accent", bg: "bg-accent/10" },
  warning: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10" },
  critical: { icon: ShieldAlert, color: "text-error", bg: "bg-error/10" },
};

export function AuditLogRow({ log }: { log: AuditLog }) {
  const sev = severityConfig[log.severity];
  const SevIcon = sev.icon;
  return (
    <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-surface-hover transition-colors group"
    >
      <div className={cn("p-1.5 rounded-lg mt-0.5", sev.bg)}>
        <SevIcon className={cn("h-3.5 w-3.5", sev.color)} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Badge className={cn("text-[7px] px-1 py-0 rounded border-0 font-medium", sev.bg, sev.color)}>
            {log.action}
          </Badge>
          <span className="text-[10px] font-medium text-text-primary">{log.user}</span>
          <span className="text-[9px] text-text-tertiary">{log.resource}</span>
        </div>
        <p className="text-[9px] text-text-tertiary mt-0.5">{log.details}</p>
        <div className="flex items-center gap-2 mt-1 text-[8px] text-text-tertiary font-mono">
          <Globe className="h-2.5 w-2.5" /> {log.ip}
        </div>
      </div>
      <span className="text-[9px] text-text-tertiary shrink-0">{log.timestamp}</span>
    </motion.div>
  );
}
