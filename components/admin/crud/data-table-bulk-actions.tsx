"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Archive, RotateCcw, X } from "lucide-react";
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
    <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-accent/5 rounded-lg border border-accent/10">
      <span className="text-[12px] font-medium text-text-secondary mr-1.5">{selected.length} selected</span>
      {features.bulkDelete && (
        <Button variant="ghost" size="sm" onClick={() => onBulkAction?.("delete", selected)} className="h-6 text-[11px] gap-1 text-error hover:text-error hover:bg-error/10 rounded-md px-2">
          <Trash2 className="h-3 w-3" /> Delete
        </Button>
      )}
      {features.bulkArchive && (
        <Button variant="ghost" size="sm" onClick={() => onBulkAction?.("archive", selected)} className="h-6 text-[11px] gap-1 text-warning hover:text-warning hover:bg-warning/10 rounded-md px-2">
          <Archive className="h-3 w-3" /> Archive
        </Button>
      )}
      {features.bulkRestore && (
        <Button variant="ghost" size="sm" onClick={() => onBulkAction?.("restore", selected)} className="h-6 text-[11px] gap-1 text-success hover:text-success hover:bg-success/10 rounded-md px-2">
          <RotateCcw className="h-3 w-3" /> Restore
        </Button>
      )}
      {bulkActions?.map((ba) => (
        <Button
          key={ba.action}
          variant="ghost" size="sm"
          onClick={() => onBulkAction?.(ba.action, selected)}
          className={cn("h-6 text-[11px] gap-1 rounded-md px-2", ba.variant === "destructive" ? "text-error hover:text-error hover:bg-error/10" : "")}
        >
          {ba.icon && <ba.icon className="h-3 w-3" />}
          {ba.label}
        </Button>
      ))}
      <Button variant="ghost" size="sm" onClick={() => onSelectionChange([])} className="h-6 text-[11px] ml-auto rounded-md text-text-tertiary px-2">
        <X className="h-3 w-3 mr-0.5" /> Clear
      </Button>
    </div>
  );
}
