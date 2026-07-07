"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Settings2, Globe, Shield, Bell, RefreshCw } from "lucide-react";
import type { SettingField } from "../types";

const SETTINGS: SettingField[] = [
  { id: "site-name", label: "Site Name", description: "The name of your portfolio site", type: "text", value: "Portfolio Pro", category: "General" },
  { id: "site-url", label: "Site URL", description: "The public URL of your site", type: "text", value: "https://portfolio.com", category: "General" },
  { id: "language", label: "Default Language", description: "Primary language for the site", type: "select", value: "en", options: [{ label: "English", value: "en" }, { label: "Spanish", value: "es" }, { label: "French", value: "fr" }, { label: "German", value: "de" }], category: "General" },
  { id: "timezone", label: "Timezone", description: "Default timezone for dates and logs", type: "select", value: "America/New_York", options: [{ label: "Eastern Time (US)", value: "America/New_York" }, { label: "Pacific Time (US)", value: "America/Los_Angeles" }, { label: "UTC", value: "UTC" }, { label: "Central European", value: "Europe/Berlin" }], category: "General" },
  { id: "registration", label: "Allow Registration", description: "Allow new users to register", type: "toggle", value: true, category: "Security" },
  { id: "two-factor", label: "Require 2FA", description: "Require two-factor authentication for all users", type: "toggle", value: false, category: "Security" },
  { id: "session-timeout", label: "Session Timeout (mins)", description: "Auto-logout after inactivity", type: "number", value: 60, category: "Security" },
  { id: "email-notifications", label: "Email Notifications", description: "Send email notifications for system events", type: "toggle", value: true, category: "Notifications" },
  { id: "browser-notifications", label: "Browser Notifications", description: "Show browser push notifications", type: "toggle", value: true, category: "Notifications" },
  { id: "maintenance", label: "Maintenance Mode", description: "Disable public access during maintenance", type: "toggle", value: false, category: "System" },
  { id: "debug-mode", label: "Debug Mode", description: "Enable debug logging and error details", type: "toggle", value: false, category: "System" },
  { id: "cache-ttl", label: "Cache TTL (seconds)", description: "How long to cache responses", type: "number", value: 3600, category: "System" },
];

const CATEGORIES = ["General", "Security", "Notifications", "System"];
const CAT_ICONS: Record<string, typeof Settings2> = { General: Globe, Security: Shield, Notifications: Bell, System: Settings2 };

export function GeneralPage() {
  const [values, setValues] = useState<Record<string, string | boolean | number>>(
    Object.fromEntries(SETTINGS.map((s) => [s.id, s.value]))
  );
  const [saved, setSaved] = useState(false);

  const update = (id: string, val: string | boolean | number) => {
    setValues((prev) => ({ ...prev, [id]: val }));
    setSaved(false);
  };

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-text-primary">General Settings</h1><p className="text-sm text-text-tertiary">Configure application settings</p></div>
        <button onClick={handleSave}
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-white hover:bg-accent-hover transition-colors">
          {saved ? <><RefreshCw size={14} className="animate-spin" /> Saved!</> : <><Save size={14} /> Save Changes</>}
        </button>
      </div>

      {CATEGORIES.map((cat, ci) => {
        const catSettings = SETTINGS.filter((s) => s.category === cat);
        const Icon = CAT_ICONS[cat] || Settings2;
        return (
          <div key={cat}>
            <div className="flex items-center gap-2 mb-3">
              <Icon size={14} className="text-accent" />
              <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">{cat}</h3>
            </div>
            <div className="rounded-xl border border-border-primary bg-surface-primary divide-y divide-border-primary">
              {catSettings.map((s, i) => (
                <motion.div key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 + ci * 0.05 }}
                  className="flex items-center justify-between p-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary">{s.label}</p>
                    <p className="text-xs text-text-tertiary">{s.description}</p>
                  </div>
                  <div className="shrink-0 ml-4">
                    {s.type === "toggle" ? (
                      <button onClick={() => update(s.id, !(values[s.id] as boolean))}
                        className={`relative h-6 w-10 rounded-full transition-colors ${values[s.id] ? "bg-accent" : "bg-surface-hover"}`}>
                        <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${values[s.id] ? "translate-x-[18px]" : "translate-x-0.5"}`} />
                      </button>
                    ) : s.type === "select" ? (
                      <select value={values[s.id] as string} onChange={(e) => update(s.id, e.target.value)}
                        className="rounded-lg border border-border-primary bg-surface-secondary px-3 py-1.5 text-xs text-text-primary outline-none focus:border-accent">
                        {s.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    ) : s.type === "number" ? (
                      <input type="number" value={values[s.id] as number} onChange={(e) => update(s.id, parseInt(e.target.value) || 0)}
                        className="w-20 rounded-lg border border-border-primary bg-surface-secondary px-3 py-1.5 text-xs text-text-primary outline-none focus:border-accent" />
                    ) : (
                      <input type="text" value={values[s.id] as string} onChange={(e) => update(s.id, e.target.value)}
                        className="rounded-lg border border-border-primary bg-surface-secondary px-3 py-1.5 text-xs text-text-primary outline-none focus:border-accent w-48" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
