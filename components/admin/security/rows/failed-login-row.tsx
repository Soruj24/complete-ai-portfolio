"use client";

import { XCircle } from "lucide-react";
import type { LoginEntry } from "../types";

export function FailedLoginRow({ entry }: { entry: LoginEntry }) {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-lg bg-error/5 border border-error/10">
      <div className="p-1.5 rounded-lg bg-error/10">
        <XCircle className="h-3.5 w-3.5 text-error" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium text-text-primary">{entry.location}</span>
          <span className="text-[8px] text-text-tertiary font-mono">{entry.ip}</span>
        </div>
        <div className="flex items-center gap-2 text-[8px] text-text-tertiary font-mono">
          <span>{entry.device}</span>
          <span>{entry.browser}</span>
          {entry.reason && <span className="text-error">{entry.reason}</span>}
        </div>
      </div>
      <span className="text-[9px] text-text-tertiary shrink-0">{entry.timestamp}</span>
    </div>
  );
}
