"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Eye, EyeOff, Copy, Check, Plus } from "lucide-react";

interface ProviderItem {
  id: string;
  name: string;
  apiKey: string;
  baseUrl: string;
  enabled: boolean;
  models: string[];
  color: string;
}

interface Props {
  providers: ProviderItem[];
  onToggle: (id: string) => void;
}

export function ProvidersTab({ providers, onToggle }: Props) {
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const toggleVisible = (id: string) => {
    const next = new Set(visibleKeys);
    if (next.has(id)) next.delete(id); else next.add(id);
    setVisibleKeys(next);
  };

  const copyKey = (id: string) => {
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-3">
      {providers.map((p, i) => (
        <motion.div key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
          className="rounded-xl border border-border-primary bg-surface-primary p-5 hover:border-border-hover transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${p.color}20` }}>
                <Brain size={20} style={{ color: p.color }} />
              </div>
              <div>
                <p className="font-medium text-text-primary">{p.name}</p>
                <p className="text-xs text-text-tertiary">{p.models.join(", ")}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => onToggle(p.id)}
                className={`relative h-6 w-10 rounded-full transition-colors ${p.enabled ? "bg-accent" : "bg-surface-hover"}`}>
                <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${p.enabled ? "translate-x-[18px]" : "translate-x-0.5"}`} />
              </button>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs text-text-secondary">API Key</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <input type={visibleKeys.has(p.id) ? "text" : "password"} value={visibleKeys.has(p.id) ? p.apiKey : p.apiKey ? "••••••••" : ""} readOnly
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-xs font-mono text-text-primary outline-none" />
                </div>
                <button onClick={() => toggleVisible(p.id)} className="rounded-md p-2 text-text-tertiary hover:text-text-primary transition-colors">
                  {visibleKeys.has(p.id) ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button onClick={() => copyKey(p.id)} className="rounded-md p-2 text-text-tertiary hover:text-text-primary transition-colors">
                  {copiedKey === p.id ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-text-secondary">Base URL</label>
              <input type="text" value={p.baseUrl} readOnly
                className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-xs font-mono text-text-primary outline-none" />
            </div>
          </div>
        </motion.div>
      ))}
      <button className="flex items-center gap-2 rounded-xl border border-dashed border-border-primary bg-surface-secondary p-4 w-full text-sm text-text-tertiary hover:border-border-hover hover:text-text-secondary transition-colors">
        <Plus size={16} /> Add Custom Provider
      </button>
    </div>
  );
}
