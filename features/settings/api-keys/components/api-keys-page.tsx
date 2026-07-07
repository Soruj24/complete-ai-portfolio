"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Key, Copy, Eye, EyeOff, RefreshCw, Trash2, Plus, Check, AlertTriangle } from "lucide-react";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  masked: string;
  created: string;
  lastUsed: string | null;
  permissions: string[];
  status: "active" | "expired" | "revoked";
  expiresAt: string | null;
}

const KEYS: ApiKey[] = [
  { id: "ak1", name: "Production API", key: "sk_live_xxxxxxxxxxxxxxxxxxxx", masked: "sk_live_xxxx...xxxx", created: "2026-01-15", lastUsed: "2026-07-05", permissions: ["read", "write", "delete"], status: "active", expiresAt: "2027-01-15" },
  { id: "ak2", name: "Staging API", key: "sk_test_xxxxxxxxxxxxxxxxxxxx", masked: "sk_test_xxxx...xxxx", created: "2026-03-01", lastUsed: "2026-07-04", permissions: ["read", "write"], status: "active", expiresAt: "2027-03-01" },
  { id: "ak3", name: "Mobile App Key", key: "sk_mob_xxxxxxxxxxxxxxxxxxxx", masked: "sk_mob_xxxx...xxxx", created: "2026-04-20", lastUsed: "2026-07-03", permissions: ["read"], status: "active", expiresAt: null },
  { id: "ak4", name: "CI/CD Pipeline", key: "sk_ci_xxxxxxxxxxxxxxxxxxxx", masked: "sk_ci_xxxx...xxxx", created: "2026-02-10", lastUsed: "2026-06-28", permissions: ["read", "write"], status: "active", expiresAt: "2026-08-10" },
  { id: "ak5", name: "Analytics Integration", key: "sk_anl_xxxxxxxxxxxxxxxxxxxx", masked: "sk_anl_xxxx...xxxx", created: "2025-11-05", lastUsed: "2026-05-15", permissions: ["read"], status: "expired", expiresAt: "2026-05-05" },
  { id: "ak6", name: "Old Dashboard Key", key: "sk_old_xxxxxxxxxxxxxxxxxxxx", masked: "sk_old_xxxx...xxxx", created: "2025-08-20", lastUsed: "2026-04-01", permissions: ["read", "write", "delete"], status: "revoked", expiresAt: null },
];

const STATUS_COLORS: Record<string, string> = {
  active: "bg-success/10 text-success",
  expired: "bg-warning/10 text-warning",
  revoked: "bg-error/10 text-error",
};

export function ApiKeysPage() {
  const [keys, setKeys] = useState(KEYS);
  const [visibleKey, setVisibleKey] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyKey = (id: string, key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const revokeKey = (id: string) => setKeys((prev) => prev.map((k) => k.id === id ? { ...k, status: "revoked" as const } : k));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">API Keys</h1>
          <p className="text-sm text-text-tertiary">Manage API keys for external integrations</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-white transition-colors hover:bg-accent-hover">
          <Plus size={16} /> Generate Key
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Active Keys", value: keys.filter((k) => k.status === "active").length, color: "text-success" },
          { label: "Expired", value: keys.filter((k) => k.status === "expired").length, color: "text-warning" },
          { label: "Revoked", value: keys.filter((k) => k.status === "revoked").length, color: "text-error" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border-primary bg-surface-primary p-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-surface-hover ${s.color}`}><Key size={18} /></div>
              <div><p className="text-xs text-text-tertiary">{s.label}</p><p className="text-lg font-semibold text-text-primary">{s.value}</p></div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-3">
        {keys.map((apiKey, i) => (
          <motion.div key={apiKey.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            className="rounded-xl border border-border-primary bg-surface-primary p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-text-primary">{apiKey.name}</h3>
                  <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[apiKey.status]}`}>{apiKey.status}</span>
                </div>
                <p className="mt-0.5 text-xs text-text-tertiary">Created {apiKey.created}{apiKey.expiresAt ? ` · Expires ${apiKey.expiresAt}` : " · No expiry"}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setVisibleKey(visibleKey === apiKey.id ? null : apiKey.id)}
                  className="rounded-lg p-1.5 text-text-tertiary transition-colors hover:bg-surface-hover hover:text-text-primary">
                  {visibleKey === apiKey.id ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button onClick={() => copyKey(apiKey.id, apiKey.key)}
                  className="rounded-lg p-1.5 text-text-tertiary transition-colors hover:bg-surface-hover hover:text-accent">
                  {copiedId === apiKey.id ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                </button>
                {apiKey.status === "active" && (
                  <button onClick={() => revokeKey(apiKey.id)}
                    className="rounded-lg p-1.5 text-text-tertiary transition-colors hover:bg-surface-hover hover:text-error">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-surface-secondary p-3 font-mono text-sm">
              <Key size={14} className="shrink-0 text-text-tertiary" />
              <span className="text-text-primary">{visibleKey === apiKey.id ? apiKey.key : apiKey.masked}</span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-text-tertiary">
              <span>Permissions: {apiKey.permissions.map((p) => (
                <span key={p} className="ml-1 rounded bg-surface-hover px-1.5 py-0.5 text-text-secondary">{p}</span>
              ))}</span>
              {apiKey.lastUsed && <span>Last used: {apiKey.lastUsed}</span>}
            </div>

            {apiKey.status === "expired" && (
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-warning/5 p-3 text-xs text-warning">
                <AlertTriangle size={14} /> This key has expired. Generate a new one to restore access.
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
