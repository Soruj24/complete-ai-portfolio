"use client";

import { useRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id: string;
  variant?: "default" | "alt" | "gradient";
}

export function Section({
  className,
  id,
  variant = "default",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      data-section
      className={cn(
        "relative py-24 md:py-32",
        variant === "default" && "bg-background",
        variant === "alt" && "bg-surface",
        variant === "gradient" && "bg-gradient-to-b from-background via-surface to-background",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

export function SectionHeader({
  label,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-2xl mb-16 md:mb-20 space-y-4",
        align === "center" && "mx-auto text-center"
      )}
    >
      {label && (
        <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium tracking-wide text-accent bg-accent/8 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          {label}
        </span>
      )}
      <h2 className="text-[clamp(1.75rem,4vw,3.25rem)] font-semibold tracking-tight leading-[1.1] text-text-primary">
        {title}
      </h2>
      {description && (
        <p className="text-[clamp(0.9rem,1.5vw,1.1rem)] text-text-secondary leading-relaxed max-w-xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
