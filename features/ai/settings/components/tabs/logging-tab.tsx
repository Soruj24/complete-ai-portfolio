"use client";

import type { AiSettings } from "../../types";

interface Props {
  settings: AiSettings;
  update: <K extends keyof AiSettings>(k: K, v: AiSettings[K]) => void;
}

export function LoggingTab({ settings, update }: Props) {
  return (
    <div className="rounded-xl border border-border-primary bg-surface-primary p-6 space-y-6">
      <h3 className="text-sm font-semibold text-text-primary">Logging & Monitoring</h3>
      {[
        { key: "logPrompts" as const, label: "Log Prompts", desc: "Store prompt text in logs (may contain sensitive data)" },
        { key: "logResponses" as const, label: "Log Responses", desc: "Store AI response text in logs" },
      ].map(({ key, label, desc }) => (
        <div key={key} className="flex items-center justify-between rounded-lg border border-border-primary bg-surface-secondary p-4">
          <div><p className="text-sm font-medium text-text-primary">{label}</p><p className="text-xs text-text-tertiary">{desc}</p></div>
          <button onClick={() => update(key, !settings[key])}
            className={`relative h-6 w-10 rounded-full transition-colors ${settings[key] ? "bg-accent" : "bg-surface-hover"}`}>
            <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${settings[key] ? "translate-x-[18px]" : "translate-x-0.5"}`} />
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
  );
}
