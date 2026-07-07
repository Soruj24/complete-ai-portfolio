"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, Plus, RefreshCw, BookOpen, Pencil, Trash2 } from "lucide-react";
import { useBlogCategories } from "../hooks/use-blog-categories";
import { toastSuccess } from "@/shared/utils/swal";
import { BlogCategoryFormDialog } from "./blog-category-form-dialog";

export function BlogCategoriesPage() {
  const { filtered, loading, error, search, setSearch, refresh, addCategory } = useBlogCategories();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (error) {
    return <div className="flex flex-col items-center justify-center py-20 text-text-tertiary">
      <p className="text-lg font-medium text-error">Failed to load categories</p>
      <button onClick={refresh} className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm text-white">Retry</button>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Blog Categories</h1>
          <p className="text-sm text-text-tertiary">Organize blog posts into categories</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={refresh} className="flex items-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-hover">
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={() => setDialogOpen(true)} className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-white transition-colors hover:bg-accent-hover">
            <Plus size={16} /> New Category
          </button>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
        <input type="text" placeholder="Search categories..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent" />
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-28 animate-pulse rounded-xl bg-surface-hover" />)}
        </div>
      ) : !filtered.length ? (
        <div className="flex flex-col items-center justify-center py-16 text-text-tertiary">
          <BookOpen size={48} className="mb-4 opacity-40" />
          <p className="text-lg font-medium">No categories found</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="group rounded-xl border border-border-primary bg-surface-primary p-5 transition-colors hover:border-accent/30"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${cat.color}20` }}>
                  <BookOpen size={18} style={{ color: cat.color }} />
                </div>
                <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button className="rounded-lg p-1.5 text-text-tertiary transition-colors hover:bg-surface-hover hover:text-accent"><Pencil size={14} /></button>
                  <button className="rounded-lg p-1.5 text-text-tertiary transition-colors hover:bg-surface-hover hover:text-error"><Trash2 size={14} /></button>
                </div>
              </div>
              <h3 className="font-semibold text-text-primary">{cat.name}</h3>
              <p className="mt-1 text-xs text-text-tertiary line-clamp-2">{cat.description}</p>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="rounded-md bg-surface-hover px-2 py-0.5 font-mono text-text-secondary">{cat.slug}</span>
                <span className="font-medium" style={{ color: cat.color }}>{cat.postCount} posts</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      <BlogCategoryFormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onSubmit={async (d) => { await addCategory(d); toastSuccess("Created!", "Category has been created."); }} />
    </div>
  );
}
