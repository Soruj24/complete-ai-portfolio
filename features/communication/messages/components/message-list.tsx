"use client";

import { motion } from "framer-motion";
import { Flag, Mail, MailOpen, ChevronRight } from "lucide-react";
import type { Message } from "../types";

interface Props {
  messages: Message[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onToggleFlag: (id: string) => void;
  loading: boolean;
}

export function MessageList({ messages, selectedId, onSelect, onToggleFlag, loading }: Props) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-lg bg-surface-hover" />
        ))}
      </div>
    );
  }

  if (!messages.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-text-tertiary">
        <Mail size={40} className="mb-3 opacity-40" />
        <p className="font-medium">No messages found</p>
        <p className="text-sm">Try adjusting your filters</p>
      </div>
    );
  }

  const formatDate = (d: string) => {
    const date = new Date(d);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / 86400000);
    if (diffDays === 0) return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    if (diffDays < 7) return date.toLocaleDateString([], { weekday: "short" });
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  return (
    <div className="space-y-1">
      {messages.map((msg, i) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.02, duration: 0.2 }}
          onClick={() => { onSelect(msg.id); if (msg.status === "unread") onSelect(msg.id); }}
          className={`group flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
            selectedId === msg.id ? "border-accent/50 bg-accent/5" : "border-transparent hover:border-border-primary hover:bg-surface-hover"
          } ${msg.status === "unread" ? "border-l-2 border-l-accent" : ""}`}
        >
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFlag(msg.id); }}
            className={`shrink-0 rounded p-1 transition-colors hover:bg-surface-hover ${
              msg.status === "flagged" ? "text-warning" : "text-text-tertiary opacity-0 group-hover:opacity-100"
            }`}
          >
            <Flag size={14} />
          </button>

          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
              msg.status === "unread" ? "bg-accent/20 text-accent" : "bg-surface-hover text-text-secondary"
            }`}>
              {msg.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className={`truncate text-sm ${msg.status === "unread" ? "font-semibold text-text-primary" : "text-text-secondary"}`}>
                  {msg.name}
                </span>
                <span className="ml-auto shrink-0 text-[10px] text-text-tertiary">{formatDate(msg.createdAt)}</span>
              </div>
              <p className={`truncate text-xs ${msg.status === "unread" ? "font-medium text-text-primary" : "text-text-tertiary"}`}>
                {msg.subject}
              </p>
            </div>
          </div>

          {msg.status === "unread" && (
            <div className="h-2 w-2 shrink-0 rounded-full bg-accent" />
          )}
          <ChevronRight size={14} className="shrink-0 text-text-tertiary opacity-0 group-hover:opacity-100" />
        </motion.div>
      ))}
    </div>
  );
}
