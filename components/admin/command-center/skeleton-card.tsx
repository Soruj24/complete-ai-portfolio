"use client";

import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  variant?: "stat" | "timeline" | "action" | "health";
}

export function SkeletonCard({ variant = "stat" }: SkeletonCardProps) {
  if (variant === "timeline") {
    return (
      <div className="flex items-start gap-2.5 py-2.5 px-3 animate-pulse">
        <div className="h-2 w-2 mt-1.5 rounded-full bg-border-subtle shrink-0" />
        <div className="flex-1 space-y-1.5">
          <div className="h-2.5 w-3/4 rounded bg-border-subtle" />
          <div className="h-2 w-1/2 rounded bg-border-subtle/60" />
        </div>
      </div>
    );
  }

  if (variant === "health") {
    return (
      <div className="space-y-3 animate-pulse">
        <div className="flex items-center gap-2.5">
          <div className="h-2 w-2 rounded-full bg-border-subtle" />
          <div className="flex-1 space-y-1">
            <div className="h-2.5 w-1/3 rounded bg-border-subtle" />
            <div className="h-2 w-2/3 rounded bg-border-subtle/60" />
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="h-2 w-2 rounded-full bg-border-subtle" />
          <div className="flex-1 space-y-1">
            <div className="h-2.5 w-1/3 rounded bg-border-subtle" />
            <div className="h-2 w-2/3 rounded bg-border-subtle/60" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "rounded-lg border border-border-subtle bg-surface p-4 animate-pulse",
      variant === "action" && "p-3",
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <div className="h-2.5 w-16 rounded bg-border-subtle" />
          <div className="h-5 w-20 rounded bg-border-subtle" />
          <div className="h-3.5 w-24 rounded bg-border-subtle/60" />
        </div>
        <div className="h-8 w-8 rounded-md bg-border-subtle" />
      </div>
    </div>
  );
}
