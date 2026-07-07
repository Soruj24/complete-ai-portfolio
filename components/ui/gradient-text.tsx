import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface GradientTextProps extends HTMLAttributes<HTMLSpanElement> {
  from?: string;
  via?: string;
  to?: string;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p";
}

export function GradientText({
  className,
  from,
  via,
  to,
  as: Component = "span",
  children,
  ...props
}: GradientTextProps) {
  return (
    <Component
      className={cn(
        "bg-clip-text text-transparent",
        from && via && to
          ? `bg-gradient-to-r ${from} ${via} ${to}`
          : "bg-gradient-to-r from-accent via-purple-500 to-blue-500",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
