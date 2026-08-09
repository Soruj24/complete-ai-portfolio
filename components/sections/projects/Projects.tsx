"use client";

import { useState, useEffect } from "react";
import { Github, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Section, SectionHeader } from "@/components/ui/section";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SOCIAL } from "@/lib/constants";
import { FeaturedCard } from "./FeaturedCard";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "./types";

const FILTERS = ["All", "Full Stack", "AI", "SaaS", "Real-time", "E-commerce"] as const;

type FilterType = (typeof FILTERS)[number];

interface ProjectsProps {
  initialProjects?: Project[];
}

export function Projects({ initialProjects = [] }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [loading, setLoading] = useState(initialProjects.length === 0);

  useEffect(() => {
    if (initialProjects.length > 0) return;
    fetch("/api/projects?limit=100")
      .then((res) => res.json())
      .then((data) => {
        const items = data.data ?? [];
        items.sort((a: Project, b: Project) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        setProjects(items);
      })
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, [initialProjects.length]);

  const filtered = projects.filter(
    (p) => activeFilter === "All" || p.category === activeFilter
  );

  const featured = filtered.find((p) => p.featured);
  const secondary = filtered.filter((p) => p !== featured);

  return (
    <Section id="projects">
      <div className="container">
        <SectionHeader
          label="Projects"
          title="Selected Work"
          description="Production-grade applications demonstrating full-stack engineering, AI integration, and system design."
        />

        <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5 mb-8 sm:mb-10">
          {FILTERS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={cn(
                "relative px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-[12px] sm:text-[13px] font-medium transition-all duration-200 min-h-[36px]",
                activeFilter === cat
                  ? "text-text-primary bg-surface border border-border-subtle"
                  : "text-text-tertiary hover:text-text-secondary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-5 h-5 animate-spin text-text-tertiary" role="status" aria-label="Loading projects" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[14px] text-text-secondary">No projects in this category.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {featured && <FeaturedCard project={featured} />}

            {secondary.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {secondary.map((project) => (
                  <ProjectCard key={project._id || project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        )}

        <AnimatedSection delay={0.2}>
          <div className="mt-10 text-center">
            <a
              href={SOCIAL.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-medium text-text-secondary border border-border-subtle hover:bg-surface hover:text-text-primary hover:border-border transition-all duration-200 min-h-[44px]"
            >
              View More on GitHub
              <Github className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </Section>
  );
}
