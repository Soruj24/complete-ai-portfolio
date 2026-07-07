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
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, Briefcase } from "lucide-react";
import { useManagerCrud } from "@/hooks/use-manager-crud";

interface Experience {
  _id: string;
  year: string;
  role: string;
  company: string;
  description: string;
  technologies: string[];
  icon: string;
  color: string;
}

const defaultForm = {
  year: "", role: "", company: "", description: "",
  technologies: "", icon: "💼", color: "from-accent to-accent-hover",
};

export function ExperienceManager() {
  const {
    items: experiences, loading, submitting, dialogOpen, editingItem,
    setDialogOpen, setEditingItem,
    fetch: fetchExperiences, handleSave, handleDelete, handleSeed, handleDialogChange,
  } = useManagerCrud<Experience>({ apiUrl: "/api/experience", dataKey: "experiences", entityName: "experience" });

  const [formData, setFormData] = useState(defaultForm);

  const handleEdit = (exp: Experience) => {
    setEditingItem(exp);
    setFormData({
      year: exp.year,
      role: exp.role,
      company: exp.company,
      description: exp.description || "",
      technologies: exp.technologies.join(", "),
      icon: exp.icon || "💼",
      color: exp.color || "from-accent to-accent-hover",
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
            <Briefcase className="h-4 w-4 text-text-tertiary" />
            Experience Manager
          </h2>
          <p className="text-xs text-text-tertiary mt-0.5">Manage your professional journey</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={handleSeed} size="sm" className="h-9 rounded-lg text-xs border-border-subtle">Seed Data</Button>
          <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-9 rounded-lg text-xs gap-1.5">
                <Plus className="h-3.5 w-3.5" /> Add Experience
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl rounded-xl">
              <DialogHeader>
                <DialogTitle>{editingItem ? "Edit Experience" : "Add New Experience"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 py-4">
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
              <TableHead className="py-3 px-4 font-medium text-text-tertiary text-xs">Duration</TableHead>
              <TableHead className="py-3 font-medium text-text-tertiary text-xs">Role & Company</TableHead>
              <TableHead className="py-3 font-medium text-text-tertiary text-xs hidden sm:table-cell">Tech Stack</TableHead>
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
            ) : experiences.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-sm text-text-tertiary">No experiences found.</TableCell>
              </TableRow>
            ) : (
              experiences.map((exp) => (
                <TableRow key={exp._id} className="border-border-subtle hover:bg-surface-hover transition-colors">
                  <TableCell className="py-3 px-4 text-sm font-medium text-accent">{exp.year}</TableCell>
                  <TableCell className="py-3">
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium text-text-primary truncate">{exp.role}</span>
                      <span className="text-xs text-text-tertiary truncate">{exp.company}</span>
                      <div className="flex flex-wrap gap-1 mt-1 sm:hidden">
                        {exp.technologies.slice(0, 2).map((tech) => (
                          <Badge key={tech} variant="secondary" className="bg-accent/10 text-accent border-none rounded px-1.5 py-0 text-[8px] font-medium">{tech}</Badge>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 hidden sm:table-cell">
                    <div className="flex flex-wrap gap-1 max-w-[200px] lg:max-w-[300px]">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-accent/10 text-accent border-none rounded px-2 py-0.5 text-[9px] font-medium">{tech}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="py-3 pr-4 text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(exp)} className="h-8 w-8 rounded-lg text-text-tertiary hover:text-accent">
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(exp._id)} className="h-8 w-8 rounded-lg text-text-tertiary hover:text-error">
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
