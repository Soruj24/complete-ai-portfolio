"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import type { Certificate, CertProvider } from "../types";
import { PROVIDER_LABELS } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Certificate>) => Promise<void>;
}

const emptyForm = { name: "", provider: "other" as CertProvider, description: "", issueDate: "", expiryDate: "", credentialId: "", credentialUrl: "", skills: [] as string[] };

export function CertificateFormDialog({ open, onClose, onSubmit }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((p) => ({ ...p, [k]: v }));

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !form.skills.includes(s)) { update("skills", [...form.skills, s]); setSkillInput(""); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit({ ...form, expiryDate: form.expiryDate || null, providerLabel: PROVIDER_LABELS[form.provider], order: 0, createdAt: new Date().toISOString() });
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
              <h2 className="text-lg font-semibold text-text-primary">New Certificate</h2>
              <button onClick={onClose} className="rounded-lg p-1.5 text-text-tertiary hover:bg-surface-hover hover:text-text-primary transition-colors"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2"><label className="text-xs font-medium text-text-secondary">Name *</label>
                  <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Certificate name" required
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Provider</label>
                  <select value={form.provider} onChange={(e) => update("provider", e.target.value as CertProvider)}
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent">
                    {(Object.entries(PROVIDER_LABELS) as [CertProvider, string][]).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Credential ID</label>
                  <input type="text" value={form.credentialId} onChange={(e) => update("credentialId", e.target.value)} placeholder="Credential ID"
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Issue Date</label>
                  <input type="date" value={form.issueDate} onChange={(e) => update("issueDate", e.target.value)}
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Expiry Date</label>
                  <input type="date" value={form.expiryDate} onChange={(e) => update("expiryDate", e.target.value)}
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></div>
                <div className="space-y-1.5 sm:col-span-2"><label className="text-xs font-medium text-text-secondary">Credential URL</label>
                  <input type="url" value={form.credentialUrl} onChange={(e) => update("credentialUrl", e.target.value)} placeholder="https://"
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" /></div>
              </div>
              <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Description</label>
                <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={2} placeholder="Brief description"
                  className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent resize-y" /></div>
              <div className="space-y-1.5"><label className="text-xs font-medium text-text-secondary">Skills</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {form.skills.map((s) => (
                    <span key={s} className="inline-flex items-center gap-1 rounded-md bg-accent/10 px-2 py-0.5 text-xs text-accent">
                      {s}<button type="button" onClick={() => update("skills", form.skills.filter((x) => x !== s))} className="hover:text-error"><X size={10} /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder="Add skill..."
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
                    className="flex-1 rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" />
                  <button type="button" onClick={addSkill} className="rounded-lg bg-accent px-3 py-2 text-white text-sm hover:bg-accent-hover"><Plus size={14} /></button>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-border-primary px-4 py-2.5 text-sm text-text-secondary hover:bg-surface-hover transition-colors">Cancel</button>
                <button type="submit" disabled={submitting || !form.name.trim()}
                  className="flex-1 rounded-lg bg-accent px-4 py-2.5 text-sm text-white hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? "Creating..." : "Create Certificate"}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
