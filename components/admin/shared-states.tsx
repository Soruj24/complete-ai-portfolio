"use client";

import { useState, useRef, useEffect } from "react";
import { type LucideIcon, FolderOpen, Search, RefreshCw, MoreHorizontal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "ghost";
    icon?: LucideIcon;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon: Icon = FolderOpen, title, description, action, secondaryAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface border border-border-subtle mb-3">
        <Icon className="h-6 w-6 text-text-tertiary" />
      </div>
      <p className="text-[13px] font-medium text-text-primary text-center">{title}</p>
      <p className="text-[12px] text-text-tertiary mt-0.5 text-center max-w-[280px]">{description}</p>
      <div className="flex items-center gap-2 mt-4">
        {action && (
          <Button
            size="sm"
            onClick={action.onClick}
            variant={action.variant || "default"}
            className="h-8 text-[12px] gap-1.5"
          >
            {action.icon && <action.icon className="h-3.5 w-3.5" />}
            {action.label}
          </Button>
        )}
        {secondaryAction && (
          <Button variant="ghost" size="sm" onClick={secondaryAction.onClick} className="h-8 text-[12px]">
            {secondaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ title = "Something went wrong", message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-error/10 border border-error/20 mb-3">
        <span className="text-error text-lg">!</span>
      </div>
      <p className="text-[13px] font-medium text-text-primary text-center">{title}</p>
      {message && <p className="text-[12px] text-text-tertiary mt-0.5 text-center max-w-[300px]">{message}</p>}
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-4 h-8 text-[12px] gap-1.5">
          <RefreshCw className="h-3.5 w-3.5" /> Retry
        </Button>
      )}
    </div>
  );
}

interface FilteredEmptyStateProps {
  filterDescription?: string;
  onClear?: () => void;
}

export function FilteredEmptyState({ filterDescription = "your search or filters", onClear }: FilteredEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface border border-border-subtle mb-3">
        <Search className="h-6 w-6 text-text-tertiary" />
      </div>
      <p className="text-[13px] font-medium text-text-primary text-center">No results found</p>
      <p className="text-[12px] text-text-tertiary mt-0.5 text-center">Try adjusting {filterDescription}</p>
      {onClear && (
        <Button variant="ghost" size="sm" onClick={onClear} className="mt-3 h-7 text-[12px]">
          Clear all filters
        </Button>
      )}
    </div>
  );
}

export function LoadingSpinner({ size = 24, className }: { size?: number; className?: string }) {
  return <Loader2 size={size} className={cn("animate-spin text-accent", className)} />;
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <LoadingSpinner size={24} />
    </div>
  );
}

interface ActionDropdownItem {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  variant?: "default" | "destructive";
  separator?: boolean;
}

interface ActionDropdownProps {
  items: ActionDropdownItem[];
  align?: "left" | "right";
}

export function ActionDropdown({ items, align = "right" }: ActionDropdownProps) {
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
      <Button variant="ghost" size="icon" className="h-8 w-8 min-w-[32px]" onClick={() => setOpen(!open)}>
        <MoreHorizontal className="h-3.5 w-3.5 text-text-tertiary" />
      </Button>
      {open && (
        <div className={cn(
          "absolute top-full z-50 mt-1 w-44 rounded-lg border border-border-subtle bg-background py-1 shadow-lg",
          align === "right" ? "right-0" : "left-0"
        )}>
          {items.map((item, i) => (
            <div key={i}>
              {item.separator && <div className="my-0.5 h-px bg-border-subtle" />}
              <button
                onClick={() => { setOpen(false); item.onClick(); }}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2 text-[12px] transition-colors min-h-[36px]",
                  item.variant === "destructive"
                    ? "text-red-500 hover:bg-red-500/10"
                    : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                )}
              >
                {item.icon && <item.icon className="h-3 w-3" />}
                {item.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
