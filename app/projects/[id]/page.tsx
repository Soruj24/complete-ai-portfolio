import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/footer";
import { dbConnect } from "@/config/db";
import { Project } from "@/models/Project";
import { notFound } from "next/navigation";
import { projects as initialProjects } from "@/data/projects";
import type { IProject } from "@/types";
import { ProjectContent } from "@/components/projects/project-content";
import { ProjectSidebar } from "@/components/projects/project-sidebar";

async function getProject(id: string) {
  try {
    await dbConnect();
    let project = await Project.findById(id).catch(() => null);
    if (!project) project = initialProjects.find(p => p.id === id);
    return project;
  } catch {
    return null;
  }
}

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = (await getProject(id)) as (IProject & { _doc?: IProject }) | null;
  if (!project) notFound();

  const p = project._doc ?? project;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article className="pt-24 pb-20 md:pb-32">
        <div className="container">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-accent transition-colors mb-10 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Projects
          </Link>

          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="default">{p.category}</Badge>
              <Badge variant="outline">{p.status}</Badge>
            </div>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight leading-[1.1] mb-4">{p.title}</h1>
            <p className="text-[clamp(1rem,1.5vw,1.2rem)] text-text-secondary leading-relaxed">{p.description}</p>
          </div>

          <div className="rounded-2xl overflow-hidden bg-surface mb-16 aspect-[16/9] relative">
            <Image src={p.image} alt={p.title} fill className="object-cover" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
            <ProjectContent project={p} />
            <ProjectSidebar project={p} />
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
