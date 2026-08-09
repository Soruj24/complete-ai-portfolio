"use client";

import { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Project, ProjectStatus } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Project>) => Promise<void>;
  project?: Project | null;
  categories: string[];
}

const emptyForm = {
  title: "",
  description: "",
  category: "",
  status: "draft" as ProjectStatus,
  techStack: [] as string[],
  demoUrl: "",
  repoUrl: "",
  client: "",
  featured: false,
};

export function ProjectFormDialog({ open, onClose, onSubmit, project, categories }: Props) {
  const isEditing = !!project;
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [techInput, setTechInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      if (project) {
        setForm({
          title: project.title,
          description: project.description,
          category: project.category || "",
          status: project.status,
          techStack: [...(project.techStack || [])],
          demoUrl: project.demoUrl || "",
          repoUrl: project.repoUrl || "",
          client: project.client || "",
          featured: project.featured,
        });
      } else {
        setForm(emptyForm);
      }
      setTechInput("");
      setErrors({});
    }
  }, [open, project]);

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const addTech = () => {
    const t = techInput.trim();
    if (t && !form.techStack.includes(t)) {
      update("techStack", [...form.techStack, t]);
      setTechInput("");
    }
  };

  const removeTech = (tech: string) => {
    update("techStack", form.techStack.filter((t) => t !== tech));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.description.trim()) errs.description = "Description is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onSubmit({
        ...form,
        slug: form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      });
      onClose();
    } catch {
      setErrors({ submit: "Failed to save project" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-[560px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[16px]">{isEditing ? "Edit Project" : "New Project"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-text-secondary">Title *</label>
            <Input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Project name"
              className="h-8 text-[13px]"
            />
            {errors.title && <p className="text-[11px] text-red-500">{errors.title}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-text-secondary">Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={3}
              placeholder="Brief project description"
              className="w-full rounded-md border border-border-subtle bg-background px-3 py-2 text-[13px] text-text-primary outline-none focus:ring-1 focus:ring-accent/30 resize-y"
            />
            {errors.description && <p className="text-[11px] text-red-500">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-text-secondary">Category</label>
              <Input
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                placeholder="e.g. Web App"
                className="h-8 text-[13px]"
                list="category-suggestions"
              />
              {categories.length > 0 && (
                <datalist id="category-suggestions">
                  {categories.map((c) => <option key={c} value={c} />)}
                </datalist>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-text-secondary">Status</label>
              <Select value={form.status} onValueChange={(v) => update("status", v as ProjectStatus)}>
                <SelectTrigger className="h-8 text-[13px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft" className="text-[13px]">Draft</SelectItem>
                  <SelectItem value="in-progress" className="text-[13px]">In Progress</SelectItem>
                  <SelectItem value="review" className="text-[13px]">Review</SelectItem>
                  <SelectItem value="published" className="text-[13px]">Published</SelectItem>
                  <SelectItem value="archived" className="text-[13px]">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-text-secondary">Demo URL</label>
              <Input
                value={form.demoUrl}
                onChange={(e) => update("demoUrl", e.target.value)}
                placeholder="https://"
                className="h-8 text-[13px]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-text-secondary">Repository URL</label>
              <Input
                value={form.repoUrl}
                onChange={(e) => update("repoUrl", e.target.value)}
                placeholder="https://"
                className="h-8 text-[13px]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-text-secondary">Client</label>
            <Input
              value={form.client}
              onChange={(e) => update("client", e.target.value)}
              placeholder="Client name (optional)"
              className="h-8 text-[13px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-text-secondary">Technologies</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {form.techStack.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 rounded-md bg-accent/10 px-2 py-0.5 text-[11px] text-accent"
                >
                  {t}
                  <button
                    type="button"
                    onClick={() => removeTech(t)}
                    className="hover:text-red-500 transition-colors"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-1.5">
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTech();
                  }
                }}
                placeholder="Add technology..."
                className="h-8 text-[13px] flex-1"
              />
              <Button type="button" variant="outline" size="icon" onClick={addTech} className="h-8 w-8 shrink-0">
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={form.featured}
              onChange={(e) => update("featured", e.target.checked)}
              className="h-3.5 w-3.5 rounded border-border-subtle"
            />
            <label htmlFor="featured" className="text-[12px] font-medium text-text-secondary">Featured project</label>
          </div>

          {errors.submit && <p className="text-[11px] text-red-500">{errors.submit}</p>}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="h-8 text-[13px]">
              Cancel
            </Button>
            <Button type="submit" disabled={submitting} className="h-8 text-[13px]">
              {submitting ? "Saving..." : isEditing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
