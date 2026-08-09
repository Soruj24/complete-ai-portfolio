"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Plus, RefreshCw, FolderKanban, Pencil, Trash2 } from "lucide-react";
import { EmptyState, ErrorState, FilteredEmptyState } from "@/components/admin/shared-states";
import type { ProjectCategory } from "../types";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";
import { confirmDelete, toastSuccess } from "@/shared/utils/swal";
import { CategoryFormDialog } from "./category-form-dialog";

export function ProjectCategoriesPage() {
  const { data: response, isLoading, error, refetch } = useGetAdminResourceQuery({ resource: "project-categories" });
  const categories: ProjectCategory[] = useMemo(() => (response?.data ?? []) as ProjectCategory[], [response]);

  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ProjectCategory | null>(null);

  const filtered = useMemo(() => {
    return categories.filter((cat: ProjectCategory) => {
      if (search && !cat.name.toLowerCase().includes(search.toLowerCase()) && !cat.slug.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [categories, search]);

  if (error) {
    return <ErrorState message={"Failed to load categories"} onRetry={refetch} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Project Categories</h1>
          <p className="text-sm text-text-tertiary">Organize projects into categories</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => refetch()} className="flex items-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-hover">
            <RefreshCw size={14} /> <span className="hidden sm:inline">Refresh</span>
          </button>
          <button onClick={() => { setEditing(null); setDialogOpen(true); }} className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-white transition-colors hover:bg-accent-hover">
            <Plus size={16} /> <span className="hidden sm:inline">New Category</span>
          </button>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
        <input type="text" placeholder="Search categories..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent" />
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_: unknown, i: number) => <div key={i} className="h-32 animate-pulse rounded-xl bg-surface-hover" />)}
        </div>
      ) : categories.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No project categories yet"
          description="Create your first category to organize your projects."
          action={{ label: "New Category", onClick: () => { setEditing(null); setDialogOpen(true); }, icon: Plus }}
        />
      ) : filtered.length === 0 ? (
        <FilteredEmptyState onClear={() => setSearch("")} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((cat: ProjectCategory, i: number) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="group rounded-xl border border-border-primary bg-surface-primary p-5 transition-colors hover:border-accent/30"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${cat.color}20` }}>
                  <FolderKanban size={18} style={{ color: cat.color }} />
                </div>
                <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button onClick={() => { setEditing(cat); setDialogOpen(true); }} className="rounded-lg p-1.5 text-text-tertiary transition-colors hover:bg-surface-hover hover:text-accent"><Pencil size={14} /></button>
                  <button onClick={async () => { const ok = await confirmDelete("Delete category?", "This will remove this category."); if (ok) { await fetch(`/api/admin/project-categories/${cat.id}`, { method: "DELETE" }); toastSuccess("Deleted!", "Category has been deleted."); refetch(); } }} className="rounded-lg p-1.5 text-text-tertiary transition-colors hover:bg-surface-hover hover:text-error"><Trash2 size={14} /></button>
                </div>
              </div>
              <h3 className="font-semibold text-text-primary">{cat.name}</h3>
              <p className="mt-1 text-xs text-text-tertiary line-clamp-2">{cat.description}</p>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="rounded-md bg-surface-hover px-2 py-0.5 font-mono text-text-secondary">{cat.slug}</span>
                <span className="font-medium" style={{ color: cat.color }}>{cat.projectCount} projects</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <CategoryFormDialog open={dialogOpen} category={editing} onClose={() => { setDialogOpen(false); setEditing(null); }} onSubmit={async (d: Record<string, unknown>) => {
        if (editing) {
          await fetch(`/api/admin/project-categories/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) });
          toastSuccess("Updated!", "Category has been updated.");
        } else {
          await fetch("/api/admin/project-categories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) });
          toastSuccess("Created!", "Category has been created.");
        }
        refetch();
      }} />
    </div>
  );
}
