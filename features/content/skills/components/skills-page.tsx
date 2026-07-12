"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Plus, RefreshCw, Code2, BarChart3 } from "lucide-react";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";
import { toastSuccess } from "@/shared/utils/swal";
import { SKILL_CATEGORY_LABELS } from "../types";
import type { SkillCategory, Skill } from "../types";
import { SkillFormDialog } from "./skill-form-dialog";

const CATEGORY_OPTIONS: { value: SkillCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  ...Object.entries(SKILL_CATEGORY_LABELS).map(([k, v]) => ({
    value: k as SkillCategory,
    label: v,
  })),
];

export function SkillsPage() {
  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useGetAdminResourceQuery({ resource: "skills" });
  const skills: Skill[] = useMemo(
    () => (response?.data ?? []) as Skill[],
    [response],
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<SkillCategory | "all">("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = useMemo(() => {
    return skills.filter((s: Skill) => {
      if (search && !s.name.toLowerCase().includes(search.toLowerCase()))
        return false;
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

  const avgLevel = useMemo(() => {
    if (!filtered.length) return 0;
    return Math.round(
      filtered.reduce((sum: number, s: Skill) => sum + s.level, 0) /
        filtered.length,
    );
  }, [filtered]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-text-tertiary">
        <p className="text-lg font-medium text-error">Failed to load skills</p>
        <button
          onClick={() => refetch()}
          className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Skills</h1>
          <p className="text-sm text-text-tertiary">
            Manage your technical skills and proficiencies
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-hover"
          >
            <RefreshCw size={14} /> Refresh
          </button>
          <button
            onClick={() => setDialogOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-white transition-colors hover:bg-accent-hover"
          >
            <Plus size={16} /> New Skill
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total Skills", value: filtered.length, icon: Code2 },
          { label: "Categories", value: grouped.size, icon: BarChart3 },
          { label: "Avg Proficiency", value: `${avgLevel}%`, icon: BarChart3 },
          {
            label: "Top Category",
            value: [...grouped.entries()].sort(
              (a: [SkillCategory, Skill[]], b: [SkillCategory, Skill[]]) =>
                b[1].length - a[1].length,
            )[0]?.[0]
              ? SKILL_CATEGORY_LABELS[
                  [...grouped.entries()].sort(
                    (
                      a: [SkillCategory, Skill[]],
                      b: [SkillCategory, Skill[]],
                    ) => b[1].length - a[1].length,
                  )[0][0]
                ]
              : "--",
            icon: Code2,
          },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border-primary bg-surface-primary p-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-hover text-accent">
                <s.icon size={18} />
              </div>
              <div>
                <p className="text-xs text-text-tertiary">{s.label}</p>
                <p className="text-lg font-semibold text-text-primary">
                  {s.value}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
          />
          <input
            type="text"
            placeholder="Search skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent"
          />
        </div>
        <div className="flex flex-wrap gap-1 rounded-lg border border-border-primary bg-surface-primary p-1">
          {CATEGORY_OPTIONS.map((o) => (
            <button
              key={o.value}
              onClick={() => setCategory(o.value)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${category === o.value ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"}`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_: unknown, gi: number) => (
            <div key={gi}>
              <div className="mb-3 h-5 w-24 animate-pulse rounded bg-surface-hover" />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_: unknown, i: number) => (
                  <div
                    key={i}
                    className="h-24 animate-pulse rounded-xl bg-surface-hover"
                  />
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
          {[...grouped.entries()].map(([cat, catSkills], gi: number) => (
            <div key={cat}>
              <h3 className="mb-3 text-sm font-semibold text-text-primary">
                {SKILL_CATEGORY_LABELS[cat]} ({catSkills.length})
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {catSkills.map((skill: Skill, i: number) => (
                  <motion.div
                    key={skill._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="rounded-xl border border-border-primary bg-surface-primary p-4 transition-colors hover:border-accent/30"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: skill.color }}
                        />
                        <span className="text-sm font-medium text-text-primary">
                          {skill.name}
                        </span>
                      </div>
                      <span
                        className="text-xs font-semibold"
                        style={{ color: skill.color }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-hover">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: i * 0.05 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: skill.color }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-text-tertiary">
                      {skill.yearsOfExperience} yr
                      {skill.yearsOfExperience !== 1 ? "s" : ""} experience
                    </p>
                  </motion.div>
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
