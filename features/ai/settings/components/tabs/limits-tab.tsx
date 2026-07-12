"use client";

import type { AiSettings, AiProvider } from "../../types";

interface Props {
  settings: AiSettings;
  providers: AiProvider[];
  update: <K extends keyof AiSettings>(k: K, v: AiSettings[K]) => void;
}

export function LimitsTab({ settings, providers, update }: Props) {
  return (
    <div className="rounded-xl border border-border-primary bg-surface-primary p-6 space-y-6">
      <h3 className="text-sm font-semibold text-text-primary">Rate Limits & Concurrency</h3>
      {[
        { key: "rateLimitPerMinute" as const, label: "Rate Limit", desc: "Maximum API requests per minute", unit: "req/min", min: 1, max: 1000, step: 1 },
        { key: "maxConcurrentRequests" as const, label: "Max Concurrent", desc: "Maximum concurrent AI requests", unit: "requests", min: 1, max: 100, step: 1 },
      ].map(({ key, label, desc, unit, min, max, step }) => (
        <div key={key}>
          <div className="flex items-center justify-between mb-1.5">
            <div><label className="text-xs font-medium text-text-secondary">{label}</label><p className="text-[10px] text-text-tertiary">{desc}</p></div>
            <span className="text-sm font-semibold font-mono text-text-primary">{settings[key]} {unit}</span>
          </div>
          <input type="range" min={min} max={max} step={step} value={settings[key]}
            onChange={(e) => update(key, Number(e.target.value))}
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
  );
}
