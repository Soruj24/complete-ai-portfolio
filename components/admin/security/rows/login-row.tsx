"use client";

import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LoginEntry } from "../types";

export function LoginRow({ entry }: { entry: LoginEntry }) {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface-hover transition-colors">
      <div className={cn("p-1.5 rounded-lg", entry.status === "success" ? "bg-success/10" : "bg-error/10")}>
        {entry.status === "success" ? <CheckCircle2 className="h-3.5 w-3.5 text-success" /> : <XCircle className="h-3.5 w-3.5 text-error" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium text-text-primary">{entry.location}</span>
          <Badge className={cn(
            "text-[7px] px-1 py-0 rounded border-0 font-medium",
            entry.status === "success" ? "bg-success/10 text-success" : "bg-error/10 text-error",
          )}>
            {entry.status}
          </Badge>
        </div>
        <div className="flex items-center gap-2 mt-0.5 text-[8px] text-text-tertiary font-mono">
          <span>{entry.ip}</span>
          <span>{entry.device}</span>
          <span>{entry.browser}</span>
          {entry.reason && <span className="text-warning">{entry.reason}</span>}
        </div>
      </div>
      <span className="text-[9px] text-text-tertiary shrink-0">{entry.timestamp}</span>
    </div>
  );
}
