"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAiChat } from "@/hooks/use-ai-chat";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import { ChatNudge } from "@/components/portfolio/chat/chat-nudge";
import { ChatHeader } from "@/components/portfolio/chat/chat-header";
import { ChatMessage } from "@/components/portfolio/chat/chat-message";
import { ChatInput } from "@/components/portfolio/chat/chat-input";
import { QuickActions } from "@/components/portfolio/chat/quick-actions";

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
              "flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200/50 dark:bg-slate-900 dark:ring-slate-700/50",
              isMinimized ? "w-80" : "w-[440px] max-w-[95vw]"
            )}
            style={{ height: isMinimized ? "auto" : "680px" }}
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
                  className="flex-1 overflow-y-auto px-4 py-4"
                >
                  <div ref={messagesContainerRef} className="space-y-4">
                    {messages.map((msg) => (
                      <ChatMessage key={msg.id} message={msg} onCopy={copyMessage} />
                    ))}
                    <div ref={bottomRef} />
                  </div>
                </div>

                {showScrollButton && (
                  <button
                    onClick={handleScrollToBottom}
                    className="absolute bottom-20 right-6 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-gray-200 transition-all hover:bg-gray-50 dark:bg-slate-800 dark:ring-slate-700"
                  >
                    <ArrowDown className="h-4 w-4 text-gray-600 dark:text-slate-300" />
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
          className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-200 transition-all hover:scale-105 hover:bg-blue-700 active:scale-95 dark:shadow-none"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
