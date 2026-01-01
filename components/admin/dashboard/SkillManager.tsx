"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface Skill {
  _id: string;
  name: string;
  level: number;
  icon: string;
  category: string;
  color: string;
}

export function SkillManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    level: 80,
    icon: "",
    category: "",
    color: "from-blue-500 to-indigo-500",
  });

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/skills");

      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Non-JSON response received:", await res.text());
        return;
      }

      const data = await res.json();
      if (data.success) {
        setSkills(data.skills);
      }
    } catch (error) {
      toast.error("Failed to fetch skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      level: skill.level,
      icon: skill.icon || "",
      category: skill.category,
      color: skill.color || "from-blue-500 to-indigo-500",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });

      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Non-JSON response received:", await res.text());
        return;
      }

      const data = await res.json();
      if (data.success) {
        toast.success("Skill deleted");
        fetchSkills();
      }
    } catch (error) {
      toast.error("Error deleting skill");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editingSkill ? `/api/skills/${editingSkill._id}` : "/api/skills";
      const res = await fetch(url, {
        method: editingSkill ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          level: Number(formData.level),
        }),
      });

      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Non-JSON response received:", await res.text());
        return;
      }

      const data = await res.json();
      if (data.success) {
        toast.success(`Skill ${editingSkill ? "updated" : "created"}`);
        setIsDialogOpen(false);
        setEditingSkill(null);
        setFormData({ name: "", level: 80, icon: "", category: "", color: "from-blue-500 to-indigo-500" });
        fetchSkills();
      }
    } catch (error) {
      toast.error("Error saving skill");
    } finally {
      setSubmitting(false);
    }
  };

  const seedDatabase = async () => {
    if (!confirm("This will overwrite existing data with initial skills. Continue?")) return;
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        toast.success("Database seeded successfully");
        fetchSkills();
      }
    } catch (error) {
      toast.error("Failed to seed database");
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white">Skill Manager</h2>
          <p className="text-xs md:text-sm text-gray-500 dark:text-slate-400 font-medium">Add and manage your technical skills</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button 
            variant="outline" 
            onClick={seedDatabase}
            className="rounded-xl md:rounded-2xl border-gray-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-all duration-300 h-11 md:h-12"
          >
            Seed Data
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) setEditingSkill(null);
          }}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto rounded-xl md:rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200/50 dark:shadow-none font-bold gap-2 h-11 md:h-12 px-5 md:px-6 transition-all duration-300">
                <Plus className="h-4 w-4 md:h-5 md:w-5" />
                Add Skill
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md dark:bg-slate-900 dark:border-slate-800 rounded-[32px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black dark:text-white">
                  {editingSkill ? "Edit Skill" : "Add New Skill"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-bold dark:text-slate-300">Skill Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. React"
                    required
                    className="rounded-xl border-gray-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white focus:ring-blue-500 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="level" className="font-bold dark:text-slate-300">Proficiency (%)</Label>
                    <Input
                      id="level"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
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
                      placeholder="Frontend, Backend, etc."
                      required
                      className="rounded-xl border-gray-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="icon" className="font-bold dark:text-slate-300">Icon (SVG or Emoji)</Label>
                    <Input
                      id="icon"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      placeholder="🚀"
                      className="rounded-xl border-gray-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color" className="font-bold dark:text-slate-300">Color (Gradient)</Label>
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
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-8 font-bold h-12 transition-all duration-300"
                  >
                    {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : (editingSkill ? "Update" : "Create")}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar rounded-2xl md:rounded-[32px] border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-xl shadow-gray-200/50 dark:shadow-none transition-all duration-300">
        <Table>
          <TableHeader className="bg-gray-50/50 dark:bg-slate-900/50">
            <TableRow className="hover:bg-transparent border-gray-100 dark:border-slate-800">
              <TableHead className="font-bold text-gray-700 dark:text-slate-300 py-4 text-[10px] md:text-xs uppercase tracking-widest px-4 md:px-8">Skill</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-slate-300 text-[10px] md:text-xs uppercase tracking-widest hidden sm:table-cell">Category</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-slate-300 text-[10px] md:text-xs uppercase tracking-widest hidden md:table-cell text-center">Level</TableHead>
              <TableHead className="text-right font-bold text-gray-700 dark:text-slate-300 text-[10px] md:text-xs uppercase tracking-widest pr-4 md:pr-8">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-40 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-600" />
                </TableCell>
              </TableRow>
            ) : skills.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-40 text-center text-gray-400 font-bold">
                  No skills found.
                </TableCell>
              </TableRow>
            ) : (
              skills.map((skill) => (
                <TableRow key={skill._id} className="hover:bg-gray-50/50 dark:hover:bg-slate-900/50 border-gray-100 dark:border-slate-800 transition-colors">
                  <TableCell className="py-4 md:py-5 px-4 md:px-8">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className={`h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-gradient-to-br ${skill.color || 'from-blue-500 to-indigo-500'} flex items-center justify-center text-white font-black text-xs md:text-sm`}>
                        {skill.name.charAt(0)}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-gray-900 dark:text-slate-100 text-[11px] md:text-sm truncate">{skill.name}</span>
                        <span className="sm:hidden text-[8px] text-gray-400 font-bold uppercase tracking-wider">{skill.category}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-none rounded-lg px-2 py-0.5 text-[10px] md:text-xs font-bold uppercase tracking-wider">
                      {skill.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-24 h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${skill.color || 'from-blue-500 to-indigo-500'}`} 
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="text-[10px] md:text-xs font-bold text-gray-500 dark:text-slate-400">{skill.level}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-4 md:pr-8">
                    <div className="flex justify-end gap-1 md:gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(skill)}
                        className="h-8 w-8 md:h-9 md:w-9 rounded-lg md:rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      >
                        <Pencil className="h-3.5 w-3.5 md:h-4 md:w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(skill._id)}
                        className="h-8 w-8 md:h-9 md:w-9 rounded-lg md:rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
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
