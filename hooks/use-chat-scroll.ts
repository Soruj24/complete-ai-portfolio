"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { SCROLL_THRESHOLD } from "@/constants/chat";

export function useChatScroll(isLoading: boolean) {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const isUserScrolledUp = useRef(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const isAtBottom = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return true;
    const distance = viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight;
    return distance <= SCROLL_THRESHOLD;
  }, []);

  const scrollToBottom = useCallback(
    (behavior: "smooth" | "auto" = "smooth") => {
      const viewport = viewportRef.current;
      if (viewport && behavior === "auto") {
        viewport.scrollTop = viewport.scrollHeight + 100;
      } else if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior, block: "end" });
      }
      isUserScrolledUp.current = false;
      setShowScrollButton(false);
      setHasNewMessages(false);
    },
    []
  );

  const handleScroll = useCallback(() => {
    const atBottom = isAtBottom();
    isUserScrolledUp.current = !atBottom;
    setShowScrollButton(!atBottom);
    if (atBottom) setHasNewMessages(false);
  }, [isAtBottom]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(() => {
      if (!isUserScrolledUp.current) scrollToBottom(isLoading ? "auto" : "smooth");
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [isLoading, scrollToBottom]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (viewport) {
      viewport.addEventListener("scroll", handleScroll);
      return () => viewport.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  return {
    viewportRef,
    bottomRef,
    messagesContainerRef,
    isUserScrolledUp,
    showScrollButton,
    hasNewMessages,
    setHasNewMessages,
    scrollToBottom,
    isAtBottom,
    handleScrollToBottom: () => { scrollToBottom("smooth"); isUserScrolledUp.current = false; },
  };
}
