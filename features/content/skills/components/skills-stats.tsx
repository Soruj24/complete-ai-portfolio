"use client";

import { motion } from "framer-motion";
import { Code2, BarChart3 } from "lucide-react";
import { SKILL_CATEGORY_LABELS } from "../types";
import type { Skill, SkillCategory } from "../types";

export function SkillsStats({ skills }: { skills: Skill[] }) {
  const grouped = new Map<SkillCategory, Skill[]>();
  for (const s of skills) {
    const existing = grouped.get(s.category) ?? [];
    existing.push(s);
    grouped.set(s.category, existing);
  }

  const avgLevel = skills.length
    ? Math.round(skills.reduce((sum, s) => sum + s.level, 0) / skills.length)
    : 0;

  const topEntry = [...grouped.entries()].sort((a, b) => b[1].length - a[1].length)[0];
  const topCategory = topEntry ? SKILL_CATEGORY_LABELS[topEntry[0]] : "--";

  const stats = [
    { label: "Total Skills", value: skills.length, icon: Code2 },
    { label: "Categories", value: grouped.size, icon: BarChart3 },
    { label: "Avg Proficiency", value: `${avgLevel}%`, icon: BarChart3 },
    { label: "Top Category", value: topCategory, icon: Code2 },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-4">
      {stats.map((s, i) => (
        <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
          className="rounded-xl border border-border-primary bg-surface-primary p-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-hover text-accent">
              <s.icon size={18} />
            </div>
            <div>
              <p className="text-xs text-text-tertiary">{s.label}</p>
              <p className="text-lg font-semibold text-text-primary">{s.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
