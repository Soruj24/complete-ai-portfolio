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
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

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

export function ExperienceManager() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    year: "",
    role: "",
    company: "",
    description: "",
    technologies: "",
    icon: "💼",
    color: "from-blue-500 to-indigo-500",
  });

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/experience");
      
      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Non-JSON response received:", await res.text());
        return;
      }

      const data = await res.json();
      if (data.success) {
        setExperiences(data.experiences);
      }
    } catch (error) {
      toast.error("Failed to fetch experiences");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleEdit = (exp: Experience) => {
    setEditingExp(exp);
    setFormData({
      year: exp.year,
      role: exp.role,
      company: exp.company,
      description: exp.description || "",
      technologies: exp.technologies.join(", "),
      icon: exp.icon || "💼",
      color: exp.color || "from-blue-500 to-indigo-500",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/experience/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Experience deleted");
        fetchExperiences();
      }
    } catch (error) {
      toast.error("Error deleting experience");
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
      const url = editingExp ? `/api/experience/${editingExp._id}` : "/api/experience";
      const method = editingExp ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Experience ${editingExp ? "updated" : "created"}`);
        setIsDialogOpen(false);
        setEditingExp(null);
        setFormData({ year: "", role: "", company: "", description: "", technologies: "", icon: "💼", color: "from-blue-500 to-indigo-500" });
        fetchExperiences();
      }
    } catch (error) {
      toast.error("Error saving experience");
    } finally {
      setSubmitting(false);
    }
  };

  const seedDatabase = async () => {
    if (!confirm("This will overwrite existing data with initial experiences. Continue?")) return;
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      
      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Non-JSON response received:", await res.text());
        return;
      }

      const data = await res.json();
      if (data.success) {
        toast.success("Database seeded successfully");
        fetchExperiences();
      }
    } catch (error) {
      toast.error("Failed to seed database");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Experience</h2>
          <p className="text-gray-500 dark:text-slate-400 font-medium">Manage your professional journey</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={seedDatabase}
            className="rounded-2xl border-gray-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-all duration-300"
          >
            Seed Data
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) setEditingExp(null);
          }}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-6 font-bold shadow-lg shadow-blue-200 dark:shadow-none transition-all duration-300">
                <Plus className="mr-2 h-4 w-4" /> Add Experience
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl dark:bg-slate-900 dark:border-slate-800 rounded-[32px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black dark:text-white">
                  {editingExp ? "Edit Experience" : "Add New Experience"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year" className="font-bold dark:text-slate-300">Year/Duration</Label>
                    <Input
                      id="year"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      placeholder="e.g. 2023 - Present"
                      required
                      className="rounded-xl border-gray-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="font-bold dark:text-slate-300">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Company Name"
                      required
                      className="rounded-xl border-gray-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="font-bold dark:text-slate-300">Role</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Full Stack Developer"
                    required
                    className="rounded-xl border-gray-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white focus:ring-blue-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="font-bold dark:text-slate-300">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your responsibilities..."
                    className="rounded-xl border-gray-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white focus:ring-blue-500 transition-all min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="technologies" className="font-bold dark:text-slate-300">Technologies (comma separated)</Label>
                  <Input
                    id="technologies"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    placeholder="React, Node.js, etc."
                    className="rounded-xl border-gray-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white focus:ring-blue-500 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="icon" className="font-bold dark:text-slate-300">Icon (Emoji)</Label>
                    <Input
                      id="icon"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="rounded-xl border-gray-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color" className="font-bold dark:text-slate-300">Gradient Color</Label>
                    <Input
                      id="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="rounded-xl border-gray-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>
                <DialogFooter className="pt-6">
                  <Button 
                    type="submit" 
                    disabled={submitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-8 font-bold h-12 transition-all duration-300"
                  >
                    {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : (editingExp ? "Update" : "Create")}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900/50 rounded-[32px] border border-gray-100 dark:border-slate-800 shadow-xl shadow-gray-200/50 dark:shadow-none overflow-hidden transition-all duration-300">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/80 hover:bg-gray-50/50 dark:hover:bg-slate-900/80">
              <TableHead className="py-4 md:py-6 px-4 md:px-8 font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[10px] md:text-[11px]">Duration</TableHead>
              <TableHead className="py-4 md:py-6 font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[10px] md:text-[11px]">Role & Company</TableHead>
              <TableHead className="py-4 md:py-6 font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[10px] md:text-[11px] hidden sm:table-cell">Tech Stack</TableHead>
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
            ) : experiences.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 md:py-20 text-gray-500 dark:text-slate-400">
                  No experiences found. Add your first one!
                </TableCell>
              </TableRow>
            ) : (
              experiences.map((exp) => (
                <TableRow key={exp._id} className="border-b border-gray-50 dark:border-slate-800/50 hover:bg-gray-50/50 dark:hover:bg-slate-800/20 transition-colors">
                  <TableCell className="py-4 md:py-6 px-4 md:px-8 font-bold text-blue-600 dark:text-blue-400 text-xs md:text-sm">{exp.year}</TableCell>
                  <TableCell className="py-4 md:py-6">
                    <div className="flex flex-col min-w-0">
                      <span className="font-black text-gray-900 dark:text-white text-sm md:text-lg truncate">{exp.role}</span>
                      <span className="text-gray-500 dark:text-slate-400 font-medium text-xs md:text-sm truncate">{exp.company}</span>
                      <div className="flex flex-wrap gap-1 mt-2 sm:hidden">
                        {exp.technologies.slice(0, 2).map((tech) => (
                          <Badge 
                            key={tech} 
                            variant="secondary"
                            className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-none rounded-lg px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 md:py-6 hidden sm:table-cell">
                    <div className="flex flex-wrap gap-1.5 max-w-[200px] lg:max-w-[300px]">
                      {exp.technologies.map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="secondary"
                          className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-none rounded-lg px-2 py-0.5 text-[9px] md:text-[10px] font-bold uppercase tracking-wider"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 md:py-6 pr-4 md:pr-8 text-right">
                    <div className="flex justify-end gap-1 md:gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(exp)}
                        className="h-8 w-8 md:h-9 md:w-9 rounded-lg md:rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                      >
                        <Pencil className="h-3.5 w-3.5 md:h-4 md:w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(exp._id)}
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
