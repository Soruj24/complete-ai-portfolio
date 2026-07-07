"use client";

import { useRouter } from "next/navigation";
import { FileEdit, FileText } from "lucide-react";
import { EmptyState } from "./empty-state";
import { SkeletonCard } from "./skeleton-card";
import { ErrorState } from "./error-state";
import { formatDistanceToNow } from "date-fns";
import type { DraftItem } from "@/shared/types/command-center";

interface DraftsSectionProps {
  drafts?: DraftItem[];
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
}

export function DraftsSection({ drafts, loading, error, onRetry }: DraftsSectionProps) {
  const router = useRouter();

  return (
    <div className="rounded-xl border border-border-subtle bg-surface">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-border-subtle">
        <FileEdit className="h-4 w-4 text-text-tertiary" />
        <h2 className="text-sm font-semibold text-text-primary">Drafts & Scheduled</h2>
        {drafts && drafts.length > 0 && (
          <span className="ml-auto text-[10px] font-medium text-text-tertiary">{drafts.length} items</span>
        )}
      </div>
      <div className="px-2 py-1">
        {error ? (
          <ErrorState onRetry={onRetry} className="py-8" />
        ) : loading ? (
          Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} variant="timeline" />)
        ) : !drafts || drafts.length === 0 ? (
          <EmptyState
            title="No drafts"
            description="All content is published and up to date."
            icon={FileText}
            className="py-10"
          />
        ) : (
          drafts.map((draft) => (
            <button
              key={draft.id}
              onClick={() => router.push(draft.href)}
              className="flex items-start gap-3 w-full text-left py-2.5 px-3 rounded-lg hover:bg-surface-hover transition-colors group"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-amber-500/10 text-amber-500 mt-0.5">
                {draft.type === "project" ? (
                  <FileText className="h-3.5 w-3.5" />
                ) : (
                  <FileEdit className="h-3.5 w-3.5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary truncate group-hover:text-accent transition-colors">{draft.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-medium text-amber-500 uppercase tracking-wider">{draft.status}</span>
                  <span className="text-[10px] text-text-tertiary">&middot;</span>
                  <span className="text-[10px] text-text-tertiary capitalize">{draft.type}</span>
                  <span className="text-[10px] text-text-tertiary">&middot;</span>
                  <span className="text-[10px] text-text-tertiary">
                    {formatDistanceToNow(new Date(draft.updatedAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
