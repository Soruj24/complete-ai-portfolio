import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import type { FieldDef } from "@/types/admin";

export function renderCell(field: FieldDef, row: Record<string, unknown>): ReactNode {
  if (field.render) return field.render(row[field.key], row);
  const val = row[field.key];
  if (val === null || val === undefined) return <span className="text-text-tertiary">—</span>;
  if (field.type === "toggle") return val ? <Badge className="bg-success/10 text-success border-none">Yes</Badge> : <Badge className="bg-error/10 text-error border-none">No</Badge>;
  if (field.type === "select") {
    const opt = field.options?.find(o => o.value === val);
    return (opt?.label ?? String(val)) as ReactNode;
  }
  if (typeof val === "boolean") return val ? "Yes" : "No";
  return String(val);
}
