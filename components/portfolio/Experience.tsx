"use client";

import { useRef, useState, useEffect } from "react";
import {
  MapPin,
  CheckCircle2,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import { IExperience } from "@/types";
import { useSectionAnimation } from "@/lib/hooks/use-section-animation";
import { TechBadge } from "@/components/ui/tech-icon";

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function DateRange({ exp }: { exp: IExperience }) {
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

function ExperienceCard({ exp }: { exp: IExperience }) {
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
              <span className="inline-flex items-center gap-1 text-[12.5px] font-medium text-text-secondary">
                {exp.icon && <span>{exp.icon}</span>}
                {exp.company}
              </span>
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

        {/* Highlights */}
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
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  useSectionAnimation(sectionRef, (tl) => {
    tl.from(".experience-heading", { y: 10, opacity: 0, duration: 0.5, ease: "power3.out" })
      .from(".experience-item", { y: 12, opacity: 0, duration: 0.4, stagger: 0.08, ease: "power3.out" }, "-=0.3");
  });

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await fetch("/api/experience");
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          return;
        }
        const data = await res.json();
        if (data.success) {
          setExperiences(data.experiences);
        }
      } catch (error) {
        console.error("Failed to fetch experiences:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 md:py-28 bg-background border-t border-border-subtle"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-14 experience-heading">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-tertiary mb-2 block">
            Experience
          </span>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-semibold tracking-[-0.02em] text-text-primary">
            Professional Experience
          </h2>
          <p className="text-[14px] text-text-secondary mt-2">
            A timeline of roles, projects, and the technologies used to ship production systems.
          </p>
        </div>

        <div className="max-w-2xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-[3px] top-2 bottom-2 w-px bg-border-subtle hidden md:block" />

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-5 h-5 animate-spin text-accent" />
            </div>
          ) : experiences.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[14px] text-text-secondary">No experience records found.</p>
            </div>
          ) : (
            <div className="space-y-0">
              {experiences.map((exp, i) => (
                <div key={exp._id || exp.id || i} className="experience-item">
                  <ExperienceCard exp={exp} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
