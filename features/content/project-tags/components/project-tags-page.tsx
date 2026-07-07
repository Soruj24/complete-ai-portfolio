"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, RefreshCw, Tags, Pencil, Trash2 } from "lucide-react";
import { useProjectTags } from "../hooks/use-project-tags";
import { ProjectTagFormDialog } from "./project-tag-form-dialog";

export function ProjectTagsPage() {
  const { filtered, loading, error, search, setSearch, refresh, addTag } = useProjectTags();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (error) {
    return <div className="flex flex-col items-center justify-center py-20 text-text-tertiary">
      <p className="text-lg font-medium text-error">Failed to load tags</p>
      <button onClick={refresh} className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm text-white">Retry</button>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Project Tags</h1>
          <p className="text-sm text-text-tertiary">Manage technology tags for projects</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={refresh} className="flex items-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-hover">
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={() => setDialogOpen(true)} className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-white transition-colors hover:bg-accent-hover">
            <Plus size={16} /> New Tag
          </button>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
        <input type="text" placeholder="Search tags..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent" />
      </div>

      {loading ? (
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 15 }).map((_, i) => <div key={i} className="h-20 w-40 animate-pulse rounded-xl bg-surface-hover" />)}
        </div>
      ) : !filtered.length ? (
        <div className="flex flex-col items-center justify-center py-16 text-text-tertiary">
          <Tags size={48} className="mb-4 opacity-40" />
          <p className="text-lg font-medium">No tags found</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {filtered.map((tag, i) => (
            <motion.div key={tag.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.02 }}
              className="group flex items-center gap-3 rounded-xl border border-border-primary bg-surface-primary px-4 py-3 transition-colors hover:border-accent/30"
            >
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: tag.color }} />
              <div>
                <p className="text-sm font-medium text-text-primary">{tag.name}</p>
                <div className="flex items-center gap-2 text-xs text-text-tertiary">
                  <span className="font-mono">{tag.slug}</span>
                  <span>{tag.projectCount} projects</span>
                </div>
              </div>
              <div className="ml-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button className="rounded-lg p-1.5 text-text-tertiary transition-colors hover:bg-surface-hover hover:text-accent"><Pencil size={13} /></button>
                <button className="rounded-lg p-1.5 text-text-tertiary transition-colors hover:bg-surface-hover hover:text-error"><Trash2 size={13} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      <ProjectTagFormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onSubmit={async (d) => { await addTag(d); }} />
    </div>
  );
}
