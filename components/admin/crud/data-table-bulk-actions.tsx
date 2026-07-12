"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Archive, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BulkAction, ResourceFeatures } from "@/types/admin";

interface Props {
  selected: string[];
  onSelectionChange: (ids: string[]) => void;
  onBulkAction?: (action: string, ids: string[]) => void;
  features: ResourceFeatures;
  bulkActions?: BulkAction[];
}

export function DataTableBulkActions({ selected, onSelectionChange, onBulkAction, features, bulkActions }: Props) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-accent/5 rounded-lg border border-accent/10">
      <span className="text-xs font-medium text-text-secondary mr-2">{selected.length} selected</span>
      {features.bulkDelete && (
        <Button variant="ghost" size="sm" onClick={() => onBulkAction?.("delete", selected)} className="h-7 text-xs gap-1 text-error hover:text-error hover:bg-error/10 rounded-md">
          <Trash2 className="h-3 w-3" /> Delete
        </Button>
      )}
      {features.bulkArchive && (
        <Button variant="ghost" size="sm" onClick={() => onBulkAction?.("archive", selected)} className="h-7 text-xs gap-1 text-warning hover:text-warning hover:bg-warning/10 rounded-md">
          <Archive className="h-3 w-3" /> Archive
        </Button>
      )}
      {features.bulkRestore && (
        <Button variant="ghost" size="sm" onClick={() => onBulkAction?.("restore", selected)} className="h-7 text-xs gap-1 text-success hover:text-success hover:bg-success/10 rounded-md">
          <RotateCcw className="h-3 w-3" /> Restore
        </Button>
      )}
      {bulkActions?.map((ba) => (
        <Button
          key={ba.action}
          variant="ghost" size="sm"
          onClick={() => onBulkAction?.(ba.action, selected)}
          className={cn("h-7 text-xs gap-1 rounded-md", ba.variant === "destructive" ? "text-error hover:text-error hover:bg-error/10" : "")}
        >
          {ba.icon && <ba.icon className="h-3 w-3" />}
          {ba.label}
        </Button>
      ))}
      <Button variant="ghost" size="sm" onClick={() => onSelectionChange([])} className="h-7 text-xs ml-auto rounded-md text-text-tertiary">
        Clear
      </Button>
    </div>
  );
}
