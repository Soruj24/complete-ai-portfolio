"use client";

import { FolderOpen, Search } from "lucide-react";
import { EmptyState, FilteredEmptyState } from "@/components/admin/shared-states";

interface Props {
  type: "no-projects" | "no-results";
  onClearFilters?: () => void;
  onAddProject?: () => void;
}

export function ProjectsEmptyState({ type, onClearFilters, onAddProject }: Props) {
  if (type === "no-results") {
    return <FilteredEmptyState onClear={onClearFilters} />;
  }

  return (
    <EmptyState
      icon={FolderOpen}
      title="No projects yet"
      description="Create your first project to get started"
      action={onAddProject ? { label: "Add Project", onClick: onAddProject } : undefined}
    />
  );
}
