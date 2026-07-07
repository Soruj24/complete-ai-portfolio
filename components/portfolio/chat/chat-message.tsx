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
    <div className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 shadow-sm">
          <Bot className="h-4 w-4 text-white" />
        </div>
      )}
      <div className={cn("group relative max-w-[80%]", isUser ? "order-1" : "order-2")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-gray-100 text-gray-800 dark:bg-slate-800 dark:text-slate-200"
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
            "absolute -bottom-6 rounded-lg p-1 text-gray-400 opacity-0 transition-opacity hover:text-gray-600 group-hover:opacity-100 dark:hover:text-slate-300",
            isUser ? "right-0" : "left-0"
          )}
          title="Copy message"
        >
          <Copy className="h-3 w-3" />
        </button>
      </div>
      {isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30 shadow-sm">
          <UserIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </div>
      )}
    </div>
  );
}
