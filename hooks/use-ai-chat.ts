"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import type { ChatMessage } from "@/types/chat";
import { sendChatMessage, readStream } from "@/lib/services/portfolio-chat";
import { buildWelcomeMessage, getGreeting } from "@/constants/chat";

export function useAiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showNudge, setShowNudge] = useState(false);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await sendChatMessage(input.trim(), messages);
      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader available");

      let accumulated = "";
      const botId = Date.now() + "-streaming";

      setMessages((prev) => [
        ...prev,
        { id: botId, role: "assistant", content: "", timestamp: new Date() },
      ]);

      await readStream(reader, (text) => {
        accumulated = text;
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last.id === botId) last.content = accumulated;
          return updated;
        });
      });
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "assistant", content: "Oops! I'm having trouble connecting right now. Please try again in a moment or email Soruj directly. 😊", timestamp: new Date() },
      ]);
      toast.error("Connection issue", { description: "I'll be back soon!" });
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  const sendQuick = useCallback((prompt: string) => {
    setInput(prompt);
  }, []);

  const clearChat = useCallback(() => {
    Swal.fire({
      title: "Start fresh?",
      text: "This will clear the entire conversation.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, clear it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    }).then((result) => {
      if (!result.isConfirmed) return;
      setMessages([
        { id: "welcome", role: "assistant", content: `${getGreeting()}! \n\nI'm Soruj AI, ready for a new chat!`, timestamp: new Date() },
      ]);
      localStorage.removeItem("portfolioChat");
      toast.success("Chat cleared", { description: "Started fresh!" });
    });
  }, []);

  const copyMessage = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied!", { description: "Message copied to clipboard" });
    } catch {
      toast.error("Copy failed", { description: "Try selecting the text manually" });
    }
  }, []);

  useEffect(() => {
    const welcome = buildWelcomeMessage();
    const saved = localStorage.getItem("portfolioChat");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const restored = parsed.map((m: ChatMessage) => ({ ...m, timestamp: new Date(m.timestamp) }));
        setMessages(restored.length > 0 ? restored : [welcome]);
        return;
      } catch { /* fall through to default */ }
    }
    setMessages([welcome]);
  }, []);

  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem("portfolioChat", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (!isOpen || isMinimized) return;
    setTimeout(() => scrollTimeout(), 200);
  }, [isOpen, isMinimized]);

  useEffect(() => {
    if (!isOpen && messages.length <= 1) {
      const timer = setTimeout(() => setShowNudge(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (showNudge) {
      const timer = setTimeout(() => setShowNudge(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [showNudge]);

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

  useEffect(() => {
    const handleSpecialOpen = () => {
      setIsOpen(true);
      setIsMinimized(false);
      const contactMsg: ChatMessage = {
        id: `contact-ack-${Date.now()}`,
        role: "assistant",
        content: "I saw you just sent a message through the contact form! Excellent choice. \n\nWhile Soruj reviews your message, is there anything specific you'd like to know about his projects or technical expertise?",
        timestamp: new Date(),
      };
      setMessages((prev) => {
        const lastMsg = prev[prev.length - 1];
        if (lastMsg?.content.includes("contact form")) return prev;
        return [...prev, contactMsg];
      });
    };
    window.addEventListener("openSorujChat", handleSpecialOpen);
    return () => window.removeEventListener("openSorujChat", handleSpecialOpen);
  }, []);

  function scrollTimeout() {
    // Placeholder — the scroll hook handles this
  }

  return {
    isOpen, setIsOpen,
    isMinimized, setIsMinimized,
    input, setInput,
    messages, setMessages,
    isLoading, showNudge, setShowNudge,
    sendMessage, sendQuick, clearChat, copyMessage,
  };
}
