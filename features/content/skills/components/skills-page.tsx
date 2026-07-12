"use client";

import { useState, useMemo } from "react";
import { Plus, RefreshCw, Code2 } from "lucide-react";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";
import { toastSuccess } from "@/shared/utils/swal";
import { SKILL_CATEGORY_LABELS } from "../types";
import type { Skill, SkillCategory } from "../types";
import { SkillFormDialog } from "./skill-form-dialog";
import { SkillsStats } from "./skills-stats";
import { SkillsFilter } from "./skills-filter";
import { SkillCard } from "./skill-card";

export function SkillsPage() {
  const { data: response, isLoading, error, refetch } = useGetAdminResourceQuery({ resource: "skills" });
  const skills: Skill[] = useMemo(() => (response?.data ?? []) as Skill[], [response]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<SkillCategory | "all">("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = useMemo(() => {
    return skills.filter((s) => {
      if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== "all" && s.category !== category) return false;
      return true;
    });
  }, [skills, search, category]);

  const grouped = useMemo(() => {
    const map = new Map<SkillCategory, Skill[]>();
    for (const s of filtered) {
      const existing = map.get(s.category) ?? [];
      existing.push(s);
      map.set(s.category, existing);
    }
    return map;
  }, [filtered]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-text-tertiary">
        <p className="text-lg font-medium text-error">Failed to load skills</p>
        <button onClick={() => refetch()} className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm text-white">Retry</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Skills</h1>
          <p className="text-sm text-text-tertiary">Manage your technical skills and proficiencies</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => refetch()}
            className="flex items-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-hover">
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={() => setDialogOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-white transition-colors hover:bg-accent-hover">
            <Plus size={16} /> New Skill
          </button>
        </div>
      </div>

      <SkillsStats skills={filtered} />
      <SkillsFilter search={search} onSearchChange={setSearch} category={category} onCategoryChange={setCategory} />

      {isLoading ? (
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, gi) => (
            <div key={gi}>
              <div className="mb-3 h-5 w-24 animate-pulse rounded bg-surface-hover" />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-24 animate-pulse rounded-xl bg-surface-hover" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : !filtered.length ? (
        <div className="flex flex-col items-center justify-center py-16 text-text-tertiary">
          <Code2 size={48} className="mb-4 opacity-40" />
          <p className="text-lg font-medium">No skills found</p>
        </div>
      ) : (
        <div className="space-y-8">
          {[...grouped.entries()].map(([cat, catSkills]) => (
            <div key={cat}>
              <h3 className="mb-3 text-sm font-semibold text-text-primary">
                {SKILL_CATEGORY_LABELS[cat]} ({catSkills.length})
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {catSkills.map((skill, i) => (
                  <SkillCard key={skill._id} skill={skill} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <SkillFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={async (d) => {
          await fetch("/api/admin/skills", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(d),
          });
          toastSuccess("Created!", "Skill has been created.");
          refetch();
        }}
      />
    </div>
  );
}
