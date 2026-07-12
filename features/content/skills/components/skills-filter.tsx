"use client";

import { Search } from "lucide-react";
import { SKILL_CATEGORY_LABELS } from "../types";
import type { SkillCategory } from "../types";

const CATEGORY_OPTIONS: { value: SkillCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  ...Object.entries(SKILL_CATEGORY_LABELS).map(([k, v]) => ({ value: k as SkillCategory, label: v })),
];

export function SkillsFilter({ search, onSearchChange, category, onCategoryChange }: {
  search: string; onSearchChange: (v: string) => void;
  category: SkillCategory | "all"; onCategoryChange: (v: SkillCategory | "all") => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[200px] max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
        <input type="text" placeholder="Search skills..." value={search} onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent" />
      </div>
      <div className="flex flex-wrap gap-1 rounded-lg border border-border-primary bg-surface-primary p-1">
        {CATEGORY_OPTIONS.map((o) => (
          <button key={o.value} onClick={() => onCategoryChange(o.value)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${category === o.value ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"}`}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
