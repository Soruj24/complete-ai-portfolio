"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Code2 } from "lucide-react";
import { CrudManagerShell } from "./crud-manager-shell";

const defaultForm = {
  name: "", level: 80, icon: "", category: "", color: "from-accent to-accent-hover",
};

export function SkillManager() {
  return (
    <CrudManagerShell
      config={{ apiUrl: "/api/skills", dataKey: "skills", entityName: "skill" }}
      icon={Code2}
      title="Skill Manager"
      description="Manage your technical skills"
      addLabel="Add Skill"
      defaultForm={defaultForm}
      columns={[
        { head: "Skill", headClassName: "py-3 px-4", cellClassName: "py-3 px-4" },
        { head: "Category", headClassName: "py-3 hidden sm:table-cell", cellClassName: "hidden sm:table-cell" },
        { head: "Level", headClassName: "py-3 hidden md:table-cell text-center", cellClassName: "hidden md:table-cell text-center" },
      ]}
      dialogWidth="max-w-md"
      renderForm={({ formData, setFormData }) => (
        <>
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
        </>
      )}
      renderRow={(item) => [
        <div key="skill" className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-semibold text-xs">
            {item.name.charAt(0)}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-text-primary truncate">{item.name}</span>
            <span className="sm:hidden text-[10px] text-text-tertiary">{item.category}</span>
          </div>
        </div>,
        <Badge key="cat" className="bg-accent/10 text-accent border-none rounded-lg px-2 py-0.5 text-[10px] font-medium">{item.category}</Badge>,
        <div key="lvl" className="flex items-center justify-center gap-2">
          <div className="w-24 h-1.5 bg-surface-hover rounded-full overflow-hidden">
            <div className="h-full bg-accent/60 rounded-full" style={{ width: `${item.level}%` }} />
          </div>
          <span className="text-[10px] font-medium text-text-tertiary">{item.level}%</span>
        </div>,
      ]}
    />
  );
}
