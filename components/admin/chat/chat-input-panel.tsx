"use client";

import { useState } from "react";
import { Send, Loader2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QUICK_REPLIES } from "@/constants/admin-chat";

interface ChatInputPanelProps {
  newMessage: string;
  loading: boolean;
  onMessageChange: (value: string) => void;
  onSend: (e: React.FormEvent) => void;
}

export function ChatInputPanel({ newMessage, loading, onMessageChange, onSend }: ChatInputPanelProps) {
  const [showQuickReplies, setShowQuickReplies] = useState(false);

  const handleQuickReply = (reply: string) => {
    onMessageChange(reply);
    setShowQuickReplies(false);
  };

  return (
    <div className="p-3 border-t border-border-subtle bg-background relative">
      {showQuickReplies && (
        <div className="absolute bottom-full left-0 right-0 p-3 bg-surface border-t border-border-subtle shadow-lg z-20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-medium text-text-tertiary flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Quick Replies
            </span>
            <button onClick={() => setShowQuickReplies(false)} className="text-text-tertiary hover:text-text-primary">
              ✕
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_REPLIES.map((reply, i) => (
              <button key={i} onClick={() => handleQuickReply(reply)}
                className="text-xs px-2.5 py-1.5 rounded-md bg-surface-hover text-text-secondary hover:bg-accent/10 hover:text-accent transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={onSend} className="flex gap-2">
        <div className="flex-1 flex items-center gap-2 bg-surface rounded-lg border border-border-subtle px-3">
          <button type="button" onClick={() => setShowQuickReplies(!showQuickReplies)} className="text-text-tertiary hover:text-accent transition-colors">
            <Zap className="h-4 w-4" />
          </button>
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => onMessageChange(e.target.value)}
            onFocus={() => setShowQuickReplies(false)}
            className="h-9 border-0 bg-transparent px-0 text-sm focus-visible:ring-0"
          />
        </div>
        <Button type="submit" disabled={loading || !newMessage.trim()} size="icon" className="h-10 w-10 rounded-lg shrink-0">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  );
}
