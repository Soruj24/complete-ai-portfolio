"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
  timestamp: number;
}

export function PromptMessage({ msg, onUpdate, onRemove }: {
  msg: Message;
  onUpdate: (id: string, content: string) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -10 }}
      className={cn(
        "group relative p-3 rounded-xl text-sm",
        msg.role === "system" ? "bg-surface-hover border border-border-subtle" :
        msg.role === "user" ? "bg-accent/10 border border-accent/20" :
        "bg-surface-hover border border-border-subtle/50",
      )}
    >
      <div className="flex items-center justify-between mb-1">
        <Badge variant="outline" className={cn(
          "text-[9px] px-1.5 py-0 rounded border-0 uppercase tracking-wider font-semibold",
          msg.role === "system" ? "text-text-tertiary" :
          msg.role === "user" ? "text-accent" : "text-success",
        )}>
          {msg.role}
        </Badge>
        <button onClick={() => onRemove(msg.id)} className="opacity-0 group-hover:opacity-100 transition-opacity">
          <Trash2 className="h-3 w-3 text-text-tertiary hover:text-error" />
        </button>
      </div>
      {msg.role === "system" ? (
        <input value={msg.content} onChange={(e) => onUpdate(msg.id, e.target.value)}
          placeholder="Enter system prompt..."
          className="w-full bg-transparent text-xs text-text-primary outline-none placeholder:text-text-tertiary" />
      ) : (
        <p className="text-xs text-text-primary whitespace-pre-wrap">{msg.content}</p>
      )}
    </motion.div>
  );
}
