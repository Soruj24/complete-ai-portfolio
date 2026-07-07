"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star } from "lucide-react";
import type { Testimonial } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Testimonial>) => Promise<void>;
}

const emptyForm = { name: "", role: "", company: "", content: "", rating: 5, featured: false };

export function TestimonialFormDialog({ open, onClose, onSubmit }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.content.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit({ ...form, date: new Date().toISOString(), source: "manual", order: 0, createdAt: new Date().toISOString() });
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
            className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl border border-border-primary bg-surface-primary shadow-xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border-primary bg-surface-primary px-6 py-4">
              <h2 className="text-lg font-semibold text-text-primary">New Testimonial</h2>
              <button onClick={onClose} className="rounded-lg p-1.5 text-text-tertiary hover:bg-surface-hover hover:text-text-primary transition-colors"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Name *</label>
                  <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Client name" required
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Company</label>
                  <input type="text" value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Company name"
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Role</label>
                  <input type="text" value={form.role} onChange={(e) => update("role", e.target.value)} placeholder="Job title"
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Rating</label>
                  <div className="flex gap-1 pt-1.5">
                    {[1, 2, 3, 4, 5].map((r) => (
                      <button key={r} type="button" onClick={() => update("rating", r)} className="transition-colors">
                        <Star size={20} className={r <= form.rating ? "text-warning fill-warning" : "text-text-tertiary"} />
                      </button>
                    ))}
                  </div></div>
              </div>
              <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Content *</label>
                <textarea value={form.content} onChange={(e) => update("content", e.target.value)} rows={4} placeholder="Testimonial text" required
                  className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent resize-y" /></div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)}
                  className="rounded border-border-primary bg-surface-secondary text-accent focus:ring-accent" />
                <span className="text-sm text-text-secondary">Featured testimonial</span>
              </label>
              <div className="flex items-center gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-border-primary px-4 py-2.5 text-sm text-text-secondary hover:bg-surface-hover transition-colors">Cancel</button>
                <button type="submit" disabled={submitting || !form.name.trim() || !form.content.trim()}
                  className="flex-1 rounded-lg bg-accent px-4 py-2.5 text-sm text-white hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? "Creating..." : "Create Testimonial"}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
