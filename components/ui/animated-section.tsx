"use client";

import { useRef, useEffect, useState, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number;
  direction?: "up" | "none";
  duration?: number;
}

export function AnimatedSection({
  className,
  delay = 0,
  direction = "up",
  duration = 500,
  children,
  ...props
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, rootMargin: "-30px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  if (prefersReduced) {
    return (
      <div className={cn(className)} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all",
        isVisible
          ? "opacity-100 translate-y-0"
          : direction === "up"
            ? "opacity-0 translate-y-3"
            : "opacity-0",
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay * 1000}ms`,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
