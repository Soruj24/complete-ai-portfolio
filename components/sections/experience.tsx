"use client";

import { useState, useEffect } from "react";
import { Section, SectionHeader } from "@/components/ui/section";
import { AnimatedSection } from "@/components/ui/animated-section";
import {
  Briefcase,
  MapPin,
  CheckCircle2,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import { TechBadge } from "@/components/ui/tech-icon";

interface Experience {
  _id?: string;
  id?: string;
  role?: string;
  position?: string;
  company: string;
  location?: string;
  description?: string;
  technologies?: string[];
  techStack?: string[];
  highlights?: string[];
  icon?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  year?: string;
  period?: string;
  companyUrl?: string;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function DateRange({ exp }: { exp: Experience }) {
  const start = formatDate(exp.startDate || exp.year);
  const end = exp.current ? "Present" : formatDate(exp.endDate);
  const display = exp.period || (start ? `${start} — ${end || "Present"}` : exp.year);

  if (!display) return null;

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[11.5px] font-medium text-text-tertiary tabular-nums">
        {display}
      </span>
      {exp.current && (
        <span className="px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-success bg-success/10 rounded">
          Current
        </span>
      )}
    </div>
  );
}

function ExperienceCard({ exp }: { exp: Experience }) {
  const techs = exp.technologies || exp.techStack || [];

  return (
    <div className="group relative pl-8 md:pl-10 pb-8 last:pb-0">
      {/* Timeline indicator */}
      <div className="absolute left-0 top-1.5 w-[7px] h-[7px] rounded-full bg-border-strong group-hover:bg-accent transition-colors duration-200" />

      {/* Content */}
      <div className="p-4 md:p-5 rounded-xl bg-surface border border-border-subtle group-hover:border-border transition-all duration-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 mb-2.5">
          <div>
            <h3 className="text-[15px] font-semibold text-text-primary tracking-[-0.01em] leading-snug">
              {exp.role || exp.position}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              {exp.companyUrl ? (
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[12.5px] font-medium text-accent hover:underline"
                >
                  {exp.icon && <span>{exp.icon}</span>}
                  {exp.company}
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-1 text-[12.5px] font-medium text-text-secondary">
                  {exp.icon && <span>{exp.icon}</span>}
                  {exp.company}
                </span>
              )}
              {exp.location && (
                <span className="inline-flex items-center gap-0.5 text-[11px] text-text-tertiary">
                  <MapPin className="w-3 h-3" />
                  {exp.location}
                </span>
              )}
            </div>
          </div>
          <DateRange exp={exp} />
        </div>

        {/* Description */}
        {exp.description && (
          <p className="text-[12.5px] text-text-secondary leading-relaxed mb-3">
            {exp.description}
          </p>
        )}

        {/* Highlights / Responsibilities */}
        {exp.highlights && exp.highlights.length > 0 && (
          <ul className="space-y-1.5 mb-3">
            {exp.highlights.map((h, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[12px] text-text-secondary leading-relaxed"
              >
                <CheckCircle2 className="w-3 h-3 text-accent shrink-0 mt-[3px]" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Technologies */}
        {techs.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2 border-t border-border-subtle">
            {techs.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/experience")
      .then((res) => res.json())
      .then((data) => setExperiences(data.data ?? []))
      .catch(() => setExperiences([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Section id="experience">
      <div className="container">
        <SectionHeader
          label="Experience"
          title="Professional Experience"
          description="A timeline of roles, projects, and the technologies used to ship production systems."
        />

        <div className="max-w-2xl mx-auto">
          {/* Timeline line — hidden on mobile */}
          <div className="relative">
            <div className="absolute left-[3px] top-2 bottom-2 w-px bg-border-subtle hidden md:block" />

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-5 h-5 animate-spin text-text-tertiary" />
              </div>
            ) : experiences.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-[14px] text-text-secondary">No experience records found.</p>
              </div>
            ) : (
              <div className="space-y-0">
                {experiences.map((exp, i) => (
                  <AnimatedSection key={exp._id || exp.id || i} delay={i * 0.06}>
                    <ExperienceCard exp={exp} />
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
