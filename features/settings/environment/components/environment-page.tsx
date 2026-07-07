"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Server, Eye, EyeOff, Copy, Shield, Globe, Database, Key, Mail } from "lucide-react";
import type { EnvVariable } from "../types";

const VARS: EnvVariable[] = [
  { key: "NODE_ENV", value: "production", masked: false, group: "General", description: "Application environment mode" },
  { key: "DATABASE_URL", value: "postgresql://user:****@localhost:5432/portfolio", masked: true, group: "Database", description: "PostgreSQL connection string" },
  { key: "JWT_SECRET", value: "****", masked: true, group: "Auth", description: "JWT signing secret" },
  { key: "NEXT_PUBLIC_API_URL", value: "https://api.portfolio.com", masked: false, group: "General", description: "Public API base URL" },
  { key: "OPENAI_API_KEY", value: "sk-****", masked: true, group: "AI", description: "OpenAI API key for AI features" },
  { key: "GITHUB_TOKEN", value: "ghp_****", masked: true, group: "Integrations", description: "GitHub personal access token" },
  { key: "SMTP_HOST", value: "smtp.sendgrid.net", masked: false, group: "Mail", description: "SMTP server for emails" },
  { key: "SMTP_PORT", value: "587", masked: false, group: "Mail", description: "SMTP server port" },
  { key: "SMTP_USER", value: "apikey", masked: false, group: "Mail", description: "SMTP username" },
  { key: "SMTP_PASS", value: "****", masked: true, group: "Mail", description: "SMTP password" },
  { key: "REDIS_URL", value: "redis://localhost:6379", masked: false, group: "Cache", description: "Redis connection string" },
  { key: "S3_BUCKET", value: "portfolio-media", masked: false, group: "Storage", description: "AWS S3 bucket name" },
  { key: "S3_REGION", value: "us-east-1", masked: false, group: "Storage", description: "AWS S3 region" },
  { key: "SENTRY_DSN", value: "https://****@o123456.ingest.sentry.io", masked: true, group: "Monitoring", description: "Sentry error tracking DSN" },
];

const GROUP_ICONS: Record<string, typeof Server> = { General: Globe, Database, Auth: Shield, AI: Key, Integrations: Key, Mail, Cache: Database, Storage: Database, Monitoring: Shield };

export function EnvironmentPage() {
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState<Set<string>>(new Set());

  const groups = [...new Set(VARS.map((v) => v.group))].map((g) => ({
    name: g, vars: VARS.filter((v) => v.group === g && (!search || v.key.toLowerCase().includes(search.toLowerCase()) || v.description.toLowerCase().includes(search.toLowerCase()))),
  })).filter((g) => g.vars.length > 0);

  const toggleVisible = (key: string) => {
    const next = new Set(visible);
    if (next.has(key)) next.delete(key); else next.add(key);
    setVisible(next);
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-text-primary">Environment Variables</h1><p className="text-sm text-text-tertiary">Manage application environment configuration</p></div>

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
        <input type="text" placeholder="Search variables..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border-primary bg-surface-secondary py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent" />
      </div>

      {groups.map((g, gi) => {
        const GroupIcon = GROUP_ICONS[g.name] || Server;
        return (
          <div key={g.name}>
            <div className="flex items-center gap-2 mb-2">
              <GroupIcon size={14} className="text-accent" />
              <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">{g.name}</h3>
              <span className="text-[10px] text-text-tertiary">({g.vars.length})</span>
            </div>
            <div className="rounded-xl border border-border-primary bg-surface-primary overflow-hidden">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border-primary bg-surface-secondary text-left text-xs text-text-tertiary">
                  <th className="p-3 font-medium">Key</th><th className="p-3 font-medium">Value</th><th className="p-3 font-medium">Description</th><th className="p-3 w-20"></th>
                </tr></thead>
                <tbody>
                  {g.vars.map((v, i) => (
                    <motion.tr key={v.key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.01 }}
                      className="border-b border-border-primary last:border-0 hover:bg-surface-hover transition-colors">
                      <td className="p-3"><code className="font-mono text-xs text-text-primary font-medium">{v.key}</code></td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <code className="font-mono text-xs text-text-secondary">
                            {v.masked && !visible.has(v.key) ? "••••••••" : v.value}
                          </code>
                          {v.masked && (
                            <button onClick={() => toggleVisible(v.key)} className="text-text-tertiary hover:text-text-primary">
                              {visible.has(v.key) ? <EyeOff size={12} /> : <Eye size={12} />}
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-xs text-text-tertiary">{v.description}</td>
                      <td className="p-3">
                        <button className="text-text-tertiary hover:text-text-primary transition-colors"><Copy size={12} /></button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
