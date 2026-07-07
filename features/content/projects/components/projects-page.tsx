"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus, RefreshCw, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { toastSuccess } from "@/shared/utils/swal";
import { useProjects } from "../hooks/use-projects";
import { ProjectStats } from "./project-stats";
import { ProjectGrid, type ViewMode } from "./project-grid";
import { ProjectKanban } from "./project-kanban";
import { ProjectFilters } from "./projects-filters";
import { ProjectFormDialog } from "./project-form-dialog";
import type { Project } from "../types";

export function ProjectsPage() {
  const {
    stats, filtered, columns, categories, loading, error, filters, setFilters,
    updateStatus, addProject, updateProject, deleteProject, refresh,
  } = useProjects();
  const [view, setView] = useState<ViewMode>("grid");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleEdit = useCallback((project: Project) => {
    setEditingProject(project);
    setDialogOpen(true);
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Project",
      text: "Are you sure you want to delete this project? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      background: "var(--surface-primary)",
      color: "var(--text-primary)",
    });
    if (!result.isConfirmed) return;
    setDeleting(id);
    try {
      await deleteProject(id);
      toastSuccess("Deleted!", "Project has been deleted.");
    } finally {
      setDeleting(null);
    }
  }, [deleteProject]);

  const handleSubmit = useCallback(async (data: Partial<Project>) => {
    if (editingProject) {
      await updateProject(editingProject.id, data);
      toastSuccess("Updated!", "Project has been updated.");
    } else {
      await addProject(data);
      toastSuccess("Created!", "Project has been created.");
    }
  }, [editingProject, addProject, updateProject]);

  const handleClose = useCallback(() => {
    setDialogOpen(false);
    setEditingProject(null);
  }, []);

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
        <ProjectGrid projects={filtered} view={view} onViewChange={setView} loading={false} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <ProjectFormDialog
        open={dialogOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        project={editingProject}
      />
    </div>
  );
}
