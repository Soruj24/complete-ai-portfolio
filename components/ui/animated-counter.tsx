"use client";

import { cn } from "@/lib/utils";
import { useAnimatedCounter } from "@/lib/hooks";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
  className?: string;
  labelClassName?: string;
}

export function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  label,
  duration,
  className,
  labelClassName,
}: AnimatedCounterProps) {
  const [ref, count] = useAnimatedCounter(target, duration);

  return (
    <div ref={ref} className={cn("text-center", className)}>
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary tabular-nums">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className={cn("mt-1 text-sm text-text-secondary font-medium", labelClassName)}>
        {label}
      </div>
    </div>
  );
}
