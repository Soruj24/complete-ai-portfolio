"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Github,
  ExternalLink,
  ArrowUpRight,
  ArrowRight,
  Loader2,
  ImageOff,
} from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { IProject } from "@/types";
import { useSectionAnimation } from "@/lib/hooks/use-section-animation";
import { CustomPagination } from "@/components/shared/CustomPagination";
import { TechStack } from "@/components/ui/tech-icon";
import { SOCIAL } from "@/lib/constants";

const FILTERS = ["All", "Full Stack", "AI", "SaaS", "Real-time", "E-commerce"] as const;

type FilterType = (typeof FILTERS)[number];

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

function FeaturedCard({ project }: { project: IProject }) {
  const projectId = project._id || project.id;

  return (
    <div className="group">
      <Link href={`/projects/${projectId}`} className="block">
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
            <div className="flex items-center gap-2 mt-5 pt-4 border-t border-border-subtle">
              {project.githubUrl && (
                <Button asChild variant="outline" size="sm">
                  <Link href={project.githubUrl} target="_blank" onClick={(e) => e.stopPropagation()}>
                    <Github className="w-3.5 h-3.5" />
                    Code
                  </Link>
                </Button>
              )}
              {project.liveUrl && (
                <Button asChild size="sm">
                  <Link href={project.liveUrl} target="_blank" onClick={(e) => e.stopPropagation()}>
                    <ExternalLink className="w-3.5 h-3.5" />
                    Live Demo
                  </Link>
                </Button>
              )}
              <span className="ml-auto inline-flex items-center gap-1 text-[12px] font-medium text-text-tertiary group-hover:text-accent transition-colors duration-200">
                View Details
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function ProjectCard({ project }: { project: IProject }) {
  const projectId = project._id || project.id;

  return (
    <div className="group h-full">
      <Link href={`/projects/${projectId}`} className="block h-full">
        <Card className="h-full rounded-2xl bg-surface border border-border-subtle overflow-hidden hover:border-border transition-all duration-300 flex flex-col">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden bg-background">
            <ProjectImage src={project.image} alt={project.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-2.5 right-2.5 flex gap-1 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
              {project.githubUrl && (
                <span className="p-1.5 rounded-md bg-black/40 backdrop-blur-sm text-white/90 hover:bg-black/60 transition-colors">
                  <Github className="w-3 h-3" />
                </span>
              )}
              {project.liveUrl && (
                <span className="p-1.5 rounded-md bg-black/40 backdrop-blur-sm text-white/90 hover:bg-black/60 transition-colors">
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
        </Card>
      </Link>
    </div>
  );
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const projectsPerPage = 6;
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/projects?page=${currentPage}&limit=${projectsPerPage}&featured=true`
        );
        const data = await res.json();
        if (data.success) {
          setProjects(data.projects);
          setTotalPages(data.pagination.pages);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [currentPage]);

  useSectionAnimation(
    sectionRef,
    (tl) => {
      tl.from(".projects-heading", { y: 10, opacity: 0, duration: 0.5, ease: "power3.out" })
        .from(".projects-filter", { y: 8, opacity: 0, duration: 0.4, ease: "power3.out" }, "-=0.3")
        .from(".projects-content", { y: 12, opacity: 0, duration: 0.4, ease: "power3.out" }, "-=0.2");
    },
    { deps: [currentPage, activeFilter] },
  );

  const filtered = projects.filter(
    (p) => activeFilter === "All" || p.category === activeFilter
  );

  const featured = filtered.find((p) => p.featured);
  const secondary = filtered.filter((p) => p !== featured);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 md:py-28 bg-background border-t border-border-subtle"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-10 projects-heading">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-tertiary mb-2 block">
            Projects
          </span>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-semibold tracking-[-0.02em] text-text-primary">
            Selected Work
          </h2>
          <p className="text-[14px] text-text-secondary mt-2">
            Production-grade applications demonstrating full-stack engineering, AI integration, and system design.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-10 projects-filter">
          {FILTERS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={cn(
                "relative px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200",
                activeFilter === cat
                  ? "text-text-primary bg-surface border border-border-subtle"
                  : "text-text-tertiary hover:text-text-secondary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="projects-content">
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
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8">
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={paginate}
            />
          </div>
        )}

        {/* View More */}
        <div className="mt-8 text-center projects-heading">
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link               href={SOCIAL.github.url} target="_blank">
              View More on GitHub
              <Github className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
