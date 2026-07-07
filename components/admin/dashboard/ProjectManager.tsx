"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, FolderKanban } from "lucide-react";
import Image from "next/image";
import { useManagerCrud } from "@/hooks/use-manager-crud";

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

const defaultForm = {
  title: "", description: "", image: "", category: "",
  featured: false, githubUrl: "", liveUrl: "", technologies: "",
};

export function ProjectManager() {
  const {
    items: projects, loading, submitting, dialogOpen, editingItem,
    setDialogOpen, setEditingItem,
    fetch: fetchProjects, handleSave, handleDelete, handleSeed, handleDialogChange,
  } = useManagerCrud<Project>({ apiUrl: "/api/projects", dataKey: "projects", entityName: "project" });

  const [formData, setFormData] = useState(defaultForm);

  const handleEdit = (project: Project) => {
    setEditingItem(project);
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
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSave({
      ...formData,
      technologies: formData.technologies.split(",").map(t => t.trim()).filter(t => t),
    });
    if (!editingItem) setFormData(defaultForm);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-base font-semibold text-text-primary flex items-center gap-2">
            <FolderKanban className="h-4 w-4 text-text-tertiary" />
            Project Manager
          </h2>
          <p className="text-xs text-text-tertiary mt-0.5">Manage your portfolio projects</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={handleSeed} size="sm" className="h-9 rounded-lg text-xs border-border-subtle">Seed Data</Button>
          <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-9 rounded-lg text-xs gap-1.5">
                <Plus className="h-3.5 w-3.5" /> Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl">
              <DialogHeader>
                <DialogTitle>{editingItem ? "Edit Project" : "Add New Project"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Project Title</Label>
                    <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Project Name" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="Web, Mobile, etc." />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describe your project..." required className="min-h-[80px]" />
                </div>
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>GitHub URL</Label>
                    <Input value={formData.githubUrl} onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })} placeholder="https://github.com/..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Live URL</Label>
                    <Input value={formData.liveUrl} onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })} placeholder="https://..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Technologies (comma separated)</Label>
                  <Input value={formData.technologies} onChange={(e) => setFormData({ ...formData, technologies: e.target.value })} placeholder="React, Next.js, Tailwind CSS" />
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="featured" checked={formData.featured} onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })} />
                  <Label htmlFor="featured" className="cursor-pointer">Featured Project</Label>
                </div>
                <DialogFooter className="pt-4">
                  <Button type="submit" disabled={submitting}>
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : (editingItem ? "Update" : "Create")}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar rounded-xl border border-border-subtle bg-surface">
        <Table>
          <TableHeader>
            <TableRow className="border-border-subtle hover:bg-transparent">
              <TableHead className="py-3 px-4 font-medium text-text-tertiary text-xs">Project</TableHead>
              <TableHead className="py-3 font-medium text-text-tertiary text-xs hidden lg:table-cell">Category</TableHead>
              <TableHead className="py-3 font-medium text-text-tertiary text-xs hidden sm:table-cell text-center">Featured</TableHead>
              <TableHead className="py-3 pr-4 text-right font-medium text-text-tertiary text-xs">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12">
                  <Loader2 className="h-5 w-5 animate-spin mx-auto text-text-tertiary" />
                </TableCell>
              </TableRow>
            ) : projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-sm text-text-tertiary">No projects found.</TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project._id} className="border-border-subtle hover:bg-surface-hover transition-colors">
                  <TableCell className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-9 w-9 shrink-0 rounded-lg overflow-hidden border border-border-subtle bg-background">
                        {project.image && <Image src={project.image} alt={project.title} fill className="object-cover" />}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-text-primary truncate">{project.title}</span>
                        <div className="flex gap-1 mt-0.5">
                          {project.technologies.slice(0, 2).map(tech => (
                            <Badge key={tech} variant="secondary" className="bg-accent/10 text-accent border-none rounded px-1.5 py-0 text-[9px] font-medium">{tech}</Badge>
                          ))}
                          {project.technologies.length > 2 && (
                            <span className="text-[9px] text-text-tertiary">+{project.technologies.length - 2}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 hidden lg:table-cell">
                    <Badge variant="outline" className="border-border-subtle text-text-tertiary text-[10px] font-medium">{project.category}</Badge>
                  </TableCell>
                  <TableCell className="py-3 hidden sm:table-cell text-center">
                    <span className={`inline-flex h-2 w-2 rounded-full ${project.featured ? "bg-success" : "bg-border"}`} />
                  </TableCell>
                  <TableCell className="py-3 pr-4 text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(project)} className="h-8 w-8 rounded-lg text-text-tertiary hover:text-accent">
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(project._id)} className="h-8 w-8 rounded-lg text-text-tertiary hover:text-error">
                        <Trash2 className="h-3.5 w-3.5" />
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
