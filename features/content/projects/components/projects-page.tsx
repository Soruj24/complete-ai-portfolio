"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, RefreshCw } from "lucide-react";
import { useProjects } from "../hooks/use-projects";
import { ProjectStats } from "./project-stats";
import { ProjectGrid, type ViewMode } from "./project-grid";
import { ProjectKanban } from "./project-kanban";
import { ProjectFilters } from "./projects-filters";
import { ProjectFormDialog } from "./project-form-dialog";

export function ProjectsPage() {
  const {
    stats, filtered, columns, categories, loading, error, filters, setFilters, updateStatus, addProject, refresh,
  } = useProjects();
  const [view, setView] = useState<ViewMode>("grid");
  const [dialogOpen, setDialogOpen] = useState(false);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-text-tertiary">
        <p className="text-lg font-medium text-error">Failed to load projects</p>
        <p className="mt-1 text-sm">{error}</p>
        <button onClick={refresh} className="mt-4 flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-white transition-colors hover:bg-accent-hover">
          <RefreshCw size={14} /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Projects</h1>
          <p className="text-sm text-text-tertiary">Manage your portfolio projects</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={refresh}
            className="flex items-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-hover"
          >
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={() => setDialogOpen(true)} className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-white transition-colors hover:bg-accent-hover">
            <Plus size={16} /> New Project
          </button>
        </div>
      </div>

      <ProjectStats stats={stats} loading={loading} />

      <ProjectFilters
        filters={filters}
        onFiltersChange={setFilters}
        categories={categories}
        view={view}
        onViewChange={setView}
      />

      {loading && filtered.length === 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 animate-pulse rounded-xl bg-surface-hover" />
          ))}
        </div>
      ) : view === "kanban" ? (
        <ProjectKanban columns={columns} onStatusChange={updateStatus} />
      ) : (
        <ProjectGrid projects={filtered} view={view} onViewChange={setView} loading={false} />
      )}

      <ProjectFormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onSubmit={async (d) => { await addProject(d); }} />
    </div>
  );
}
