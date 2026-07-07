"use client";

import { Activity } from "lucide-react";
import { SkeletonCard } from "./skeleton-card";
import { EmptyState } from "./empty-state";
import { ErrorState } from "./error-state";
import { cn } from "@/lib/utils";
import type { SystemHealthStatus } from "@/shared/types/command-center";

interface SystemHealthCardProps {
  health?: SystemHealthStatus;
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
}

const statusColors: Record<string, { dot: string; bg: string; text: string }> = {
  healthy: { dot: "bg-emerald-500", bg: "bg-emerald-500/10", text: "text-emerald-500" },
  warning: { dot: "bg-amber-500", bg: "bg-amber-500/10", text: "text-amber-500" },
  error: { dot: "bg-red-500", bg: "bg-red-500/10", text: "text-red-500" },
};

const services = [
  { key: "database" as const, label: "Database" },
  { key: "storage" as const, label: "Storage" },
  { key: "performance" as const, label: "Performance" },
];

export function SystemHealthCard({ health, loading, error, onRetry }: SystemHealthCardProps) {
  return (
    <div className="rounded-xl border border-border-subtle bg-surface">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-border-subtle">
        <Activity className="h-4 w-4 text-text-tertiary" />
        <h2 className="text-sm font-semibold text-text-primary">System Health</h2>
        {health?.uptime && (
          <span className="ml-auto text-[10px] text-text-tertiary font-medium">
            {health.uptime}% uptime
          </span>
        )}
      </div>
      <div className="p-5">
        {error ? (
          <ErrorState onRetry={onRetry} className="py-6" />
        ) : loading ? (
          <SkeletonCard variant="health" />
        ) : !health ? (
          <EmptyState
            title="No health data"
            description="System status will appear here."
            icon={Activity}
            className="py-8"
          />
        ) : (
          <div className="space-y-4">
            {services.map((svc) => {
              const status = health[svc.key];
              const colors = statusColors[status] || statusColors.healthy;
              return (
                <div key={svc.key} className="flex items-center gap-3">
                  <span className={cn("h-2.5 w-2.5 rounded-full shrink-0", colors.dot)} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-text-primary">{svc.label}</p>
                    <p className="text-[11px] text-text-tertiary truncate mt-0.5">
                      {health.details[svc.key]}
                    </p>
                  </div>
                  <span className={cn(
                    "text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-full",
                    colors.bg, colors.text,
                  )}>
                    {status}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
