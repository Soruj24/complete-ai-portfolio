"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Skill, SkillFormData } from "../types";
import { SKILL_CATEGORIES, SKILL_CATEGORY_LABELS, EMPTY_SKILL_FORM } from "../types";

interface Props {
  open: boolean;
  editingSkill: Skill | null;
  onClose: () => void;
  onSubmit: (data: SkillFormData) => Promise<void>;
}

const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ec4899", "#06b6d4", "#ef4444", "#84cc16"];

export function SkillFormDialog({ open, editingSkill, onClose, onSubmit }: Props) {
  const [form, setForm] = useState<SkillFormData>(EMPTY_SKILL_FORM);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingSkill) {
      setForm({
        name: editingSkill.name,
        slug: editingSkill.slug || "",
        category: editingSkill.category,
        level: editingSkill.level,
        icon: editingSkill.icon || "",
        color: editingSkill.color || COLORS[0],
        description: editingSkill.description || "",
        technologies: editingSkill.technologies || [],
        yearsOfExperience: editingSkill.yearsOfExperience || 0,
        order: editingSkill.order,
        featured: editingSkill.featured,
        enabled: editingSkill.enabled,
      });
    } else {
      setForm(EMPTY_SKILL_FORM);
    }
  }, [editingSkill, open]);

  const update = <K extends keyof SkillFormData>(k: K, v: SkillFormData[K]) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSubmitting(true);
    try {
      const slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      await onSubmit({ ...form, slug: slug || form.slug });
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{editingSkill ? "Edit Skill" : "New Skill"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-text-secondary">Name *</label>
              <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Skill name" required autoFocus className="h-8 text-[13px]" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-text-secondary">Category</label>
              <select value={form.category} onChange={(e) => update("category", e.target.value as SkillFormData["category"])}
                className="w-full rounded-md border border-border-subtle bg-surface px-3 py-1.5 text-[13px] text-text-primary outline-none focus:border-accent">
                {SKILL_CATEGORIES.map((k) => <option key={k} value={k}>{SKILL_CATEGORY_LABELS[k]}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-text-secondary">Proficiency ({form.level}%)</label>
              <input type="range" min={0} max={100} value={form.level} onChange={(e) => update("level", Number(e.target.value))} className="w-full accent-accent" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-text-secondary">Years of Exp</label>
              <Input type="number" min={0} max={50} value={form.yearsOfExperience} onChange={(e) => update("yearsOfExperience", Number(e.target.value))} className="h-8 text-[13px]" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-text-secondary">Description</label>
            <textarea value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Brief description of this skill..."
              className="w-full rounded-md border border-border-subtle bg-surface px-3 py-2 text-[13px] text-text-primary outline-none focus:border-accent resize-none h-16" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-text-secondary">Color</label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <button key={c} type="button" onClick={() => update("color", c)}
                  className={`flex h-7 w-7 items-center justify-center rounded-md transition-all ${form.color === c ? "ring-2 ring-offset-1 ring-offset-background scale-110" : ""}`}
                  style={{ backgroundColor: c }}>
                  {form.color === c && <span className="text-white text-[10px] font-bold">&#10003;</span>}
                </button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="h-8 text-[13px]">Cancel</Button>
            <Button type="submit" disabled={submitting || !form.name.trim()} className="h-8 text-[13px]">
              {submitting ? "Saving..." : editingSkill ? "Save Changes" : "Create Skill"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
