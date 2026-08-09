"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search, Mail, MailOpen, Archive, Trash2, Reply, ChevronLeft,
  Inbox, Loader2, RefreshCw, Filter, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "pending" | "read" | "replied";
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

type FilterType = "all" | "unread" | "read" | "replied";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function getInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-blue-500",
  read: "bg-emerald-500",
  replied: "bg-purple-500",
};

export function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact");
      if (!res.ok) return;
      const json = await res.json();
      setMessages(json.data || []);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const filtered = messages.filter((m) => {
    if (filter === "unread" && m.status !== "pending") return false;
    if (filter === "read" && m.status !== "read") return false;
    if (filter === "replied" && m.status !== "replied") return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const selected = messages.find((m) => m._id === selectedId) || null;

  const handleAction = useCallback(
    async (id: string, action: "read" | "unread" | "archive" | "delete") => {
      setActionLoading(id);
      try {
        if (action === "delete") {
          await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
          setMessages((prev) => prev.filter((m) => m._id !== id));
          if (selectedId === id) setSelectedId(null);
        } else {
          await fetch("/api/contact", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, action }),
          });
          setMessages((prev) =>
            prev.map((m) => {
              if (m._id !== id) return m;
              if (action === "read") return { ...m, status: "read" as const };
              if (action === "unread") return { ...m, status: "pending" as const };
              if (action === "archive") return { ...m, archived: true };
              return m;
            })
          );
        }
      } finally {
        setActionLoading(null);
      }
    },
    [selectedId]
  );

  const handleSelect = useCallback(
    (id: string) => {
      setSelectedId(id);
      const msg = messages.find((m) => m._id === id);
      if (msg && msg.status === "pending") {
        handleAction(id, "read");
      }
    },
    [messages, handleAction]
  );

  const unreadCount = messages.filter((m) => m.status === "pending" && !m.archived).length;

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="shrink-0 p-4 pb-3 border-b border-border-subtle">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h1 className="text-lg font-semibold text-text-primary">Messages</h1>
            <p className="text-[12px] text-text-tertiary">
              {unreadCount > 0 ? `${unreadCount} unread message${unreadCount !== 1 ? "s" : ""}` : "All caught up"}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchMessages} disabled={loading} className="h-8 text-[12px] gap-1.5">
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-tertiary" />
            <Input
              placeholder="Search messages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-[12px] rounded-md border-border-subtle bg-surface"
            />
          </div>

          <div className="flex gap-1 rounded-md border border-border-subtle bg-surface p-0.5">
            {(["all", "unread", "read", "replied"] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-2.5 py-1 rounded-sm text-[11px] font-medium transition-colors capitalize",
                  filter === f ? "bg-accent text-accent-foreground" : "text-text-tertiary hover:text-text-primary"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex">
        <div className={cn(
          "w-full md:w-96 shrink-0 border-r border-border-subtle overflow-y-auto",
          selected && "hidden md:block"
        )}>
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-accent" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-text-tertiary">
              <Inbox className="h-10 w-10 mb-3 opacity-40" />
              <p className="text-[13px] font-medium">No messages found</p>
              <p className="text-[11px] mt-1">
                {search ? "Try a different search" : filter !== "all" ? "No messages in this filter" : "Your inbox is empty"}
              </p>
            </div>
          ) : (
            <div>
              {filtered.map((msg) => (
                <button
                  key={msg._id}
                  onClick={() => handleSelect(msg._id)}
                  className={cn(
                    "w-full text-left p-3 border-b border-border-subtle hover:bg-surface-hover transition-colors",
                    selectedId === msg._id && "bg-accent/5 border-l-2 border-l-accent",
                    msg.status === "pending" && "bg-accent/[0.02]"
                  )}
                >
                  <div className="flex items-start gap-2.5">
                    <div className={cn("h-8 w-8 rounded-full flex items-center justify-center text-[12px] font-semibold text-white shrink-0", STATUS_COLORS[msg.status])}>
                      {getInitial(msg.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={cn("text-[12px] truncate", msg.status === "pending" ? "font-semibold text-text-primary" : "font-medium text-text-secondary")}>
                          {msg.name}
                        </span>
                        <span className="text-[10px] text-text-tertiary shrink-0">{formatDate(msg.createdAt)}</span>
                      </div>
                      <p className="text-[11px] text-text-tertiary truncate mt-0.5">{msg.email}</p>
                      <p className={cn("text-[12px] truncate mt-0.5", msg.status === "pending" ? "font-medium text-text-primary" : "text-text-secondary")}>
                        {msg.subject}
                      </p>
                      <p className="text-[11px] text-text-tertiary truncate mt-0.5">{msg.message}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={cn("flex-1 min-w-0", !selected && "hidden md:flex")}>
          {selected ? (
            <div className="h-full flex flex-col">
              <div className="shrink-0 flex items-center gap-2 p-3 border-b border-border-subtle">
                <Button variant="ghost" size="icon" className="h-7 w-7 md:hidden" onClick={() => setSelectedId(null)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex-1" />
                <Button
                  variant="ghost" size="sm" onClick={() => handleAction(selected._id, selected.status === "pending" ? "read" : "unread")}
                  disabled={actionLoading === selected._id}
                  className="h-7 text-[11px] gap-1"
                >
                  {selected.status === "pending" ? <MailOpen className="h-3 w-3" /> : <Mail className="h-3 w-3" />}
                  {selected.status === "pending" ? "Mark Read" : "Mark Unread"}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleAction(selected._id, "archive")} className="h-7 text-[11px] gap-1">
                  <Archive className="h-3 w-3" /> Archive
                </Button>
                <Button variant="ghost" size="sm" onClick={() => window.open(`mailto:${selected.email}?subject=Re: ${selected.subject}`)} className="h-7 text-[11px] gap-1">
                  <Reply className="h-3 w-3" /> Reply
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleAction(selected._id, "delete")} className="h-7 text-[11px] gap-1 text-red-500 hover:text-red-500">
                  <Trash2 className="h-3 w-3" /> Delete
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <div className="max-w-2xl">
                  <h2 className="text-[15px] font-semibold text-text-primary mb-3">{selected.subject}</h2>

                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border-subtle">
                    <div className={cn("h-10 w-10 rounded-full flex items-center justify-center text-[14px] font-semibold text-white", STATUS_COLORS[selected.status])}>
                      {getInitial(selected.name)}
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-text-primary">{selected.name}</p>
                      <p className="text-[11px] text-text-tertiary">{selected.email}</p>
                      <p className="text-[10px] text-text-tertiary">
                        {new Date(selected.createdAt).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="text-[13px] text-text-secondary leading-relaxed whitespace-pre-wrap">
                    {selected.message}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-text-tertiary">
              <Mail className="h-12 w-12 mb-3 opacity-30" />
              <p className="text-[13px] font-medium">Select a message to read</p>
              <p className="text-[11px] mt-1">Choose from the list on the left</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
