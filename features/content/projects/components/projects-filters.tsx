"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import type { ProjectFilterState, ProjectCategory } from "../types";
import { STATUS_OPTIONS, PRIORITY_OPTIONS, VIEW_OPTIONS } from "../constants";
import type { ViewMode } from "./project-grid";

interface Props {
  filters: ProjectFilterState;
  onFiltersChange: (partial: Partial<ProjectFilterState>) => void;
  categories: ProjectCategory[];
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
}

export function ProjectFilters({ filters, onFiltersChange, categories, view, onViewChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border-primary bg-surface-primary p-4">
      <div className="relative flex-1 min-w-[200px] max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
        <input
          type="text"
          placeholder="Search projects..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ search: e.target.value })}
          className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-accent"
        />
      </div>

      <select
        value={filters.status}
        onChange={(e) => onFiltersChange({ status: e.target.value as never })}
        className="rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent"
      >
        {STATUS_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      <select
        value={filters.category}
        onChange={(e) => onFiltersChange({ category: e.target.value })}
        className="rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent"
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.name}>{c.name}</option>
        ))}
      </select>

      <select
        value={filters.priority}
        onChange={(e) => onFiltersChange({ priority: e.target.value as never })}
        className="rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent"
      >
        {PRIORITY_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      <div className="hidden items-center gap-1 sm:flex">
        <button className="rounded-lg border border-border-primary p-2 text-text-tertiary transition-colors hover:bg-surface-hover hover:text-text-primary">
          <SlidersHorizontal size={16} />
        </button>
      </div>

      <div className="hidden rounded-lg border border-border-primary bg-surface-primary p-0.5 sm:flex">
        {VIEW_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onViewChange(opt.value as ViewMode)}
            className={`rounded-md p-1.5 transition-colors ${
              view === opt.value ? "bg-accent text-white" : "text-text-tertiary hover:text-text-primary"
            }`}
          >
            <opt.icon size={16} />
          </button>
        ))}
      </div>
    </div>
  );
}
