"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Camera, Save, AtSign, Globe, MapPin, Link2, Github, Twitter, Linkedin } from "lucide-react";

export function ProfilePage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "John Doe",
    email: "john@example.com",
    username: "johndoe",
    bio: "Full-stack developer passionate about building great products. Specializing in React, Next.js, and Node.js.",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    github: "johndoe",
    twitter: "@johndoe",
    linkedin: "john-doe",
  });

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const update = (key: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Profile</h1>
          <p className="text-sm text-text-tertiary">Manage your personal information and public profile</p>
        </div>
        <button onClick={handleSave}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-white transition-all ${saved ? "bg-success" : "bg-accent hover:bg-accent-hover"}`}>
          <Save size={14} /> {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="rounded-xl border border-border-primary bg-surface-primary p-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-accent/20 text-3xl font-bold text-accent">
              {form.name.charAt(0)}
            </div>
            <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface-primary bg-surface-hover text-text-secondary transition-colors hover:bg-accent hover:text-white">
              <Camera size={14} />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-text-primary">{form.name}</h2>
            <p className="text-sm text-text-tertiary">{form.email}</p>
            <p className="mt-1 text-sm text-text-secondary">{form.bio}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border-primary bg-surface-primary p-5">
          <h3 className="mb-4 text-sm font-semibold text-text-primary"><User size={16} className="inline mr-2" />Personal Info</h3>
          <div className="space-y-4">
            {[
              { key: "name" as const, label: "Full Name", icon: User },
              { key: "email" as const, label: "Email", icon: AtSign },
              { key: "username" as const, label: "Username", icon: AtSign },
              { key: "location" as const, label: "Location", icon: MapPin },
            ].map((field) => (
              <div key={field.key}>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs text-text-secondary"><field.icon size={12} />{field.label}</label>
                <input type="text" value={form[field.key]} onChange={(e) => update(field.key, e.target.value)}
                  className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border-primary bg-surface-primary p-5">
          <h3 className="mb-4 text-sm font-semibold text-text-primary"><Link2 size={16} className="inline mr-2" />Social Links</h3>
          <div className="space-y-4">
            {[
              { key: "website" as const, label: "Website", icon: Globe, placeholder: "https://" },
              { key: "github" as const, label: "GitHub", icon: Github, placeholder: "username" },
              { key: "twitter" as const, label: "Twitter", icon: Twitter, placeholder: "@username" },
              { key: "linkedin" as const, label: "LinkedIn", icon: Linkedin, placeholder: "username" },
            ].map((field) => (
              <div key={field.key}>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs text-text-secondary"><field.icon size={12} />{field.label}</label>
                <input type="text" value={form[field.key]} onChange={(e) => update(field.key, e.target.value)} placeholder={field.placeholder}
                  className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border-primary bg-surface-primary p-5">
        <h3 className="mb-4 text-sm font-semibold text-text-primary">Bio</h3>
        <textarea value={form.bio} onChange={(e) => update("bio", e.target.value)} rows={4}
          className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent resize-none" />
        <p className="mt-1 text-xs text-text-tertiary">{form.bio.length}/500 characters</p>
      </div>
    </div>
  );
}
