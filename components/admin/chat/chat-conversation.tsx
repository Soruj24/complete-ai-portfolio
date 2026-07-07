"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { ChatUser, ChatMessage } from "@/types/admin-chat";

interface ChatConversationProps {
  selectedUser: ChatUser;
  messages: ChatMessage[];
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onBack: () => void;
}

export function ChatConversation({ selectedUser, messages, scrollRef, onBack }: ChatConversationProps) {
  return (
    <>
      <div className="p-3 border-b border-border-subtle flex items-center justify-between bg-background/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="md:hidden h-8 w-8 rounded-lg" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src={selectedUser.image} />
            <AvatarFallback className="text-xs font-medium bg-accent/10 text-accent">
              {selectedUser.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium text-text-primary">{selectedUser.name}</h3>
            <span className="text-[10px] font-medium text-success flex items-center gap-1">
              <span className="h-1.5 w-1.5 bg-success rounded-full animate-pulse" />
              Active Now
            </span>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/30 no-scrollbar">
        {messages.map((msg) => (
          <div key={msg._id} className={cn("flex flex-col max-w-[80%]", msg.isAdmin ? "ml-auto items-end" : "mr-auto items-start")}>
            <div className={cn(
              "px-3.5 py-2 rounded-2xl text-sm leading-relaxed",
              msg.isAdmin
                ? "bg-accent text-accent-foreground rounded-br-sm"
                : "bg-surface text-text-primary rounded-bl-sm border border-border-subtle",
            )}>
              {msg.message}
            </div>
            <span className="text-[9px] text-text-tertiary mt-1">
              {format(new Date(msg.createdAt), "h:mm a")}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
