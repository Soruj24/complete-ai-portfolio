"use client";

import { Clock } from "lucide-react";
import { TimelineItem } from "./timeline-item";
import { SkeletonCard } from "./skeleton-card";
import { EmptyState } from "./empty-state";
import { ErrorState } from "./error-state";
import type { ActivityItem } from "@/shared/types/command-center";

interface ActivityTimelineProps {
  items?: ActivityItem[];
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
}

export function ActivityTimeline({ items, loading, error, onRetry }: ActivityTimelineProps) {
  return (
    <div className="rounded-xl border border-border-subtle bg-surface">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-border-subtle">
        <Clock className="h-4 w-4 text-text-tertiary" />
        <h2 className="text-sm font-semibold text-text-primary">Recent Activity</h2>
      </div>
      <div className="px-2 py-1">
        {error ? (
          <ErrorState onRetry={onRetry} className="py-8" />
        ) : loading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} variant="timeline" />)
        ) : !items || items.length === 0 ? (
          <EmptyState
            title="No recent activity"
            description="Activity will appear here as you make changes."
            icon={Clock}
            className="py-10"
          />
        ) : (
          items.map((item) => (
            <TimelineItem
              key={item.id}
              type={item.type}
              description={item.description}
              entity={item.entity}
              timestamp={item.timestamp}
              user={item.user}
            />
          ))
        )}
      </div>
    </div>
  );
}
