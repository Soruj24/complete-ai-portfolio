"use client";

import { motion } from "framer-motion";
import type { Skill } from "../types";

export function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="rounded-xl border border-border-primary bg-surface-primary p-4 transition-colors hover:border-accent/30"
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: skill.color }} />
          <span className="text-sm font-medium text-text-primary">{skill.name}</span>
        </div>
        <span className="text-xs font-semibold" style={{ color: skill.color }}>
          {skill.level}%
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-hover">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: index * 0.05 }}
          className="h-full rounded-full"
          style={{ backgroundColor: skill.color }}
        />
      </div>
      <p className="mt-2 text-xs text-text-tertiary">
        {skill.yearsOfExperience} yr{skill.yearsOfExperience !== 1 ? "s" : ""} experience
      </p>
    </motion.div>
  );
}
