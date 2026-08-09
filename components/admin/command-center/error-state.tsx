"use client";

import { cn } from "@/lib/utils";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  description = "Failed to load data. Please try again.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-10 text-center", className)}>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-error/10 mb-3">
        <AlertTriangle className="h-5 w-5 text-error" />
      </div>
      <p className="text-[13px] font-medium text-text-primary">{title}</p>
      <p className="text-[12px] text-text-tertiary mt-0.5 max-w-[220px]">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-accent hover:text-accent/80 transition-colors"
        >
          <RefreshCw className="h-3 w-3" />
          Try again
        </button>
      )}
    </div>
  );
}
