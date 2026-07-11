"use client";

import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus, RefreshCw, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { toastSuccess } from "@/shared/utils/swal";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";
import { ProjectStats } from "./project-stats";
import { ProjectGrid, type ViewMode } from "./project-grid";
import { ProjectKanban } from "./project-kanban";
import { ProjectFilters } from "./projects-filters";
import { ProjectFormDialog } from "./project-form-dialog";
import type { Project, ProjectCategory, ProjectFilterState, ProjectStatus, KanbanColumn, ProjectStats as ProjectStatsType } from "../types";

export function ProjectsPage() {
  const { data: projectsRes, isLoading, error, refetch } = useGetAdminResourceQuery({ resource: "projects" });
  const { data: catsRes } = useGetAdminResourceQuery({ resource: "project-categories" });

  const projects: Project[] = useMemo(() => (projectsRes?.data ?? []) as Project[], [projectsRes]);
  const categories: ProjectCategory[] = useMemo(() => (catsRes?.data ?? []) as ProjectCategory[], [catsRes]);

  const [filters, setFilters] = useState<ProjectFilterState>({ search: "", status: "all", priority: "all", category: "all", sort: "date", order: "desc" });
  const [view, setView] = useState<ViewMode>("grid");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return projects.filter((p: Project) => {
      if (filters.search && !p.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.status && filters.status !== "all" && p.status !== filters.status) return false;
      if (filters.priority && filters.priority !== "all" && p.priority !== filters.priority) return false;
      if (filters.category && filters.category !== "all" && p.category !== filters.category) return false;
      return true;
    });
  }, [projects, filters]);

  const stats: ProjectStatsType | null = useMemo(() => {
    if (!projects.length) return null;
    return {
      total: projects.length,
      published: projects.filter((p: Project) => p.status === "published").length,
      inProgress: projects.filter((p: Project) => p.status === "in-progress").length,
      draft: projects.filter((p: Project) => p.status === "draft").length,
      archived: projects.filter((p: Project) => p.status === "archived").length,
      featured: projects.filter((p: Project) => p.featured).length,
      totalViews: projects.reduce((s: number, p: Project) => s + (p.views ?? 0), 0),
      avgRating: projects.length ? Math.round(projects.reduce((s: number, p: Project) => s + (p.rating ?? 0), 0) / projects.length * 10) / 10 : 0,
      totalHours: projects.reduce((s: number, p: Project) => s + (p.hoursSpent ?? 0), 0),
    };
  }, [projects]);

  const columns: KanbanColumn[] = useMemo(() => {
    const statusOrder: ProjectStatus[] = ["in-progress", "draft", "review", "published", "archived"];
    const labels: Record<string, string> = {
      "in-progress": "In Progress",
      draft: "Draft",
      review: "Review",
      published: "Published",
      archived: "Archived",
    };
    return statusOrder.map((status) => ({
      id: status,
      title: labels[status] ?? status,
      items: projects.filter((p: Project) => p.status === status),
    }));
  }, [projects]);

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
      await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      toastSuccess("Deleted!", "Project has been deleted.");
      refetch();
    } finally {
      setDeleting(null);
    }
  }, [refetch]);

  const handleSubmit = useCallback(async (data: Partial<Project>) => {
    if (editingProject) {
      await fetch(`/api/admin/projects/${editingProject.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      toastSuccess("Updated!", "Project has been updated.");
    } else {
      await fetch("/api/admin/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      toastSuccess("Created!", "Project has been created.");
    }
    refetch();
  }, [editingProject, refetch]);

  const handleClose = useCallback(() => {
    setDialogOpen(false);
    setEditingProject(null);
  }, []);

  const updateStatus = useCallback(async (id: string, status: ProjectStatus) => {
    await fetch(`/api/admin/projects/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    refetch();
  }, [refetch]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-text-tertiary">
        <p className="text-lg font-medium text-error">Failed to load projects</p>
        <p className="mt-1 text-sm">{String(error)}</p>
        <button onClick={() => refetch()} className="mt-4 flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-white transition-colors hover:bg-accent-hover">
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
            onClick={() => refetch()}
            className="flex items-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-hover"
          >
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={() => setDialogOpen(true)} className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-white transition-colors hover:bg-accent-hover">
            <Plus size={16} /> New Project
          </button>
        </div>
      </div>

      <ProjectStats stats={stats} loading={isLoading} />

      <ProjectFilters
        filters={filters}
        onFiltersChange={(partial) => setFilters((prev) => ({ ...prev, ...partial }))}
        categories={categories}
        view={view}
        onViewChange={setView}
      />

      {isLoading && filtered.length === 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_: unknown, i: number) => (
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
