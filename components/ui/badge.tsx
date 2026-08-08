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
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-medium rounded-full",
        variant === "default" && "bg-accent/8 text-accent",
        variant === "secondary" && "bg-surface text-text-secondary border border-border-subtle",
        variant === "outline" && "border border-border text-text-secondary",
        variant === "dot" && "bg-accent/8 text-accent",
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
