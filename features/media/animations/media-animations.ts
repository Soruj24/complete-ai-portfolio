import { staggerContainer, staggerItem } from "@/shared/animations/stagger";

export const MEDIA_GRID_ANIMATION = {
  container: staggerContainer,
  item: {
    ...staggerItem,
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
  },
};

export const MEDIA_LIST_ANIMATION = {
  container: staggerContainer,
  item: staggerItem,
};

export const SIDEBAR_ANIMATION = {
  container: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.03 } },
  },
  item: {
    hidden: { opacity: 0, x: -8 },
    visible: { opacity: 1, x: 0 },
  },
};

const previewTransition = { type: "spring" as const, stiffness: 300, damping: 30 };

export const PREVIEW_PANEL_ANIMATION = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
  transition: previewTransition,
};

export const UPLOAD_OVERLAY_ANIMATION = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
