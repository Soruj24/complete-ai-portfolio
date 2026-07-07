"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, RefreshCw, Save, Eye, EyeOff, Menu, GripVertical, FileDown } from "lucide-react";
import type { ResumeSection, ResumeTemplate } from "../types";

const DEFAULT_SECTIONS: ResumeSection[] = [
  { id: "rs-1", title: "Professional Summary", type: "summary", content: "Experienced Full-Stack Developer with 7+ years building scalable web applications. Proficient in React, Next.js, Node.js, and cloud technologies. Passionate about clean code, mentoring, and delivering impactful products.", order: 1, visible: true },
  { id: "rs-2", title: "Experience", type: "experience", content: "Senior Full-Stack Developer at TechCorp Inc. (2023-Present)\nFull-Stack Developer at StartupXYZ (2021-2023)\nFrontend Developer at WebAgency Pro (2019-2021)", order: 2, visible: true },
  { id: "rs-3", title: "Education", type: "education", content: "M.S. Computer Science – Stanford University (2024-2026)\nB.S. Computer Science & Mathematics – UC Berkeley (2020-2024)", order: 3, visible: true },
  { id: "rs-4", title: "Technical Skills", type: "skills", content: "Languages: TypeScript, JavaScript, Python, SQL\nFrameworks: React, Next.js, Node.js, Express\nTools: Docker, AWS, Git, CI/CD\nDatabases: PostgreSQL, MongoDB, Redis", order: 4, visible: true },
  { id: "rs-5", title: "Certifications", type: "certifications", content: "AWS Solutions Architect Associate\nGoogle Cloud Professional Developer\nKubernetes Administrator (CKA)", order: 5, visible: false },
];

const TEMPLATES: ResumeTemplate[] = [
  { id: "rt-1", name: "Modern", description: "Clean two-column layout with accent sidebar", preview: "modern" },
  { id: "rt-2", name: "Classic", description: "Traditional single-column professional format", preview: "classic" },
  { id: "rt-3", name: "Minimal", description: "Minimalist design with ample whitespace", preview: "minimal" },
  { id: "rt-4", name: "Creative", description: "Bold design with color blocks and icons", preview: "creative" },
];

export function ResumePage() {
  const [sections, setSections] = useState(DEFAULT_SECTIONS);
  const [template, setTemplate] = useState("rt-1");
  const [includePhoto, setIncludePhoto] = useState(true);
  const [includeContact, setIncludeContact] = useState(true);
  const [saved, setSaved] = useState(false);

  const toggleSection = (id: string) => setSections((prev) => prev.map((s) => s.id === id ? { ...s, visible: !s.visible } : s));

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const visibleCount = sections.filter((s) => s.visible).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Resume Builder</h1>
          <p className="text-sm text-text-tertiary">Configure and manage your resume content</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-border-primary px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-hover">
            <FileDown size={14} /> Export PDF
          </button>
          <button onClick={handleSave}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-white transition-all ${saved ? "bg-success" : "bg-accent hover:bg-accent-hover"}`}>
            <Save size={14} /> {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Sections", value: sections.length, icon: FileText },
          { label: "Visible", value: visibleCount, icon: Eye },
          { label: "Hidden", value: sections.length - visibleCount, icon: EyeOff },
          { label: "Templates", value: TEMPLATES.length, icon: Menu },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border-primary bg-surface-primary p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-hover text-accent"><s.icon size={18} /></div>
              <div><p className="text-xs text-text-tertiary">{s.label}</p><p className="text-lg font-semibold text-text-primary">{s.value}</p></div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-text-primary">Sections</h3>
          {sections.map((sec, i) => (
            <motion.div key={sec.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="rounded-xl border border-border-primary bg-surface-primary p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <GripVertical size={16} className="text-text-tertiary cursor-grab" />
                  <div>
                    <h4 className="font-medium text-text-primary">{sec.title}</h4>
                    <span className="text-xs text-text-tertiary capitalize">{sec.type}</span>
                  </div>
                </div>
                <button onClick={() => toggleSection(sec.id)}
                  className={`rounded-lg p-1.5 transition-colors ${sec.visible ? "text-text-tertiary hover:text-text-primary" : "text-error hover:text-error"}`}>
                  {sec.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
              <textarea value={sec.content} onChange={(e) => setSections((prev) => prev.map((s) => s.id === sec.id ? { ...s, content: e.target.value } : s))}
                rows={sec.type === "skills" ? 4 : 3}
                className="w-full rounded-lg border border-border-primary bg-surface-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent resize-none" />
            </motion.div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-border-primary bg-surface-primary p-5">
            <h3 className="mb-4 text-sm font-semibold text-text-primary">Template</h3>
            <div className="space-y-2">
              {TEMPLATES.map((t) => (
                <button key={t.id} onClick={() => setTemplate(t.id)}
                  className={`w-full rounded-lg border p-3 text-left transition-all ${template === t.id ? "border-accent bg-accent/5" : "border-border-primary hover:border-border-hover"}`}>
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold ${template === t.id ? "bg-accent text-white" : "bg-surface-hover text-text-secondary"}`}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{t.name}</p>
                      <p className="text-xs text-text-tertiary">{t.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border-primary bg-surface-primary p-5">
            <h3 className="mb-4 text-sm font-semibold text-text-primary">Options</h3>
            <div className="space-y-3">
              {[
                { label: "Include Photo", value: includePhoto, set: setIncludePhoto },
                { label: "Include Contact Info", value: includeContact, set: setIncludeContact },
              ].map((opt) => (
                <label key={opt.label} className="flex items-center justify-between">
                  <span className="text-sm text-text-primary">{opt.label}</span>
                  <button onClick={() => opt.set(!opt.value)} className={`relative h-5 w-8 rounded-full transition-colors ${opt.value ? "bg-accent" : "bg-surface-hover"}`}>
                    <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${opt.value ? "translate-x-[14px]" : "translate-x-0.5"}`} />
                  </button>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border-primary bg-surface-primary p-5">
            <h3 className="mb-3 text-sm font-semibold text-text-primary">Preview</h3>
            <div className="rounded-lg border border-border-primary bg-surface-secondary p-4">
              <div className="mb-3 text-center">
                <div className="mx-auto mb-1 h-12 w-12 rounded-full bg-accent/20" />
                <p className="text-sm font-semibold text-text-primary">John Doe</p>
                <p className="text-xs text-text-tertiary">Full-Stack Developer</p>
              </div>
              <div className="space-y-2 text-xs text-text-secondary">
                {sections.filter((s) => s.visible).map((s) => (
                  <div key={s.id}>
                    <p className="font-medium text-text-primary">{s.title}</p>
                    <p className="line-clamp-2 text-text-tertiary">{s.content.split("\n")[0]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


