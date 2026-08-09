"use client";

import { Building2, MapPin, Calendar, Briefcase, Award, Wrench, ListChecks } from "lucide-react";
import { EmptyState } from "@/components/admin/shared-states";
import type { Experience } from "../types";
import { EMPLOYMENT_LABELS } from "../types";

interface Props {
  experiences: Experience[];
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function getDuration(startDate: string, endDate: string | null, current: boolean): string {
  const start = new Date(startDate);
  const end = current ? new Date() : endDate ? new Date(endDate) : new Date();
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  const remMonths = months % 12;
  if (years === 0) return `${remMonths}mo`;
  if (remMonths === 0) return `${years}yr`;
  return `${years}yr ${remMonths}mo`;
}

export function ExperienceTimelinePreview({ experiences }: Props) {
  if (experiences.length === 0) {
    return <EmptyState icon={Briefcase} title="No experience entries" description="Add your work experience to showcase your career." />;
  }

  return (
    <div className="relative space-y-0">
      <div className="absolute left-[18px] top-0 bottom-0 w-px bg-border-subtle" />
      {experiences.map((exp, i) => (
        <div key={exp._id} className="relative pl-10 pb-8 last:pb-0">
          <div className={`absolute left-[11px] top-1.5 h-[15px] w-[15px] rounded-full border-2 ${
            exp.current ? "border-emerald-500 bg-emerald-500/10" : "border-accent bg-accent/10"
          }`} />

          <div className="rounded-lg border border-border-subtle bg-surface p-4 hover:border-accent/20 transition-colors">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-[13px] font-semibold text-text-primary">{exp.role}</h4>
                  {exp.current && (
                    <span className="shrink-0 rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600">Current</span>
                  )}
                  <span className="shrink-0 rounded bg-surface-hover px-1.5 py-0.5 text-[10px] font-medium text-text-tertiary">
                    {EMPLOYMENT_LABELS[exp.employmentType]}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-0.5 text-[12px] text-text-secondary">
                  <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{exp.company}</span>
                  {exp.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{exp.location}</span>}
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 text-[11px] text-text-tertiary">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}</span>
                <span className="text-text-tertiary/50">({getDuration(exp.startDate, exp.endDate, exp.current)})</span>
              </div>
            </div>

            {exp.description && (
              <p className="text-[12px] text-text-tertiary mb-3 leading-relaxed">{exp.description}</p>
            )}

            {exp.responsibilities.length > 0 && (
              <div className="mb-2">
                <div className="flex items-center gap-1 mb-1">
                  <ListChecks className="h-3 w-3 text-text-tertiary" />
                  <span className="text-[10px] font-medium text-text-tertiary uppercase tracking-wider">Responsibilities</span>
                </div>
                <ul className="space-y-0.5">
                  {exp.responsibilities.map((r, j) => (
                    <li key={j} className="flex items-start gap-1.5 text-[11px] text-text-secondary">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent/50" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {exp.achievements.length > 0 && (
              <div className="mb-2">
                <div className="flex items-center gap-1 mb-1">
                  <Award className="h-3 w-3 text-amber-500" />
                  <span className="text-[10px] font-medium text-text-tertiary uppercase tracking-wider">Achievements</span>
                </div>
                <ul className="space-y-0.5">
                  {exp.achievements.map((a, j) => (
                    <li key={j} className="flex items-start gap-1.5 text-[11px] text-text-secondary">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-amber-500/50" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {exp.technologies.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap mt-2">
                <Wrench className="h-3 w-3 text-text-tertiary" />
                {exp.technologies.map((t) => (
                  <span key={t} className="rounded bg-surface-hover px-1.5 py-0.5 text-[10px] font-medium text-text-tertiary">{t}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
