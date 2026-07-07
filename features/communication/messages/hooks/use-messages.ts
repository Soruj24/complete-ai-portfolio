"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { messageService } from "../services/message-service";
import type { Message, MessagesStats, ContactRequest, MessageFilterState } from "../types";

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<MessagesStats | null>(null);
  const [contacts, setContacts] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filters, setFilters] = useState<MessageFilterState>({ search: "", status: "all", source: "all", category: "" });

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [data, msgStats, contactData] = await Promise.all([
        messageService.getAll(),
        messageService.getStats(),
        Promise.resolve(messageService.getContactRequests()),
      ]);
      setMessages(data);
      setStats(msgStats);
      setContacts(contactData);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = useMemo(() => messageService.filter(messages, filters), [messages, filters]);
  const selectedMessage = useMemo(() => messages.find((m) => m.id === selectedId) ?? null, [messages, selectedId]);

  const markAsRead = useCallback(async (id: string) => {
    const updated = await messageService.markAsRead(id);
    setMessages((prev) => prev.map((m) => m.id === id ? updated : m));
  }, []);

  const toggleFlag = useCallback(async (id: string) => {
    const msg = messages.find((m) => m.id === id);
    if (!msg) return;
    const updated = await messageService.toggleFlag(id, msg);
    setMessages((prev) => prev.map((m) => m.id === id ? updated : m));
  }, [messages]);

  return {
    messages, filtered, stats, contacts, selectedMessage,
    loading, error, filters, setFilters,
    selectedId, setSelectedId,
    markAsRead, toggleFlag, refresh: fetchData,
  };
}
