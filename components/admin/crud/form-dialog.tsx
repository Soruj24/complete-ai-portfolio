"use client";

import { useState, useEffect } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
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

  const renderField = (field: FieldDef) => {
    const val = values[field.key] ?? field.defaultValue ?? "";
    const error = errors[field.key];

    const sharedProps = {
      id: field.key,
      placeholder: field.placeholder,
      disabled: field.disabled || loading,
      className: cn(
        "border-border-subtle bg-surface rounded-lg",
        error && "border-error",
        field.type === "textarea" ? "min-h-[80px]" : "h-9",
      ),
      ...field.inputProps,
    };

    switch (field.type) {
      case "textarea":
      case "richtext":
        return (
          <Textarea
            {...sharedProps}
            value={String(val ?? "")}
            onChange={(e) => onChange(field.key, e.target.value)}
            className={cn(sharedProps.className, "resize-y min-h-[80px]")}
          />
        );
      case "toggle":
        return (
          <Switch
            checked={Boolean(val)}
            onCheckedChange={(checked) => onChange(field.key, checked)}
            disabled={field.disabled || loading}
          />
        );
      case "select":
        return (
          <Select
            value={String(val ?? "")}
            onValueChange={(v) => onChange(field.key, v)}
            disabled={field.disabled || loading}
          >
            <SelectTrigger className={cn("h-9 border-border-subtle bg-surface rounded-lg", error && "border-error")}>
              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "number":
        return (
          <Input
            {...sharedProps}
            type="number"
            value={String(val ?? "")}
            onChange={(e) => onChange(field.key, e.target.value ? Number(e.target.value) : "")}
          />
        );
      case "url":
        return (
          <Input
            {...sharedProps}
            type="url"
            value={String(val ?? "")}
            onChange={(e) => onChange(field.key, e.target.value)}
          />
        );
      case "email":
        return (
          <Input
            {...sharedProps}
            type="email"
            value={String(val ?? "")}
            onChange={(e) => onChange(field.key, e.target.value)}
          />
        );
      case "date":
        return (
          <Input
            {...sharedProps}
            type="date"
            value={String(val ?? "")}
            onChange={(e) => onChange(field.key, e.target.value)}
          />
        );
      case "datetime":
        return (
          <Input
            {...sharedProps}
            type="datetime-local"
            value={String(val ?? "")}
            onChange={(e) => onChange(field.key, e.target.value)}
          />
        );
      case "password":
        return (
          <Input
            {...sharedProps}
            type="password"
            value={String(val ?? "")}
            onChange={(e) => onChange(field.key, e.target.value)}
          />
        );
      case "color":
        return (
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={String(val ?? "#000000")}
              onChange={(e) => onChange(field.key, e.target.value)}
              className="w-10 h-9 p-0.5 border-border-subtle rounded-lg cursor-pointer"
            />
            <Input
              value={String(val ?? "")}
              onChange={(e) => onChange(field.key, e.target.value)}
              className="flex-1 h-9 border-border-subtle bg-surface rounded-lg"
            />
          </div>
        );
      default:
        return (
          <Input
            {...sharedProps}
            value={String(val ?? "")}
            onChange={(e) => onChange(field.key, e.target.value)}
          />
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          {groups.length > 0 ? (
            groups.map((group) => (
              <div key={group} className="space-y-4">
                <h4 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">{group}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {visibleFields.filter(f => f.group === group).map((field) => (
                    <div key={field.key} className={cn(field.type === "richtext" || field.type === "textarea" ? "md:col-span-2" : "")}>
                      <Label htmlFor={field.key} className="text-xs font-medium text-text-secondary mb-1.5 block">
                        {field.label}
                        {field.validation?.required && <span className="text-error ml-0.5">*</span>}
                      </Label>
                      {renderField(field)}
                      {field.description && !errors[field.key] && (
                        <p className="text-[10px] text-text-tertiary mt-1">{field.description}</p>
                      )}
                      {errors[field.key] && <p className="text-[10px] text-error mt-1">{errors[field.key]}</p>}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visibleFields.map((field) => (
                <div key={field.key} className={cn(field.type === "richtext" || field.type === "textarea" ? "md:col-span-2" : "")}>
                  <Label htmlFor={field.key} className="text-xs font-medium text-text-secondary mb-1.5 block">
                    {field.label}
                    {field.validation?.required && <span className="text-error ml-0.5">*</span>}
                  </Label>
                  {renderField(field)}
                  {field.description && !errors[field.key] && (
                    <p className="text-[10px] text-text-tertiary mt-1">{field.description}</p>
                  )}
                  {errors[field.key] && <p className="text-[10px] text-error mt-1">{errors[field.key]}</p>}
                </div>
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
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="rounded-lg text-xs h-9">
                Cancel
              </Button>
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
