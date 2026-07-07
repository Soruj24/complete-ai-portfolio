"use client";

import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Circle } from "lucide-react";

interface TimelineItemProps {
  type: "create" | "update" | "delete" | "message" | "publish";
  description: string;
  entity: string;
  timestamp: string;
  user: string;
}

const typeColors: Record<string, string> = {
  create: "text-emerald-500",
  update: "text-blue-500",
  delete: "text-red-500",
  message: "text-purple-500",
  publish: "text-amber-500",
};

const typeLabels: Record<string, string> = {
  create: "Created",
  update: "Updated",
  delete: "Deleted",
  message: "Message",
  publish: "Published",
};

export function TimelineItem({ type, description, entity, timestamp, user }: TimelineItemProps) {
  return (
    <div className="group flex items-start gap-3 py-2.5 px-3 rounded-lg hover:bg-surface-hover transition-colors">
      <div className="relative mt-1 shrink-0">
        <Circle className={cn("h-2.5 w-2.5 fill-current", typeColors[type] || "text-text-tertiary")} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-text-primary truncate">{description}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className={cn(
            "text-[10px] font-medium uppercase tracking-wider",
            typeColors[type] || "text-text-tertiary",
          )}>
            {typeLabels[type] || type}
          </span>
          <span className="text-[10px] text-text-tertiary">&middot;</span>
          <span className="text-[10px] text-text-tertiary capitalize">{entity}</span>
          <span className="text-[10px] text-text-tertiary">&middot;</span>
          <span className="text-[10px] text-text-tertiary">
            {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
          </span>
        </div>
      </div>
    </div>
  );
}
