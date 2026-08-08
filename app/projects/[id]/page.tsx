import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/footer";
import { dbConnect } from "@/config/db";
import { Project } from "@/models/Project";
import { notFound } from "next/navigation";
import type { IProject } from "@/types";
import { ProjectContent } from "@/components/projects/project-content";
import { ProjectSidebar } from "@/components/projects/project-sidebar";
import { TableOfContents } from "@/components/projects/table-of-contents";

async function getProject(id: string) {
  try {
    await dbConnect();
    const project = await Project.findById(id).lean().catch(() => null);
    return project;
  } catch {
    return null;
  }
}

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id) as IProject | null;
  if (!project) notFound();

  const p = project;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article className="pt-16 sm:pt-20 md:pt-24">
        {/* Header */}
        <div className="border-b border-border-subtle">
          <div className="container py-6 sm:py-10 md:py-14">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-text-tertiary hover:text-text-secondary transition-colors mb-4 sm:mb-6 group min-h-[44px]"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Back to Projects
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="default">{p.category}</Badge>
              <Badge variant="outline">{p.status}</Badge>
              {p.featured && (
                <Badge className="bg-accent/10 text-accent border-accent/20">Featured</Badge>
              )}
            </div>

            <h1 className="text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-[-0.03em] leading-[1.1] mb-4 max-w-3xl">
              {p.emoji && <span className="mr-2">{p.emoji}</span>}
              {p.title}
            </h1>

            <p className="text-[clamp(0.9rem,1.4vw,1.1rem)] text-text-secondary leading-relaxed max-w-2xl mb-6">
              {p.description}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-3">
              {p.liveUrl && (
                <Link
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-accent-foreground text-[13px] font-medium hover:brightness-110 transition-all min-h-[44px]"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Demo
                </Link>
              )}
              {p.githubUrl && (
                <Link
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border-subtle text-text-secondary text-[13px] font-medium hover:bg-surface hover:text-text-primary hover:border-border transition-all min-h-[44px]"
                >
                  <Github className="w-3.5 h-3.5" />
                  Source Code
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="container px-4 sm:px-5 lg:px-6 mt-6 sm:mt-8">
          <div className="rounded-xl sm:rounded-2xl overflow-hidden bg-surface border border-border-subtle aspect-[16/9] relative">
            <Image src={p.image} alt={p.title} fill className="object-cover" priority />
          </div>
        </div>

        {/* Main Content — 3-column: ToC | Content | Sidebar */}
        <div className="container mt-8 sm:mt-10 md:mt-14 pb-16 sm:pb-20 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_260px] gap-6 sm:gap-8 xl:gap-12">
            {/* Sticky Table of Contents */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents project={p} />
              </div>
            </aside>

            {/* Main Content */}
            <ProjectContent project={p} />

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <ProjectSidebar project={p} />
              </div>
            </aside>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
