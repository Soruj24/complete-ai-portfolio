"use client";

import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import type { FieldDef } from "@/types/admin";

export function SortIcon({ field, sortKey, sortDir }: { field: FieldDef; sortKey: string; sortDir: "asc" | "desc" }) {
  if (!field.sortable) return <span className="w-4" />;
  if (sortKey !== field.key) return <ChevronsUpDown className="h-3 w-3 text-text-tertiary" />;
  return sortDir === "asc" ? <ChevronUp className="h-3 w-3 text-accent" /> : <ChevronDown className="h-3 w-3 text-accent" />;
}
