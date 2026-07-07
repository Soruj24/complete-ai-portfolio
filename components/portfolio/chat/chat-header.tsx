"use client";

import { Bot, Minimize2, Maximize2, X, Trash2 } from "lucide-react";

interface ChatHeaderProps {
  isMinimized: boolean;
  onToggleMinimize: () => void;
  onClose: () => void;
  onClear: () => void;
}

export function ChatHeader({
  isMinimized,
  onToggleMinimize,
  onClose,
  onClear,
}: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-800 px-5 py-4 text-white dark:from-slate-950 dark:to-slate-900">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-base font-semibold tracking-tight">Soruj AI</h3>
          <p className="text-xs text-white/60">Assistant</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={onClear} className="rounded-lg p-2 text-white/50 hover:bg-white/10 hover:text-white transition-colors" title="Clear chat">
          <Trash2 className="h-4 w-4" />
        </button>
        <button onClick={onToggleMinimize} className="rounded-lg p-2 text-white/50 hover:bg-white/10 hover:text-white transition-colors" title={isMinimized ? "Maximize" : "Minimize"}>
          {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
        </button>
        <button onClick={onClose} className="rounded-lg p-2 text-white/50 hover:bg-white/10 hover:text-white transition-colors" title="Close">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
