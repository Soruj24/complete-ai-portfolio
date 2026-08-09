"use client";

import { Search, LayoutGrid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { STATUS_OPTIONS, SORT_OPTIONS } from "../constants";
import type { SortOption } from "../types";
import type { ProjectCategory } from "../types";

interface Props {
  search: string;
  statusFilter: string;
  categoryFilter: string;
  techFilter: string;
  sort: SortOption;
  viewMode: "table" | "grid";
  categories: ProjectCategory[];
  technologies: string[];
  onSearchChange: (v: string) => void;
  onStatusFilterChange: (v: string) => void;
  onCategoryFilterChange: (v: string) => void;
  onTechFilterChange: (v: string) => void;
  onSortChange: (v: SortOption) => void;
  onViewModeChange: (v: "table" | "grid") => void;
}

export function ProjectsToolbar({
  search,
  statusFilter,
  categoryFilter,
  techFilter,
  sort,
  viewMode,
  categories,
  technologies,
  onSearchChange,
  onStatusFilterChange,
  onCategoryFilterChange,
  onTechFilterChange,
  onSortChange,
  onViewModeChange,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative flex-1 min-w-[180px] max-w-xs">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-tertiary" />
        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8 h-8 text-[13px] rounded-md border-border-subtle bg-surface"
        />
      </div>

      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="h-8 text-[13px] rounded-md border-border-subtle bg-surface w-[130px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} className="text-[13px]">
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
        <SelectTrigger className="h-8 text-[13px] rounded-md border-border-subtle bg-surface w-[140px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="text-[13px]">All Categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.id || cat.name} value={cat.name} className="text-[13px]">
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {technologies.length > 0 && (
        <Select value={techFilter} onValueChange={onTechFilterChange}>
          <SelectTrigger className="h-8 text-[13px] rounded-md border-border-subtle bg-surface w-[140px]">
            <SelectValue placeholder="Technology" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-[13px]">All Tech</SelectItem>
            {technologies.map((tech) => (
              <SelectItem key={tech} value={tech} className="text-[13px]">
                {tech}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Select value={sort} onValueChange={(v) => onSortChange(v as SortOption)}>
        <SelectTrigger className="h-8 text-[13px] rounded-md border-border-subtle bg-surface w-[140px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} className="text-[13px]">
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex rounded-md border border-border-subtle bg-surface p-0.5">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onViewModeChange("table")}
          className={cn(
            "h-7 w-7 rounded-sm",
            viewMode === "table" && "bg-accent text-accent-foreground"
          )}
        >
          <List className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onViewModeChange("grid")}
          className={cn(
            "h-7 w-7 rounded-sm",
            viewMode === "grid" && "bg-accent text-accent-foreground"
          )}
        >
          <LayoutGrid className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
