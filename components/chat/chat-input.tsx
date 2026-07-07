"use client";

import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";

interface Props {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ChatInput({ value, loading, onChange, onSubmit }: Props) {
  return (
    <CardFooter className="p-4 bg-white border-t border-gray-100">
      <form onSubmit={onSubmit} className="flex w-full gap-2">
        <Input placeholder="Type your message..." value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 h-10 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-purple-100" />
        <Button type="submit" size="icon" disabled={loading || !value.trim()} className="h-10 w-10 rounded-xl bg-purple-600 hover:bg-purple-700 shrink-0 shadow-lg shadow-purple-100">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </CardFooter>
  );
}
