"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Plus, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects } from "../hooks/use-projects";
import { ProjectsStats } from "./projects-stats";
import { ProjectsToolbar } from "./projects-toolbar";
import { ProjectsTable } from "./projects-table";
import { ProjectsGrid } from "./projects-grid";
import { ProjectsPagination } from "./projects-pagination";
import { ProjectsEmptyState } from "./projects-empty-state";
import { ProjectDeleteDialog } from "./project-delete-dialog";
import type { Project } from "../types";

export function ProjectsPage() {
  const router = useRouter();
  const {
    projects,
    filteredProjects,
    paginatedProjects,
    categories,
    technologies,
    stats,
    loading,
    error,
    search,
    statusFilter,
    categoryFilter,
    techFilter,
    sort,
    page,
    pageSize,
    selected,
    viewMode,
    totalPages,
    totalResults,
    setSearch,
    setStatusFilter,
    setCategoryFilter,
    setTechFilter,
    setSort,
    setPage,
    setPageSize,
    setSelected,
    setViewMode,
    toggleSelectAll,
    toggleSelect,
    fetchProjects,
    deleteProject,
    bulkDelete,
    toggleFeatured,
    toggleStatus,
    duplicateProject,
  } = useProjects();

  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [bulkDeleteTarget, setBulkDeleteTarget] = useState<string[] | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [sortKey, setSortKey] = useState("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const handleSort = useCallback((key: string) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }, [sortKey]);

  const handleEdit = useCallback((project: Project) => {
    router.push(`/admin/projects/editor/${project.id}`);
  }, [router]);

  const handleAddNew = useCallback(() => {
    router.push("/admin/projects/editor");
  }, [router]);

  const handleDeleteClick = useCallback((id: string) => {
    setDeleteTarget(id);
    setBulkDeleteTarget(null);
  }, []);

  const handleBulkDeleteClick = useCallback(() => {
    if (selected.length === 0) return;
    setBulkDeleteTarget(selected);
    setDeleteTarget(null);
  }, [selected]);

  const handleConfirmDelete = useCallback(async () => {
    setDeleteLoading(true);
    try {
      if (bulkDeleteTarget) {
        await bulkDelete(bulkDeleteTarget);
        setBulkDeleteTarget(null);
      } else if (deleteTarget) {
        await deleteProject(deleteTarget);
        setDeleteTarget(null);
      }
    } catch {
      // error handled by hook
    } finally {
      setDeleteLoading(false);
    }
  }, [bulkDeleteTarget, deleteTarget, bulkDelete, deleteProject]);

  const clearFilters = useCallback(() => {
    setSearch("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setTechFilter("all");
  }, [setSearch, setStatusFilter, setCategoryFilter, setTechFilter]);

  const hasFilters = search || statusFilter !== "all" || categoryFilter !== "all" || techFilter !== "all";

  const deleteProjectName = deleteTarget
    ? projects.find((p) => p.id === deleteTarget)?.title || ""
    : "";
  const bulkDeleteNames = bulkDeleteTarget
    ? bulkDeleteTarget.map((id) => projects.find((p) => p.id === id)?.title || "").filter(Boolean)
    : [];

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-[14px] font-medium text-red-500">Failed to load projects</p>
        <p className="text-[12px] text-text-tertiary mt-1">{error}</p>
        <Button variant="outline" size="sm" onClick={fetchProjects} className="mt-4 h-8 text-[12px]">
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-semibold text-text-primary">Projects</h1>
          <p className="text-[12px] text-text-tertiary mt-0.5">Manage and organize your portfolio projects</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={fetchProjects} disabled={loading} className="h-8 w-8">
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          </Button>
          <Button size="sm" onClick={handleAddNew} className="h-8 text-[12px] gap-1.5">
            <Plus className="h-3.5 w-3.5" /> Add Project
          </Button>
        </div>
      </div>

      {/* Stats */}
      <ProjectsStats stats={stats} loading={loading} />

      {/* Toolbar */}
      <ProjectsToolbar
        search={search}
        statusFilter={statusFilter}
        categoryFilter={categoryFilter}
        techFilter={techFilter}
        sort={sort}
        viewMode={viewMode}
        categories={categories}
        technologies={technologies}
        onSearchChange={setSearch}
        onStatusFilterChange={setStatusFilter}
        onCategoryFilterChange={setCategoryFilter}
        onTechFilterChange={setTechFilter}
        onSortChange={setSort}
        onViewModeChange={setViewMode}
      />

      {/* Bulk Actions */}
      {selected.length > 0 && (
        <div className="flex items-center gap-2 px-3 py-2 bg-accent/5 rounded-lg border border-accent/10">
          <span className="text-[12px] font-medium text-text-secondary">{selected.length} selected</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBulkDeleteClick}
            className="h-6 text-[11px] gap-1 text-red-500 hover:text-red-500 hover:bg-red-500/10 rounded-md px-2"
          >
            <Trash2 className="h-3 w-3" /> Delete
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelected([])}
            className="h-6 text-[11px] ml-auto rounded-md text-text-tertiary px-2"
          >
            Clear
          </Button>
        </div>
      )}

      {/* Content */}
      {loading && paginatedProjects.length === 0 ? (
        <div className="space-y-3">
          <div className="rounded-lg border border-border-subtle overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-subtle bg-surface/50">
                    <th className="w-9 px-3 py-2.5"><Skeleton className="h-3.5 w-3.5" /></th>
                    <th className="px-3 py-2.5 text-left"><Skeleton className="h-3 w-20" /></th>
                    <th className="px-3 py-2.5 text-left"><Skeleton className="h-3 w-16" /></th>
                    <th className="px-3 py-2.5 text-left"><Skeleton className="h-3 w-24" /></th>
                    <th className="px-3 py-2.5 text-left"><Skeleton className="h-3 w-14" /></th>
                    <th className="px-3 py-2.5 text-left"><Skeleton className="h-3 w-12" /></th>
                    <th className="px-3 py-2.5 text-left"><Skeleton className="h-3 w-16" /></th>
                    <th className="w-12 px-3 py-2.5"></th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-border-subtle">
                      <td className="px-3 py-2.5"><Skeleton className="h-3.5 w-3.5" /></td>
                      <td className="px-3 py-2.5"><Skeleton className="h-3.5 w-48" /></td>
                      <td className="px-3 py-2.5"><Skeleton className="h-3.5 w-20" /></td>
                      <td className="px-3 py-2.5"><Skeleton className="h-3.5 w-32" /></td>
                      <td className="px-3 py-2.5"><Skeleton className="h-3.5 w-16" /></td>
                      <td className="px-3 py-2.5"><Skeleton className="h-3.5 w-5" /></td>
                      <td className="px-3 py-2.5"><Skeleton className="h-3.5 w-16" /></td>
                      <td className="px-3 py-2.5"><Skeleton className="h-3.5 w-7" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : filteredProjects.length === 0 ? (
        <ProjectsEmptyState
          type={hasFilters ? "no-results" : "no-projects"}
          onClearFilters={hasFilters ? clearFilters : undefined}
          onAddProject={!hasFilters ? handleAddNew : undefined}
        />
      ) : viewMode === "table" ? (
        <ProjectsTable
          projects={paginatedProjects}
          loading={loading}
          selected={selected}
          onSelectAll={toggleSelectAll}
          onSelect={toggleSelect}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          onDuplicate={duplicateProject}
          onToggleFeatured={toggleFeatured}
          onToggleStatus={toggleStatus}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={handleSort}
        />
      ) : (
        <ProjectsGrid
          projects={paginatedProjects}
          selected={selected}
          onSelect={toggleSelect}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          onDuplicate={duplicateProject}
          onToggleFeatured={toggleFeatured}
        />
      )}

      {/* Pagination */}
      {filteredProjects.length > 0 && (
        <ProjectsPagination
          page={page}
          pageSize={pageSize}
          total={totalResults}
          totalPages={totalPages}
          onPageChange={setPage}
          onPageSizeChange={(size) => { setPageSize(size); setPage(1); }}
        />
      )}

      {/* Delete Confirmation */}
      <ProjectDeleteDialog
        open={!!deleteTarget || !!bulkDeleteTarget}
        onClose={() => { setDeleteTarget(null); setBulkDeleteTarget(null); }}
        onConfirm={handleConfirmDelete}
        projectNames={bulkDeleteTarget ? bulkDeleteNames : [deleteProjectName]}
        loading={deleteLoading}
      />
    </div>
  );
}
