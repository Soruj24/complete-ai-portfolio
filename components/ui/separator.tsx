import { cn } from "@/lib/utils";

interface SeparatorProps {
  className?: string;
  gradient?: boolean;
}

export function Separator({ className, gradient = false }: SeparatorProps) {
  return (
    <hr
      role="presentation"
      className={cn(
        "h-px w-full border-0",
        gradient
          ? "bg-gradient-to-r from-transparent via-border-subtle to-transparent"
          : "bg-border-subtle",
        className
      )}
    />
  );
}
