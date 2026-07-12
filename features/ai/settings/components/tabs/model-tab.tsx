"use client";

import type { AiSettings, AiPreset } from "../../types";

const formatNumber = (v: number) => v.toLocaleString();

interface Props {
  settings: AiSettings;
  preset: string;
  presets: AiPreset[];
  update: <K extends keyof AiSettings>(k: K, v: AiSettings[K]) => void;
  onApplyPreset: (id: string) => void;
}

export function ModelTab({ settings, preset, presets, update, onApplyPreset }: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div className="rounded-xl border border-border-primary bg-surface-primary p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-text-primary">Model Parameters</h3>
          <div className="flex gap-1 rounded-lg border border-border-primary bg-surface-primary p-0.5">
            {presets.map((p) => (
              <button key={p.id} onClick={() => onApplyPreset(p.id)}
                className={`rounded-md px-3 py-1 text-[10px] font-medium capitalize transition-colors ${preset === p.id ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"}`}>{p.name}</button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          {[
            { key: "temperature" as const, label: "Temperature", min: 0, max: 2, step: 0.01, desc: "Controls randomness: 0 = deterministic, 2 = very random" },
            { key: "topP" as const, label: "Top P", min: 0, max: 1, step: 0.01, desc: "Nucleus sampling: lower = more focused responses" },
            { key: "maxTokens" as const, label: "Max Tokens", min: 64, max: 32768, step: 64, desc: "Maximum tokens in generated response" },
          ].map(({ key, label, min, max, step, desc }) => (
            <div key={key}>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-text-secondary">{label}</label>
                <span className="text-sm font-semibold font-mono text-text-primary">{key === "maxTokens" ? formatNumber(settings[key] as number) : (settings[key] as number).toFixed(2)}</span>
              </div>
              <input type="range" min={min} max={max} step={step} value={settings[key] as number}
                onChange={(e) => update(key, Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none bg-surface-hover cursor-pointer accent-[var(--color-accent)]" />
              <p className="text-[10px] text-text-tertiary mt-0.5">{desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-border-primary bg-surface-primary p-5 h-fit sticky top-6">
        <h4 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">Parameter Presets</h4>
        <div className="space-y-2">
          {presets.map((p) => (
            <button key={p.id} onClick={() => onApplyPreset(p.id)}
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
  );
}
