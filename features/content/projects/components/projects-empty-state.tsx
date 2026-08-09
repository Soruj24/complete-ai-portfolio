"use client";

import { FolderOpen, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  type: "no-projects" | "no-results";
  onClearFilters?: () => void;
  onAddProject?: () => void;
}

export function ProjectsEmptyState({ type, onClearFilters, onAddProject }: Props) {
  if (type === "no-results") {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface border border-border-subtle mb-3">
          <Search className="h-6 w-6 text-text-tertiary" />
        </div>
        <p className="text-[13px] font-medium text-text-primary">No projects match your filters</p>
        <p className="text-[12px] text-text-tertiary mt-0.5">Try adjusting your search or filters</p>
        {onClearFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="mt-3 h-7 text-[12px]">
            Clear all filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface border border-border-subtle mb-3">
        <FolderOpen className="h-6 w-6 text-text-tertiary" />
      </div>
      <p className="text-[13px] font-medium text-text-primary">No projects yet</p>
      <p className="text-[12px] text-text-tertiary mt-0.5">Create your first project to get started</p>
      {onAddProject && (
        <Button size="sm" onClick={onAddProject} className="mt-3 h-7 text-[12px]">
          Add Project
        </Button>
      )}
    </div>
  );
}
