"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  action?: { label: string; onClick: () => void };
  className?: string;
}

export function EmptyState({
  title = "Nothing here yet",
  description = "No data available at the moment.",
  icon: Icon = Inbox,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-10 text-center", className)}>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface border border-border-subtle mb-3">
        <Icon className="h-5 w-5 text-text-tertiary" />
      </div>
      <p className="text-[13px] font-medium text-text-primary">{title}</p>
      <p className="text-[12px] text-text-tertiary mt-0.5 max-w-[200px]">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-3 text-[12px] font-medium text-accent hover:text-accent/80 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
