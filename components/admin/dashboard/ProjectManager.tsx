"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ExternalLink, Github, Loader2 } from "lucide-react";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  githubUrl: string;
  liveUrl: string;
  technologies: string[];
}

export function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
    featured: false,
    githubUrl: "",
    liveUrl: "",
    technologies: "",
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (error) {
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      category: project.category || "",
      featured: project.featured,
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      technologies: project.technologies.join(", "),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });

      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Non-JSON response received:", await res.text());
        return;
      }

      const data = await res.json();
      if (data.success) {
        toast.success("Project deleted successfully");
        fetchProjects();
      } else {
        toast.error(data.error || "Failed to delete project");
      }
    } catch (error) {
      toast.error("Error deleting project");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...formData,
      technologies: formData.technologies.split(",").map(t => t.trim()).filter(t => t),
    };

    try {
      const url = editingProject ? `/api/projects/${editingProject._id}` : "/api/projects";
      const method = editingProject ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Project ${editingProject ? "updated" : "created"} successfully`);
        setIsDialogOpen(false);
        setEditingProject(null);
        setFormData({
          title: "",
          description: "",
          image: "",
          category: "",
          featured: false,
          githubUrl: "",
          liveUrl: "",
          technologies: "",
        });
        fetchProjects();
      } else {
        toast.error(data.error || "Failed to save project");
      }
    } catch (error) {
      toast.error("Error saving project");
    } finally {
      setSubmitting(false);
    }
  };

  const seedDatabase = async () => {
    if (!confirm("This will overwrite existing data with initial projects. Continue?")) return;
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        toast.success("Database seeded successfully");
        fetchProjects();
      }
    } catch (error) {
      toast.error("Failed to seed database");
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white">Project Manager</h2>
          <p className="text-xs md:text-sm text-gray-500 dark:text-slate-400 font-medium">Add and manage your portfolio projects</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button 
            variant="outline" 
            onClick={seedDatabase}
            className="flex-1 sm:flex-none rounded-xl md:rounded-2xl border-gray-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-all duration-300"
          >
            Seed Data
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) setEditingProject(null);
          }}>
            <DialogTrigger asChild>
              <Button className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white rounded-xl md:rounded-2xl px-5 md:px-6 font-bold shadow-lg shadow-blue-200 dark:shadow-none transition-all duration-300">
                <Plus className="mr-2 h-4 w-4" /> Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto dark:bg-slate-900 dark:border-slate-800 rounded-[32px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black dark:text-white">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="font-bold dark:text-slate-300">Project Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Project Name"
                      required
                      className="rounded-xl border-gray-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="font-bold dark:text-slate-300">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="Web, Mobile, etc."
                      className="rounded-xl border-gray-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="font-bold dark:text-slate-300">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your project..."
                    required
                    className="rounded-xl border-gray-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white focus:ring-blue-500 transition-all min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image" className="font-bold dark:text-slate-300">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                    required
                    className="rounded-xl border-gray-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white focus:ring-blue-500 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="githubUrl" className="font-bold dark:text-slate-300">GitHub URL</Label>
                    <Input
                      id="githubUrl"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      placeholder="https://github.com/..."
                      className="rounded-xl border-gray-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="liveUrl" className="font-bold dark:text-slate-300">Live URL</Label>
                    <Input
                      id="liveUrl"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                      placeholder="https://..."
                      className="rounded-xl border-gray-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="technologies" className="font-bold dark:text-slate-300">Technologies (comma separated)</Label>
                  <Input
                    id="technologies"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    placeholder="React, Next.js, Tailwind CSS"
                    className="rounded-xl border-gray-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white focus:ring-blue-500 transition-all"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                  <Label htmlFor="featured" className="font-bold dark:text-slate-300 cursor-pointer">Featured Project</Label>
                </div>
                <DialogFooter className="pt-6">
                  <Button 
                    type="submit" 
                    disabled={submitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-8 font-bold h-12 transition-all duration-300"
                  >
                    {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : (editingProject ? "Update" : "Create")}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar rounded-2xl md:rounded-[32px] border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-xl shadow-gray-200/50 dark:shadow-none transition-all duration-300">
        <Table>
          <TableHeader className="bg-gray-50/50 dark:bg-slate-900/80">
            <TableRow className="border-b border-gray-100 dark:border-slate-800 hover:bg-transparent">
              <TableHead className="py-4 md:py-6 px-4 md:px-8 font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[10px] md:text-[11px]">Project</TableHead>
              <TableHead className="py-4 md:py-6 font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[10px] md:text-[11px] hidden lg:table-cell">Category</TableHead>
              <TableHead className="py-4 md:py-6 font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[10px] md:text-[11px] hidden sm:table-cell text-center">Featured</TableHead>
              <TableHead className="py-4 md:py-6 pr-4 md:pr-8 text-right font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[10px] md:text-[11px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 md:py-20">
                  <Loader2 className="h-6 md:h-8 w-6 md:w-8 animate-spin mx-auto text-blue-600" />
                </TableCell>
              </TableRow>
            ) : projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 md:py-20 text-gray-500 dark:text-slate-400 font-bold">
                  No projects found. Add your first one!
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project._id} className="border-b border-gray-50 dark:border-slate-800/50 hover:bg-gray-50/50 dark:hover:bg-slate-800/20 transition-colors">
                  <TableCell className="py-4 md:py-6 px-4 md:px-8">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="relative h-10 w-10 md:h-14 md:w-14 shrink-0 rounded-lg md:rounded-xl overflow-hidden border border-gray-100 dark:border-slate-800">
                        {project.image && (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-black text-gray-900 dark:text-white text-[11px] md:text-sm truncate">{project.title}</span>
                        <div className="flex gap-1 mt-1 overflow-hidden">
                          {project.technologies.slice(0, 2).map(tech => (
                            <Badge key={tech} variant="secondary" className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-none rounded-lg px-1.5 py-0 text-[8px] md:text-[9px] font-bold uppercase tracking-wider whitespace-nowrap">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 2 && (
                            <span className="text-[8px] md:text-[9px] font-bold text-gray-400">+{project.technologies.length - 2}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 md:py-6 hidden lg:table-cell">
                    <Badge variant="outline" className="border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 font-bold uppercase text-[9px] md:text-[10px] tracking-wider">
                      {project.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 md:py-6 hidden sm:table-cell text-center">
                    <div className={`inline-flex h-2 w-2 rounded-full ${project.featured ? 'bg-green-500 shadow-lg shadow-green-200' : 'bg-gray-200 dark:bg-slate-800'}`} />
                  </TableCell>
                  <TableCell className="py-4 md:py-6 pr-4 md:pr-8 text-right">
                    <div className="flex justify-end gap-1 md:gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(project)}
                        className="h-8 w-8 md:h-9 md:w-9 rounded-lg md:rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                      >
                        <Pencil className="h-3.5 w-3.5 md:h-4 md:w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(project._id)}
                        className="h-8 w-8 md:h-9 md:w-9 rounded-lg md:rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                      >
                        <Trash2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
