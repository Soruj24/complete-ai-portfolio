"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface WidgetShellProps {
  title: string;
  description?: string;
  children: ReactNode;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  className?: string;
  action?: ReactNode;
  height?: string;
}

export function WidgetShell({ title, description, children, loading, error, onRetry, className, action, height }: WidgetShellProps) {
  if (error) {
    return (
      <div className={cn("rounded-xl border border-border-subtle bg-surface p-6", className)}>
        <div className="flex flex-col items-center justify-center gap-3 py-8">
          <AlertCircle className="h-8 w-8 text-error" />
          <p className="text-sm font-medium text-text-secondary">{error}</p>
          {onRetry && (
            <Button variant="outline" size="sm" onClick={onRetry} className="gap-1.5 rounded-lg text-xs h-8">
              <RefreshCw className="h-3 w-3" /> Retry
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("rounded-xl border border-border-subtle bg-surface overflow-hidden", className)}
      style={height ? { minHeight: height } : undefined}
    >
      <div className="flex items-start justify-between p-5 pb-3">
        <div className="space-y-0.5">
          <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
          {description && <p className="text-[11px] text-text-tertiary">{description}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {loading ? (
        <div className="p-5 pt-2 space-y-3">
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-4 w-32 rounded-md" />
          <Skeleton className={cn("h-32 w-full rounded-lg", height)} />
        </div>
      ) : (
        <div className="p-5 pt-2">{children}</div>
      )}
    </motion.div>
  );
}

export function WidgetGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
      className={cn("grid gap-4", className)}
    >
      {children}
    </motion.div>
  );
}
