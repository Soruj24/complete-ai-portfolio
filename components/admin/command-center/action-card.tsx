"use client";

import { motion } from "framer-motion";
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

export function ActionCard({ label, description, icon: Icon, gradient, shortcut, onClick, index = 0 }: ActionCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.05, duration: 0.35, ease: "easeOut" }}
      onClick={onClick}
      className="group relative flex flex-col items-start gap-2 rounded-xl border border-border-subtle bg-surface p-4 text-left hover:shadow-md hover:border-border hover:-translate-y-0.5 transition-all"
    >
      <div className={cn(
        "flex h-10 w-10 items-center justify-center rounded-lg transition-transform group-hover:scale-110",
        gradient,
      )}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div className="mt-1">
        <p className="text-sm font-semibold text-text-primary">{label}</p>
        <p className="text-xs text-text-tertiary mt-0.5">{description}</p>
      </div>
      {shortcut && (
        <kbd className="absolute top-3 right-3 hidden md:inline-flex items-center gap-0.5 rounded-md border border-border-subtle bg-background px-1.5 py-0.5 text-[10px] font-medium text-text-tertiary">
          {shortcut}
        </kbd>
      )}
    </motion.button>
  );
}
