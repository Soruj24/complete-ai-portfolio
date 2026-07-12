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
// import { projects } from "@/data/projects"; // Removed static import

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
      className="py-32 bg-white dark:bg-gray-900 transition-colors duration-500"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-24">
          <h2 className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400 mb-4 md:mb-6 projects-reveal-text">
            Selected Works
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 md:mb-8 projects-reveal-text">
            Built with purpose, <br />
            <span className="text-gray-400 dark:text-gray-500">
              scaled with precision.
            </span>
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {loading ? (
            <div className="col-span-full flex justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600 dark:text-blue-400" />
            </div>
          ) : currentProjects.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-500 dark:text-gray-400">
              No projects to display.
            </div>
          ) : (
            currentProjects.map((project, index) => (
              <div key={`${currentPage}-${index}`} className="project-card">
                <Card className="border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] dark:shadow-none rounded-[32px] md:rounded-[48px] overflow-hidden bg-white dark:bg-gray-800/50 group hover:shadow-[0_48px_96px_-32px_rgba(0,0,0,0.12)] dark:hover:bg-gray-800 transition-all duration-700 h-full">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Link href={`/projects/${project._id || project.id}`}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    </Link>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 backdrop-blur-sm pointer-events-none group-hover:pointer-events-auto p-4">
                      <Button
                        asChild
                        variant="secondary"
                        className="w-full sm:w-auto rounded-xl md:rounded-2xl font-black h-12 md:h-14 px-6 md:px-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:scale-105"
                      >
                        <Link href={project.githubUrl || "#"} target="_blank">
                          <Github className="mr-2 h-4 w-4 md:h-5 md:w-5" /> Code
                        </Link>
                      </Button>
                      <Button
                        asChild
                        className="w-full sm:w-auto rounded-xl md:rounded-2xl bg-blue-600 hover:bg-blue-700 h-12 md:h-14 px-6 md:px-8 text-white font-black transition-all hover:scale-105"
                      >
                        <Link href={project.liveUrl || "#"} target="_blank">
                          <ExternalLink className="mr-2 h-4 w-4 md:h-5 md:w-5" />{" "}
                          Live Demo
                        </Link>
                      </Button>
                    </div>
                    <div className="absolute top-4 left-4 md:top-8 md:left-8">
                      <Badge className="bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white backdrop-blur-md px-3 py-1 md:px-5 md:py-2 rounded-xl md:rounded-2xl font-black shadow-xl text-[9px] md:text-xs uppercase tracking-widest border-none">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 md:p-12">
                    <div className="flex justify-between items-start mb-4 md:mb-6">
                      <Link
                        href={`/projects/${project._id || project.id}`}
                        className="block group/title flex-1 min-w-0"
                      >
                        <h3 className="text-xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight mb-1 md:mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-[9px] md:text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                            Featured Project
                          </span>
                        </div>
                      </Link>
                      <Link
                        href={`/projects/${project._id || project.id}`}
                        className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-gray-700/50 flex items-center justify-center text-gray-900 dark:text-white group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:text-white transition-all ml-4 shrink-0"
                      >
                        <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6" />
                      </Link>
                    </div>
                    <p className="text-sm md:text-xl text-gray-500 dark:text-gray-400 font-medium mb-6 md:mb-10 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {project.technologies.map((tech, tIndex) => (
                        <Badge
                          key={tIndex}
                          variant="secondary"
                          className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 border-none font-black px-3 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl text-[9px] md:text-xs uppercase tracking-tighter group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
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

        {/* Pagination Controls */}
        <div className="mt-12 md:mt-20 projects-reveal-text">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={paginate}
          />
        </div>

        <div className="mt-12 md:mt-24 text-center projects-reveal-text">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto h-12 md:h-16 px-6 md:px-12 rounded-xl md:rounded-2xl border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-black hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 transition-all text-sm md:text-lg group"
          >
            <Link
              href="https://github.com/sorujmahmud"
              target="_blank"
              className="flex items-center justify-center gap-2 md:gap-3"
            >
              View More Projects{" "}
              <Github className="h-4 w-4 md:h-6 md:w-6 group-hover:rotate-12 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
