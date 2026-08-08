"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";

interface ChatNudgeProps {
  show: boolean;
  onOpen: () => void;
  onDismiss: () => void;
}

export function ChatNudge({ show, onOpen, onDismiss }: ChatNudgeProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={onOpen}
          className="cursor-pointer select-none mb-2 flex max-w-[220px] items-center gap-2.5 rounded-xl bg-background border border-border-subtle px-4 py-3 shadow-lg"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/8 text-accent shrink-0">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-text-primary">Hi there!</p>
            <p className="text-[11px] text-text-secondary">Ask Soruj anything</p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onDismiss(); }}
            className="flex h-5 w-5 items-center justify-center rounded-md text-text-tertiary hover:bg-surface hover:text-text-secondary transition-colors duration-200 shrink-0"
          >
            <X className="h-3 w-3" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
