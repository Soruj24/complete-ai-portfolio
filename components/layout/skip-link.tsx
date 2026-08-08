"use client";

import { useReducedMotion, motion } from "framer-motion";

export function SkipLink() {
  const shouldReduceMotion = useReducedMotion();

  const Wrapper = shouldReduceMotion ? "span" : motion.span;
  const wrapperProps = shouldReduceMotion
    ? {}
    : {
        initial: { y: -100 },
        animate: { y: 0 },
        transition: { duration: 0.2 },
      };

  return (
    <Wrapper {...wrapperProps}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-surface focus:text-text-primary focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:ring-2 focus:ring-accent focus:outline-none"
      >
        Skip to main content
      </a>
    </Wrapper>
  );
}
