"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, Loader2, Globe, User, Link2, Search, Palette, Shield, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ISettings } from "@/shared/types";

type SettingsSection = "general" | "profile" | "social" | "seo" | "appearance" | "security";

const SECTIONS: { id: SettingsSection; label: string; icon: React.ElementType }[] = [
  { id: "general", label: "General", icon: Globe },
  { id: "profile", label: "Profile", icon: User },
  { id: "social", label: "Social Links", icon: Link2 },
  { id: "seo", label: "SEO", icon: Search },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "security", label: "Security", icon: Shield },
];

const ACCENT_COLORS = [
  "#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ec4899", "#06b6d4", "#ef4444", "#84cc16",
];

function Field({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-3">
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-text-primary">{label}</p>
        {description && <p className="text-[11px] text-text-tertiary mt-0.5">{description}</p>}
      </div>
      <div className="shrink-0 sm:w-64">{children}</div>
    </div>
  );
}

function TagInput({ value, onChange, placeholder }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [input, setInput] = useState("");
  const add = () => {
    const t = input.trim();
    if (t && !value.includes(t)) { onChange([...value, t]); setInput(""); }
  };
  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap gap-1">
        {value.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1 rounded-md bg-accent/10 px-2 py-0.5 text-[11px] text-accent">
            {tag}
            <button type="button" onClick={() => onChange(value.filter((t) => t !== tag))} className="hover:text-red-500">
              <X className="h-2.5 w-2.5" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-1.5">
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder={placeholder || "Add tag..."}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
          className="h-7 text-[12px]" />
        <Button type="button" variant="outline" size="sm" onClick={add} className="h-7 px-2">
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

export function GeneralPage() {
  const [settings, setSettings] = useState<Partial<ISettings>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState<SettingsSection>("general");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((json) => { setSettings(json.settings || {}); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const update = useCallback(<K extends keyof ISettings>(key: K, value: ISettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        const json = await res.json();
        setSettings(json.settings);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold text-text-primary">Settings</h1>
          <p className="text-[12px] text-text-tertiary">Manage your portfolio configuration</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setSettings(settings)} disabled={saving} className="h-8 text-[12px]">
            Cancel
          </Button>
          <Button size="sm" onClick={handleSave} disabled={saving} className="h-8 text-[12px] gap-1.5">
            {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
            {saved ? "Saved!" : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="flex gap-6">
        <nav className="w-48 shrink-0 space-y-1">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <button key={s.id} onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-medium transition-colors text-left ${
                  activeSection === s.id ? "bg-accent/10 text-accent" : "text-text-secondary hover:bg-surface-hover"
                }`}>
                <Icon className="h-3.5 w-3.5" />
                {s.label}
              </button>
            );
          })}
        </nav>

        <div className="flex-1 min-w-0">
          <div className="rounded-lg border border-border-subtle bg-surface divide-y divide-border-subtle">
            {activeSection === "general" && (
              <>
                <Field label="Portfolio Name" description="Displayed in the header and browser tab">
                  <Input value={settings.siteName || ""} onChange={(e) => update("siteName", e.target.value)} className="h-8 text-[12px]" />
                </Field>
                <Field label="Description" description="Brief description of your portfolio">
                  <Input value={settings.siteDescription || ""} onChange={(e) => update("siteDescription", e.target.value)} className="h-8 text-[12px]" />
                </Field>
                <Field label="Logo" description="URL to your logo image">
                  <Input value={settings.logo || ""} onChange={(e) => update("logo", e.target.value)} placeholder="https://..." className="h-8 text-[12px]" />
                </Field>
                <Field label="Favicon" description="URL to your favicon (32x32)">
                  <Input value={settings.favicon || ""} onChange={(e) => update("favicon", e.target.value)} placeholder="https://..." className="h-8 text-[12px]" />
                </Field>
                <Field label="Contact Email" description="Public contact email address">
                  <Input type="email" value={settings.contactEmail || ""} onChange={(e) => update("contactEmail", e.target.value)} className="h-8 text-[12px]" />
                </Field>
              </>
            )}

            {activeSection === "profile" && (
              <>
                <Field label="Full Name" description="Your display name">
                  <Input value={settings.fullName || ""} onChange={(e) => update("fullName", e.target.value)} className="h-8 text-[12px]" />
                </Field>
                <Field label="Role / Title" description="Professional title shown on the hero section">
                  <Input value={settings.professionalTitle || ""} onChange={(e) => update("professionalTitle", e.target.value)} className="h-8 text-[12px]" />
                </Field>
                <Field label="Bio" description="Short bio for the about section">
                  <textarea value={settings.bio || ""} onChange={(e) => update("bio", e.target.value)} rows={3}
                    className="w-full rounded-md border border-border-subtle bg-background px-3 py-2 text-[12px] text-text-primary outline-none focus:border-accent resize-none" />
                </Field>
                <Field label="Location" description="City, Country">
                  <Input value={settings.location || ""} onChange={(e) => update("location", e.target.value)} className="h-8 text-[12px]" />
                </Field>
                <Field label="Phone" description="Contact phone number">
                  <Input value={settings.phone || ""} onChange={(e) => update("phone", e.target.value)} className="h-8 text-[12px]" />
                </Field>
                <Field label="Avatar" description="URL to your profile photo">
                  <Input value={settings.avatar || ""} onChange={(e) => update("avatar", e.target.value)} placeholder="https://..." className="h-8 text-[12px]" />
                </Field>
                <Field label="Specializations" description="Key skills shown on the about section">
                  <TagInput value={settings.specializations || []} onChange={(v) => update("specializations", v)} placeholder="Add skill..." />
                </Field>
              </>
            )}

            {activeSection === "social" && (
              <>
                <Field label="GitHub" description="Your GitHub profile URL">
                  <Input value={settings.githubUrl || ""} onChange={(e) => update("githubUrl", e.target.value)} placeholder="https://github.com/..." className="h-8 text-[12px]" />
                </Field>
                <Field label="LinkedIn" description="Your LinkedIn profile URL">
                  <Input value={settings.linkedinUrl || ""} onChange={(e) => update("linkedinUrl", e.target.value)} placeholder="https://linkedin.com/in/..." className="h-8 text-[12px]" />
                </Field>
                <Field label="Twitter / X" description="Your Twitter/X profile URL">
                  <Input value={settings.twitterUrl || ""} onChange={(e) => update("twitterUrl", e.target.value)} placeholder="https://x.com/..." className="h-8 text-[12px]" />
                </Field>
                <Field label="YouTube" description="Your YouTube channel URL">
                  <Input value={settings.youtubeUrl || ""} onChange={(e) => update("youtubeUrl", e.target.value)} placeholder="https://youtube.com/..." className="h-8 text-[12px]" />
                </Field>
                <Field label="Website" description="Your personal website URL">
                  <Input value={settings.websiteUrl || ""} onChange={(e) => update("websiteUrl", e.target.value)} placeholder="https://..." className="h-8 text-[12px]" />
                </Field>
              </>
            )}

            {activeSection === "seo" && (
              <>
                <Field label="Site Title" description="Title tag for search engines">
                  <Input value={settings.seoTitle || ""} onChange={(e) => update("seoTitle", e.target.value)} placeholder="Portfolio - Full Stack Developer" className="h-8 text-[12px]" />
                </Field>
                <Field label="Meta Description" description="Description for search engine results">
                  <textarea value={settings.seoDescription || ""} onChange={(e) => update("seoDescription", e.target.value)} rows={2}
                    placeholder="Full-stack developer specializing in..."
                    className="w-full rounded-md border border-border-subtle bg-background px-3 py-2 text-[12px] text-text-primary outline-none focus:border-accent resize-none" />
                </Field>
                <Field label="Keywords" description="Meta keywords for SEO">
                  <TagInput value={settings.seoKeywords || []} onChange={(v) => update("seoKeywords", v)} placeholder="Add keyword..." />
                </Field>
                <Field label="OG Image" description="Image for social media sharing (1200x630)">
                  <Input value={settings.ogImage || ""} onChange={(e) => update("ogImage", e.target.value)} placeholder="https://..." className="h-8 text-[12px]" />
                </Field>
              </>
            )}

            {activeSection === "appearance" && (
              <>
                <Field label="Theme" description="Default color theme">
                  <select value={settings.theme || "system"} onChange={(e) => update("theme", e.target.value)}
                    className="w-full rounded-md border border-border-subtle bg-background px-3 py-1.5 text-[12px] text-text-primary outline-none focus:border-accent">
                    <option value="system">System</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </Field>
                <Field label="Accent Color" description="Primary accent color">
                  <div className="flex flex-wrap gap-1.5">
                    {ACCENT_COLORS.map((c) => (
                      <button key={c} type="button" onClick={() => update("accentColor", c)}
                        className={`h-6 w-6 rounded-md transition-all ${settings.accentColor === c ? "ring-2 ring-offset-2 ring-offset-background scale-110" : ""}`}
                        style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </Field>
                <Field label="Layout Style" description="Overall layout preference">
                  <select value={settings.layoutStyle || "modern"} onChange={(e) => update("layoutStyle", e.target.value)}
                    className="w-full rounded-md border border-border-subtle bg-background px-3 py-1.5 text-[12px] text-text-primary outline-none focus:border-accent">
                    <option value="modern">Modern</option>
                    <option value="classic">Classic</option>
                    <option value="minimal">Minimal</option>
                  </select>
                </Field>
              </>
            )}

            {activeSection === "security" && (
              <>
                <Field label="Maintenance Mode" description="Temporarily disable public access">
                  <button onClick={() => update("maintenanceMode", !settings.maintenanceMode)}
                    className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${settings.maintenanceMode ? "bg-amber-500" : "bg-border-subtle"}`}>
                    <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${settings.maintenanceMode ? "translate-x-4 ml-0.5" : "translate-x-0.5"}`} />
                  </button>
                </Field>
                <div className="py-4 px-4">
                  <p className="text-[11px] text-text-tertiary">Password and session management are handled through your account settings.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
