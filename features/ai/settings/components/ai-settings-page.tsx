"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, RotateCcw, Eye, EyeOff, Copy, Check, Plus, Trash2, RefreshCw, Brain, Server, Cpu, Gauge, ScrollText, Zap, Settings2, Globe } from "lucide-react";
import type { AiSettings, AiProvider, AiPreset } from "../types";
import { DEFAULT_SETTINGS, PROVIDERS, PRESETS, CATEGORIES } from "../constants";
import { CATEGORY_ICONS } from "./icons";

type Tab = "general" | "providers" | "model" | "limits" | "logging" | "advanced";

const tabs: { id: Tab; label: string; icon: keyof typeof CATEGORY_ICONS }[] = [
  { id: "general", label: "General", icon: "Settings2" },
  { id: "providers", label: "Providers", icon: "Globe" },
  { id: "model", label: "Model Config", icon: "Cpu" },
  { id: "limits", label: "Rate Limits", icon: "Gauge" },
  { id: "logging", label: "Logging", icon: "ScrollText" },
  { id: "advanced", label: "Advanced", icon: "Zap" },
];

const formatNumber = (v: number) => v.toLocaleString();

export function AISettingsPage() {
  const [tab, setTab] = useState<Tab>("general");
  const [settings, setSettings] = useState<AiSettings>(DEFAULT_SETTINGS);
  const [providers, setProviders] = useState<AiProvider[]>(PROVIDERS);
  const [saved, setSaved] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [preset, setPreset] = useState<string>("custom");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const update = <K extends keyof AiSettings>(k: K, v: AiSettings[K]) => {
    setSettings((prev) => ({ ...prev, [k]: v }));
    setPreset("custom");
    setSaved(false);
  };

  const applyPreset = (id: string) => {
    const p = PRESETS.find((pr) => pr.id === id);
    if (p) {
      setSettings((prev) => ({ ...prev, temperature: p.temperature, topP: p.topP, maxTokens: p.maxTokens }));
      setPreset(id);
    }
  };

  const toggleProvider = (id: string) => {
    setProviders((prev) => prev.map((p) => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  const copyKey = (id: string) => {
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggleVisible = (id: string) => {
    const next = new Set(visibleKeys);
    if (next.has(id)) next.delete(id); else next.add(id);
    setVisibleKeys(next);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">AI Settings</h1>
          <p className="text-sm text-text-tertiary">Configure AI model providers, defaults, and behavior</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => { setSettings(DEFAULT_SETTINGS); setPreset("custom"); }}
            className="flex items-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm text-text-secondary hover:bg-surface-hover transition-colors">
            <RotateCcw size={14} /> Reset
          </button>
          <button onClick={handleSave}
            className="flex items-center gap-2 rounded-lg bg-accent px-5 py-2 text-sm text-white hover:bg-accent-hover transition-colors">
            {saved ? <><RefreshCw size={14} className="animate-spin" /> Saved</> : <><Save size={14} /> Save</>}
          </button>
        </div>
      </div>

      <div className="flex gap-1 rounded-xl border border-border-primary bg-surface-primary p-1 overflow-x-auto">
        {tabs.map((t) => {
          const Icon = CATEGORY_ICONS[t.icon] || Settings2;
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium whitespace-nowrap transition-colors ${tab === t.id ? "bg-accent text-white shadow-sm" : "text-text-secondary hover:text-text-primary"}`}>
              <Icon size={14} /> {t.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
          {tab === "general" && (
            <div className="rounded-xl border border-border-primary bg-surface-primary p-6 space-y-6">
              <h3 className="text-sm font-semibold text-text-primary">General AI Configuration</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-text-secondary">Default Provider</label>
                  <select value={settings.defaultProvider} onChange={(e) => update("defaultProvider", e.target.value)}
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent">
                    {providers.filter((p) => p.enabled).map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-text-secondary">Default Model</label>
                  <select value={settings.defaultModel} onChange={(e) => update("defaultModel", e.target.value)}
                    className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent">
                    {providers.filter((p) => p.enabled).flatMap((p) => p.models.map((m) => <option key={m} value={m}>{m}</option>))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-text-secondary">System Prompt</label>
                <textarea value={settings.systemPrompt} onChange={(e) => update("systemPrompt", e.target.value)} rows={4}
                  className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent resize-y" />
                <p className="text-[10px] text-text-tertiary">{settings.systemPrompt.length} characters</p>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border-primary bg-surface-secondary p-4">
                <div>
                  <p className="text-sm font-medium text-text-primary">Streaming Responses</p>
                  <p className="text-xs text-text-tertiary">Stream AI responses token-by-token for real-time output</p>
                </div>
                <button onClick={() => update("streaming", !settings.streaming)}
                  className={`relative h-6 w-10 rounded-full transition-colors ${settings.streaming ? "bg-accent" : "bg-surface-hover"}`}>
                  <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${settings.streaming ? "translate-x-[18px]" : "translate-x-0.5"}`} />
                </button>
              </div>
              <div className="rounded-lg border border-border-primary bg-surface-secondary p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-text-primary">Cost Tracking</p>
                  <button onClick={() => update("enableCostTracking", !settings.enableCostTracking)}
                    className={`relative h-6 w-10 rounded-full transition-colors ${settings.enableCostTracking ? "bg-accent" : "bg-surface-hover"}`}>
                    <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${settings.enableCostTracking ? "translate-x-[18px]" : "translate-x-0.5"}`} />
                  </button>
                </div>
                {settings.enableCostTracking && (
                  <div className="space-y-2 mt-3">
                    <label className="text-xs text-text-secondary">Monthly Budget Limit ($)</label>
                    <input type="number" value={settings.monthlyBudgetLimit} onChange={(e) => update("monthlyBudgetLimit", Number(e.target.value))}
                      className="w-40 rounded-lg border border-border-primary bg-surface-secondary px-3 py-1.5 text-sm text-text-primary outline-none focus:border-accent" />
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === "providers" && (
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
                      <button onClick={() => toggleProvider(p.id)}
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
          )}

          {tab === "model" && (
            <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
              <div className="rounded-xl border border-border-primary bg-surface-primary p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-text-primary">Model Parameters</h3>
                  <div className="flex gap-1 rounded-lg border border-border-primary bg-surface-primary p-0.5">
                    {PRESETS.map((p) => (
                      <button key={p.id} onClick={() => applyPreset(p.id)}
                        className={`rounded-md px-3 py-1 text-[10px] font-medium capitalize transition-colors ${preset === p.id ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"}`}>{p.name}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { key: "temperature", label: "Temperature", min: 0, max: 2, step: 0.01, desc: "Controls randomness: 0 = deterministic, 2 = very random" },
                    { key: "topP", label: "Top P", min: 0, max: 1, step: 0.01, desc: "Nucleus sampling: lower = more focused responses" },
                    { key: "maxTokens", label: "Max Tokens", min: 64, max: 32768, step: 64, desc: "Maximum tokens in generated response" },
                  ].map(({ key, label, min, max, step, desc }) => (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-medium text-text-secondary">{label}</label>
                        <span className="text-sm font-semibold font-mono text-text-primary">{key === "maxTokens" ? formatNumber(settings[key as keyof AiSettings] as number) : (settings[key as keyof AiSettings] as number).toFixed(key === "temperature" ? 2 : 2)}</span>
                      </div>
                      <input type="range" min={min} max={max} step={step} value={settings[key as keyof AiSettings] as number}
                        onChange={(e) => update(key as keyof AiSettings, Number(e.target.value))}
                        className="w-full h-1.5 rounded-full appearance-none bg-surface-hover cursor-pointer accent-[var(--color-accent)]" />
                      <p className="text-[10px] text-text-tertiary mt-0.5">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-border-primary bg-surface-primary p-5 h-fit sticky top-6">
                <h4 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">Parameter Presets</h4>
                <div className="space-y-2">
                  {PRESETS.map((p) => (
                    <button key={p.id} onClick={() => applyPreset(p.id)}
                      className={`w-full rounded-lg border p-3 text-left transition-colors ${preset === p.id ? "border-accent/50 bg-accent/5" : "border-border-primary hover:border-border-hover"}`}>
                      <p className="text-sm font-medium text-text-primary">{p.name}</p>
                      <p className="text-[10px] text-text-tertiary">{p.description}</p>
                      <div className="flex gap-2 mt-1 text-[10px] font-mono text-text-secondary">
                        <span>T: {p.temperature}</span><span>P: {p.topP}</span><span>M: {formatNumber(p.maxTokens)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "limits" && (
            <div className="rounded-xl border border-border-primary bg-surface-primary p-6 space-y-6">
              <h3 className="text-sm font-semibold text-text-primary">Rate Limits & Concurrency</h3>
              {[
                { key: "rateLimitPerMinute", label: "Rate Limit", desc: "Maximum API requests per minute", unit: "req/min", min: 1, max: 1000, step: 1 },
                { key: "maxConcurrentRequests", label: "Max Concurrent", desc: "Maximum concurrent AI requests", unit: "requests", min: 1, max: 100, step: 1 },
              ].map(({ key, label, desc, unit, min, max, step }) => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div><label className="text-xs font-medium text-text-secondary">{label}</label><p className="text-[10px] text-text-tertiary">{desc}</p></div>
                    <span className="text-sm font-semibold font-mono text-text-primary">{settings[key as keyof AiSettings] as number} {unit}</span>
                  </div>
                  <input type="range" min={min} max={max} step={step} value={settings[key as keyof AiSettings] as number}
                    onChange={(e) => update(key as keyof AiSettings, Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none bg-surface-hover cursor-pointer accent-[var(--color-accent)]" />
                </div>
              ))}
              <div className="flex items-center justify-between rounded-lg border border-border-primary bg-surface-secondary p-4">
                <div>
                  <p className="text-sm font-medium text-text-primary">Fallback Model</p>
                  <p className="text-xs text-text-tertiary">Use alternative model when primary fails</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => update("fallbackEnabled", !settings.fallbackEnabled)}
                    className={`relative h-6 w-10 rounded-full transition-colors ${settings.fallbackEnabled ? "bg-accent" : "bg-surface-hover"}`}>
                    <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${settings.fallbackEnabled ? "translate-x-[18px]" : "translate-x-0.5"}`} />
                  </button>
                  {settings.fallbackEnabled && (
                    <select value={settings.fallbackModel} onChange={(e) => update("fallbackModel", e.target.value)}
                      className="rounded-lg border border-border-primary bg-surface-secondary px-3 py-1.5 text-xs text-text-primary outline-none focus:border-accent">
                      {providers.filter((p) => p.enabled).flatMap((p) => p.models.map((m) => <option key={m} value={m}>{m}</option>))}
                    </select>
                  )}
                </div>
              </div>
            </div>
          )}

          {tab === "logging" && (
            <div className="rounded-xl border border-border-primary bg-surface-primary p-6 space-y-6">
              <h3 className="text-sm font-semibold text-text-primary">Logging & Monitoring</h3>
              {[
                { key: "logPrompts", label: "Log Prompts", desc: "Store prompt text in logs (may contain sensitive data)" },
                { key: "logResponses", label: "Log Responses", desc: "Store AI response text in logs" },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between rounded-lg border border-border-primary bg-surface-secondary p-4">
                  <div><p className="text-sm font-medium text-text-primary">{label}</p><p className="text-xs text-text-tertiary">{desc}</p></div>
                  <button onClick={() => update(key as keyof AiSettings, !(settings[key as keyof AiSettings] as boolean))}
                    className={`relative h-6 w-10 rounded-full transition-colors ${settings[key as keyof AiSettings] ? "bg-accent" : "bg-surface-hover"}`}>
                    <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${settings[key as keyof AiSettings] ? "translate-x-[18px]" : "translate-x-0.5"}`} />
                  </button>
                </div>
              ))}
              <div className="space-y-2">
                <label className="text-xs font-medium text-text-secondary">Log Retention (days)</label>
                <div className="flex items-center gap-2">
                  <input type="range" min={1} max={365} step={1} value={settings.retentionDays}
                    onChange={(e) => update("retentionDays", Number(e.target.value))}
                    className="flex-1 h-1.5 rounded-full appearance-none bg-surface-hover cursor-pointer accent-[var(--color-accent)]" />
                  <span className="text-sm font-semibold font-mono text-text-primary w-12 text-right">{settings.retentionDays}d</span>
                </div>
              </div>
            </div>
          )}

          {tab === "advanced" && (
            <div className="rounded-xl border border-border-primary bg-surface-primary p-6 space-y-6">
              <h3 className="text-sm font-semibold text-text-primary">Advanced Settings</h3>
              <div className="flex items-center justify-between rounded-lg border border-border-primary bg-surface-secondary p-4">
                <div><p className="text-sm font-medium text-text-primary">Response Cache</p><p className="text-xs text-text-tertiary">Cache identical requests to reduce costs and latency</p></div>
                <button onClick={() => update("cacheEnabled", !settings.cacheEnabled)}
                  className={`relative h-6 w-10 rounded-full transition-colors ${settings.cacheEnabled ? "bg-accent" : "bg-surface-hover"}`}>
                  <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${settings.cacheEnabled ? "translate-x-[18px]" : "translate-x-0.5"}`} />
                </button>
              </div>
              {settings.cacheEnabled && (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-text-secondary">Cache TTL (seconds)</label>
                  <div className="flex items-center gap-2">
                    <input type="range" min={60} max={86400} step={60} value={settings.cacheTtl}
                      onChange={(e) => update("cacheTtl", Number(e.target.value))}
                      className="flex-1 h-1.5 rounded-full appearance-none bg-surface-hover cursor-pointer accent-[var(--color-accent)]" />
                    <span className="text-sm font-semibold font-mono text-text-primary w-16 text-right">{settings.cacheTtl >= 3600 ? `${(settings.cacheTtl / 3600).toFixed(0)}h` : `${settings.cacheTtl}s`}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
