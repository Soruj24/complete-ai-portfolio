"use client";

import { experiences } from "@/data/experience";
import { Section, SectionHeader } from "@/components/ui/section";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GlassCard } from "@/components/ui/glass-card";
import { CheckCircle2 } from "lucide-react";

export function Experience() {
  return (
    <Section id="experience" variant="alt">
      <div className="container">
        <SectionHeader
          label="Experience"
          title="Building Production Systems"
          description="From frontend to AI engineering — every project shipped to production."
        />

        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent" />

          <div className="space-y-6 md:space-y-8">
            {experiences.map((exp, i) => (
              <AnimatedSection key={exp.period} delay={i * 0.12}>
                <div className="relative pl-12 md:pl-14">
                  <div className="absolute left-2.5 md:left-3 top-2 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-accent ring-[3px] ring-background">
                    <div className="absolute inset-0.5 rounded-full bg-background" />
                  </div>

                  <GlassCard className="p-5 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 mb-2">
                      <span className="text-xs font-mono font-medium text-accent tabular-nums tracking-tight">
                        {exp.period}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-accent/10 text-accent border border-accent/15 w-fit">
                        {exp.icon} {exp.company}
                      </span>
                    </div>
                    <h3 className="text-[15px] md:text-[17px] font-semibold mb-2 leading-snug">{exp.role}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-3">
                      {exp.description}
                    </p>
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-1.5 mb-3">
                        {exp.highlights.map((h, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-text-secondary">
                            <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-accent/10 text-accent border border-accent/15"
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
