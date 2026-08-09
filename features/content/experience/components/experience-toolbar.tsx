"use client";

import { Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EMPLOYMENT_LABELS, EMPLOYMENT_TYPES } from "../types";

interface Props {
  search: string;
  typeFilter: string;
  selected: string[];
  onSearchChange: (v: string) => void;
  onTypeFilterChange: (v: string) => void;
  onBulkDelete: () => void;
  onClearSelection: () => void;
}

export function ExperienceToolbar({
  search,
  typeFilter,
  selected,
  onSearchChange,
  onTypeFilterChange,
  onBulkDelete,
  onClearSelection,
}: Props) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-tertiary" />
          <Input
            placeholder="Search experience..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 h-8 text-[13px] rounded-md border-border-subtle bg-surface"
          />
        </div>

        <div className="flex flex-wrap gap-1 rounded-md border border-border-subtle bg-surface p-0.5">
          <button
            onClick={() => onTypeFilterChange("all")}
            className={`rounded-sm px-2.5 py-1 text-[11px] font-medium transition-colors ${
              typeFilter === "all" ? "bg-accent text-accent-foreground" : "text-text-tertiary hover:text-text-primary"
            }`}
          >
            All
          </button>
          {EMPLOYMENT_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => onTypeFilterChange(t)}
              className={`rounded-sm px-2.5 py-1 text-[11px] font-medium transition-colors ${
                typeFilter === t ? "bg-accent text-accent-foreground" : "text-text-tertiary hover:text-text-primary"
              }`}
            >
              {EMPLOYMENT_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      {selected.length > 0 && (
        <div className="flex items-center gap-2 px-3 py-2 bg-accent/5 rounded-lg border border-accent/10">
          <span className="text-[12px] font-medium text-text-secondary">{selected.length} selected</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onBulkDelete}
            className="h-6 text-[11px] gap-1 text-red-500 hover:text-red-500 hover:bg-red-500/10 rounded-md px-2"
          >
            <Trash2 className="h-3 w-3" /> Delete
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            className="h-6 text-[11px] ml-auto rounded-md text-text-tertiary px-2"
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  );
}
