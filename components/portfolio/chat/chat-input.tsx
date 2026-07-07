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
    <form onSubmit={handleSubmit} className="border-t border-gray-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ask about projects, skills..."
          disabled={isLoading}
          className="flex-1 rounded-xl border-gray-200 bg-gray-50 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
        />
        <Button
          type="submit"
          disabled={!value.trim() || isLoading}
          size="icon"
          className="h-10 w-10 shrink-0 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
