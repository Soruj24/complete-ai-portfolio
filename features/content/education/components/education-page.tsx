"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, RefreshCw, GraduationCap, BookOpen, MapPin, Award, Calendar } from "lucide-react";
import { useEducation } from "../hooks/use-education";
import { DEGREE_LABELS } from "../types";
import type { DegreeType } from "../types";
import { EducationFormDialog } from "./education-form-dialog";

const DEG_OPTIONS: { value: DegreeType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  ...Object.entries(DEGREE_LABELS).map(([k, v]) => ({ value: k as DegreeType, label: v })),
];

export function EducationPage() {
  const { filtered, loading, error, search, setSearch, degreeFilter, setDegreeFilter, refresh, addEntry } = useEducation();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (error) {
    return <div className="flex flex-col items-center justify-center py-20 text-text-tertiary">
      <p className="text-lg font-medium text-error">Failed to load education</p>
      <button onClick={refresh} className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm text-white">Retry</button>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Education</h1>
          <p className="text-sm text-text-tertiary">Manage your academic background</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={refresh} className="flex items-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-hover">
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={() => setDialogOpen(true)} className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-white transition-colors hover:bg-accent-hover">
            <Plus size={16} /> New Entry
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Entries", value: filtered.length, icon: GraduationCap },
          { label: "In Progress", value: filtered.filter((e) => e.current).length, icon: BookOpen },
          { label: "Completed", value: filtered.filter((e) => !e.current).length, icon: Award },
          { label: "Institutions", value: [...new Set(filtered.map((e) => e.institution))].length, icon: MapPin },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border-primary bg-surface-primary p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-hover text-accent"><s.icon size={18} /></div>
              <div><p className="text-xs text-text-tertiary">{s.label}</p><p className="text-lg font-semibold text-text-primary">{s.value}</p></div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
          <input type="text" placeholder="Search education..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent" />
        </div>
        <div className="flex flex-wrap gap-1 rounded-lg border border-border-primary bg-surface-primary p-1">
          {DEG_OPTIONS.map((o) => (
            <button key={o.value} onClick={() => setDegreeFilter(o.value)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${degreeFilter === o.value ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"}`}>
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-32 animate-pulse rounded-xl bg-surface-hover" />)}
        </div>
      ) : !filtered.length ? (
        <div className="flex flex-col items-center justify-center py-16 text-text-tertiary">
          <GraduationCap size={48} className="mb-4 opacity-40" />
          <p className="text-lg font-medium">No education entries found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((edu, i) => (
            <motion.div key={edu.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-border-primary bg-surface-primary p-5 transition-colors hover:border-accent/30"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-lg font-bold text-accent">
                    {edu.institution.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{edu.degree} in {edu.field}</h3>
                    <div className="mt-0.5 flex items-center gap-3 text-sm text-text-secondary">
                      <span className="flex items-center gap-1"><GraduationCap size={14} />{edu.institution}</span>
                      <span className="flex items-center gap-1"><MapPin size={14} />{edu.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {edu.current && <span className="rounded-md bg-success/10 px-2 py-0.5 text-xs font-medium text-success">In Progress</span>}
                  <span className="rounded-md bg-surface-hover px-2 py-0.5 text-xs text-text-secondary">{DEGREE_LABELS[edu.degreeType]}</span>
                </div>
              </div>

              <p className="mb-3 text-sm text-text-tertiary">{edu.description}</p>

              <ul className="mb-3 space-y-1">
                {edu.highlights.map((h, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-text-secondary">
                    <span className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4 text-xs text-text-tertiary">
                <span className="flex items-center gap-1"><Calendar size={12} />{new Date(edu.startDate).toLocaleDateString("en-US", { year: "numeric" })} — {edu.current ? "Present" : edu.endDate ? new Date(edu.endDate).toLocaleDateString("en-US", { year: "numeric" }) : ""}</span>
                {edu.gpa && <span className="flex items-center gap-1"><Award size={12} />GPA: {edu.gpa}</span>}
              </div>
            </motion.div>
          ))}
        </div>
      )}
      <EducationFormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onSubmit={async (d) => { await addEntry(d); }} />
    </div>
  );
}
