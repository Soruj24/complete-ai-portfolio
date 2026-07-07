import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "dot";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full",
        variant === "default" && "bg-accent/10 text-accent",
        variant === "secondary" && "bg-surface text-text-secondary border border-border",
        variant === "outline" && "border border-border text-text-secondary",
        variant === "dot" && "bg-accent/10 text-accent",
        className
      )}
      {...props}
    >
      {variant === "dot" && (
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
      )}
      {children}
    </span>
  );
}
