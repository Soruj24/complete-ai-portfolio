"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";
import { CrudManagerShell } from "./crud-manager-shell";

const defaultForm = {
  year: "", role: "", company: "", description: "",
  technologies: "", icon: "💼", color: "from-accent to-accent-hover",
};

export function ExperienceManager() {
  return (
    <CrudManagerShell
      config={{ apiUrl: "/api/experience", dataKey: "experiences", entityName: "experience" }}
      icon={Briefcase}
      title="Experience Manager"
      description="Manage your professional journey"
      addLabel="Add Experience"
      defaultForm={defaultForm}
      columns={[
        { head: "Duration", className: "px-4" },
        { head: "Role & Company", className: "" },
        { head: "Tech Stack", className: "hidden sm:table-cell" },
      ]}
      transformSubmit={(form) => ({
        ...form,
        technologies: form.technologies.split(",").map((t: string) => t.trim()).filter(Boolean),
      })}
      transformEdit={(item) => ({
        year: item.year,
        role: item.role,
        company: item.company,
        description: item.description || "",
        technologies: item.technologies.join(", "),
        icon: item.icon || "💼",
        color: item.color || "from-accent to-accent-hover",
      })}
      renderForm={({ formData, setFormData }) => (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Year/Duration</Label>
              <Input value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} placeholder="e.g. 2023 - Present" required />
            </div>
            <div className="space-y-2">
              <Label>Company</Label>
              <Input value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="Company Name" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Input value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} placeholder="e.g. Full Stack Developer" required />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describe your responsibilities..." className="min-h-[80px]" />
          </div>
          <div className="space-y-2">
            <Label>Technologies (comma separated)</Label>
            <Input value={formData.technologies} onChange={(e) => setFormData({ ...formData, technologies: e.target.value })} placeholder="React, Node.js, etc." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Icon (Emoji)</Label>
              <Input value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Gradient Color</Label>
              <Input value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} />
            </div>
          </div>
        </>
      )}
      renderRow={(item) => [
        <span key="year" className="text-sm font-medium text-accent">{item.year}</span>,
        <div key="role" className="flex flex-col min-w-0">
          <span className="text-sm font-medium text-text-primary truncate">{item.role}</span>
          <span className="text-xs text-text-tertiary truncate">{item.company}</span>
          <div className="flex flex-wrap gap-1 mt-1 sm:hidden">
            {item.technologies.slice(0, 2).map((tech: string) => (
              <Badge key={tech} variant="secondary" className="bg-accent/10 text-accent border-none rounded px-1.5 py-0 text-[8px] font-medium">{tech}</Badge>
            ))}
          </div>
        </div>,
        <div key="tech" className="flex flex-wrap gap-1 max-w-[200px] lg:max-w-[300px]">
          {item.technologies.map((tech: string) => (
            <Badge key={tech} variant="secondary" className="bg-accent/10 text-accent border-none rounded px-2 py-0.5 text-[9px] font-medium">{tech}</Badge>
          ))}
        </div>,
      ]}
    />
  );
}
