import type { HTMLAttributes } from "react";
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
        "relative py-14 sm:py-20 md:py-28",
        variant === "default" && "bg-background",
        variant === "alt" && "bg-background border-t border-border-subtle",
        variant === "gradient" && "bg-background border-t border-border-subtle",
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
        "max-w-2xl mb-10 sm:mb-14 md:mb-16 space-y-3",
        align === "center" && "mx-auto text-center"
      )}
    >
      {label && (
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-text-tertiary">
          {label}
        </span>
      )}
      <h2 className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-semibold tracking-[-0.02em] leading-[1.15] text-text-primary">
        {title}
      </h2>
      {description && (
        <p className="text-[clamp(0.875rem,1.3vw,1rem)] text-text-secondary leading-relaxed max-w-lg mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
