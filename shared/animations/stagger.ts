import type { Variants } from "framer-motion";

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export function createStagger(delay: number = 0.05): { container: Variants; item: Variants } {
  return {
    container: {
      hidden: {},
      visible: { transition: { staggerChildren: delay, delayChildren: 0.1 } },
    },
    item: {
      hidden: { opacity: 0, y: 8 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    },
  };
}
