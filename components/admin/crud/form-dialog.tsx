"use client";

import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormFieldRenderer } from "./form-field";
import type { FieldDef } from "@/types/admin";

interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  fields: FieldDef[];
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  onSubmit: () => void;
  onDelete?: () => void;
  loading?: boolean;
  mode: "create" | "edit";
  errors?: Record<string, string>;
}

function FormField({ field, value, onChange, error, loading }: {
  field: FieldDef; value: unknown; onChange: (key: string, value: unknown) => void; error?: string; loading?: boolean;
}) {
  return (
    <div className={cn(field.type === "richtext" || field.type === "textarea" ? "md:col-span-2" : "")}>
      <Label htmlFor={field.key} className="text-xs font-medium text-text-secondary mb-1.5 block">
        {field.label}
        {field.validation?.required && <span className="text-error ml-0.5">*</span>}
      </Label>
      <FormFieldRenderer field={field} value={value} onChange={onChange} error={error} loading={loading} />
      {field.description && !error && <p className="text-[10px] text-text-tertiary mt-1">{field.description}</p>}
      {error && <p className="text-[10px] text-error mt-1">{error}</p>}
    </div>
  );
}

export function FormDialog({
  open, onOpenChange, title, description, fields, values, onChange, onSubmit, onDelete,
  loading, mode, errors = {},
}: FormDialogProps) {
  const [groups] = useState(() => {
    const g = new Set<string>();
    fields.forEach(f => f.group && g.add(f.group));
    return Array.from(g);
  });
  const visibleFields = fields.filter(f => f.hidden !== true && f.showInForm !== false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          {groups.length > 0 ? groups.map((group) => (
            <div key={group} className="space-y-4">
              <h4 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">{group}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visibleFields.filter(f => f.group === group).map((field) => (
                  <FormField key={field.key} field={field} value={values[field.key]} onChange={onChange} error={errors[field.key]} loading={loading} />
                ))}
              </div>
            </div>
          )) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visibleFields.map((field) => (
                <FormField key={field.key} field={field} value={values[field.key]} onChange={onChange} error={errors[field.key]} loading={loading} />
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
            <div>
              {mode === "edit" && onDelete && (
                <Button type="button" variant="outline" onClick={onDelete} className="text-error border-error/20 hover:bg-error/10 rounded-lg text-xs h-9">
                  Delete
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="rounded-lg text-xs h-9">Cancel</Button>
              <Button type="submit" disabled={loading} className="rounded-lg text-xs h-9 bg-accent hover:bg-accent/90">
                {loading && <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />}
                {mode === "create" ? "Create" : "Save Changes"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
