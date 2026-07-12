"use client";

import type { AiSettings, AiProvider } from "../../types";

interface Props {
  settings: AiSettings;
  providers: AiProvider[];
  update: <K extends keyof AiSettings>(k: K, v: AiSettings[K]) => void;
}

export function GeneralTab({ settings, providers, update }: Props) {
  return (
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
  );
}
