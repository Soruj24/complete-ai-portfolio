"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Save, RotateCcw, RefreshCw } from "lucide-react";
import type { AiSettings, AiProvider } from "../types";
import { DEFAULT_SETTINGS, PROVIDERS, PRESETS } from "../constants";
import { CATEGORY_ICONS } from "./icons";
import { GeneralTab } from "./tabs/general-tab";
import { ProvidersTab } from "./tabs/providers-tab";
import { ModelTab } from "./tabs/model-tab";
import { LimitsTab } from "./tabs/limits-tab";
import { LoggingTab } from "./tabs/logging-tab";
import { AdvancedTab } from "./tabs/advanced-tab";

type Tab = "general" | "providers" | "model" | "limits" | "logging" | "advanced";

const tabs: { id: Tab; label: string; icon: keyof typeof CATEGORY_ICONS }[] = [
  { id: "general", label: "General", icon: "Settings2" },
  { id: "providers", label: "Providers", icon: "Globe" },
  { id: "model", label: "Model Config", icon: "Cpu" },
  { id: "limits", label: "Rate Limits", icon: "Gauge" },
  { id: "logging", label: "Logging", icon: "ScrollText" },
  { id: "advanced", label: "Advanced", icon: "Zap" },
];

export function AISettingsPage() {
  const [tab, setTab] = useState<Tab>("general");
  const [settings, setSettings] = useState<AiSettings>(DEFAULT_SETTINGS);
  const [providers, setProviders] = useState<AiProvider[]>(PROVIDERS);
  const [saved, setSaved] = useState(false);
  const [preset, setPreset] = useState("custom");

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

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
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
          const Icon = CATEGORY_ICONS[t.icon];
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
          {tab === "general" && <GeneralTab settings={settings} providers={providers} update={update} />}
          {tab === "providers" && <ProvidersTab providers={providers} onToggle={toggleProvider} />}
          {tab === "model" && <ModelTab settings={settings} preset={preset} presets={PRESETS} update={update} onApplyPreset={applyPreset} />}
          {tab === "limits" && <LimitsTab settings={settings} providers={providers} update={update} />}
          {tab === "logging" && <LoggingTab settings={settings} update={update} />}
          {tab === "advanced" && <AdvancedTab settings={settings} update={update} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
