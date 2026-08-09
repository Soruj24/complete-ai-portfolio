"use client";

import ReactMarkdown from "react-markdown";
import { User as UserIcon, Bot, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageType } from "@/types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
  onCopy: (text: string) => void;
}

export function ChatMessage({ message, onCopy }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-2", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <Bot className="h-3.5 w-3.5" />
        </div>
      )}
      <div className={cn("group relative max-w-[80%]", isUser ? "order-1" : "order-2")}>
        <div
          className={cn(
            "rounded-xl px-3 py-2 text-[13px] leading-relaxed",
            isUser
              ? "bg-accent text-accent-foreground"
              : "bg-surface border border-border-subtle text-text-primary"
          )}
        >
          {isUser ? (
            message.content
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>
        <button
          onClick={() => onCopy(message.content)}
          className={cn(
            "absolute -bottom-5 rounded-md p-1 text-text-tertiary opacity-0 transition-opacity duration-200 hover:text-text-secondary group-hover:opacity-100",
            isUser ? "right-0" : "left-0"
          )}
          title="Copy message"
        >
          <Copy className="h-3 w-3" />
        </button>
      </div>
      {isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <UserIcon className="h-3.5 w-3.5" />
        </div>
      )}
    </div>
  );
}
