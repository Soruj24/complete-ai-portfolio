"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Skill, SkillCategory } from "../types";
import { SKILL_CATEGORY_LABELS } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Skill>) => Promise<void>;
}

const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ec4899", "#06b6d4", "#ef4444", "#84cc16"];
const emptyForm = { name: "", category: "frontend" as SkillCategory, level: 75, color: COLORS[0], yearsOfExperience: 1 };

export function SkillFormDialog({ open, onClose, onSubmit }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit({ ...form, slug: form.name.toLowerCase().replace(/\s+/g, "-"), order: 0, createdAt: new Date().toISOString() });
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
              <h2 className="text-lg font-semibold text-text-primary">New Skill</h2>
              <button onClick={onClose} className="rounded-lg p-1.5 text-text-tertiary hover:bg-surface-hover hover:text-text-primary transition-colors"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Name *</label>
                  <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Skill name" required autoFocus
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Category</label>
                  <select value={form.category} onChange={(e) => update("category", e.target.value as SkillCategory)}
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent">
                    {(Object.entries(SKILL_CATEGORY_LABELS) as [SkillCategory, string][]).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Proficiency ({form.level}%)</label>
                  <input type="range" min={0} max={100} value={form.level} onChange={(e) => update("level", Number(e.target.value))}
                    className="w-full accent-accent" /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Years of Exp</label>
                  <input type="number" min={0} max={50} value={form.yearsOfExperience} onChange={(e) => update("yearsOfExperience", Number(e.target.value))}
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-secondary">Color</label>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((c) => (
                    <button key={c} type="button" onClick={() => update("color", c)}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${form.color === c ? "ring-2 ring-offset-2 ring-offset-surface-primary scale-110" : ""}`}
                      style={{ backgroundColor: c }}>
                      {form.color === c && <span className="text-white text-xs font-bold">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-border-primary px-4 py-2.5 text-sm text-text-secondary hover:bg-surface-hover transition-colors">Cancel</button>
                <button type="submit" disabled={submitting || !form.name.trim()}
                  className="flex-1 rounded-lg bg-accent px-4 py-2.5 text-sm text-white hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? "Creating..." : "Create Skill"}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
