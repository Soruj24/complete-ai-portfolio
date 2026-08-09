"use client";

import { useState, useRef, useEffect } from "react";
import { GripVertical, MoreHorizontal, Pencil, Copy, Star, Trash2, ArrowUp, ArrowDown, Eye, EyeOff } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Skill } from "../types";
import { SKILL_CATEGORY_LABELS } from "../types";

interface Props {
  skills: Skill[];
  loading: boolean;
  selected: string[];
  onSelectAll: () => void;
  onSelect: (id: string) => void;
  onEdit: (skill: Skill) => void;
  onDelete: (id: string) => void;
  onDuplicate: (skill: Skill) => void;
  onToggleFeatured: (id: string, featured: boolean) => void;
  onToggleEnabled: (id: string, enabled: boolean) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  onOrderChange: (id: string, order: number) => void;
}

function ActionDropdown({
  skill,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleFeatured,
  onToggleEnabled,
  onMoveUp,
  onMoveDown,
}: {
  skill: Skill;
  onEdit: (s: Skill) => void;
  onDelete: (id: string) => void;
  onDuplicate: (s: Skill) => void;
  onToggleFeatured: (id: string, featured: boolean) => void;
  onToggleEnabled: (id: string, enabled: boolean) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setOpen(!open)}>
        <MoreHorizontal className="h-3.5 w-3.5 text-text-tertiary" />
      </Button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-44 rounded-lg border border-border-subtle bg-background py-1 shadow-lg">
          <button onClick={() => { setOpen(false); onEdit(skill); }}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-[12px] text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors">
            <Pencil className="h-3 w-3" /> Edit
          </button>
          <button onClick={() => { setOpen(false); onDuplicate(skill); }}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-[12px] text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors">
            <Copy className="h-3 w-3" /> Duplicate
          </button>
          <button onClick={() => { setOpen(false); onMoveUp(skill._id); }}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-[12px] text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors">
            <ArrowUp className="h-3 w-3" /> Move Up
          </button>
          <button onClick={() => { setOpen(false); onMoveDown(skill._id); }}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-[12px] text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors">
            <ArrowDown className="h-3 w-3" /> Move Down
          </button>
          <div className="my-0.5 h-px bg-border-subtle" />
          <button onClick={() => { setOpen(false); onToggleFeatured(skill._id, !skill.featured); }}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-[12px] text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors">
            <Star className={cn("h-3 w-3", skill.featured ? "fill-amber-500 text-amber-500" : "")} />
            {skill.featured ? "Unfeature" : "Feature"}
          </button>
          <button onClick={() => { setOpen(false); onToggleEnabled(skill._id, !skill.enabled); }}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-[12px] text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors">
            {skill.enabled ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            {skill.enabled ? "Disable" : "Enable"}
          </button>
          <div className="my-0.5 h-px bg-border-subtle" />
          <button onClick={() => { setOpen(false); onDelete(skill._id); }}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-[12px] text-red-500 hover:bg-red-500/10 transition-colors">
            <Trash2 className="h-3 w-3" /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

export function SkillsTable({
  skills,
  loading,
  selected,
  onSelectAll,
  onSelect,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleFeatured,
  onToggleEnabled,
  onMoveUp,
  onMoveDown,
  onOrderChange,
}: Props) {
  const allSelected = skills.length > 0 && selected.length === skills.length;

  if (loading) {
    return (
      <div className="rounded-lg border border-border-subtle overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border-subtle bg-surface/50 hover:bg-surface/50">
              <TableHead className="w-9 px-3"><Skeleton className="h-3.5 w-3.5" /></TableHead>
              <TableHead className="w-9 px-3"><Skeleton className="h-3.5 w-3.5" /></TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary">Skill</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary">Category</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary">Proficiency</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary">Experience</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary">Order</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary">Featured</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary">Enabled</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i} className="border-b border-border-subtle">
                <TableCell className="px-3"><Skeleton className="h-3.5 w-3.5" /></TableCell>
                <TableCell className="px-3"><Skeleton className="h-3.5 w-3.5" /></TableCell>
                <TableCell><Skeleton className="h-3.5 w-32" /></TableCell>
                <TableCell><Skeleton className="h-3.5 w-16" /></TableCell>
                <TableCell><Skeleton className="h-3.5 w-20" /></TableCell>
                <TableCell><Skeleton className="h-3.5 w-12" /></TableCell>
                <TableCell><Skeleton className="h-3.5 w-8" /></TableCell>
                <TableCell><Skeleton className="h-3.5 w-5" /></TableCell>
                <TableCell><Skeleton className="h-3.5 w-8" /></TableCell>
                <TableCell><Skeleton className="h-3.5 w-7" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (skills.length === 0) {
    return (
      <div className="rounded-lg border border-border-subtle overflow-hidden">
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-[13px] font-medium text-text-primary">No skills found</p>
          <p className="text-[12px] text-text-tertiary mt-0.5">Try adjusting your search or filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border-subtle overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border-subtle bg-surface/50 hover:bg-surface/50">
              <TableHead className="w-9 px-3">
                <Checkbox checked={allSelected} onCheckedChange={onSelectAll} aria-label="Select all" />
              </TableHead>
              <TableHead className="w-9 px-3 text-[11px] font-medium text-text-tertiary uppercase tracking-wider">#</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">Skill</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">Category</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">Proficiency</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">Exp</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider w-16">Order</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider w-16">Featured</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider w-16">Enabled</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills.map((skill, idx) => (
              <TableRow
                key={skill._id}
                className={cn(
                  "group border-b border-border-subtle last:border-0 hover:bg-surface/50",
                  !skill.enabled && "opacity-50"
                )}
              >
                <TableCell className="px-3">
                  <Checkbox checked={selected.includes(skill._id)} onCheckedChange={() => onSelect(skill._id)} aria-label={`Select ${skill.name}`} />
                </TableCell>
                <TableCell className="px-3">
                  <GripVertical className="h-3.5 w-3.5 text-text-tertiary opacity-40" />
                </TableCell>
                <TableCell className="py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: skill.color }} />
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium text-text-primary truncate">{skill.name}</p>
                      {skill.description && (
                        <p className="text-[11px] text-text-tertiary truncate max-w-[250px]">{skill.description}</p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-2.5">
                  <span className="inline-flex items-center rounded bg-surface px-2 py-0.5 text-[11px] font-medium text-text-secondary">
                    {SKILL_CATEGORY_LABELS[skill.category] || skill.category}
                  </span>
                </TableCell>
                <TableCell className="py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 rounded-full bg-surface">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
                      />
                    </div>
                    <span className="text-[11px] font-medium text-text-secondary tabular-nums">{skill.level}%</span>
                  </div>
                </TableCell>
                <TableCell className="py-2.5">
                  <span className="text-[12px] text-text-tertiary">{skill.yearsOfExperience || 0} yr</span>
                </TableCell>
                <TableCell className="py-2.5">
                  <input
                    type="number"
                    value={skill.order}
                    onChange={(e) => onOrderChange(skill._id, parseInt(e.target.value) || 0)}
                    className="w-12 h-6 text-[11px] text-center rounded border border-border-subtle bg-background text-text-primary outline-none focus:ring-1 focus:ring-accent/30"
                  />
                </TableCell>
                <TableCell className="py-2.5">
                  <Star
                    className={cn(
                      "h-4 w-4 cursor-pointer transition-colors",
                      skill.featured ? "fill-amber-500 text-amber-500" : "text-text-tertiary hover:text-amber-500"
                    )}
                    onClick={() => onToggleFeatured(skill._id, !skill.featured)}
                  />
                </TableCell>
                <TableCell className="py-2.5">
                  <button
                    onClick={() => onToggleEnabled(skill._id, !skill.enabled)}
                    className={cn(
                      "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors",
                      skill.enabled ? "bg-emerald-500" : "bg-border-subtle"
                    )}
                  >
                    <span
                      className={cn(
                        "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform mt-0.5",
                        skill.enabled ? "translate-x-4 ml-0.5" : "translate-x-0.5"
                      )}
                    />
                  </button>
                </TableCell>
                <TableCell className="py-2.5">
                  <ActionDropdown
                    skill={skill}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onDuplicate={onDuplicate}
                    onToggleFeatured={onToggleFeatured}
                    onToggleEnabled={onToggleEnabled}
                    onMoveUp={onMoveUp}
                    onMoveDown={onMoveDown}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
