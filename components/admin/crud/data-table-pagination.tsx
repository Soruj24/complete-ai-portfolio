"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

export function DataTablePagination({ page, pageSize, total, totalPages, onPageChange, onPageSizeChange }: Props) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className="text-xs text-text-tertiary">
          {total === 0 ? "0 results" : `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, total)} of ${total}`}
        </span>
        {onPageSizeChange && (
          <select
            value={pageSize}
            onChange={(e) => { onPageSizeChange(Number(e.target.value)); onPageChange(1); }}
            className="text-xs bg-surface border border-border-subtle rounded-md px-2 py-1 text-text-secondary"
          >
            {[10, 20, 50, 100].map((n) => (
              <option key={n} value={n}>{n} / page</option>
            ))}
          </select>
        )}
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" disabled={page <= 1} onClick={() => onPageChange(page - 1)} className="h-8 w-8 rounded-md">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
          let pageNum: number;
          if (totalPages <= 7) {
            pageNum = i + 1;
          } else if (page <= 4) {
            pageNum = i + 1;
          } else if (page >= totalPages - 3) {
            pageNum = totalPages - 6 + i;
          } else {
            pageNum = page - 3 + i;
          }
          return (
            <Button
              key={pageNum}
              variant={pageNum === page ? "default" : "ghost"}
              size="icon"
              onClick={() => onPageChange(pageNum)}
              className={cn("h-8 w-8 rounded-md text-xs", pageNum === page ? "bg-accent text-accent-foreground" : "")}
            >
              {pageNum}
            </Button>
          );
        })}
        <Button variant="ghost" size="icon" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} className="h-8 w-8 rounded-md">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
