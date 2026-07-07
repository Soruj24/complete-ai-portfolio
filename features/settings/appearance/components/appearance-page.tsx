"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Monitor, Sun, Moon, Eye, Type, Layout, Maximize2, Save, Check } from "lucide-react";

type Theme = "light" | "dark" | "system";
type AccentColor = "blue" | "purple" | "green" | "orange" | "pink" | "teal";
type FontSize = "small" | "medium" | "large";
type Density = "compact" | "comfortable" | "spacious";

const THEMES: { value: Theme; label: string; icon: typeof Sun; desc: string }[] = [
  { value: "light", label: "Light", icon: Sun, desc: "Clean light interface" },
  { value: "dark", label: "Dark", icon: Moon, desc: "Dark mode optimized" },
  { value: "system", label: "System", icon: Monitor, desc: "Follows system preference" },
];

const ACCENT_COLORS: { value: AccentColor; label: string; color: string }[] = [
  { value: "blue", label: "Blue", color: "#3b82f6" },
  { value: "purple", label: "Purple", color: "#8b5cf6" },
  { value: "green", label: "Green", color: "#10b981" },
  { value: "orange", label: "Orange", color: "#f59e0b" },
  { value: "pink", label: "Pink", color: "#ec4899" },
  { value: "teal", label: "Teal", color: "#06b6d4" },
];

const FONT_SIZES: { value: FontSize; label: string; preview: string }[] = [
  { value: "small", label: "Small", preview: "text-sm" },
  { value: "medium", label: "Medium", preview: "text-base" },
  { value: "large", label: "Large", preview: "text-lg" },
];

const DENSITIES: { value: Density; label: string; desc: string }[] = [
  { value: "compact", label: "Compact", desc: "Tighter spacing, more content" },
  { value: "comfortable", label: "Comfortable", desc: "Balanced spacing" },
  { value: "spacious", label: "Spacious", desc: "Extra breathing room" },
];

export function AppearancePage() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [accent, setAccent] = useState<AccentColor>("blue");
  const [fontSize, setFontSize] = useState<FontSize>("medium");
  const [density, setDensity] = useState<Density>("comfortable");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [animations, setAnimations] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Appearance</h1>
          <p className="text-sm text-text-tertiary">Customize the look and feel of your admin panel</p>
        </div>
        <button onClick={handleSave}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-white transition-all ${saved ? "bg-success" : "bg-accent hover:bg-accent-hover"}`}>
          <Save size={14} /> {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border-primary bg-surface-primary p-5">
          <h3 className="mb-1 text-sm font-semibold text-text-primary"><Monitor size={16} className="inline mr-2" />Theme</h3>
          <p className="mb-4 text-xs text-text-tertiary">Choose your color scheme preference</p>
          <div className="grid grid-cols-3 gap-3">
            {THEMES.map((t) => (
              <button key={t.value} onClick={() => setTheme(t.value)}
                className={`rounded-xl border-2 p-4 text-center transition-all ${theme === t.value ? "border-accent bg-accent/5" : "border-border-primary hover:border-border-hover"}`}>
                <t.icon size={24} className={`mx-auto mb-2 ${theme === t.value ? "text-accent" : "text-text-tertiary"}`} />
                <p className={`text-sm font-medium ${theme === t.value ? "text-accent" : "text-text-primary"}`}>{t.label}</p>
                <p className="mt-1 text-xs text-text-tertiary">{t.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border-primary bg-surface-primary p-5">
          <h3 className="mb-1 text-sm font-semibold text-text-primary"><Palette size={16} className="inline mr-2" />Accent Color</h3>
          <p className="mb-4 text-xs text-text-tertiary">Primary brand color used throughout the UI</p>
          <div className="flex flex-wrap gap-3">
            {ACCENT_COLORS.map((c) => (
              <button key={c.value} onClick={() => setAccent(c.value)}
                className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all ${accent === c.value ? "ring-2 ring-accent ring-offset-2 ring-offset-surface-primary scale-110" : "hover:scale-105"}`}
                style={{ backgroundColor: c.color }}>
                {accent === c.value && <Check size={16} className="text-white" />}
              </button>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            {["Primary", "Hover", "Muted"].map((label) => (
              <div key={label} className="flex-1 rounded-lg bg-surface-hover p-2 text-center">
                <div className="mx-auto mb-1 h-4 w-12 rounded" style={{ backgroundColor: ACCENT_COLORS.find((c) => c.value === accent)?.color }} />
                <span className="text-xs text-text-tertiary">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border-primary bg-surface-primary p-5">
          <h3 className="mb-1 text-sm font-semibold text-text-primary"><Type size={16} className="inline mr-2" />Font Size</h3>
          <p className="mb-4 text-xs text-text-tertiary">Adjust text size across the interface</p>
          <div className="space-y-2">
            {FONT_SIZES.map((s) => (
              <button key={s.value} onClick={() => setFontSize(s.value)}
                className={`w-full rounded-lg border p-3 text-left transition-all ${fontSize === s.value ? "border-accent bg-accent/5" : "border-border-primary hover:border-border-hover"}`}>
                <p className={`font-medium text-text-primary ${s.preview}`}>{s.label}</p>
                <p className={`text-text-tertiary ${s.value === "small" ? "text-xs" : s.value === "large" ? "text-base" : "text-sm"}`}>Preview text at this size</p>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border-primary bg-surface-primary p-5">
          <h3 className="mb-1 text-sm font-semibold text-text-primary"><Layout size={16} className="inline mr-2" />Density</h3>
          <p className="mb-4 text-xs text-text-tertiary">Control spacing and layout density</p>
          <div className="space-y-2">
            {DENSITIES.map((d) => (
              <button key={d.value} onClick={() => setDensity(d.value)}
                className={`w-full rounded-lg border p-3 text-left transition-all ${density === d.value ? "border-accent bg-accent/5" : "border-border-primary hover:border-border-hover"}`}>
                <p className="text-sm font-medium text-text-primary">{d.label}</p>
                <p className="text-xs text-text-tertiary">{d.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border-primary bg-surface-primary p-5">
          <h3 className="mb-1 text-sm font-semibold text-text-primary"><Eye size={16} className="inline mr-2" />Accessibility</h3>
          <p className="mb-4 text-xs text-text-tertiary">Accessibility and motion preferences</p>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <div><p className="text-sm text-text-primary">Animations</p><p className="text-xs text-text-tertiary">Enable UI animations and transitions</p></div>
              <button onClick={() => setAnimations(!animations)} className={`relative h-6 w-10 rounded-full transition-colors ${animations ? "bg-accent" : "bg-surface-hover"}`}>
                <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${animations ? "translate-x-[18px]" : "translate-x-0.5"}`} />
              </button>
            </label>
            <label className="flex items-center justify-between">
              <div><p className="text-sm text-text-primary">Reduced Motion</p><p className="text-xs text-text-tertiary">Minimize animations for vestibular sensitivity</p></div>
              <button onClick={() => setReducedMotion(!reducedMotion)} className={`relative h-6 w-10 rounded-full transition-colors ${reducedMotion ? "bg-accent" : "bg-surface-hover"}`}>
                <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${reducedMotion ? "translate-x-[18px]" : "translate-x-0.5"}`} />
              </button>
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border-primary bg-surface-primary p-5">
        <h3 className="mb-1 text-sm font-semibold text-text-primary"><Maximize2 size={16} className="inline mr-2" />Sidebar</h3>
        <p className="mb-4 text-xs text-text-tertiary">Default sidebar state</p>
        <label className="flex items-center justify-between max-w-sm">
          <div><p className="text-sm text-text-primary">Collapsed by Default</p><p className="text-xs text-text-tertiary">Start with sidebar minimized</p></div>
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={`relative h-6 w-10 rounded-full transition-colors ${sidebarCollapsed ? "bg-accent" : "bg-surface-hover"}`}>
            <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${sidebarCollapsed ? "translate-x-[18px]" : "translate-x-0.5"}`} />
          </button>
        </label>
      </div>
    </div>
  );
}
