"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Plus, RefreshCw, Briefcase, Building2, Calendar, MapPin, Clock } from "lucide-react";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";
import { toastSuccess } from "@/shared/utils/swal";
import { EMPLOYMENT_LABELS } from "../types";
import type { EmploymentType, Experience } from "../types";
import { ExperienceFormDialog } from "./experience-form-dialog";

const TYPE_OPTIONS: { value: EmploymentType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  ...Object.entries(EMPLOYMENT_LABELS).map(([k, v]) => ({ value: k as EmploymentType, label: v })),
];

export function ExperiencePage() {
  const { data: response, isLoading, error, refetch } = useGetAdminResourceQuery({ resource: "experience" });
  const entries: Experience[] = useMemo(() => (response?.data ?? []) as Experience[], [response]);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<EmploymentType | "all">("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = useMemo(() => {
    return entries.filter((e: Experience) => {
      if (search && !e.company.toLowerCase().includes(search.toLowerCase()) && !e.position.toLowerCase().includes(search.toLowerCase())) return false;
      if (typeFilter !== "all" && e.employmentType !== typeFilter) return false;
      return true;
    });
  }, [entries, search, typeFilter]);

  const totalYears = useMemo(() => {
    return filtered.reduce((sum: number, e: Experience) => {
      const start = new Date(e.startDate);
      const end = e.current ? new Date() : e.endDate ? new Date(e.endDate) : new Date();
      const years = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365);
      return sum + Math.max(0, years);
    }, 0).toFixed(1);
  }, [filtered]);

  if (error) {
    return <div className="flex flex-col items-center justify-center py-20 text-text-tertiary">
      <p className="text-lg font-medium text-error">Failed to load experience</p>
      <button onClick={() => refetch()} className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm text-white">Retry</button>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Experience</h1>
          <p className="text-sm text-text-tertiary">Manage your work history</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => refetch()} className="flex items-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-hover">
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={() => setDialogOpen(true)} className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-white transition-colors hover:bg-accent-hover">
            <Plus size={16} /> New Entry
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Positions", value: filtered.length, icon: Briefcase },
          { label: "Current", value: filtered.filter((e: Experience) => e.current).length, icon: Building2 },
          { label: "Total Years", value: totalYears, icon: Calendar },
          { label: "Companies", value: [...new Set(filtered.map((e: Experience) => e.company))].length, icon: MapPin },
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
          <input type="text" placeholder="Search experience..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent" />
        </div>
        <div className="flex flex-wrap gap-1 rounded-lg border border-border-primary bg-surface-primary p-1">
          {TYPE_OPTIONS.map((o) => (
            <button key={o.value} onClick={() => setTypeFilter(o.value)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${typeFilter === o.value ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"}`}>
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_: unknown, i: number) => <div key={i} className="h-36 animate-pulse rounded-xl bg-surface-hover" />)}
        </div>
      ) : !filtered.length ? (
        <div className="flex flex-col items-center justify-center py-16 text-text-tertiary">
          <Briefcase size={48} className="mb-4 opacity-40" />
          <p className="text-lg font-medium">No experience entries found</p>
        </div>
      ) : (
        <div className="relative space-y-6 before:absolute before:left-[19px] before:top-0 before:h-full before:w-px before:bg-border-primary">
          {filtered.map((exp: Experience, i: number) => (
            <motion.div key={exp.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className="relative pl-12"
            >
              <div className="absolute left-[13px] top-1 h-3 w-3 rounded-full border-2 border-accent bg-surface-primary" />
              <div className="rounded-xl border border-border-primary bg-surface-primary p-5 transition-colors hover:border-accent/30">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-text-primary">{exp.position}</h3>
                      {exp.current && <span className="rounded-md bg-success/10 px-2 py-0.5 text-xs font-medium text-success">Current</span>}
                    </div>
                    <div className="mt-0.5 flex items-center gap-3 text-sm text-text-secondary">
                      <span className="flex items-center gap-1"><Building2 size={14} />{exp.company}</span>
                      <span className="flex items-center gap-1"><MapPin size={14} />{exp.location}</span>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-md bg-surface-hover px-2 py-0.5 text-xs text-text-secondary">
                    {EMPLOYMENT_LABELS[exp.employmentType]}
                  </span>
                </div>

                <p className="text-sm text-text-tertiary mb-3">{exp.description}</p>

                <div className="mb-3 flex flex-wrap gap-1.5">
                  {exp.techStack.map((t: string) => (
                    <span key={t} className="rounded-md bg-surface-hover px-2 py-0.5 text-xs text-text-secondary">{t}</span>
                  ))}
                </div>

                <ul className="mb-3 space-y-1">
                  {exp.highlights.map((h: string, j: number) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-text-secondary">
                      <span className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-1 text-xs text-text-tertiary">
                  <Calendar size={12} />
                  <span>{new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} — {exp.current ? "Present" : exp.endDate ? new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : ""}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      <ExperienceFormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onSubmit={async (d: Record<string, unknown>) => { await fetch("/api/admin/experience", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) }); toastSuccess("Created!", "Experience entry has been created."); refetch(); }} />
    </div>
  );
}
