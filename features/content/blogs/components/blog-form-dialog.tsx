"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import type { BlogPost } from "../types";
import { CATEGORIES } from "../constants";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<BlogPost>) => Promise<void>;
}

const emptyForm = { title: "", excerpt: "", content: "", category: "", tags: [] as string[], status: "draft" as BlogPost["status"], featured: false };

export function BlogFormDialog({ open, onClose, onSubmit }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((p) => ({ ...p, [k]: v }));

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) { update("tags", [...form.tags, t]); setTagInput(""); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.excerpt.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit({ ...form, slug: form.title.toLowerCase().replace(/\s+/g, "-"), author: "Admin", readingTime: Math.ceil(form.content.split(/\s+/).length / 200), views: 0, likes: 0, comments: 0, publishedAt: form.status === "published" ? new Date().toISOString() : undefined, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
      setForm(emptyForm);
      onClose();
    } finally { setSubmitting(false); }
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
              <h2 className="text-lg font-semibold text-text-primary">New Blog Post</h2>
              <button onClick={onClose} className="rounded-lg p-1.5 text-text-tertiary hover:bg-surface-hover hover:text-text-primary transition-colors"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Title *</label>
                <input type="text" value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Post title" required autoFocus
                  className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Category</label>
                  <select value={form.category} onChange={(e) => update("category", e.target.value)}
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent">
                    <option value="">Select category</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Status</label>
                  <select value={form.status} onChange={(e) => update("status", e.target.value as BlogPost["status"])}
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent">
                    {["draft", "review", "published", "archived"].map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select></div>
              </div>
              <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Excerpt *</label>
                <textarea value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} rows={2} placeholder="Brief post excerpt" required
                  className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent resize-y" /></div>
              <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Content</label>
                <textarea value={form.content} onChange={(e) => update("content", e.target.value)} rows={6} placeholder="Post content (markdown supported)"
                  className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent resize-y font-mono" /></div>
              <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Tags</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {form.tags.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 rounded-md bg-accent/10 px-2 py-0.5 text-xs text-accent">
                      {t}<button type="button" onClick={() => update("tags", form.tags.filter((x) => x !== t))} className="hover:text-error"><X size={10} /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="Add tag..."
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                    className="flex-1 rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" />
                  <button type="button" onClick={addTag} className="rounded-lg bg-accent px-3 py-2 text-white text-sm hover:bg-accent-hover"><Plus size={14} /></button>
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)}
                  className="rounded border-border-primary bg-surface-secondary text-accent focus:ring-accent" />
                <span className="text-sm text-text-secondary">Featured post</span>
              </label>
              <div className="flex items-center gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-border-primary px-4 py-2.5 text-sm text-text-secondary hover:bg-surface-hover transition-colors">Cancel</button>
                <button type="submit" disabled={submitting || !form.title.trim() || !form.excerpt.trim()}
                  className="flex-1 rounded-lg bg-accent px-4 py-2.5 text-sm text-white hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? "Creating..." : "Create Post"}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
