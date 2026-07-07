"use client";

import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  variant?: "stat" | "timeline" | "action" | "health";
}

export function SkeletonCard({ variant = "stat" }: SkeletonCardProps) {
  if (variant === "timeline") {
    return (
      <div className="flex items-start gap-3 py-3 animate-pulse">
        <div className="h-2 w-2 mt-1.5 rounded-full bg-border-subtle shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-3/4 rounded bg-border-subtle" />
          <div className="h-2.5 w-1/2 rounded bg-border-subtle/60" />
        </div>
      </div>
    );
  }

  if (variant === "health") {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-border-subtle" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 w-1/3 rounded bg-border-subtle" />
            <div className="h-2.5 w-2/3 rounded bg-border-subtle/60" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-border-subtle" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 w-1/3 rounded bg-border-subtle" />
            <div className="h-2.5 w-2/3 rounded bg-border-subtle/60" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "rounded-xl border border-border-subtle bg-surface p-5 animate-pulse",
      variant === "action" && "p-4",
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <div className="h-3 w-16 rounded bg-border-subtle" />
          <div className="h-7 w-20 rounded bg-border-subtle" />
          <div className="h-5 w-24 rounded bg-border-subtle/60" />
        </div>
        <div className="h-10 w-10 rounded-lg bg-border-subtle" />
      </div>
    </div>
  );
}
