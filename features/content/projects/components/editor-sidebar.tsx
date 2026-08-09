"use client";

import { useState } from "react";
import { X, Plus, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { ProjectFormData, ProjectStatus } from "../types";
import { PROJECT_STATUS_LABELS } from "../types";

interface Props {
  form: ProjectFormData;
  errors: Record<string, string>;
  onUpdate: <K extends keyof ProjectFormData>(key: K, value: ProjectFormData[K]) => void;
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return <p className="text-[11px] text-red-500 mt-0.5">{error}</p>;
}

function FieldLabel({ label }: { label: string }) {
  return (
    <label className="text-[12px] font-medium text-text-secondary">{label}</label>
  );
}

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  );
}

function TagInput({
  tags,
  onChange,
  placeholder,
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder: string;
}) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const t = input.trim();
    if (t && !tags.includes(t)) {
      onChange([...tags, t]);
      setInput("");
    }
  };

  const removeTag = (tag: string) => {
    onChange(tags.filter((t) => t !== tag));
  };

  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-md bg-accent/10 px-2 py-0.5 text-[11px] text-accent"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:text-red-500 transition-colors"
            >
              <X className="h-2.5 w-2.5" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-1.5">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
          placeholder={placeholder}
          className="h-8 text-[13px] flex-1"
        />
        <Button type="button" variant="outline" size="icon" onClick={addTag} className="h-8 w-8 shrink-0">
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

export function EditorSidebar({ form, errors, onUpdate }: Props) {
  return (
    <div className="space-y-6">
      {/* Publish Settings */}
      <SidebarSection title="Publish Settings">
        <div className="space-y-1.5">
          <FieldLabel label="Status" />
          <Select value={form.status} onValueChange={(v) => onUpdate("status", v as ProjectStatus)}>
            <SelectTrigger className="h-8 text-[13px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(PROJECT_STATUS_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value} className="text-[13px]">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <FieldLabel label="Featured" />
          <button
            type="button"
            onClick={() => onUpdate("featured", !form.featured)}
            className={cn(
              "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors",
              form.featured ? "bg-accent" : "bg-border-subtle"
            )}
          >
            <span
              className={cn(
                "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform mt-0.5",
                form.featured ? "translate-x-4 ml-0.5" : "translate-x-0.5"
              )}
            />
          </button>
        </div>
      </SidebarSection>

      {/* Category */}
      <SidebarSection title="Organization">
        <div className="space-y-1.5">
          <FieldLabel label="Category" />
          <Input
            value={form.category}
            onChange={(e) => onUpdate("category", e.target.value)}
            placeholder="e.g. Web App, Mobile, API"
            className={cn("h-8 text-[13px]", errors.category && "border-red-500")}
          />
          <FieldError error={errors.category} />
        </div>

        <div className="space-y-1.5">
          <FieldLabel label="Technologies" />
          <TagInput
            tags={form.techStack}
            onChange={(tags) => onUpdate("techStack", tags)}
            placeholder="Add technology"
          />
        </div>
      </SidebarSection>

      {/* Image */}
      <SidebarSection title="Project Image">
        {form.image ? (
          <div className="relative rounded-lg overflow-hidden border border-border-subtle">
            <img src={form.image} alt="" className="h-32 w-full object-cover" />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onUpdate("image", "")}
              className="absolute top-1 right-1 h-6 w-6 bg-background/80 backdrop-blur-sm"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border-subtle p-6 text-text-tertiary hover:border-accent/30 transition-colors">
            <ImageIcon className="h-8 w-8 mb-2 opacity-40" />
            <p className="text-[11px]">No image set</p>
          </div>
        )}
        <Input
          value={form.image}
          onChange={(e) => onUpdate("image", e.target.value)}
          placeholder="Image URL"
          className="h-8 text-[13px]"
        />
      </SidebarSection>

      {/* Links */}
      <SidebarSection title="Links">
        <div className="space-y-1.5">
          <FieldLabel label="GitHub URL" />
          <Input
            value={form.githubUrl}
            onChange={(e) => onUpdate("githubUrl", e.target.value)}
            placeholder="https://github.com/..."
            className={cn("h-8 text-[13px]", errors.githubUrl && "border-red-500")}
          />
          <FieldError error={errors.githubUrl} />
        </div>

        <div className="space-y-1.5">
          <FieldLabel label="Live URL" />
          <Input
            value={form.liveUrl}
            onChange={(e) => onUpdate("liveUrl", e.target.value)}
            placeholder="https://..."
            className={cn("h-8 text-[13px]", errors.liveUrl && "border-red-500")}
          />
          <FieldError error={errors.liveUrl} />
        </div>

        <div className="space-y-1.5">
          <FieldLabel label="Demo URL" />
          <Input
            value={form.demoUrl}
            onChange={(e) => onUpdate("demoUrl", e.target.value)}
            placeholder="https://..."
            className={cn("h-8 text-[13px]", errors.demoUrl && "border-red-500")}
          />
          <FieldError error={errors.demoUrl} />
        </div>
      </SidebarSection>

      {/* Details */}
      <SidebarSection title="Details">
        <div className="space-y-1.5">
          <FieldLabel label="Client" />
          <Input
            value={form.client}
            onChange={(e) => onUpdate("client", e.target.value)}
            placeholder="Client name"
            className="h-8 text-[13px]"
          />
        </div>

        <div className="space-y-1.5">
          <FieldLabel label="Difficulty" />
          <Select value={form.difficulty} onValueChange={(v) => onUpdate("difficulty", v)}>
            <SelectTrigger className="h-8 text-[13px]">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner" className="text-[13px]">Beginner</SelectItem>
              <SelectItem value="intermediate" className="text-[13px]">Intermediate</SelectItem>
              <SelectItem value="advanced" className="text-[13px]">Advanced</SelectItem>
              <SelectItem value="expert" className="text-[13px]">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <FieldLabel label="Duration" />
          <Input
            value={form.duration}
            onChange={(e) => onUpdate("duration", e.target.value)}
            placeholder="e.g. 2 weeks"
            className="h-8 text-[13px]"
          />
        </div>

        <div className="space-y-1.5">
          <FieldLabel label="Team Size" />
          <Input
            type="number"
            value={form.teamSize}
            onChange={(e) => onUpdate("teamSize", e.target.value)}
            placeholder="1"
            min="1"
            className="h-8 text-[13px]"
          />
        </div>
      </SidebarSection>

      {/* SEO */}
      <SidebarSection title="SEO Settings">
        <div className="space-y-1.5">
          <FieldLabel label="SEO Title" />
          <Input
            value={form.seoTitle}
            onChange={(e) => onUpdate("seoTitle", e.target.value)}
            placeholder="Custom title for search engines"
            className="h-8 text-[13px]"
          />
          <p className="text-[10px] text-text-tertiary">If empty, the project title will be used.</p>
        </div>

        <div className="space-y-1.5">
          <FieldLabel label="Meta Description" />
          <textarea
            value={form.metaDescription}
            onChange={(e) => onUpdate("metaDescription", e.target.value)}
            rows={3}
            placeholder="Description for search engine results"
            className="w-full rounded-md border border-border-subtle bg-background px-3 py-2 text-[13px] text-text-primary outline-none focus:ring-1 focus:ring-accent/30 resize-y"
          />
          <p className="text-[10px] text-text-tertiary">{form.metaDescription.length}/160</p>
        </div>
      </SidebarSection>
    </div>
  );
}
