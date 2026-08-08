"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRef, useState, useEffect } from "react";
import { Loader2, Briefcase } from "lucide-react";
import { IExperience } from "@/types";
import { useSectionAnimation } from "@/lib/hooks/use-section-animation";

export function Experience() {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await fetch("/api/experience");
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          console.error("Non-JSON response received from /api/experience");
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

  useSectionAnimation(sectionRef, (tl) => {
    tl.from(".experience-reveal-text", { y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" })
      .from(".experience-line", { scaleY: 0, transformOrigin: "top", duration: 1.5, ease: "none" }, "-=0.5")
      .from(
        ".experience-item",
        {
          x: (index) => (index % 2 === 0 ? -100 : 100),
          opacity: 0,
          duration: 1,
          stagger: 0.3,
          ease: "power4.out",
        },
        "-=1",
      )
      .from(".experience-dot", { scale: 0, duration: 0.5, stagger: 0.3, ease: "back.out(2)" }, "-=1.2");
  });

  return (
    <section id="experience" ref={sectionRef} className="py-20 md:py-28 bg-background border-t border-border-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-10 experience-reveal-text">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-tertiary mb-2 block">
            Experience
          </span>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-semibold tracking-[-0.02em] text-text-primary">
            Building Production Systems
          </h2>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border-subtle md:-translate-x-1/2 experience-line" />

          <div className="space-y-8 md:space-y-12">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
              </div>
            ) : experiences.length === 0 ? (
              <div className="text-center py-20 text-text-secondary">
                No experience records found.
              </div>
            ) : (
              experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-8 experience-item ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="w-full md:w-[45%] pl-10 md:pl-0">
                    <Card className="border border-border-subtle rounded-xl overflow-hidden bg-surface hover:border-border transition-all duration-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <Badge
                            className="bg-accent/10 text-accent border border-accent/20 px-2.5 py-0.5 rounded-md text-[10px] font-medium"
                          >
                            {exp.year}
                          </Badge>
                          <div className="w-8 h-8 rounded-lg bg-surface-hover flex items-center justify-center text-lg text-text-secondary group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-200">
                            {exp.icon}
                          </div>
                        </div>
                        <h3 className="text-[15px] font-semibold text-text-primary mb-1">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-1.5 text-accent font-medium mb-2 uppercase tracking-wider text-[10px]">
                          <Briefcase className="h-3 w-3" />
                          {exp.company}
                        </div>
                        <p className="text-[12px] text-text-secondary leading-relaxed mb-3">
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {exp.technologies?.map(
                            (tech: string, tIndex: number) => (
                              <Badge
                                key={tIndex}
                                variant="secondary"
                                className="px-2 py-0.5 rounded-md text-[10px] font-medium border border-border-subtle"
                              >
                                {tech}
                              </Badge>
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="absolute left-4 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-background border-2 border-accent z-10 experience-dot" />

                  <div className="hidden md:block w-[45%]" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
