"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  ExternalLink,
  Star,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { IProject } from "@/types";
import { useSectionAnimation } from "@/lib/hooks/use-section-animation";
import { CustomPagination } from "@/components/shared/CustomPagination";

export function Projects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const projectsPerPage = 4;
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/projects?page=${currentPage}&limit=${projectsPerPage}&featured=true`,
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

  const currentProjects = projects;

  useSectionAnimation(
    sectionRef,
    (tl) => {
      tl.from(".projects-reveal-text", { y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" })
        .from(".project-card", { y: 60, opacity: 0, duration: 1, stagger: 0.2, ease: "power4.out" }, "-=0.6");
    },
    { deps: [currentPage] },
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 md:py-28 bg-background border-t border-border-subtle"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-10 projects-reveal-text">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-tertiary mb-2 block">
            Projects
          </span>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-semibold tracking-[-0.02em] text-text-primary">
            Built with purpose,{" "}
            <span className="text-text-tertiary">scaled with precision.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {loading ? (
            <div className="col-span-full flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          ) : currentProjects.length === 0 ? (
            <div className="col-span-full text-center py-20 text-text-secondary">
              No projects to display.
            </div>
          ) : (
            currentProjects.map((project, index) => (
              <div key={`${currentPage}-${index}`} className="project-card">
                <Card className="border border-border-subtle rounded-xl overflow-hidden bg-surface hover:border-border transition-all duration-200 h-full">
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-border-subtle">
                    <Link href={`/projects/${project._id || project.id}`}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </Link>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 pointer-events-none group-hover:pointer-events-auto">
                      <Button asChild variant="secondary" size="sm" className="pointer-events-auto">
                        <Link href={project.githubUrl || "#"} target="_blank">
                          <Github className="h-3.5 w-3.5" /> Code
                        </Link>
                      </Button>
                      <Button asChild size="sm" className="pointer-events-auto">
                        <Link href={project.liveUrl || "#"} target="_blank">
                          <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                        </Link>
                      </Button>
                    </div>
                    <div className="absolute top-2.5 left-2.5">
                      <Badge className="bg-background/90 text-text-primary border border-border-subtle px-2.5 py-0.5 rounded-md text-[10px] font-medium">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Link href={`/projects/${project._id || project.id}`} className="block flex-1 min-w-0">
                        <h3 className="text-[15px] font-semibold text-text-primary leading-snug mb-1 group-hover:text-accent transition-colors duration-200 truncate">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-1.5">
                          <Star className="h-3 w-3 fill-warning text-warning" />
                          <span className="text-[10px] font-medium text-text-tertiary uppercase tracking-wider">
                            Featured
                          </span>
                        </div>
                      </Link>
                      <Link
                        href={`/projects/${project._id || project.id}`}
                        className="w-8 h-8 rounded-lg bg-surface-hover flex items-center justify-center text-text-secondary hover:bg-accent hover:text-accent-foreground transition-all duration-200 ml-3 shrink-0"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <p className="text-[12px] text-text-secondary mb-3 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, tIndex) => (
                        <Badge
                          key={tIndex}
                          variant="secondary"
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium border border-border-subtle"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 projects-reveal-text">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={paginate}
          />
        </div>

        <div className="mt-8 text-center projects-reveal-text">
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="https://github.com/sorujmahmud" target="_blank">
              View More Projects{" "}
              <Github className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
