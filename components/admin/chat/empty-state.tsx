"use client";

import { MessageCircle } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3 text-text-tertiary">
      <MessageCircle className="h-12 w-12 opacity-20" />
      <p className="text-sm font-medium">Select a user to start chatting</p>
      <p className="text-xs">Choose a conversation from the sidebar</p>
    </div>
  );
}
