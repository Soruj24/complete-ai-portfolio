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
    <div className="flex items-center justify-between bg-accent px-4 py-3 text-accent-foreground">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-foreground/10">
          <Bot className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-[13px] font-semibold tracking-[-0.01em]">Soruj AI</h3>
          <p className="text-[10px] text-accent-foreground/60">Assistant</p>
        </div>
      </div>
      <div className="flex items-center gap-0.5">
        <button onClick={onClear} className="rounded-md p-1.5 text-accent-foreground/50 hover:bg-accent-foreground/10 hover:text-accent-foreground transition-colors duration-200" title="Clear chat">
          <Trash2 className="h-3.5 w-3.5" />
        </button>
        <button onClick={onToggleMinimize} className="rounded-md p-1.5 text-accent-foreground/50 hover:bg-accent-foreground/10 hover:text-accent-foreground transition-colors duration-200" title={isMinimized ? "Maximize" : "Minimize"}>
          {isMinimized ? <Maximize2 className="h-3.5 w-3.5" /> : <Minimize2 className="h-3.5 w-3.5" />}
        </button>
        <button onClick={onClose} className="rounded-md p-1.5 text-accent-foreground/50 hover:bg-accent-foreground/10 hover:text-accent-foreground transition-colors duration-200" title="Close">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
