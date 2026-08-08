"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Github, ImageOff, Loader2, ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Section, SectionHeader } from "@/components/ui/section";
import { AnimatedSection } from "@/components/ui/animated-section";
import { TechStack } from "@/components/ui/tech-icon";
import { SOCIAL } from "@/lib/constants";

const FILTERS = ["All", "Full Stack", "AI", "SaaS", "Real-time", "E-commerce"] as const;

type FilterType = (typeof FILTERS)[number];

interface Project {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  technologies: string[];
  features?: string[];
  githubUrl?: string;
  liveUrl?: string;
  category?: string;
  featured?: boolean;
  emoji?: string;
  caseStudy?: {
    problem?: string;
    solution?: string;
    results?: { metric: string; value: string; label?: string }[];
  };
}

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-surface text-text-tertiary">
        <ImageOff className="w-6 h-6" />
      </div>
    );
  }

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface">
          <Loader2 className="w-4 h-4 animate-spin text-text-tertiary" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          "w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
    </>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  const projectId = project._id || project.id;

  return (
    <AnimatedSection>
      <a href={`/projects/${projectId}`} className="block group">
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl bg-surface border border-border-subtle overflow-hidden hover:border-border transition-all duration-300">
          {/* Image */}
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

          {/* Content */}
          <div className="p-6 lg:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {project.emoji && <span className="text-lg">{project.emoji}</span>}
                  <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">
                    {project.category || "Project"}
                  </span>
                </div>
                <h3 className="text-[clamp(1.1rem,2vw,1.5rem)] font-semibold text-text-primary tracking-[-0.02em] leading-snug group-hover:text-accent transition-colors duration-200">
                  {project.title}
                </h3>
              </div>

              <p className="text-[13.5px] text-text-secondary leading-relaxed">
                {project.description}
              </p>

              {/* Problem Solved */}
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

              {/* Key Features */}
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

              {/* Tech Stack */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-tertiary mb-2">
                  Tech Stack
                </p>
                <TechStack technologies={project.technologies} limit={6} />
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-border-subtle">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-medium text-text-secondary bg-background border border-border-subtle hover:bg-surface hover:text-text-primary hover:border-border transition-all duration-200 min-h-[36px]"
                >
                  <Github className="w-3.5 h-3.5" />
                  Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-medium text-accent-foreground bg-accent hover:brightness-110 transition-all duration-200 min-h-[36px]"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Demo
                </a>
              )}
              <span className="ml-auto inline-flex items-center gap-1 text-[12px] font-medium text-text-tertiary group-hover:text-accent transition-colors duration-200">
                View Details
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </div>
      </a>
    </AnimatedSection>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const projectId = project._id || project.id;

  return (
    <AnimatedSection>
      <a href={`/projects/${projectId}`} className="block group h-full">
        <div className="h-full rounded-2xl bg-surface border border-border-subtle overflow-hidden hover:border-border transition-all duration-300 flex flex-col">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden bg-background">
            <ProjectImage src={project.image} alt={project.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-2.5 right-2.5 flex gap-1 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
              {project.githubUrl && (
                <span
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-md bg-black/40 backdrop-blur-sm text-white/90 hover:bg-black/60 transition-colors cursor-pointer"
                >
                  <Github className="w-3 h-3" />
                </span>
              )}
              {project.liveUrl && (
                <span
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-md bg-black/40 backdrop-blur-sm text-white/90 hover:bg-black/60 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3 h-3" />
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col flex-1">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                {project.emoji && <span className="text-sm">{project.emoji}</span>}
                <h3 className="text-[14px] font-semibold text-text-primary tracking-[-0.01em] line-clamp-1 group-hover:text-accent transition-colors duration-200">
                  {project.title}
                </h3>
              </div>
              <ArrowUpRight className="w-4 h-4 text-text-tertiary group-hover:text-accent transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
            </div>

            <p className="text-[12px] text-text-secondary line-clamp-2 leading-relaxed mb-3 flex-1">
              {project.description}
            </p>

            {/* Tech Stack */}
            <TechStack technologies={project.technologies} limit={3} />
          </div>
        </div>
      </a>
    </AnimatedSection>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

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

        {/* Filters */}
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
            <Loader2 className="w-5 h-5 animate-spin text-text-tertiary" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[14px] text-text-secondary">No projects in this category.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Featured Project */}
            {featured && <FeaturedCard project={featured} />}

            {/* Secondary Projects Grid */}
            {secondary.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {secondary.map((project) => (
                  <ProjectCard key={project._id || project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* View More */}
        <AnimatedSection delay={0.2}>
          <div className="mt-10 text-center">
            <a
              href={SOCIAL.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-medium text-text-secondary border border-border-subtle hover:bg-surface hover:text-text-primary hover:border-border transition-all duration-200 min-h-[44px]"
            >
              View More on GitHub
              <Github className="w-4 h-4" />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </Section>
  );
}
