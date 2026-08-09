"use client";

import { Plus, X, GripVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProjectFormData } from "../types";

interface Props {
  form: ProjectFormData;
  errors: Record<string, string>;
  onUpdate: <K extends keyof ProjectFormData>(key: K, value: ProjectFormData[K]) => void;
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return <p className="text-[11px] text-red-500 mt-0.5">{error}</p>;
}

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <label className="text-[12px] font-medium text-text-secondary">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
  );
}

function DynamicList({
  items,
  onChange,
  placeholder,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
}) {
  const addItem = () => {
    onChange([...items, ""]);
  };

  const updateItem = (index: number, value: string) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-1.5">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <GripVertical className="h-3 w-3 text-text-tertiary shrink-0 opacity-40" />
          <Input
            value={item}
            onChange={(e) => updateItem(i, e.target.value)}
            placeholder={placeholder}
            className="h-8 text-[13px] flex-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeItem(i)}
            className="h-7 w-7 shrink-0 text-text-tertiary hover:text-red-500"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={addItem}
        className="h-7 text-[12px] gap-1 text-accent hover:text-accent/80"
      >
        <Plus className="h-3 w-3" /> Add {placeholder.toLowerCase().replace("add ", "")}
      </Button>
    </div>
  );
}

function ResultList({
  items,
  onChange,
}: {
  items: { metric: string; value: string; label: string }[];
  onChange: (items: { metric: string; value: string; label: string }[]) => void;
}) {
  const addItem = () => {
    onChange([...items, { metric: "", value: "", label: "" }]);
  };

  const updateItem = (index: number, field: "metric" | "value" | "label", value: string) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-1.5">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-1.5">
          <GripVertical className="h-3 w-3 text-text-tertiary shrink-0 mt-2.5 opacity-40" />
          <div className="flex-1 grid grid-cols-3 gap-1.5">
            <Input
              value={item.metric}
              onChange={(e) => updateItem(i, "metric", e.target.value)}
              placeholder="Metric"
              className="h-8 text-[13px]"
            />
            <Input
              value={item.value}
              onChange={(e) => updateItem(i, "value", e.target.value)}
              placeholder="Value"
              className="h-8 text-[13px]"
            />
            <Input
              value={item.label}
              onChange={(e) => updateItem(i, "label", e.target.value)}
              placeholder="Label"
              className="h-8 text-[13px]"
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeItem(i)}
            className="h-7 w-7 shrink-0 text-text-tertiary hover:text-red-500 mt-0.5"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={addItem}
        className="h-7 text-[12px] gap-1 text-accent hover:text-accent/80"
      >
        <Plus className="h-3 w-3" /> Add Result
      </Button>
    </div>
  );
}

export function EditorMain({ form, errors, onUpdate }: Props) {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-1.5">
        <FieldLabel label="Project Title" required />
        <Input
          value={form.title}
          onChange={(e) => onUpdate("title", e.target.value)}
          placeholder="e.g. E-Commerce Platform"
          className={cn("h-9 text-[14px]", errors.title && "border-red-500")}
        />
        <FieldError error={errors.title} />
      </div>

      {/* Slug */}
      <div className="space-y-1.5">
        <FieldLabel label="Slug" />
        <Input
          value={form.slug}
          onChange={(e) => onUpdate("slug", e.target.value)}
          placeholder="auto-generated-from-title"
          className="h-8 text-[13px] font-mono"
        />
        <p className="text-[10px] text-text-tertiary">URL-friendly identifier. Auto-generated from title if left empty.</p>
      </div>

      {/* Short Description */}
      <div className="space-y-1.5">
        <FieldLabel label="Short Description" required />
        <textarea
          value={form.description}
          onChange={(e) => onUpdate("description", e.target.value)}
          rows={3}
          placeholder="Brief description shown in project cards and search results"
          className={cn(
            "w-full rounded-md border border-border-subtle bg-background px-3 py-2 text-[13px] text-text-primary outline-none focus:ring-1 focus:ring-accent/30 resize-y",
            errors.description && "border-red-500"
          )}
        />
        <div className="flex items-center justify-between">
          <FieldError error={errors.description} />
          <span className="text-[10px] text-text-tertiary">{form.description.length}/500</span>
        </div>
      </div>

      {/* Long Description */}
      <div className="space-y-1.5">
        <FieldLabel label="Long Description" />
        <textarea
          value={form.fullDescription}
          onChange={(e) => onUpdate("fullDescription", e.target.value)}
          rows={8}
          placeholder="Detailed project description. Supports markdown."
          className="w-full rounded-md border border-border-subtle bg-background px-3 py-2 text-[13px] text-text-primary outline-none focus:ring-1 focus:ring-accent/30 resize-y"
        />
      </div>

      {/* Problem */}
      <div className="space-y-1.5">
        <FieldLabel label="Problem" />
        <textarea
          value={form.caseStudyProblem}
          onChange={(e) => onUpdate("caseStudyProblem", e.target.value)}
          rows={4}
          placeholder="What problem does this project solve?"
          className="w-full rounded-md border border-border-subtle bg-background px-3 py-2 text-[13px] text-text-primary outline-none focus:ring-1 focus:ring-accent/30 resize-y"
        />
      </div>

      {/* Solution */}
      <div className="space-y-1.5">
        <FieldLabel label="Solution" />
        <textarea
          value={form.caseStudySolution}
          onChange={(e) => onUpdate("caseStudySolution", e.target.value)}
          rows={4}
          placeholder="How did you solve the problem?"
          className="w-full rounded-md border border-border-subtle bg-background px-3 py-2 text-[13px] text-text-primary outline-none focus:ring-1 focus:ring-accent/30 resize-y"
        />
      </div>

      {/* Features */}
      <div className="space-y-1.5">
        <FieldLabel label="Features" />
        <DynamicList
          items={form.features}
          onChange={(items) => onUpdate("features", items)}
          placeholder="Add feature"
        />
      </div>

      {/* Challenges */}
      <div className="space-y-1.5">
        <FieldLabel label="Challenges" />
        <DynamicList
          items={form.challenges}
          onChange={(items) => onUpdate("challenges", items)}
          placeholder="Add challenge"
        />
      </div>

      {/* Results */}
      <div className="space-y-1.5">
        <FieldLabel label="Results" />
        <ResultList
          items={form.caseStudyResults}
          onChange={(items) => onUpdate("caseStudyResults", items)}
        />
      </div>
    </div>
  );
}
