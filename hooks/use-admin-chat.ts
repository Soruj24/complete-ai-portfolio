"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { ChatUser, ChatMessage } from "@/shared/types";
import { useGetAdminChatUsersQuery, useGetMessagesQuery, useSendMessageMutation } from "@/lib/store/api/chat-api";

export function useAdminChat() {
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: usersData, isLoading: usersLoading } = useGetAdminChatUsersQuery(undefined, {
    pollingInterval: 10000,
  });

  const { data: messagesData } = useGetMessagesQuery(selectedUser?._id || "", {
    skip: !selectedUser,
    pollingInterval: 3000,
  });

  const [sendMessage] = useSendMessageMutation();

  const users = (usersData?.data as ChatUser[]) || [];
  const messages = (messagesData?.data as ChatMessage[]) || [];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleChatUserSelected = () => {
      const userId = localStorage.getItem("selectedChatUser");
      if (!userId) return;
      const user = users.find((u) => u._id === userId);
      if (user) {
        setSelectedUser(user);
        localStorage.removeItem("selectedChatUser");
      }
    };
    window.addEventListener("chatUserSelected", handleChatUserSelected);
    return () => window.removeEventListener("chatUserSelected", handleChatUserSelected);
  }, [users]);

  const handleSendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;
    setLoading(true);
    try {
      await sendMessage({ receiverId: selectedUser._id, message: newMessage }).unwrap();
      setNewMessage("");
    } catch {
      console.error("Failed to send message");
    }
    setLoading(false);
  }, [newMessage, selectedUser, sendMessage]);

  const filteredUsers = users.filter(
    (u) => u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleQuickReply = (reply: string) => {
    setNewMessage(reply);
    setShowQuickReplies(false);
  };

  return {
    users, selectedUser, setSelectedUser,
    messages, newMessage, setNewMessage,
    loading, usersLoading, searchQuery, setSearchQuery,
    showQuickReplies, setShowQuickReplies,
    scrollRef, filteredUsers,
    handleSendMessage, handleQuickReply,
  };
}
