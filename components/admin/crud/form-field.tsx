"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { FieldDef } from "@/types/admin";

export function FormFieldRenderer({ field, value, onChange, error, loading }: {
  field: FieldDef;
  value: unknown;
  onChange: (key: string, value: unknown) => void;
  error?: string;
  loading?: boolean;
}) {
  const val = value ?? field.defaultValue ?? "";
  const sharedProps = {
    id: field.key,
    placeholder: field.placeholder,
    disabled: field.disabled || loading,
    className: cn("border-border-subtle bg-surface rounded-lg", error && "border-error", field.type === "textarea" ? "min-h-[80px]" : "h-9"),
    ...field.inputProps,
  };

  switch (field.type) {
    case "textarea":
    case "richtext":
      return (
        <Textarea {...sharedProps} value={String(val)} onChange={(e) => onChange(field.key, e.target.value)}
          className={cn(sharedProps.className, "resize-y min-h-[80px]")} />
      );
    case "toggle":
      return (
        <Switch checked={Boolean(val)} onCheckedChange={(checked) => onChange(field.key, checked)}
          disabled={field.disabled || loading} />
      );
    case "select":
      return (
        <Select value={String(val)} onValueChange={(v) => onChange(field.key, v)} disabled={field.disabled || loading}>
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
      return <Input {...sharedProps} type="number" value={String(val)} onChange={(e) => onChange(field.key, e.target.value ? Number(e.target.value) : "")} />;
    case "url":
      return <Input {...sharedProps} type="url" value={String(val)} onChange={(e) => onChange(field.key, e.target.value)} />;
    case "email":
      return <Input {...sharedProps} type="email" value={String(val)} onChange={(e) => onChange(field.key, e.target.value)} />;
    case "date":
      return <Input {...sharedProps} type="date" value={String(val)} onChange={(e) => onChange(field.key, e.target.value)} />;
    case "datetime":
      return <Input {...sharedProps} type="datetime-local" value={String(val)} onChange={(e) => onChange(field.key, e.target.value)} />;
    case "password":
      return <Input {...sharedProps} type="password" value={String(val)} onChange={(e) => onChange(field.key, e.target.value)} />;
    case "color":
      return (
        <div className="flex items-center gap-2">
          <Input type="color" value={String(val ?? "#000000")} onChange={(e) => onChange(field.key, e.target.value)}
            className="w-10 h-9 p-0.5 border-border-subtle rounded-lg cursor-pointer" />
          <Input value={String(val)} onChange={(e) => onChange(field.key, e.target.value)}
            className="flex-1 h-9 border-border-subtle bg-surface rounded-lg" />
        </div>
      );
    default:
      return <Input {...sharedProps} value={String(val)} onChange={(e) => onChange(field.key, e.target.value)} />;
  }
}
