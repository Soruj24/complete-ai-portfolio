import type { Variants } from "framer-motion";

const spring = { type: "spring" as const, stiffness: 300, damping: 25 };

export const slideInLeft: Variants = {
  hidden: { x: -16, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: spring },
};

export const slideInRight: Variants = {
  hidden: { x: 16, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: spring },
};

export const slideInUp: Variants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: spring },
};
