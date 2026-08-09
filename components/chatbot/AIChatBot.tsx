"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAiChat } from "@/hooks/use-ai-chat";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import { ChatNudge } from "./chat-nudge";
import { ChatHeader } from "./chat-header";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { QuickActions } from "./quick-actions";

export function AIChatBot() {
  const {
    isOpen, setIsOpen,
    isMinimized, setIsMinimized,
    input, setInput,
    messages, isLoading, showNudge, setShowNudge,
    sendMessage, sendQuick, clearChat, copyMessage,
  } = useAiChat();

  const {
    viewportRef,
    bottomRef,
    messagesContainerRef,
    showScrollButton,
    setHasNewMessages,
    scrollToBottom,
    handleScrollToBottom,
    isAtBottom,
  } = useChatScroll(isLoading);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      <ChatNudge
        show={!isOpen && showNudge}
        onOpen={() => { setIsOpen(true); setShowNudge(false); }}
        onDismiss={() => setShowNudge(false)}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={cn(
              "flex flex-col overflow-hidden rounded-xl bg-background border border-border-subtle shadow-xl",
              isMinimized ? "w-72" : "w-[400px] max-w-[95vw]"
            )}
            style={{ height: isMinimized ? "auto" : "600px" }}
          >
            <ChatHeader
              isMinimized={isMinimized}
              onToggleMinimize={() => setIsMinimized(!isMinimized)}
              onClose={() => setIsOpen(false)}
              onClear={clearChat}
            />

            {!isMinimized && (
              <>
                <QuickActions
                  visible={messages.length <= 1}
                  onSelect={(prompt) => {
                    setInput(prompt);
                    setTimeout(() => sendMessage(), 300);
                  }}
                />

                <div
                  ref={viewportRef}
                  className="flex-1 overflow-y-auto px-4 py-3"
                >
                  <div ref={messagesContainerRef} className="space-y-3">
                    {messages.map((msg) => (
                      <ChatMessage key={msg.id} message={msg} onCopy={copyMessage} />
                    ))}
                    <div ref={bottomRef} />
                  </div>
                </div>

                {showScrollButton && (
                  <button
                    onClick={handleScrollToBottom}
                    className="absolute bottom-16 right-4 flex h-7 w-7 items-center justify-center rounded-full bg-surface border border-border-subtle shadow-sm transition-all hover:bg-surface-hover"
                  >
                    <ArrowDown className="h-3.5 w-3.5 text-text-secondary" />
                  </button>
                )}

                <ChatInput
                  value={input}
                  onChange={setInput}
                  onSend={sendMessage}
                  isLoading={isLoading}
                  isMinimized={isMinimized}
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-all duration-200 hover:brightness-110 active:scale-95"
        >
          <MessageCircle className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
