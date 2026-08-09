"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface ActionCardProps {
  label: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  shortcut?: string;
  onClick: () => void;
  index?: number;
}

export function ActionCard({ label, description, icon: Icon, shortcut, onClick }: ActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-start gap-2 rounded-lg border border-border-subtle bg-surface p-3.5 text-left hover:border-border hover:bg-surface-hover transition-colors"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent/10 text-accent group-hover:bg-accent/15 transition-colors">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-[13px] font-medium text-text-primary">{label}</p>
        <p className="text-[11px] text-text-tertiary mt-0.5">{description}</p>
      </div>
      {shortcut && (
        <kbd className="absolute top-2.5 right-2.5 hidden md:inline-flex items-center gap-0.5 rounded border border-border-subtle bg-background px-1 py-0.5 text-[9px] font-medium text-text-tertiary">
          {shortcut}
        </kbd>
      )}
    </button>
  );
}
