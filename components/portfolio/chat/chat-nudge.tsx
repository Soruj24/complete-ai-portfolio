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
          className="cursor-pointer select-none mb-2 flex max-w-[240px] items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-xl ring-1 ring-gray-200 dark:bg-slate-800 dark:ring-slate-700"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30">
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Hi there!</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">Ask Soruj anything</p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onDismiss(); }}
            className="flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
