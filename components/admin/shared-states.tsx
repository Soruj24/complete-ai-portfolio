"use client";

import { type LucideIcon, FolderOpen, Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

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
