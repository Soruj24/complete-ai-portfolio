"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, Code2 } from "lucide-react";
import { useManagerCrud } from "@/hooks/use-manager-crud";

interface Skill {
  _id: string;
  name: string;
  level: number;
  icon: string;
  category: string;
  color: string;
}

const defaultForm = {
  name: "", level: 80, icon: "", category: "", color: "from-accent to-accent-hover",
};

export function SkillManager() {
  const {
    items: skills, loading, submitting, dialogOpen, editingItem,
    setDialogOpen, setEditingItem,
    fetch: fetchSkills, handleSave, handleDelete, handleSeed, handleDialogChange,
  } = useManagerCrud<Skill>({ apiUrl: "/api/skills", dataKey: "skills", entityName: "skill" });

  const [formData, setFormData] = useState(defaultForm);

  const handleEdit = (skill: Skill) => {
    setEditingItem(skill);
    setFormData({
      name: skill.name,
      level: skill.level,
      icon: skill.icon || "",
      category: skill.category,
      color: skill.color || "from-accent to-accent-hover",
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSave({ ...formData, level: Number(formData.level) });
    if (!editingItem) setFormData(defaultForm);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-base font-semibold text-text-primary flex items-center gap-2">
            <Code2 className="h-4 w-4 text-text-tertiary" />
            Skill Manager
          </h2>
          <p className="text-xs text-text-tertiary mt-0.5">Manage your technical skills</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={handleSeed} size="sm" className="h-9 rounded-lg text-xs border-border-subtle">Seed Data</Button>
          <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-9 rounded-lg text-xs gap-1.5">
                <Plus className="h-3.5 w-3.5" /> Add Skill
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md rounded-xl">
              <DialogHeader>
                <DialogTitle>{editingItem ? "Edit Skill" : "Add New Skill"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Skill Name</Label>
                  <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. React" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Proficiency (%)</Label>
                    <Input type="number" min="0" max="100" value={formData.level} onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="Frontend, Backend" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Icon (SVG or Emoji)</Label>
                    <Input value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} placeholder="🚀" />
                  </div>
                  <div className="space-y-2">
                    <Label>Color (Gradient)</Label>
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
            <TableRow className="hover:bg-transparent border-border-subtle">
              <TableHead className="font-medium text-text-tertiary py-3 text-xs px-4">Skill</TableHead>
              <TableHead className="font-medium text-text-tertiary text-xs hidden sm:table-cell">Category</TableHead>
              <TableHead className="font-medium text-text-tertiary text-xs hidden md:table-cell text-center">Level</TableHead>
              <TableHead className="text-right font-medium text-text-tertiary text-xs pr-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center">
                  <Loader2 className="h-5 w-5 animate-spin mx-auto text-text-tertiary" />
                </TableCell>
              </TableRow>
            ) : skills.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-sm text-text-tertiary">No skills found.</TableCell>
              </TableRow>
            ) : (
              skills.map((skill) => (
                <TableRow key={skill._id} className="hover:bg-surface-hover border-border-subtle transition-colors">
                  <TableCell className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-semibold text-xs">
                        {skill.name.charAt(0)}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-text-primary truncate">{skill.name}</span>
                        <span className="sm:hidden text-[10px] text-text-tertiary">{skill.category}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="bg-accent/10 text-accent border-none rounded-lg px-2 py-0.5 text-[10px] font-medium">{skill.category}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-24 h-1.5 bg-surface-hover rounded-full overflow-hidden">
                        <div className="h-full bg-accent/60 rounded-full" style={{ width: `${skill.level}%` }} />
                      </div>
                      <span className="text-[10px] font-medium text-text-tertiary">{skill.level}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-4">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(skill)} className="h-8 w-8 rounded-lg text-text-tertiary hover:text-accent">
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(skill._id)} className="h-8 w-8 rounded-lg text-text-tertiary hover:text-error">
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
