"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import type { Experience, EmploymentType } from "../types";
import { EMPLOYMENT_LABELS } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Experience>) => Promise<void>;
}

const emptyForm = { company: "", position: "", location: "", employmentType: "full-time" as EmploymentType, description: "", techStack: [] as string[], startDate: "", endDate: "", current: false };

export function ExperienceFormDialog({ open, onClose, onSubmit }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [techInput, setTechInput] = useState("");

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((p) => ({ ...p, [k]: v }));

  const addTech = () => {
    const t = techInput.trim();
    if (t && !form.techStack.includes(t)) { update("techStack", [...form.techStack, t]); setTechInput(""); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company.trim() || !form.position.trim()) return;
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
              <h2 className="text-lg font-semibold text-text-primary">New Experience</h2>
              <button onClick={onClose} className="rounded-lg p-1.5 text-text-tertiary hover:bg-surface-hover hover:text-text-primary transition-colors"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Company *</label>
                  <input type="text" value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Company name" required
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Position *</label>
                  <input type="text" value={form.position} onChange={(e) => update("position", e.target.value)} placeholder="Job title" required
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Location</label>
                  <input type="text" value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="City, Country"
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Employment Type</label>
                  <select value={form.employmentType} onChange={(e) => update("employmentType", e.target.value as EmploymentType)}
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent">
                    {(Object.entries(EMPLOYMENT_LABELS) as [EmploymentType, string][]).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Start Date</label>
                  <input type="date" value={form.startDate} onChange={(e) => update("startDate", e.target.value)}
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">End Date</label>
                  <input type="date" value={form.endDate} onChange={(e) => update("endDate", e.target.value)} disabled={form.current}
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent disabled:opacity-50" /></div>
              </div>
              <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Description</label>
                <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={3} placeholder="Job description"
                  className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent resize-y" /></div>
              <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Tech Stack</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {form.techStack.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 rounded-md bg-accent/10 px-2 py-0.5 text-xs text-accent">
                      {t}<button type="button" onClick={() => update("techStack", form.techStack.filter((x) => x !== t))} className="hover:text-error"><X size={10} /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input type="text" value={techInput} onChange={(e) => setTechInput(e.target.value)} placeholder="Add technology..."
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTech(); } }}
                    className="flex-1 rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" />
                  <button type="button" onClick={addTech} className="rounded-lg bg-accent px-3 py-2 text-white text-sm hover:bg-accent-hover"><Plus size={14} /></button>
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.current} onChange={(e) => update("current", e.target.checked)}
                  className="rounded border-border-primary bg-surface-secondary text-accent focus:ring-accent" />
                <span className="text-sm text-text-secondary">Current position</span>
              </label>
              <div className="flex items-center gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-border-primary px-4 py-2.5 text-sm text-text-secondary hover:bg-surface-hover transition-colors">Cancel</button>
                <button type="submit" disabled={submitting || !form.company.trim() || !form.position.trim()}
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
