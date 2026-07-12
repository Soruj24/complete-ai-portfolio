"use client";

import type { AiSettings } from "../../types";

interface Props {
  settings: AiSettings;
  update: <K extends keyof AiSettings>(k: K, v: AiSettings[K]) => void;
}

export function AdvancedTab({ settings, update }: Props) {
  return (
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
  );
}
