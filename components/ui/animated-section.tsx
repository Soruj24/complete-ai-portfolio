"use client";

import { type HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks";

interface AnimatedSectionProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number;
  direction?: "up" | "none";
  duration?: number;
}

export function AnimatedSection({
  className,
  delay = 0,
  direction = "up",
  duration = 0.6,
  children,
  ...props
}: AnimatedSectionProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={cn(className)} {...props}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: direction === "up" ? 20 : 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
    >
      <div {...props}>{children}</div>
    </motion.div>
  );
}
