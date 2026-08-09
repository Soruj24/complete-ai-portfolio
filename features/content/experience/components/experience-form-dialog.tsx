"use client";

import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Experience, ExperienceFormData } from "../types";
import { EMPLOYMENT_TYPES, EMPLOYMENT_LABELS, EMPTY_EXPERIENCE_FORM } from "../types";

interface Props {
  open: boolean;
  editingExperience: Experience | null;
  onClose: () => void;
  onSubmit: (data: ExperienceFormData) => Promise<void>;
}

export function ExperienceFormDialog({ open, editingExperience, onClose, onSubmit }: Props) {
  const [form, setForm] = useState<ExperienceFormData>(EMPTY_EXPERIENCE_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [listInput, setListInput] = useState("");
  const [activeList, setActiveList] = useState<"responsibilities" | "technologies" | "achievements">("responsibilities");

  useEffect(() => {
    if (editingExperience) {
      setForm({
        role: editingExperience.role,
        company: editingExperience.company,
        location: editingExperience.location,
        employmentType: editingExperience.employmentType,
        startDate: editingExperience.startDate,
        endDate: editingExperience.endDate,
        current: editingExperience.current,
        description: editingExperience.description,
        responsibilities: editingExperience.responsibilities || [],
        technologies: editingExperience.technologies || [],
        achievements: editingExperience.achievements || [],
        order: editingExperience.order,
        enabled: editingExperience.enabled,
      });
    } else {
      setForm(EMPTY_EXPERIENCE_FORM);
    }
  }, [editingExperience, open]);

  const update = <K extends keyof ExperienceFormData>(k: K, v: ExperienceFormData[K]) => setForm((p) => ({ ...p, [k]: v }));

  const addListItem = () => {
    const val = listInput.trim();
    if (!val) return;
    const current = form[activeList];
    if (!current.includes(val)) {
      update(activeList, [...current, val]);
    }
    setListInput("");
  };

  const removeListItem = (list: "responsibilities" | "technologies" | "achievements", item: string) => {
    update(list, form[list].filter((x) => x !== item));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.role.trim() || !form.company.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit({ ...form, endDate: form.current ? null : form.endDate });
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  const listLabels: Record<"responsibilities" | "technologies" | "achievements", string> = {
    responsibilities: "Responsibility",
    technologies: "Technology",
    achievements: "Achievement",
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingExperience ? "Edit Experience" : "New Experience"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-text-secondary">Role *</label>
              <Input value={form.role} onChange={(e) => update("role", e.target.value)} placeholder="Job title" required autoFocus className="h-8 text-[13px]" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-text-secondary">Company *</label>
              <Input value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Company name" required className="h-8 text-[13px]" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-text-secondary">Location</label>
              <Input value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="City, Country" className="h-8 text-[13px]" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-text-secondary">Employment Type</label>
              <select value={form.employmentType} onChange={(e) => update("employmentType", e.target.value as ExperienceFormData["employmentType"])}
                className="w-full rounded-md border border-border-subtle bg-surface px-3 py-1.5 text-[13px] text-text-primary outline-none focus:border-accent">
                {EMPLOYMENT_TYPES.map((t) => <option key={t} value={t}>{EMPLOYMENT_LABELS[t]}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-text-secondary">Start Date</label>
              <Input type="date" value={form.startDate} onChange={(e) => update("startDate", e.target.value)} className="h-8 text-[13px]" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-text-secondary">End Date</label>
              <Input type="date" value={form.endDate || ""} onChange={(e) => update("endDate", e.target.value || null)} disabled={form.current} className="h-8 text-[13px] disabled:opacity-50" />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.current} onChange={(e) => update("current", e.target.checked)}
              className="rounded border-border-subtle bg-surface text-accent focus:ring-accent" />
            <span className="text-[12px] text-text-secondary">Current position</span>
          </label>

          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-text-secondary">Description</label>
            <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={2} placeholder="Brief description of this role..."
              className="w-full rounded-md border border-border-subtle bg-surface px-3 py-2 text-[13px] text-text-primary outline-none focus:border-accent resize-none" />
          </div>

          <div className="space-y-2">
            <div className="flex gap-1 rounded-md border border-border-subtle bg-surface p-0.5">
              {(["responsibilities", "technologies", "achievements"] as const).map((list) => (
                <button key={list} type="button" onClick={() => { setActiveList(list); setListInput(""); }}
                  className={`rounded-sm px-3 py-1 text-[11px] font-medium transition-colors ${
                    activeList === list ? "bg-accent text-accent-foreground" : "text-text-tertiary hover:text-text-primary"
                  }`}>
                  {list.charAt(0).toUpperCase() + list.slice(1)} ({form[list].length})
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5 min-h-[28px]">
              {form[activeList].map((item) => (
                <span key={item} className="inline-flex items-center gap-1 rounded-md bg-accent/10 px-2 py-0.5 text-[11px] text-accent">
                  {item}
                  <button type="button" onClick={() => removeListItem(activeList, item)} className="hover:text-red-500">
                    <X className="h-2.5 w-2.5" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input value={listInput} onChange={(e) => setListInput(e.target.value)} placeholder={`Add ${listLabels[activeList]}...`}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addListItem(); } }}
                className="h-8 text-[13px]" />
              <Button type="button" variant="outline" size="sm" onClick={addListItem} className="h-8 px-2.5">
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-text-secondary">Order</label>
            <Input type="number" value={form.order} onChange={(e) => update("order", parseInt(e.target.value) || 0)} className="h-8 text-[13px] w-20" />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="h-8 text-[13px]">Cancel</Button>
            <Button type="submit" disabled={submitting || !form.role.trim() || !form.company.trim()} className="h-8 text-[13px]">
              {submitting ? "Saving..." : editingExperience ? "Save Changes" : "Create Entry"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
