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
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface border border-border-subtle mb-4">
        <Icon className="h-6 w-6 text-text-tertiary" />
      </div>
      <p className="text-sm font-semibold text-text-primary">{title}</p>
      <p className="text-xs text-text-tertiary mt-1 max-w-[200px]">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 text-xs font-medium text-accent hover:text-accent/80 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
