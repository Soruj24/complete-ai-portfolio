import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Github, 
  ExternalLink, 
  ArrowLeft, 
  Calendar, 
  Users, 
  Clock, 
  BarChart3, 
  CheckCircle2, 
  Rocket, 
  Zap, 
  Lightbulb,
  Loader2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/portfolio/Navbar";
import { dbConnect } from "@/config/db";
import { Project } from "@/models/Project";
import { notFound } from "next/navigation";
import { projects as initialProjects } from "@/data/projects";

async function getProject(id: string) {
  try {
    await dbConnect();
    // Try to find in MongoDB
    let project = await Project.findById(id).catch(() => null);
    
    // If not found in MongoDB, try to find in initialProjects
    if (!project) {
      project = initialProjects.find(p => p.id === id);
    }
    
    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white pb-32">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:44px_44px]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div>
            <Link 
              href="/#projects" 
              className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-colors mb-12 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Works
            </Link>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Badge className="bg-blue-50 text-blue-600 border-none px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest">
                {project.category}
              </Badge>
              <Badge className="bg-green-50 text-green-600 border-none px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest">
                {project.status}
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-[1.1]">
              {project.title}
            </h1>

            <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-4xl leading-relaxed mb-12">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-6">
              <Button asChild size="lg" className="h-16 px-10 rounded-2xl bg-gray-900 hover:bg-blue-600 text-white font-black text-lg shadow-2xl shadow-gray-200 transition-all hover:-translate-y-1">
                <Link href={project.liveUrl} target="_blank">
                  Live Demo <ExternalLink className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-16 px-10 rounded-2xl border-2 border-gray-100 font-black text-lg hover:bg-gray-50 transition-all hover:-translate-y-1">
                <Link href={project.githubUrl} target="_blank">
                  View Source <Github className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-20">
            {/* Image Gallery */}
            <div 
              className="rounded-[48px] overflow-hidden shadow-2xl shadow-gray-200 bg-gray-100 aspect-[16/9] relative"
            >
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover"
              />
            </div>

            {/* Project Overview */}
            <section>
              <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                  <Rocket className="h-5 w-5" />
                </div>
                Project Overview
              </h2>
              <div className="prose prose-xl max-w-none text-gray-500 font-medium leading-relaxed">
                {project.fullDescription}
              </div>
            </section>

            {/* Key Features */}
            <section>
              <h2 className="text-3xl font-black text-gray-900 mb-10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white">
                  <Zap className="h-5 w-5" />
                </div>
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.features.map((feature: string, i: number) => (
                  <div key={i} className="flex items-start gap-4 p-6 rounded-3xl bg-gray-50 border border-gray-100 group hover:bg-white hover:shadow-xl hover:shadow-gray-100 transition-all duration-300">
                    <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span className="text-lg font-bold text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Challenges & Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <section className="p-10 rounded-[40px] bg-red-50/50 border border-red-100/50">
                <h3 className="text-2xl font-black text-red-900 mb-8 flex items-center gap-3">
                  <Lightbulb className="h-6 w-6" /> The Challenges
                </h3>
                <ul className="space-y-4">
                  {project.challenges.map((challenge: string, i: number) => (
                    <li key={i} className="flex gap-3 text-red-800/70 font-bold leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </section>
              <section className="p-10 rounded-[40px] bg-green-50/50 border border-green-100/50">
                <h3 className="text-2xl font-black text-green-900 mb-8 flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6" /> The Solutions
                </h3>
                <ul className="space-y-4">
                  {project.solutions.map((solution: string, i: number) => (
                    <li key={i} className="flex gap-3 text-green-800/70 font-bold leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                      {solution}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            {/* Tech Stack */}
            <div className="p-10 rounded-[40px] bg-white border border-gray-100 shadow-xl shadow-gray-100">
              <h3 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-widest">Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech: string, i: number) => (
                  <Badge key={i} variant="secondary" className="bg-gray-50 text-gray-600 border-none font-black px-4 py-2 rounded-xl text-xs uppercase tracking-tighter">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Project Stats */}
            <div className="p-10 rounded-[40px] bg-gray-900 text-white shadow-2xl shadow-blue-900/10">
              <h3 className="text-xl font-black mb-10 uppercase tracking-widest text-blue-400">Project Specs</h3>
              <div className="space-y-8">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-blue-400">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-widest text-gray-500">Completed</p>
                    <p className="text-lg font-black">{project.completionDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-blue-400">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-widest text-gray-500">Duration</p>
                    <p className="text-lg font-black">{project.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-blue-400">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-widest text-gray-500">Team Size</p>
                    <p className="text-lg font-black">{project.teamSize}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-blue-400">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-widest text-gray-500">Complexity</p>
                    <p className="text-lg font-black">{project.stats.complexity}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Card */}
            <div className="p-10 rounded-[40px] bg-blue-50 border border-blue-100">
              <h3 className="text-xl font-black text-blue-900 mb-6 flex items-center gap-3">
                <Rocket className="h-6 w-6" /> Architecture
              </h3>
              <p className="text-blue-800/70 font-bold leading-relaxed">
                {project.architecture}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
