"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Image as ImageIcon } from "lucide-react";
import type { Project } from "../types";
import { CATEGORIES } from "../constants";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Project>) => Promise<void>;
  project?: Project | null;
}

const emptyForm = {
  title: "", description: "", category: "", tags: [] as string[],
  techStack: [] as string[], status: "draft" as Project["status"],
  priority: "medium" as Project["priority"],
  demoUrl: "", repoUrl: "", client: "",
};

export function ProjectFormDialog({ open, onClose, onSubmit, project }: Props) {
  const isEditing = !!project;
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    if (open) {
      setForm(project ? {
        title: project.title,
        description: project.description,
        category: project.category,
        tags: project.tags ?? [],
        techStack: project.techStack ?? [],
        status: project.status,
        priority: project.priority,
        demoUrl: project.demoUrl ?? "",
        repoUrl: project.repoUrl ?? "",
        client: project.client ?? "",
      } : emptyForm);
      setTechInput("");
    }
  }, [open, project]);

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((prev) => ({ ...prev, [k]: v }));

  const addTech = () => {
    const t = techInput.trim();
    if (t && !form.techStack.includes(t)) { update("techStack", [...form.techStack, t]); setTechInput(""); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) return;
    setSubmitting(true);
    try {
      await onSubmit({ ...form, slug: form.title.toLowerCase().replace(/\s+/g, "-"), updatedAt: new Date().toISOString() });
      setForm(emptyForm);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl border border-border-primary bg-surface-primary shadow-xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border-primary bg-surface-primary px-6 py-4">
              <h2 className="text-lg font-semibold text-text-primary">{isEditing ? "Edit Project" : "New Project"}</h2>
              <button onClick={onClose} className="rounded-lg p-1.5 text-text-tertiary hover:bg-surface-hover hover:text-text-primary transition-colors"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2"><label className="text-xs font-medium text-text-secondary">Title *</label>
                  <input type="text" value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Project name" required
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></div>
                <div className="space-y-1.5 sm:col-span-2"><label className="text-xs font-medium text-text-secondary">Description *</label>
                  <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={3} placeholder="Brief project description" required
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent resize-y" /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Category</label>
                  <select value={form.category} onChange={(e) => update("category", e.target.value)}
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent">
                    <option value="">Select category</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Priority</label>
                  <select value={form.priority} onChange={(e) => update("priority", e.target.value as Project["priority"])}
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent">
                    {["low", "medium", "high", "critical"].map((p) => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                  </select></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Status</label>
                  <select value={form.status} onChange={(e) => update("status", e.target.value as Project["status"])}
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent">
                    {["draft", "in-progress", "review", "published", "archived"].map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Client</label>
                  <input type="text" value={form.client} onChange={(e) => update("client", e.target.value)} placeholder="Client name (optional)"
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Demo URL</label>
                  <input type="url" value={form.demoUrl} onChange={(e) => update("demoUrl", e.target.value)} placeholder="https://"
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Repository URL</label>
                  <input type="url" value={form.repoUrl} onChange={(e) => update("repoUrl", e.target.value)} placeholder="https://"
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></div>
              </div>

              <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Tech Stack</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {form.techStack.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 rounded-md bg-accent/10 px-2 py-0.5 text-xs text-accent">
                      {t}
                      <button type="button" onClick={() => update("techStack", form.techStack.filter((s) => s !== t))} className="hover:text-error transition-colors"><X size={10} /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input type="text" value={techInput} onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTech(); } }}
                    placeholder="Add technology..." className="flex-1 rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" />
                  <button type="button" onClick={addTech} className="rounded-lg bg-accent px-3 py-2 text-white text-sm hover:bg-accent-hover"><Plus size={14} /></button>
                </div>
              </div>

              <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border-primary bg-surface-secondary p-8 text-text-tertiary hover:border-border-hover transition-colors cursor-pointer">
                <div className="text-center"><ImageIcon size={32} className="mx-auto mb-2 opacity-50" /><p className="text-sm">Upload Cover Image</p><p className="text-xs">Drag & drop or click to browse</p></div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-border-primary px-4 py-2.5 text-sm text-text-secondary hover:bg-surface-hover transition-colors">Cancel</button>
                <button type="submit" disabled={submitting || !form.title || !form.description}
                  className="flex-1 rounded-lg bg-accent px-4 py-2.5 text-sm text-white hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? (isEditing ? "Updating..." : "Creating...") : (isEditing ? "Update Project" : "Create Project")}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
