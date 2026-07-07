"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ScrollText, Search, Filter, Download, RefreshCw, Terminal, AlertTriangle, XCircle, Info } from "lucide-react";

type LogLevel = "info" | "warn" | "error" | "debug";
type LogSource = "system" | "api" | "database" | "auth" | "cron" | "email";

interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  source: LogSource;
  message: string;
  details?: string;
  ip?: string;
  userId?: string;
}

const generateLogs = (): LogEntry[] => {
  const messages: Record<LogSource, string[]> = {
    system: ["Server health check passed", "Memory usage: 4.2/16 GB (26%)", "CPU load: 0.45 (idle)", "Process restarted: pm2", "Node.js v20.11.0 detected", "Backup cron job initialized"],
    api: ["GET /api/projects 200 45ms", "POST /api/messages 201 120ms", "GET /api/users 401 Unauthorized", "PUT /api/settings 200 30ms", "DELETE /api/blogs 204 15ms", "Rate limit exceeded for IP 192.168.1.100"],
    database: ["Query executed: SELECT * FROM projects (12ms)", "Connection pool: 3/10 active", "Slow query detected: 2.3s (projects table)", "PostgreSQL 16.2 connected", "Migration 042 completed successfully", "Index rebuild on projects.status"],
    auth: ["User login successful: admin@example.com", "Failed login attempt: unknown@test.com", "Session created: user_8472", "Token refreshed: user_4231", "Password reset requested: user_7843", "2FA verification passed: user_8472"],
    cron: ["Daily backup started", "Weekly report generated", "Cache purge completed", "Sitemap regenerated", "Email digest sent to 142 subscribers", "Stale sessions cleaned (23 removed)"],
    email: ["Contact form submitted by Alice Johnson", "Newsletter sent: 1,234 delivered, 12 bounces", "Password reset email sent to user@example.com", "Welcome email queued for new user", "Email delivery failed: invalid domain", "Weekly digest prepared"],
  };
  const entries: LogEntry[] = [];
  const levels: LogLevel[] = ["info", "info", "info", "warn", "error", "debug"];
  const sources = ["system", "api", "database", "auth", "cron", "email"] as LogSource[];

  for (let i = 0; i < 120; i++) {
    const source = sources[i % sources.length];
    const msgs = messages[source];
    entries.push({
      id: `log-${i + 1}`,
      timestamp: new Date(Date.now() - i * 300000 - Math.random() * 300000).toISOString(),
      level: levels[i % levels.length],
      source,
      message: msgs[i % msgs.length],
      ip: i % 3 === 0 ? `192.168.1.${Math.floor(Math.random() * 255)}` : undefined,
      userId: i % 4 === 0 ? `user_${Math.floor(Math.random() * 9000 + 1000)}` : undefined,
    });
  }
  return entries;
};

const ALL_LOGS = generateLogs();

const LEVEL_CONFIG: Record<LogLevel, { icon: typeof Info; color: string; bg: string }> = {
  info: { icon: Info, color: "text-accent", bg: "bg-accent/10" },
  warn: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10" },
  error: { icon: XCircle, color: "text-error", bg: "bg-error/10" },
  debug: { icon: Terminal, color: "text-text-tertiary", bg: "bg-surface-hover" },
};

const SOURCES: LogSource[] = ["system", "api", "database", "auth", "cron", "email"];

export function LogsPage() {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<LogLevel | "all">("all");
  const [sourceFilter, setSourceFilter] = useState<LogSource | "all">("all");
  const [autoRefresh, setAutoRefresh] = useState(true);

  const filtered = useMemo(() => {
    let result = ALL_LOGS;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((l) => l.message.toLowerCase().includes(q) || l.id.includes(q));
    }
    if (levelFilter !== "all") result = result.filter((l) => l.level === levelFilter);
    if (sourceFilter !== "all") result = result.filter((l) => l.source === sourceFilter);
    return result;
  }, [search, levelFilter, sourceFilter]);

  const errorCount = ALL_LOGS.filter((l) => l.level === "error").length;
  const warnCount = ALL_LOGS.filter((l) => l.level === "warn").length;

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">System Logs</h1>
            <p className="text-sm text-text-tertiary">Monitor system events and debug information</p>
          </div>
          <div className="flex gap-2">
            <span className="rounded-full bg-error/10 px-2.5 py-0.5 text-xs font-medium text-error">{errorCount} errors</span>
            <span className="rounded-full bg-warning/10 px-2.5 py-0.5 text-xs font-medium text-warning">{warnCount} warnings</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-xs text-text-secondary">
            <span>Auto-refresh</span>
            <button onClick={() => setAutoRefresh(!autoRefresh)} className={`relative h-5 w-8 rounded-full transition-colors ${autoRefresh ? "bg-accent" : "bg-surface-hover"}`}>
              <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${autoRefresh ? "translate-x-[14px]" : "translate-x-0.5"}`} />
            </button>
          </label>
          <button className="flex items-center gap-1.5 rounded-lg border border-border-primary px-3 py-1.5 text-xs text-text-secondary transition-colors hover:bg-surface-hover">
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
          <input type="text" placeholder="Search logs..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent font-mono" />
        </div>
        <div className="flex gap-1 rounded-lg border border-border-primary p-0.5">
          {(["all", "info", "warn", "error", "debug"] as const).map((l) => (
            <button key={l} onClick={() => setLevelFilter(l)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${levelFilter === l ? (l === "all" ? "bg-accent text-white" : `${LEVEL_CONFIG[l].bg} ${LEVEL_CONFIG[l].color}`) : "text-text-tertiary hover:text-text-primary"}`}>
              {l === "all" ? "All" : l.charAt(0).toUpperCase() + l.slice(1)}
            </button>
          ))}
        </div>
        <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value as LogSource | "all")}
          className="rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-xs text-text-primary outline-none focus:border-accent">
          <option value="all">All Sources</option>
          {SOURCES.map((s) => (<option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>))}
        </select>
      </div>

      <div className="rounded-xl border border-border-primary bg-surface-primary overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-surface-primary">
              <tr className="border-b border-border-primary text-left text-xs text-text-tertiary">
                <th className="px-4 py-3 font-medium w-20">Level</th>
                <th className="px-4 py-3 font-medium w-36">Timestamp</th>
                <th className="px-4 py-3 font-medium w-24">Source</th>
                <th className="px-4 py-3 font-medium">Message</th>
                <th className="px-4 py-3 font-medium w-32">Details</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 200).map((log, i) => {
                const cfg = LEVEL_CONFIG[log.level];
                return (
                  <motion.tr key={log.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.003 }}
                    className="border-b border-border-primary transition-colors hover:bg-surface-hover font-mono text-xs">
                    <td className="px-4 py-2">
                      <span className={`flex w-fit items-center gap-1 rounded px-1.5 py-0.5 font-medium ${cfg.bg} ${cfg.color}`}>
                        <cfg.icon size={10} />{log.level.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-text-tertiary whitespace-nowrap">{formatTime(log.timestamp)}</td>
                    <td className="px-4 py-2">
                      <span className="rounded bg-surface-hover px-1.5 py-0.5 text-text-secondary">{log.source}</span>
                    </td>
                    <td className="px-4 py-2 text-text-primary">{log.message}</td>
                    <td className="px-4 py-2 text-text-tertiary">
                      {log.ip && <span className="mr-2">IP: {log.ip}</span>}
                      {log.userId && <span>User: {log.userId}</span>}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="border-t border-border-primary px-4 py-2 text-xs text-text-tertiary">
          Showing {Math.min(filtered.length, 200)} of {filtered.length} entries
        </div>
      </div>
    </div>
  );
}
