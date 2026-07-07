"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCheck, X, Info, AlertTriangle, CheckCircle2, AlertOctagon, Inbox, RefreshCw, Settings2, MoreHorizontal } from "lucide-react";

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

const ALL: Notification[] = [
  { id: "n1", type: "info", source: "system", title: "Database backup completed", message: "Weekly backup of all databases finished successfully. Size: 2.4 GB.", time: "2 min ago", read: false },
  { id: "n2", type: "warning", source: "security", title: "Unusual login attempt detected", message: "Failed login attempt from IP 203.0.113.42. 2 more attempts before account lock.", time: "15 min ago", read: false },
  { id: "n3", type: "success", source: "content", title: "New blog post published", message: "Your article 'Building Scalable Microservices' has been published and is live.", time: "1 hour ago", read: false },
  { id: "n4", type: "info", source: "analytics", title: "Traffic spike detected", message: "Your portfolio received 2,847 visits in the last hour — 340% above average.", time: "2 hours ago", read: false },
  { id: "n5", type: "error", source: "system", title: "SSL certificate expiring", message: "SSL certificate for johndoe.dev expires in 7 days. Renew immediately.", time: "3 hours ago", read: false },
  { id: "n6", type: "info", source: "social", title: "New GitHub star", message: "Your project 'portfolio-cms' received 5 new stars. Total: 342 stars.", time: "5 hours ago", read: true },
  { id: "n7", type: "success", source: "security", title: "Security scan completed", message: "Full security audit completed. 0 critical, 2 medium vulnerabilities found.", time: "8 hours ago", read: true },
  { id: "n8", type: "warning", source: "system", title: "Disk space warning", message: "Server disk usage at 85%. Consider cleaning up old logs and backups.", time: "1 day ago", read: true },
  { id: "n9", type: "info", source: "analytics", title: "Monthly report ready", message: "June 2026 analytics report is ready to view. 45.2K total visits.", time: "2 days ago", read: true },
  { id: "n10", type: "info", source: "content", title: "New contact request", message: "Alice Johnson submitted a contact form regarding a freelance project opportunity.", time: "2 days ago", read: true },
];

const TYPE_ICONS: Record<NotificationType, typeof Info> = { info: Info, success: CheckCircle2, warning: AlertTriangle, error: AlertOctagon };
const TYPE_COLORS: Record<NotificationType, string> = { info: "text-accent bg-accent/10", success: "text-success bg-success/10", warning: "text-warning bg-warning/10", error: "text-error bg-error/10" };
const SOURCE_FILTERS = ["all", "system", "security", "analytics", "content", "social"];

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(ALL);
  const [filter, setFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState<NotificationType | "all">("all");

  const filtered = useMemo(() => {
    let result = notifications;
    if (filter !== "all") result = result.filter((n) => n.source === filter);
    if (typeFilter !== "all") result = result.filter((n) => n.type === typeFilter);
    return result;
  }, [notifications, filter, typeFilter]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markRead = (id: string) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const deleteNotification = (id: string) => setNotifications((prev) => prev.filter((n) => n.id !== id));

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

      {filtered.length === 0 ? (
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
