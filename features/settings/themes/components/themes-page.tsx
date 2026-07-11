"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sun, Moon } from "lucide-react";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";
import type { ThemeConfig } from "../types";

export function ThemesPage() {
  const { data: response, isLoading } = useGetAdminResourceQuery({ resource: "themes" });
  const themes: ThemeConfig[] = response?.data ?? [];
  const [active, setActive] = useState("default");
  const [mode, setMode] = useState<"light" | "dark">("light");

  const filtered = themes.filter((t) => t.mode === mode);

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

      {isLoading ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border-primary bg-surface-primary p-1 animate-pulse">
              <div className="mb-2 h-24 rounded-lg bg-surface-hover" />
              <div className="p-2 space-y-2">
                <div className="h-4 bg-surface-hover rounded w-1/2" />
                <div className="h-3 bg-surface-hover rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-text-tertiary">
          <p className="text-lg font-medium">No themes available</p>
          <p className="text-sm">No {mode} themes found.</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}
