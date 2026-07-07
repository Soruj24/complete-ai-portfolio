"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload } from "lucide-react";
import type { Download } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Download>) => Promise<void>;
}

const emptyForm = { name: "", description: "", fileType: "PDF", category: "document", url: "", visible: true, featured: false };

export function DownloadFormDialog({ open, onClose, onSubmit }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit({ ...form, fileSize: "0 B", downloads: 0, order: 0, createdAt: new Date().toISOString() });
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
            className="relative w-full max-w-lg rounded-xl border border-border-primary bg-surface-primary shadow-xl">
            <div className="flex items-center justify-between border-b border-border-primary px-6 py-4">
              <h2 className="text-lg font-semibold text-text-primary">Upload File</h2>
              <button onClick={onClose} className="rounded-lg p-1.5 text-text-tertiary hover:bg-surface-hover hover:text-text-primary transition-colors"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2"><label className="text-xs font-medium text-text-secondary">Name *</label>
                  <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="File name" required autoFocus
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">File Type</label>
                  <select value={form.fileType} onChange={(e) => update("fileType", e.target.value)}
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent">
                    {["PDF", "ZIP", "DOC", "PNG", "JPG", "SVG", "MP4", "OTHER"].map((t) => <option key={t} value={t}>{t}</option>)}
                  </select></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Category</label>
                  <select value={form.category} onChange={(e) => update("category", e.target.value)}
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent">
                    {["resume", "code", "document", "presentation", "other"].map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                  </select></div>
                <div className="space-y-1.5 sm:col-span-2"><label className="text-xs font-medium text-text-secondary">URL</label>
                  <input type="url" value={form.url} onChange={(e) => update("url", e.target.value)} placeholder="https://"
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></div>
              </div>
              <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Description</label>
                <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={2} placeholder="Brief description"
                  className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent resize-y" /></div>
              <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border-primary bg-surface-secondary p-6 text-text-tertiary">
                <div className="text-center"><Upload size={24} className="mx-auto mb-2 opacity-50" /><p className="text-sm">Drag & drop or click to upload file</p></div>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.visible} onChange={(e) => update("visible", e.target.checked)}
                    className="rounded border-border-primary bg-surface-secondary text-accent focus:ring-accent" />
                  <span className="text-sm text-text-secondary">Visible</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)}
                    className="rounded border-border-primary bg-surface-secondary text-accent focus:ring-accent" />
                  <span className="text-sm text-text-secondary">Featured</span>
                </label>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-border-primary px-4 py-2.5 text-sm text-text-secondary hover:bg-surface-hover transition-colors">Cancel</button>
                <button type="submit" disabled={submitting || !form.name.trim()}
                  className="flex-1 rounded-lg bg-accent px-4 py-2.5 text-sm text-white hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? "Uploading..." : "Upload File"}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
