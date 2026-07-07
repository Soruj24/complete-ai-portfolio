"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Inbox, Users } from "lucide-react";
import { useMessages } from "../hooks/use-messages";
import { STATUS_OPTIONS, SOURCE_OPTIONS, STAT_CARDS } from "../constants";
import { MessageList } from "./message-list";
import { MessageDetail } from "./message-detail";

export function MessagesPage() {
  const {
    filtered, stats, contacts, selectedMessage,
    loading, error, filters, setFilters,
    selectedId, setSelectedId,
    markAsRead, toggleFlag, refresh,
  } = useMessages();
  const [tab, setTab] = useState<"messages" | "contacts">("messages");

  const handleSelect = (id: string) => {
    setSelectedId(id);
    if (filtered.find((m) => m.id === id)?.status === "unread") markAsRead(id);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-text-tertiary">
        <p className="text-lg font-medium text-error">Failed to load messages</p>
        <p className="mt-1 text-sm">{error}</p>
        <button onClick={refresh} className="mt-4 flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-white transition-colors hover:bg-accent-hover">
          <RefreshCw size={14} /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Messages</h1>
          <p className="text-sm text-text-tertiary">Manage communications and inquiries</p>
        </div>
        <button onClick={refresh} className="flex items-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-hover">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {STAT_CARDS.map((card) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-border-primary bg-surface-primary p-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-hover text-accent">
                <card.icon size={18} />
              </div>
              <div>
                <p className="text-xs text-text-tertiary">{card.label}</p>
                <p className="text-lg font-semibold text-text-primary">
                  {stats ? stats[card.key as keyof typeof stats] : "--"}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-1 rounded-lg border border-border-primary bg-surface-primary p-1 w-fit">
        <button
          onClick={() => setTab("messages")}
          className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === "messages" ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"
          }`}
        ><Inbox size={16} /> Messages</button>
        <button
          onClick={() => setTab("contacts")}
          className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            tab === "contacts" ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"
          }`}
        ><Users size={16} /> Contact Requests ({contacts.length})</button>
      </div>

      {tab === "messages" ? (
        <div className="grid gap-4 lg:grid-cols-[1fr_400px]">
          <div>
            <div className="mb-4 flex flex-wrap gap-3">
              <input
                type="text"
                placeholder="Search messages..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="flex-1 min-w-[200px] rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent"
              />
              <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value as never })}
                className="rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent">
                {STATUS_OPTIONS.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
              </select>
              <select value={filters.source} onChange={(e) => setFilters({ ...filters, source: e.target.value as never })}
                className="rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent">
                {SOURCE_OPTIONS.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
              </select>
            </div>
            <MessageList messages={filtered} selectedId={selectedId} onSelect={handleSelect} onToggleFlag={toggleFlag} loading={loading} />
          </div>

          <AnimatePresence mode="wait">
            {selectedMessage && (
              <MessageDetail
                key={selectedMessage.id}
                message={selectedMessage}
                onClose={() => setSelectedId(null)}
                onToggleFlag={toggleFlag}
              />
            )}
            {!selectedMessage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center rounded-xl border border-dashed border-border-primary bg-surface-secondary py-20"
              >
                <div className="text-center text-text-tertiary">
                  <Inbox size={40} className="mx-auto mb-3 opacity-40" />
                  <p className="font-medium">Select a message</p>
                  <p className="text-sm">Click a message to view details</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="rounded-xl border border-border-primary bg-surface-primary">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-primary text-left text-xs text-text-tertiary">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Company</th>
                  <th className="px-4 py-3 font-medium">Budget</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Priority</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id} className="border-b border-border-primary transition-colors hover:bg-surface-hover">
                    <td className="px-4 py-3 font-medium text-text-primary">{c.name}</td>
                    <td className="px-4 py-3 text-text-secondary">{c.email}</td>
                    <td className="px-4 py-3 text-text-secondary">{c.company || "--"}</td>
                    <td className="px-4 py-3 text-text-secondary">{c.budget || "--"}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                        c.status === "new" ? "bg-accent/10 text-accent" :
                        c.status === "contacted" ? "bg-warning/10 text-warning" :
                        c.status === "qualified" ? "bg-success/10 text-success" :
                        "bg-surface-hover text-text-tertiary"
                      }`}>{c.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                        c.priority === "high" ? "bg-error/10 text-error" :
                        c.priority === "medium" ? "bg-warning/10 text-warning" :
                        "bg-surface-hover text-text-tertiary"
                      }`}>{c.priority}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-text-tertiary">{new Date(c.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
