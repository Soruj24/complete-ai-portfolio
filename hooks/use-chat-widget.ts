"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useGetMessagesQuery, useSendMessageMutation } from "@/lib/store/api/chat-api";
import { API_ENDPOINTS } from "@/shared/constants/api";

interface Message {
  _id: string;
  senderId: string;
  senderName: string;
  senderImage?: string;
  message: string;
  isAdmin: boolean;
  createdAt: string;
}

export function useChatWidget() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatMode, setChatMode] = useState<"human" | "ai">("ai");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: messagesData } = useGetMessagesQuery(session?.user?.id || "", {
    skip: !session || chatMode === "ai" || !isOpen,
    pollingInterval: 3000,
  });

  const [sendMessage] = useSendMessageMutation();

  const messages = chatMode === "ai"
    ? localMessages
    : (messagesData?.data as Message[]) || [];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !session) return;
    const msg = newMessage;
    setNewMessage("");
    setLoading(true);

    try {
      if (chatMode === "ai") {
        const tempId = Date.now().toString();
        setLocalMessages(prev => [...prev, {
          _id: tempId,
          senderId: session.user.id,
          senderName: session.user.name ?? "Anonymous",
          message: msg,
          isAdmin: false,
          createdAt: new Date().toISOString(),
        }]);

        const res = await fetch(API_ENDPOINTS.CHAT.AI, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: msg, history: [] }),
        });
        if (!res.ok) throw new Error("AI connection failed");

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let aiContent = "";
        const aiId = (Date.now() + 1).toString();
        setLocalMessages(prev => [...prev, {
          _id: aiId,
          senderId: "ai",
          senderName: "AI Assistant",
          message: "",
          isAdmin: true,
          createdAt: new Date().toISOString(),
        }]);

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            aiContent += decoder.decode(value, { stream: true });
            setLocalMessages(prev => prev.map(m => m._id === aiId ? { ...m, message: aiContent } : m));
          }
        }
      } else {
        await sendMessage({ receiverId: "", message: msg });
      }
    } catch (error) {
      console.error("Send failed:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  return {
    session, isOpen, setIsOpen, isMinimized, setIsMinimized,
    messages, newMessage, setNewMessage, loading, chatMode, setChatMode,
    scrollRef, handleSendMessage,
  };
}
