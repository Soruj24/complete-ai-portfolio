"use client";

import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { TechStack } from "@/components/ui/tech-icon";
import { ProjectImage } from "@/components/ui/project-image";
import type { Project } from "./types";

export function FeaturedCard({ project }: { project: Project }) {
  const projectId = project._id || project.id;

  return (
    <AnimatedSection>
      <div className="block group">
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl bg-surface border border-border-subtle overflow-hidden hover:border-border transition-all duration-300">
          <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px] overflow-hidden bg-background">
            <ProjectImage src={project.image} alt={project.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {project.featured && (
              <div className="absolute top-3 left-3">
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent bg-background/90 border border-border-subtle rounded-md">
                  Featured
                </span>
              </div>
            )}
          </div>

          <div className="p-6 lg:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {project.emoji && <span className="text-lg">{project.emoji}</span>}
                  <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">
                    {project.category || "Project"}
                  </span>
                </div>
                <h3 className="text-[clamp(1.1rem,2vw,1.5rem)] font-semibold text-text-primary tracking-[-0.02em] leading-snug">
                  <a
                    href={`/projects/${projectId}`}
                    className="hover:text-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                  >
                    {project.title}
                  </a>
                </h3>
              </div>

              <p className="text-[13.5px] text-text-secondary leading-relaxed">
                {project.description}
              </p>

              {project.caseStudy?.problem && (
                <div className="p-3.5 rounded-xl bg-background border border-border-subtle">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent mb-1.5">
                    Problem
                  </p>
                  <p className="text-[12.5px] text-text-secondary leading-relaxed">
                    {project.caseStudy.problem}
                  </p>
                </div>
              )}

              {project.features && project.features.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-tertiary mb-2">
                    Key Features
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.features.slice(0, 4).map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-background text-text-secondary border border-border-subtle"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-tertiary mb-2">
                  Tech Stack
                </p>
                <TechStack technologies={project.technologies} limit={6} />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-border-subtle">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-medium text-text-secondary bg-background border border-border-subtle hover:bg-surface hover:text-text-primary hover:border-border transition-all duration-200 min-h-[36px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Github className="w-3.5 h-3.5" aria-hidden="true" />
                  Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-medium text-accent-foreground bg-accent hover:brightness-110 transition-all duration-200 min-h-[36px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  Live Demo
                </a>
              )}
              <a
                href={`/projects/${projectId}`}
                className="ml-auto inline-flex items-center gap-1 text-[12px] font-medium text-text-tertiary hover:text-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              >
                View Details
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
