"use client";

import { useState, useEffect } from "react";
import { Section, SectionHeader } from "@/components/ui/section";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GlassCard } from "@/components/ui/glass-card";
import { CheckCircle2 } from "lucide-react";

export function Experience() {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/experience")
      .then((res) => res.json())
      .then((data) => setExperiences(data.data ?? []))
      .catch(() => setExperiences([]));
  }, []);

  return (
    <Section id="experience">
      <div className="container">
        <SectionHeader
          label="Experience"
          title="Building Production Systems"
          description="From frontend to AI engineering — every project shipped to production."
        />

        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-[15px] md:left-[19px] top-0 bottom-0 w-px bg-border-subtle" />

          <div className="space-y-4 md:space-y-5">
            {experiences.map((exp: any, i: number) => (
              <AnimatedSection key={exp.period ?? exp._id} delay={i * 0.08}>
                <div className="relative pl-10 md:pl-12">
                  <div className="absolute left-[11px] md:left-[15px] top-3 w-2 h-2 rounded-full bg-accent ring-[2px] ring-background" />

                  <GlassCard className="p-4 md:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5 mb-1.5">
                      <span className="text-[11px] font-mono font-medium text-text-tertiary tabular-nums tracking-tight">
                        {exp.period}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-md bg-surface text-text-secondary border border-border-subtle w-fit">
                        {exp.icon} {exp.company}
                      </span>
                    </div>
                    <h3 className="text-[14px] md:text-[15px] font-semibold mb-1.5 leading-snug tracking-[-0.01em]">{exp.role}</h3>
                    <p className="text-[12px] text-text-secondary leading-relaxed mb-2.5">
                      {exp.description}
                    </p>
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-1 mb-2.5">
                        {exp.highlights.map((h: string, j: number) => (
                          <li key={j} className="flex items-start gap-1.5 text-[12px] text-text-secondary">
                            <CheckCircle2 className="w-3 h-3 text-accent shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {exp.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-surface text-text-secondary border border-border-subtle"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
