"use client";

import { useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
  isMinimized: boolean;
}

export function ChatInput({ value, onChange, onSend, isLoading, isMinimized }: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isMinimized) setTimeout(() => inputRef.current?.focus(), 200);
  }, [isMinimized]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend();
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-border-subtle bg-background p-3">
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ask about projects, skills..."
          disabled={isLoading}
          className="flex-1 rounded-lg border border-border-subtle bg-surface text-[13px]"
        />
        <Button
          type="submit"
          disabled={!value.trim() || isLoading}
          size="icon-sm"
          className="shrink-0"
        >
          <Send className="h-3.5 w-3.5" />
        </Button>
      </div>
    </form>
  );
}
