"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { FolderKanban } from "lucide-react";
import Image from "next/image";
import { CrudManagerShell } from "./crud-manager-shell";

const defaultForm = {
  title: "", description: "", image: "", category: "",
  featured: false, githubUrl: "", liveUrl: "", technologies: "",
};

export function ProjectManager() {
  return (
    <CrudManagerShell
      config={{ apiUrl: "/api/projects", dataKey: "projects", entityName: "project" }}
      icon={FolderKanban}
      title="Project Manager"
      description="Manage your portfolio projects"
      addLabel="Add Project"
      defaultForm={defaultForm}
      columns={[
        { head: "Project", className: "py-3 px-4" },
        { head: "Category", className: "py-3 hidden lg:table-cell" },
        { head: "Featured", className: "py-3 hidden sm:table-cell text-center" },
      ]}
      transformSubmit={(form) => ({
        ...form,
        technologies: form.technologies.split(",").map((t: string) => t.trim()).filter(Boolean),
      })}
      transformEdit={(item) => ({
        title: item.title,
        description: item.description,
        image: item.image,
        category: item.category || "",
        featured: item.featured,
        githubUrl: item.githubUrl || "",
        liveUrl: item.liveUrl || "",
        technologies: item.technologies.join(", "),
      })}
      renderForm={({ formData, setFormData }) => (
        <>
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
        </>
      )}
      renderRow={(item) => [
        <div key="project" className="flex items-center gap-3">
          <div className="relative h-9 w-9 shrink-0 rounded-lg overflow-hidden border border-border-subtle bg-background">
            {item.image && <Image src={item.image} alt={item.title} fill className="object-cover" />}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-text-primary truncate">{item.title}</span>
            <div className="flex gap-1 mt-0.5">
              {item.technologies.slice(0, 2).map((tech: string) => (
                <Badge key={tech} variant="secondary" className="bg-accent/10 text-accent border-none rounded px-1.5 py-0 text-[9px] font-medium">{tech}</Badge>
              ))}
              {item.technologies.length > 2 && (
                <span className="text-[9px] text-text-tertiary">+{item.technologies.length - 2}</span>
              )}
            </div>
          </div>
        </div>,
        <Badge key="cat" variant="outline" className="border-border-subtle text-text-tertiary text-[10px] font-medium">{item.category}</Badge>,
        <span key="feat" className={`inline-flex h-2 w-2 rounded-full ${item.featured ? "bg-success" : "bg-border"}`} />,
      ]}
    />
  );
}
