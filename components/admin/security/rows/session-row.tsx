"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Monitor, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Session } from "../types";

export function SessionRow({ session }: { session: Session }) {
  return (
    <div className={cn(
      "flex items-center gap-3 p-3 rounded-xl border transition-all",
      session.isCurrent ? "border-accent/20 bg-accent/5" : "border-border-subtle bg-surface-hover",
    )}>
      <div className="p-2 rounded-lg bg-background">
        <Monitor className="h-4 w-4 text-text-secondary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-text-primary">{session.device}</span>
          {session.isCurrent && <Badge className="text-[7px] px-1 py-0 rounded border-0 bg-accent/10 text-accent">Current</Badge>}
          {session.isTrusted && <Badge variant="outline" className="text-[7px] px-1 py-0 rounded border-border-subtle text-text-tertiary">Trusted</Badge>}
        </div>
        <div className="flex items-center gap-3 mt-0.5 text-[9px] text-text-tertiary font-mono">
          <span>{session.browser} on {session.os}</span>
          <span>{session.ip}</span>
          <span>{session.location}</span>
        </div>
      </div>
      <div className="text-right text-[9px] text-text-tertiary shrink-0">
        <p>Active {session.lastActive}</p>
        <p className="mt-0.5">Since {session.createdAt}</p>
      </div>
      {!session.isCurrent && (
        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-text-tertiary hover:text-error">
          <XCircle className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
}
