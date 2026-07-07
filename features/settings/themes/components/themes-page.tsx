"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Check, Sun, Moon, Monitor } from "lucide-react";
import type { ThemeConfig } from "../types";

const THEMES: ThemeConfig[] = [
  { id: "default", name: "Default", description: "Clean light theme with blue accent", preview: "linear-gradient(135deg, #3b82f6, #8b5cf6)", accent: "#3b82f6", mode: "light", popular: true },
  { id: "dark", name: "Dark Mode", description: "Dark theme with purple accent", preview: "linear-gradient(135deg, #1e1e2e, #11111b)", accent: "#8b5cf6", mode: "dark", popular: true },
  { id: "ocean", name: "Ocean", description: "Calm blue-green tones", preview: "linear-gradient(135deg, #0ea5e9, #14b8a6)", accent: "#0ea5e9", mode: "light", popular: false },
  { id: "sunset", name: "Sunset", description: "Warm orange-red tones", preview: "linear-gradient(135deg, #f97316, #ef4444)", accent: "#f97316", mode: "light", popular: false },
  { id: "forest", name: "Forest", description: "Natural green tones", preview: "linear-gradient(135deg, #22c55e, #15803d)", accent: "#22c55e", mode: "light", popular: false },
  { id: "midnight", name: "Midnight", description: "Deep dark blue theme", preview: "linear-gradient(135deg, #1e293b, #0f172a)", accent: "#6366f1", mode: "dark", popular: false },
  { id: "crimson", name: "Crimson", description: "Bold red-dark theme", preview: "linear-gradient(135deg, #dc2626, #7c3aed)", accent: "#dc2626", mode: "dark", popular: false },
  { id: "emerald", name: "Emerald", description: "Premium green theme", preview: "linear-gradient(135deg, #10b981, #059669)", accent: "#10b981", mode: "light", popular: false },
];

export function ThemesPage() {
  const [active, setActive] = useState("default");
  const [mode, setMode] = useState<"light" | "dark">("light");

  const filtered = THEMES.filter((t) => t.mode === mode);

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-text-primary">Themes</h1><p className="text-sm text-text-tertiary">Choose and customize your theme</p></div>

      <div className="flex items-center gap-2 p-1 rounded-lg border border-border-primary bg-surface-primary w-fit">
        {[
          { key: "light", icon: Sun },
          { key: "dark", icon: Moon },
        ].map(({ key, icon: Icon }) => (
          <button key={key} onClick={() => setMode(key as "light" | "dark")}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-xs font-medium capitalize transition-colors ${mode === key ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"}`}>
            <Icon size={14} />{key}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((t, i) => (
          <motion.button key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            onClick={() => setActive(t.id)}
            className={`group relative rounded-xl border p-1 text-left transition-all ${active === t.id ? "border-accent ring-1 ring-accent" : "border-border-primary hover:border-border-hover"}`}>
            <div className="mb-2 h-24 rounded-lg" style={{ background: t.preview }} />
            <div className="p-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-text-primary">{t.name}</p>
                {active === t.id && <Check size={14} className="text-accent" />}
              </div>
              <p className="text-xs text-text-tertiary mt-0.5">{t.description}</p>
              {t.popular && <span className="mt-1 inline-block rounded-md bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">Popular</span>}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
