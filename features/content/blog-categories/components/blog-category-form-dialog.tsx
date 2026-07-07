"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen } from "lucide-react";
import type { BlogCategory } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<BlogCategory>) => Promise<void>;
}

const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ec4899", "#06b6d4", "#ef4444", "#84cc16"];

export function BlogCategoryFormDialog({ open, onClose, onSubmit }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit({ name: name.trim(), slug: name.trim().toLowerCase().replace(/\s+/g, "-"), description: description.trim(), color, postCount: 0, createdAt: new Date().toISOString() });
      setName(""); setDescription(""); setColor(COLORS[0]);
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
            className="relative w-full max-w-lg rounded-xl border border-border-primary bg-surface-primary shadow-xl">
            <div className="flex items-center justify-between border-b border-border-primary px-6 py-4">
              <h2 className="text-lg font-semibold text-text-primary">New Blog Category</h2>
              <button onClick={onClose} className="rounded-lg p-1.5 text-text-tertiary hover:bg-surface-hover hover:text-text-primary transition-colors"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-secondary">Name *</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Category name" required autoFocus
                  className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-secondary">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Brief description"
                  className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent resize-y" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-secondary">Color</label>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((c) => (
                    <button key={c} type="button" onClick={() => setColor(c)}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${color === c ? "ring-2 ring-offset-2 ring-offset-surface-primary scale-110" : ""}`}
                      style={{ backgroundColor: c }}>
                      {color === c && <span className="text-white text-xs font-bold">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border-primary bg-surface-secondary p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${color}20` }}>
                  <BookOpen size={18} style={{ color }} />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{name || "Category Name"}</p>
                  <p className="text-xs text-text-tertiary">{name ? name.trim().toLowerCase().replace(/\s+/g, "-") : "category-slug"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-border-primary px-4 py-2.5 text-sm text-text-secondary hover:bg-surface-hover transition-colors">Cancel</button>
                <button type="submit" disabled={submitting || !name.trim()}
                  className="flex-1 rounded-lg bg-accent px-4 py-2.5 text-sm text-white hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? "Creating..." : "Create Category"}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
