"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import {
  User, Sparkles, Code2, Briefcase, FolderKanban, MessageSquare, FileText, Mail, Link2, Settings2,
} from "lucide-react";
import type { ContentSection, CMSStats } from "../types";

interface APIResponse {
  data: unknown[];
}

async function fetchCount(endpoint: string): Promise<{ count: number; lastUpdated: string | null }> {
  try {
    const res = await fetch(endpoint);
    if (!res.ok) return { count: 0, lastUpdated: null };
    const json: APIResponse = await res.json();
    const data = json.data ?? [];
    const last = data.length > 0 ? (data[data.length - 1] as Record<string, unknown>) : null;
    return {
      count: data.length,
      lastUpdated: (last?.updatedAt as string) || (last?.createdAt as string) || null,
    };
  } catch {
    return { count: 0, lastUpdated: null };
  }
}

async function fetchSettingsField(field: string): Promise<{ value: string | null; lastUpdated: string | null }> {
  try {
    const res = await fetch("/api/admin/settings");
    if (!res.ok) return { value: null, lastUpdated: null };
    const json = await res.json();
    const settings = json.data as Record<string, unknown> | undefined;
    return {
      value: settings?.[field] as string || null,
      lastUpdated: (settings?.updatedAt as string) || null,
    };
  } catch {
    return { value: null, lastUpdated: null };
  }
}

function buildSections(
  counts: Record<string, { count: number; lastUpdated: string | null }>,
  settingsFields: Record<string, { value: string | null; lastUpdated: string | null }>,
): ContentSection[] {
  const aboutDesc = settingsFields.about?.value || settingsFields.bio?.value;
  const heroDesc = settingsFields.heroTitle?.value || settingsFields.professionalTitle?.value;

  return [
    {
      id: "hero",
      name: "Hero Section",
      description: heroDesc || "Main landing hero with title and tagline",
      icon: Sparkles,
      adminPath: "/admin/settings/general",
      publicPath: "/",
      publicPageLabel: "Homepage",
      status: heroDesc ? "published" : "empty",
      itemCount: heroDesc ? 1 : 0,
      lastUpdated: settingsFields.heroTitle?.lastUpdated || settingsFields.professionalTitle?.lastUpdated,
      enabled: true,
    },
    {
      id: "about",
      name: "About",
      description: aboutDesc ? aboutDesc.slice(0, 80) + "..." : "Personal bio and introduction",
      icon: User,
      adminPath: "/admin/settings/general",
      publicPath: "/#about",
      publicPageLabel: "Homepage / About",
      status: aboutDesc ? "published" : "empty",
      itemCount: aboutDesc ? 1 : 0,
      lastUpdated: settingsFields.about?.lastUpdated || settingsFields.bio?.lastUpdated,
      enabled: true,
    },
    {
      id: "skills",
      name: "Skills",
      description: "Technical skills and proficiencies",
      icon: Code2,
      adminPath: "/admin/skills",
      publicPath: "/#skills",
      publicPageLabel: "Homepage / Skills",
      status: counts.skills?.count > 0 ? "published" : "empty",
      itemCount: counts.skills?.count || 0,
      lastUpdated: counts.skills?.lastUpdated,
      enabled: true,
    },
    {
      id: "experience",
      name: "Experience",
      description: "Work history and career timeline",
      icon: Briefcase,
      adminPath: "/admin/experience",
      publicPath: "/#experience",
      publicPageLabel: "Homepage / Experience",
      status: counts.experience?.count > 0 ? "published" : "empty",
      itemCount: counts.experience?.count || 0,
      lastUpdated: counts.experience?.lastUpdated,
      enabled: true,
    },
    {
      id: "projects",
      name: "Projects",
      description: "Portfolio projects and case studies",
      icon: FolderKanban,
      adminPath: "/admin/projects",
      publicPath: "/#projects",
      publicPageLabel: "Homepage / Projects",
      status: counts.projects?.count > 0 ? "published" : "empty",
      itemCount: counts.projects?.count || 0,
      lastUpdated: counts.projects?.lastUpdated,
      enabled: true,
    },
    {
      id: "testimonials",
      name: "Testimonials",
      description: "Client and colleague testimonials",
      icon: MessageSquare,
      adminPath: "/admin/testimonials",
      publicPath: "/#testimonials",
      publicPageLabel: "Homepage / Testimonials",
      status: counts.testimonials?.count > 0 ? "published" : "empty",
      itemCount: counts.testimonials?.count || 0,
      lastUpdated: counts.testimonials?.lastUpdated,
      enabled: true,
    },
    {
      id: "resume",
      name: "Resume",
      description: " downloadable resume and CV",
      icon: FileText,
      adminPath: "/admin/resume",
      publicPath: "/resume",
      publicPageLabel: "Resume Page",
      status: counts.resume?.count > 0 ? "published" : "empty",
      itemCount: counts.resume?.count || 0,
      lastUpdated: counts.resume?.lastUpdated,
      enabled: true,
    },
    {
      id: "contact",
      name: "Contact",
      description: "Contact form and inquiry settings",
      icon: Mail,
      adminPath: "/admin/settings/general",
      publicPath: "/#contact",
      publicPageLabel: "Homepage / Contact",
      status: settingsFields.contactEmail?.value ? "published" : "empty",
      itemCount: settingsFields.contactEmail?.value ? 1 : 0,
      lastUpdated: settingsFields.contactEmail?.lastUpdated,
      enabled: true,
    },
    {
      id: "social",
      name: "Social Links",
      description: "Social media profiles and links",
      icon: Link2,
      adminPath: "/admin/social-links",
      publicPath: "/",
      publicPageLabel: "Global (Footer/Header)",
      status: counts["social-links"]?.count > 0 ? "published" : "empty",
      itemCount: counts["social-links"]?.count || 0,
      lastUpdated: counts["social-links"]?.lastUpdated,
      enabled: true,
    },
  ];
}

export function useCMS() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [search, setSearch] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [skills, experience, projects, testimonials, resume, socialLinks, ...settingsResults] = await Promise.all([
        fetchCount("/api/admin/skills"),
        fetchCount("/api/admin/experience"),
        fetchCount("/api/admin/projects"),
        fetchCount("/api/admin/testimonials"),
        fetchCount("/api/admin/resume"),
        fetchCount("/api/admin/social-links"),
        fetchSettingsField("heroTitle"),
        fetchSettingsField("professionalTitle"),
        fetchSettingsField("about"),
        fetchSettingsField("bio"),
        fetchSettingsField("contactEmail"),
      ]);

      const counts: Record<string, { count: number; lastUpdated: string | null }> = {
        skills, experience, projects, testimonials, resume, "social-links": socialLinks,
      };

      const settingsFields: Record<string, { value: string | null; lastUpdated: string | null }> = {
        heroTitle: settingsResults[0],
        professionalTitle: settingsResults[1],
        about: settingsResults[2],
        bio: settingsResults[3],
        contactEmail: settingsResults[4],
      };

      setSections(buildSections(counts, settingsFields));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load content data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredSections = useMemo(() => {
    if (!search) return sections;
    const q = search.toLowerCase();
    return sections.filter(
      (s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
    );
  }, [sections, search]);

  const stats: CMSStats = useMemo(() => ({
    total: sections.length,
    published: sections.filter((s) => s.status === "published").length,
    draft: sections.filter((s) => s.status === "draft").length,
    empty: sections.filter((s) => s.status === "empty").length,
  }), [sections]);

  const toggleEnabled = useCallback((id: string) => {
    setSections((prev) => prev.map((s) => s.id === id ? { ...s, enabled: !s.enabled } : s));
  }, []);

  return {
    sections: filteredSections,
    allSections: sections,
    stats,
    loading,
    error,
    search,
    setSearch,
    toggleEnabled,
    refetch: fetchData,
  };
}
