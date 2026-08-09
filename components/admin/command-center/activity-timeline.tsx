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
    <div className="rounded-lg border border-border-subtle bg-surface">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border-subtle">
        <Clock className="h-3.5 w-3.5 text-text-tertiary" />
        <h2 className="text-[13px] font-medium text-text-primary">Recent Activity</h2>
      </div>
      <div className="px-1 py-1">
        {error ? (
          <ErrorState onRetry={onRetry} className="py-6" />
        ) : loading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} variant="timeline" />)
        ) : !items || items.length === 0 ? (
          <EmptyState
            title="No recent activity"
            description="Activity will appear here as you make changes."
            icon={Clock}
            className="py-8"
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
