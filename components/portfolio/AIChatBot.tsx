"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  User as UserIcon,
  Bot,
  Minimize2,
  Maximize2,
  Trash2,
  Copy,
  HelpCircle,
  Briefcase,
  FileText,
  Mail,
  Github,
  ArrowDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const QUICK_ACTIONS = [
  {
    label: "Projects",
    icon: Briefcase,
    prompt: "Show me your best projects",
  },
  {
    label: "Hire Me",
    icon: Sparkles,
    prompt: "I want to hire you for a project. What are your rates and availability?",
  },
  {
    label: "Contact",
    icon: Mail,
    prompt: "How can I contact you directly?",
  },
  { 
    label: "Skills", 
    icon: HelpCircle, 
    prompt: "What technologies do you specialize in?" 
  },
];

export function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scrolling state
  const isUserScrolledUp = useRef(false);
  const SCROLL_THRESHOLD = 50; // px from bottom to consider "at bottom"

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(
    (behavior: "smooth" | "auto" = "smooth") => {
      const viewport = viewportRef.current;
      
      if (viewport) {
        if (behavior === "auto") {
          viewport.scrollTop = viewport.scrollHeight + 100; // Extra padding
        } else if (bottomRef.current) {
          bottomRef.current.scrollIntoView({ behavior, block: "end" });
        }
      }
      
      // Reset states
      isUserScrolledUp.current = false;
      setShowScrollButton(false);
      setHasNewMessages(false);
    },
    []
  );

  const isAtBottom = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return true;
    
    const scrollHeight = viewport.scrollHeight;
    const scrollTop = viewport.scrollTop;
    const clientHeight = viewport.clientHeight;
    
    // Check if we are within the threshold of the bottom
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;
    return distanceToBottom <= SCROLL_THRESHOLD;
  }, []);

  const handleScroll = useCallback(() => {
    const atBottom = isAtBottom();
    isUserScrolledUp.current = !atBottom;
    setShowScrollButton(!atBottom);
    
    // If user scrolled back to bottom, clear unread state
    if (atBottom) {
      setHasNewMessages(false);
    }
  }, [isAtBottom]);

  // ResizeObserver to handle content height changes (like streaming)
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      if (!isUserScrolledUp.current) {
        scrollToBottom(isLoading ? "auto" : "smooth");
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [isLoading, scrollToBottom]);

  // Auto-scroll when appropriate
  useEffect(() => {
    if (!isOpen || isMinimized) return;

    // If user is at bottom, auto-scroll to show new content
    const shouldScroll = !isUserScrolledUp.current;

    if (shouldScroll) {
      scrollToBottom(isLoading ? "auto" : "smooth");
    } else if (messages.length > 1) {
      // If we didn't scroll but there's a new message, mark as unread
      setHasNewMessages(true);
    }
  }, [messages.length, isLoading, isOpen, isMinimized, scrollToBottom]);

  // Reset on open/maximize or new user message
  useEffect(() => {
    if (isOpen && !isMinimized) {
      isUserScrolledUp.current = false;
      setTimeout(() => scrollToBottom("auto"), 100);
    }
  }, [isOpen, isMinimized, scrollToBottom]);

  // Attach scroll listener
  useEffect(() => {
    const viewport = viewportRef.current;
    if (viewport) {
      viewport.addEventListener("scroll", handleScroll);
      return () => viewport.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  // Nudge after 8 seconds
  useEffect(() => {
    if (!isOpen && messages.length <= 1) {
      const timer = setTimeout(() => setShowNudge(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length]);

  // Hide nudge after 10 seconds of showing
  useEffect(() => {
    if (showNudge) {
      const timer = setTimeout(() => setShowNudge(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [showNudge]);

  // Auto-focus input
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, isMinimized]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        if (isMinimized) setIsOpen(false);
        else setIsMinimized(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, isMinimized]);

  // Specialized open event from Contact form
  useEffect(() => {
    const handleSpecialOpen = () => {
      setIsOpen(true);
      setIsMinimized(false);
      
      // Add a specialized greeting if they just sent a message
      const contactMsg: Message = {
        id: `contact-ack-${Date.now()}`,
        role: "assistant",
        content: "I saw you just sent a message through the contact form! Excellent choice. 🚀\n\nWhile Soruj reviews your message, is there anything specific you'd like to know about his projects or technical expertise?",
        timestamp: new Date(),
      };
      
      setMessages(prev => {
        // Only add if not already added recently
        const lastMsg = prev[prev.length - 1];
        if (lastMsg?.content.includes("contact form")) return prev;
        return [...prev, contactMsg];
      });
    };

    window.addEventListener("openNexusChat", handleSpecialOpen);
    return () => window.removeEventListener("openNexusChat", handleSpecialOpen);
  }, []);

  // Load welcome message & saved chat
  useEffect(() => {
    const hour = new Date().getHours();
    const greeting =
      hour < 12
        ? "Good morning"
        : hour < 18
          ? "Good afternoon"
          : "Good evening";

    const welcome: Message = {
      id: "welcome",
      role: "assistant",
      content: `${greeting}! 👋\n\nI'm **Nexus**, Soruj's friendly AI assistant.\n\nI can help you explore his experience, projects, and skills. You can also send a direct message through the **Contact Form** below or ask me how to get in touch!`,
      timestamp: new Date(),
    };

    const saved = localStorage.getItem("portfolioChat");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const restored = parsed.map((m: Message) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }));
        setMessages(restored.length > 0 ? restored : [welcome]);
        return;
      } catch (err) {
        console.error("Failed to load chat:", err);
      }
    }
    setMessages([welcome]);
  }, []);

  // Persist chat
  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem("portfolioChat", JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    isUserScrolledUp.current = false; // Always follow user message

    try {
      const res = await fetch("/api/chat/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input.trim(),
          history: messages
            .slice(-8)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error("Failed to get response");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";
      const botId = Date.now() + "-streaming";

      setMessages((prev) => [
        ...prev,
        { id: botId, role: "assistant", content: "", timestamp: new Date() },
      ]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        accumulated += decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last.id === botId) last.content = accumulated;
          return updated;
        });

        // Follow streaming if near bottom
        if (isAtBottom()) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => scrollToBottom("auto"));
          });
        }
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content:
            "Oops! I'm having trouble connecting right now. Please try again in a moment or email Soruj directly. 😊",
          timestamp: new Date(),
        },
      ]);
      toast.error("Connection issue", { description: "I'll be back soon!" });
    } finally {
      setIsLoading(false);
      isUserScrolledUp.current = false;
    }
  };

  const sendQuick = (prompt: string) => {
    setInput(prompt);
    setTimeout(() => sendMessage(), 300);
  };

  const clearChat = () => {
    if (!confirm("Start fresh? This will clear the entire conversation."))
      return;

    const hour = new Date().getHours();
    const greeting =
      hour < 12
        ? "Good morning"
        : hour < 18
          ? "Good afternoon"
          : "Good evening";

    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: `${greeting}! 👋\n\nI'm Nexus, ready for a new chat!`,
        timestamp: new Date(),
      },
    ]);
    localStorage.removeItem("portfolioChat");
    toast.success("Chat cleared", { description: "Started fresh!" });
  };

  const copyMessage = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied!", { description: "Message copied to clipboard" });
    } catch {
      toast.error("Copy failed", {
        description: "Try selecting the text manually",
      });
    }
  };

  const handleScrollToBottom = () => {
    scrollToBottom("smooth");
    isUserScrolledUp.current = false;
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {/* Friendly nudge */}
        {!isOpen && showNudge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => {
              setIsOpen(true);
              setShowNudge(false);
            }}
            className="cursor-pointer select-none mb-2 flex max-w-[240px] items-center gap-3 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-4 text-white shadow-2xl"
          >
            <Sparkles className="h-6 w-6" />
            <div>
              <p className="font-bold">Hi there!</p>
              <p className="text-sm opacity-90">Tap to chat with Nexus 😊</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNudge(false);
              }}
              className="ml-auto"
            >
              <X className="h-5 w-5 opacity-70" />
            </button>
          </motion.div>
        )}

        {/* Main Chat Window */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={cn(
              "flex flex-col overflow-hidden rounded-3xl bg-white/95 shadow-2xl backdrop-blur-xl dark:bg-slate-900/95",
              "border border-gray-200/50 dark:border-slate-700/50",
              isMinimized ? "w-80" : "w-[440px] max-w-[95vw]"
            )}
            style={{ height: isMinimized ? "auto" : "720px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 p-5 text-white">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-white/20 p-3">
                  <Bot className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Nexus AI</h3>
                  <p className="text-sm opacity-90">
                    Soruj's friendly assistant
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 text-white hover:bg-white/20"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  {isMinimized ? (
                    <Maximize2 className="h-5 w-5" />
                  ) : (
                    <Minimize2 className="h-5 w-5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 text-white hover:bg-white/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                <div className="relative flex-1 overflow-hidden">
                  <ScrollArea className="h-full" viewportRef={viewportRef}>
                    <div className="space-y-8 p-6 pb-24" ref={messagesContainerRef}>
                      {/* Welcome Screen */}
                      {messages.length <= 1 && (
                        <div className="flex flex-col items-center text-center">
                          <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="mb-8 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 p-10 dark:from-blue-900/30 dark:to-purple-900/30"
                          >
                            <Bot className="h-24 w-24 text-blue-600 dark:text-blue-400" />
                          </motion.div>

                          <h2 className="mb-4 text-3xl font-black text-gray-900 dark:text-white">
                            Hello! I'm Nexus
                          </h2>
                          <p className="mb-12 max-w-md text-lg leading-relaxed text-gray-600 dark:text-slate-300">
                            I'm here to help you explore Soruj's portfolio. Ask
                            me about his projects, experience, skills, or how to
                            get in touch!
                          </p>

                          <div className="w-full">
                            <p className="mb-5 text-left text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-slate-500">
                              Get started quickly
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                              {QUICK_ACTIONS.map((action) => (
                                <button
                                  key={action.label}
                                  onClick={() => sendQuick(action.prompt)}
                                  className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center transition-all hover:border-blue-500 hover:bg-blue-50 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700"
                                >
                                  <action.icon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                                  <span className="font-bold text-gray-800 dark:text-slate-200">
                                    {action.label}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Messages */}
                      {messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={cn(
                            "flex gap-4",
                            msg.role === "user" && "flex-row-reverse"
                          )}
                        >
                          <div
                            className={cn(
                              "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
                              msg.role === "user"
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                                : "bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600 dark:from-blue-900/50 dark:to-purple-900/50"
                            )}
                          >
                            {msg.role === "user" ? (
                              <UserIcon className="h-6 w-6" />
                            ) : (
                              <Bot className="h-6 w-6" />
                            )}
                          </div>

                          <div
                            className={cn(
                              "max-w-[85%] rounded-3xl px-6 py-4 text-base leading-relaxed shadow-sm",
                              msg.role === "user"
                                ? "rounded-br-none bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                                : "rounded-bl-none bg-gray-100 text-gray-800 dark:bg-slate-800 dark:text-slate-200"
                            )}
                          >
                            <div className="prose prose-base dark:prose-invert max-w-none">
                              <ReactMarkdown>
                                {msg.content}
                              </ReactMarkdown>
                            </div>

                            {msg.role === "assistant" && (
                              <button
                                onClick={() => copyMessage(msg.content)}
                                className="mt-4 flex items-center gap-1 text-sm opacity-70 hover:opacity-100"
                              >
                                <Copy className="h-4 w-4" /> Copy
                              </button>
                            )}
                          </div>
                        </motion.div>
                      ))}

                      {/* Typing Indicator */}
                      {isLoading && (
                        <div className="flex gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100">
                            <Bot className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="rounded-3xl bg-gray-100 px-6 py-4 dark:bg-slate-800">
                            <div className="flex items-center gap-3">
                              <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="h-3 w-3 rounded-full bg-blue-500"
                              />
                              <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 0.8,
                                  delay: 0.2,
                                }}
                                className="h-3 w-3 rounded-full bg-blue-500"
                              />
                              <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 0.8,
                                  delay: 0.4,
                                }}
                                className="h-3 w-3 rounded-full bg-blue-500"
                              />
                              <span className="ml-2 text-gray-600 dark:text-slate-400">
                                Nexus is typing...
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Anchor for scrolling */}
                      <div ref={bottomRef} className="h-px w-full" />
                    </div>
                  </ScrollArea>

                  {/* Scroll to bottom button */}
                  <AnimatePresence>
                    {showScrollButton && (
                      <motion.button
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        onClick={handleScrollToBottom}
                        className="absolute bottom-20 right-6 flex items-center gap-2 rounded-full border border-gray-200 bg-white/90 px-4 py-2.5 shadow-xl backdrop-blur-md hover:bg-white dark:border-slate-700 dark:bg-slate-800/90 dark:hover:bg-slate-800"
                      >
                        <div className="relative">
                          <ArrowDown className="h-4 w-4 text-blue-600" />
                          {hasNewMessages && (
                            <span className="absolute -right-1 -top-1 flex h-2 w-2">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-semibold text-gray-700 dark:text-slate-200">
                          {hasNewMessages ? "New messages" : "Scroll to bottom"}
                        </span>
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                {/* Input Area */}
                <div className="border-t border-gray-200 bg-gray-50 p-6 dark:border-slate-700 dark:bg-slate-900">
                  <div className="flex gap-3">
                    <Input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      placeholder="Ask me anything... 😊"
                      className="h-14 rounded-2xl border-2 border-gray-300 bg-white px-5 text-base focus:border-blue-500 dark:border-slate-600"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!input.trim() || isLoading}
                      className="h-14 w-14 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-0 hover:from-blue-700 hover:to-purple-700 disabled:opacity-60"
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            ease: "linear",
                          }}
                        >
                          <Send className="h-6 w-6" />
                        </motion.div>
                      ) : (
                        <Send className="h-6 w-6" />
                      )}
                    </Button>
                  </div>

                  <div className="mt-5 flex items-center justify-between text-sm text-gray-500">
                    <button
                      onClick={clearChat}
                      className="flex items-center gap-2 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" /> Clear chat
                    </button>
                    <button
                      onClick={() => sendQuick("How does this chat work?")}
                      className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                    >
                      <HelpCircle className="h-4 w-4" /> Help
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
          setShowNudge(false);
        }}
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-full shadow-2xl transition-all duration-300",
          isOpen
            ? "bg-white text-blue-600 dark:bg-slate-800"
            : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat with Nexus AI"}
      >
        {isOpen ? (
          <X className="h-9 w-9" />
        ) : (
          <MessageCircle className="h-9 w-9" />
        )}

        {/* Unread badge */}
        {!isOpen && messages.length > 1 && (
          <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white shadow-lg">
            {messages.length - 1 > 99 ? "99+" : messages.length - 1}
          </span>
        )}
      </motion.button>
    </div>
  );
}

export default AIChatBot;
