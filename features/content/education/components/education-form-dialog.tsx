"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Education, DegreeType } from "../types";
import { DEGREE_LABELS } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Education>) => Promise<void>;
}

const emptyForm = { institution: "", degree: "", field: "", degreeType: "bachelor" as DegreeType, location: "", description: "", gpa: "", current: false, startDate: "", endDate: "" };

export function EducationFormDialog({ open, onClose, onSubmit }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.institution.trim() || !form.degree.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit({ ...form, endDate: form.current ? null : form.endDate || null, highlights: [], order: 0, createdAt: new Date().toISOString() });
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
              <h2 className="text-lg font-semibold text-text-primary">New Education</h2>
              <button onClick={onClose} className="rounded-lg p-1.5 text-text-tertiary hover:bg-surface-hover hover:text-text-primary transition-colors"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2"><label className="text-xs font-medium text-text-secondary">Institution *</label>
                  <input type="text" value={form.institution} onChange={(e) => update("institution", e.target.value)} placeholder="School or university" required
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Degree *</label>
                  <input type="text" value={form.degree} onChange={(e) => update("degree", e.target.value)} placeholder="e.g. Bachelor of Science" required
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Field</label>
                  <input type="text" value={form.field} onChange={(e) => update("field", e.target.value)} placeholder="e.g. Computer Science"
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Degree Type</label>
                  <select value={form.degreeType} onChange={(e) => update("degreeType", e.target.value as DegreeType)}
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent">
                    {(Object.entries(DEGREE_LABELS) as [DegreeType, string][]).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Location</label>
                  <input type="text" value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="City, Country"
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">GPA</label>
                  <input type="text" value={form.gpa} onChange={(e) => update("gpa", e.target.value)} placeholder="e.g. 3.8"
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Start Date</label>
                  <input type="date" value={form.startDate} onChange={(e) => update("startDate", e.target.value)}
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">End Date</label>
                  <input type="date" value={form.endDate} onChange={(e) => update("endDate", e.target.value)} disabled={form.current}
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent disabled:opacity-50" /></div>
              </div>
              <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Description</label>
                <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={2} placeholder="Brief description"
                  className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent resize-y" /></div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.current} onChange={(e) => update("current", e.target.checked)}
                  className="rounded border-border-primary bg-surface-secondary text-accent focus:ring-accent" />
                <span className="text-sm text-text-secondary">Currently enrolled</span>
              </label>
              <div className="flex items-center gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-border-primary px-4 py-2.5 text-sm text-text-secondary hover:bg-surface-hover transition-colors">Cancel</button>
                <button type="submit" disabled={submitting || !form.institution.trim() || !form.degree.trim()}
                  className="flex-1 rounded-lg bg-accent px-4 py-2.5 text-sm text-white hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? "Creating..." : "Create Entry"}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
