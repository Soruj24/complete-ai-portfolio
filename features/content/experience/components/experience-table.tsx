"use client";

import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Pencil, Copy, Trash2, ArrowUp, ArrowDown, Eye, EyeOff, MapPin, Building2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Experience } from "../types";
import { EMPLOYMENT_LABELS } from "../types";

interface Props {
  experiences: Experience[];
  loading: boolean;
  selected: string[];
  onSelectAll: () => void;
  onSelect: (id: string) => void;
  onEdit: (exp: Experience) => void;
  onDelete: (id: string) => void;
  onDuplicate: (exp: Experience) => void;
  onToggleEnabled: (id: string, enabled: boolean) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  onOrderChange: (id: string, order: number) => void;
}

function ActionDropdown({
  exp,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleEnabled,
  onMoveUp,
  onMoveDown,
}: {
  exp: Experience;
  onEdit: (e: Experience) => void;
  onDelete: (id: string) => void;
  onDuplicate: (e: Experience) => void;
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
          <button onClick={() => { setOpen(false); onEdit(exp); }}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-[12px] text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors">
            <Pencil className="h-3 w-3" /> Edit
          </button>
          <button onClick={() => { setOpen(false); onDuplicate(exp); }}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-[12px] text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors">
            <Copy className="h-3 w-3" /> Duplicate
          </button>
          <button onClick={() => { setOpen(false); onMoveUp(exp._id); }}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-[12px] text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors">
            <ArrowUp className="h-3 w-3" /> Move Up
          </button>
          <button onClick={() => { setOpen(false); onMoveDown(exp._id); }}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-[12px] text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors">
            <ArrowDown className="h-3 w-3" /> Move Down
          </button>
          <div className="my-0.5 h-px bg-border-subtle" />
          <button onClick={() => { setOpen(false); onToggleEnabled(exp._id, !exp.enabled); }}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-[12px] text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors">
            {exp.enabled ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            {exp.enabled ? "Hide" : "Show"}
          </button>
          <div className="my-0.5 h-px bg-border-subtle" />
          <button onClick={() => { setOpen(false); onDelete(exp._id); }}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-[12px] text-red-500 hover:bg-red-500/10 transition-colors">
            <Trash2 className="h-3 w-3" /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function ExperienceTable({
  experiences,
  loading,
  selected,
  onSelectAll,
  onSelect,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleEnabled,
  onMoveUp,
  onMoveDown,
  onOrderChange,
}: Props) {
  const allSelected = experiences.length > 0 && selected.length === experiences.length;

  if (loading) {
    return (
      <div className="rounded-lg border border-border-subtle overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border-subtle bg-surface/50 hover:bg-surface/50">
              <TableHead className="w-9 px-3"><Skeleton className="h-3.5 w-3.5" /></TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary">Role</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary">Company</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary">Location</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary">Type</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary">Period</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary">Order</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary">Visible</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 4 }).map((_, i) => (
              <TableRow key={i} className="border-b border-border-subtle">
                <TableCell className="px-3"><Skeleton className="h-3.5 w-3.5" /></TableCell>
                <TableCell><Skeleton className="h-3.5 w-32" /></TableCell>
                <TableCell><Skeleton className="h-3.5 w-24" /></TableCell>
                <TableCell><Skeleton className="h-3.5 w-20" /></TableCell>
                <TableCell><Skeleton className="h-3.5 w-16" /></TableCell>
                <TableCell><Skeleton className="h-3.5 w-24" /></TableCell>
                <TableCell><Skeleton className="h-3.5 w-8" /></TableCell>
                <TableCell><Skeleton className="h-3.5 w-8" /></TableCell>
                <TableCell><Skeleton className="h-3.5 w-7" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (experiences.length === 0) {
    return (
      <div className="rounded-lg border border-border-subtle overflow-hidden">
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-[13px] font-medium text-text-primary">No experience entries found</p>
          <p className="text-[12px] text-text-tertiary mt-0.5">Try adjusting your search or filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border-subtle overflow-hidden">
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border-subtle bg-surface/50 hover:bg-surface/50">
              <TableHead className="w-9 px-3">
                <Checkbox checked={allSelected} onCheckedChange={onSelectAll} aria-label="Select all" />
              </TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">Role</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">Company</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">Location</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">Type</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">Period</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider w-16">Order</TableHead>
              <TableHead className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider w-16">Visible</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {experiences.map((exp) => (
              <TableRow
                key={exp._id}
                className={cn(
                  "group border-b border-border-subtle last:border-0 hover:bg-surface/50",
                  !exp.enabled && "opacity-50"
                )}
              >
                <TableCell className="px-3">
                  <Checkbox checked={selected.includes(exp._id)} onCheckedChange={() => onSelect(exp._id)} aria-label={`Select ${exp.role}`} />
                </TableCell>
                <TableCell className="py-2.5">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[13px] font-medium text-text-primary truncate">{exp.role}</p>
                      {exp.current && (
                        <span className="shrink-0 rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600">Current</span>
                      )}
                    </div>
                    {exp.description && (
                      <p className="text-[11px] text-text-tertiary truncate max-w-[250px] mt-0.5">{exp.description}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-2.5">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="h-3 w-3 text-text-tertiary shrink-0" />
                    <span className="text-[12px] text-text-secondary truncate">{exp.company}</span>
                  </div>
                </TableCell>
                <TableCell className="py-2.5">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-text-tertiary shrink-0" />
                    <span className="text-[12px] text-text-tertiary truncate">{exp.location || "--"}</span>
                  </div>
                </TableCell>
                <TableCell className="py-2.5">
                  <span className="inline-flex items-center rounded bg-surface px-2 py-0.5 text-[11px] font-medium text-text-secondary">
                    {EMPLOYMENT_LABELS[exp.employmentType] || exp.employmentType}
                  </span>
                </TableCell>
                <TableCell className="py-2.5">
                  <span className="text-[11px] text-text-tertiary tabular-nums">
                    {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                </TableCell>
                <TableCell className="py-2.5">
                  <input
                    type="number"
                    value={exp.order}
                    onChange={(e) => onOrderChange(exp._id, parseInt(e.target.value) || 0)}
                    className="w-12 h-6 text-[11px] text-center rounded border border-border-subtle bg-background text-text-primary outline-none focus:ring-1 focus:ring-accent/30"
                  />
                </TableCell>
                <TableCell className="py-2.5">
                  <button
                    onClick={() => onToggleEnabled(exp._id, !exp.enabled)}
                    className={cn(
                      "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors",
                      exp.enabled ? "bg-emerald-500" : "bg-border-subtle"
                    )}
                  >
                    <span
                      className={cn(
                        "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform mt-0.5",
                        exp.enabled ? "translate-x-4 ml-0.5" : "translate-x-0.5"
                      )}
                    />
                  </button>
                </TableCell>
                <TableCell className="py-2.5">
                  <ActionDropdown
                    exp={exp}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onDuplicate={onDuplicate}
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

      <div className="md:hidden">
        <div className="p-2 border-b border-border-subtle bg-surface/50">
          <label className="flex items-center gap-2 px-2 py-1 text-[12px] text-text-secondary">
            <Checkbox checked={allSelected} onCheckedChange={onSelectAll} aria-label="Select all" />
            Select all ({experiences.length})
          </label>
        </div>
        <div className="divide-y divide-border-subtle">
          {experiences.map((exp) => (
            <div key={exp._id} className={cn("p-3 space-y-2", !exp.enabled && "opacity-50")}>
              <div className="flex items-start gap-3">
                <Checkbox checked={selected.includes(exp._id)} onCheckedChange={() => onSelect(exp._id)} className="mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-medium text-text-primary truncate">{exp.role}</p>
                    {exp.current && <span className="shrink-0 rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600">Current</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-text-secondary">{exp.company}</span>
                    {exp.location && <span className="text-[11px] text-text-tertiary">· {exp.location}</span>}
                  </div>
                </div>
                <ActionDropdown exp={exp} onEdit={onEdit} onDelete={onDelete} onDuplicate={onDuplicate} onToggleEnabled={onToggleEnabled} onMoveUp={onMoveUp} onMoveDown={onMoveDown} />
              </div>
              <div className="flex items-center gap-2 ml-7">
                <span className="inline-flex items-center rounded bg-background px-1.5 py-0.5 text-[10px] font-medium text-text-secondary">
                  {EMPLOYMENT_LABELS[exp.employmentType] || exp.employmentType}
                </span>
                <span className="text-[10px] text-text-tertiary">
                  {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                </span>
                <button onClick={() => onToggleEnabled(exp._id, !exp.enabled)} className={cn("relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full transition-colors ml-auto", exp.enabled ? "bg-emerald-500" : "bg-border-subtle")}>
                  <span className={cn("pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-sm transition-transform mt-0.5", exp.enabled ? "translate-x-3 ml-0.5" : "translate-x-0.5")} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
