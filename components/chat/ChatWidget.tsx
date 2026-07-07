"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChatWidget } from "@/hooks/use-chat-widget";
import { ChatHeader } from "./chat-header";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";

export default function ChatWidget() {
  const {
    session, isOpen, setIsOpen, isMinimized, setIsMinimized,
    messages, newMessage, setNewMessage, loading, chatMode, setChatMode,
    scrollRef, handleSendMessage,
  } = useChatWidget();

  if (!session || session.user.role === "admin") return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <Card className={cn("mb-4 w-80 md:w-96 shadow-2xl border-none overflow-hidden transition-all duration-300", isMinimized ? "h-14" : "h-[500px]")}>
          <ChatHeader chatMode={chatMode} isMinimized={isMinimized} onModeChange={setChatMode} onToggleMinimize={() => setIsMinimized(!isMinimized)} onClose={() => setIsOpen(false)} />
          {!isMinimized && (
            <>
              <ChatMessages messages={messages} userId={session.user.id} userName={session.user.name ?? "User"} scrollRef={scrollRef} />
              <ChatInput value={newMessage} loading={loading} onChange={setNewMessage} onSubmit={handleSendMessage} />
            </>
          )}
        </Card>
      )}

      <Button onClick={() => setIsOpen(true)} className={cn("h-16 w-16 rounded-full bg-purple-600 hover:bg-purple-700 shadow-2xl shadow-purple-200 transition-all duration-500 hover:scale-110 group", isOpen && "scale-0 opacity-0 pointer-events-none")}>
        <MessageCircle className="h-8 w-8 text-white group-hover:rotate-12 transition-transform" />
        <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 border-2 border-white rounded-full flex items-center justify-center">
          <span className="text-[10px] font-black text-white">1</span>
        </div>
      </Button>
    </div>
  );
}
