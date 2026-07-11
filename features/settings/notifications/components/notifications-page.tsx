"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCheck, X, Info, AlertTriangle, CheckCircle2, AlertOctagon, Inbox, Settings2 } from "lucide-react";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";

type NotificationType = "info" | "success" | "warning" | "error";
type NotificationSource = "system" | "security" | "analytics" | "social" | "content";

interface Notification {
  id: string;
  type: NotificationType;
  source: NotificationSource;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const TYPE_ICONS: Record<NotificationType, typeof Info> = { info: Info, success: CheckCircle2, warning: AlertTriangle, error: AlertOctagon };
const TYPE_COLORS: Record<NotificationType, string> = { info: "text-accent bg-accent/10", success: "text-success bg-success/10", warning: "text-warning bg-warning/10", error: "text-error bg-error/10" };
const SOURCE_FILTERS = ["all", "system", "security", "analytics", "content", "social"];

export function NotificationsPage() {
  const { data: response, isLoading } = useGetAdminResourceQuery({ resource: "notification-templates" });
  const allNotifications: Notification[] = response?.data ?? [];
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState<NotificationType | "all">("all");

  const allItems = notifications.length > 0 ? notifications : allNotifications;

  const filtered = useMemo(() => {
    let result = allItems;
    if (filter !== "all") result = result.filter((n) => n.source === filter);
    if (typeFilter !== "all") result = result.filter((n) => n.type === typeFilter);
    return result;
  }, [allItems, filter, typeFilter]);

  const unreadCount = allItems.filter((n) => !n.read).length;

  const markRead = (id: string) => setNotifications((prev) => {
    const current = prev.length > 0 ? prev : allNotifications;
    return current.map((n) => n.id === id ? { ...n, read: true } : n);
  });
  const markAllRead = () => setNotifications((prev) => {
    const current = prev.length > 0 ? prev : allNotifications;
    return current.map((n) => ({ ...n, read: true }));
  });
  const deleteNotification = (id: string) => setNotifications((prev) => {
    const current = prev.length > 0 ? prev : allNotifications;
    return current.filter((n) => n.id !== id);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Notifications</h1>
            <p className="text-sm text-text-tertiary">Stay updated with system events and alerts</p>
          </div>
          {unreadCount > 0 && (
            <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">{unreadCount} unread</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={markAllRead} className="flex items-center gap-1.5 rounded-lg border border-border-primary px-3 py-1.5 text-xs text-text-secondary transition-colors hover:bg-surface-hover">
            <CheckCheck size={14} /> Mark All Read
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-border-primary px-3 py-1.5 text-xs text-text-secondary transition-colors hover:bg-surface-hover">
            <Settings2 size={14} /> Settings
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {SOURCE_FILTERS.map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${filter === s ? "bg-accent text-white" : "bg-surface-hover text-text-secondary hover:text-text-primary"}`}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
        <div className="ml-auto flex gap-1">
          {(["all", "info", "success", "warning", "error"] as const).map((t) => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`rounded-lg px-2.5 py-1.5 text-xs transition-colors ${typeFilter === t ? (t === "all" ? "bg-accent text-white" : `${TYPE_COLORS[t]} font-medium`) : "text-text-tertiary hover:text-text-primary"}`}>
              {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4 rounded-xl border border-border-primary bg-surface-primary p-4 animate-pulse">
              <div className="h-9 w-9 rounded-lg bg-surface-hover shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-surface-hover rounded w-1/3" />
                <div className="h-3 bg-surface-hover rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-text-tertiary">
          <Inbox size={48} className="mb-4 opacity-40" />
          <p className="text-lg font-medium">No notifications</p>
          <p className="text-sm">All caught up! You have no {filter !== "all" ? filter : ""} notifications.</p>
        </div>
      ) : (
        <div className="space-y-1">
          <AnimatePresence>
            {filtered.map((n) => {
              const NIcon = TYPE_ICONS[n.type];
              return (
                <motion.div key={n.id} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  className={`group relative flex gap-4 rounded-xl border p-4 transition-colors ${n.read ? "border-border-primary bg-surface-primary" : "border-accent/20 bg-accent/[0.02]"}`}>
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${TYPE_COLORS[n.type]}`}>
                    <NIcon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={`text-sm ${n.read ? "text-text-primary" : "font-semibold text-text-primary"}`}>{n.title}</p>
                        <p className="mt-0.5 text-xs text-text-tertiary">{n.message}</p>
                      </div>
                      {!n.read && <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />}
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-[11px] text-text-tertiary">
                      <span>{n.time}</span>
                      <span className="rounded bg-surface-hover px-1.5 py-0.5">{n.source}</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-start gap-1">
                    {!n.read && <button onClick={() => markRead(n.id)} className="rounded-lg p-1 text-text-tertiary opacity-0 transition-opacity hover:bg-surface-hover hover:text-accent group-hover:opacity-100"><CheckCheck size={14} /></button>}
                    <button onClick={() => deleteNotification(n.id)} className="rounded-lg p-1 text-text-tertiary opacity-0 transition-opacity hover:bg-surface-hover hover:text-error group-hover:opacity-100"><X size={14} /></button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
