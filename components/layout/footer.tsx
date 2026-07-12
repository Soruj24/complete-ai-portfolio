"use client";

import { useEffect, useState, useCallback } from "react";
import { ArrowUp, Mail, Github, Linkedin, Twitter, Globe } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import type { ISettings, ISocialLink } from "@/shared/types";

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
  website: Globe,
};

export function Footer() {
  const [settings, setSettings] = useState<ISettings | null>(null);
  const [socialLinks, setSocialLinks] = useState<ISocialLink[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, socialRes] = await Promise.all([
          fetch("/api/settings/public"),
          fetch("/api/social-links"),
        ]);

        if (settingsRes.ok) {
          const data = await settingsRes.json();
          if (data.success) setSettings(data.data);
        }

        if (socialRes.ok) {
          const data = await socialRes.json();
          if (data.success) setSocialLinks(data.data);
        }
      } catch {
        // Graceful degradation
      }
    };
    fetchData();
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const siteName = settings?.siteName || "Soruj Mahmud";
  const description = settings?.professionalTitle
    ? `${settings.fullName || "Soruj Mahmud"} - ${settings.professionalTitle}`
    : "AI Engineer & Full-Stack Developer";
  const email = settings?.contactEmail || "sorujmahmudb2h@gmail.com";
  const location = settings?.location || "Bangladesh";
  const year = new Date().getFullYear();

  const displaySocialLinks = socialLinks.length > 0 ? socialLinks : [];

  return (
    <footer id="footer" data-section className="relative border-t border-border bg-surface">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div className="space-y-4">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              {siteName}
              <span className="text-accent">.</span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              {description}
            </p>
            <div className="flex items-center gap-2">
              {displaySocialLinks.map((link) => {
                const Icon = iconMap[link.platform.toLowerCase()];
                if (!Icon) return null;
                return (
                  <Link
                    key={link._id || link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-text-tertiary hover:text-accent hover:bg-accent/10 transition-all"
                    aria-label={link.label}
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                );
              })}
              {displaySocialLinks.length === 0 && (
                <>
                  <Link href="https://github.com/Soruj24" target="_blank" className="p-2 rounded-lg text-text-tertiary hover:text-accent hover:bg-accent/10 transition-all" aria-label="GitHub"><Github className="w-4 h-4" /></Link>
                  <Link href="https://linkedin.com/in/soruj-mahmud" target="_blank" className="p-2 rounded-lg text-text-tertiary hover:text-accent hover:bg-accent/10 transition-all" aria-label="LinkedIn"><Linkedin className="w-4 h-4" /></Link>
                  <Link href={`mailto:${email}`} className="p-2 rounded-lg text-text-tertiary hover:text-accent hover:bg-accent/10 transition-all" aria-label="Email"><Mail className="w-4 h-4" /></Link>
                </>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-text-tertiary">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-text-tertiary">
              Contact
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href={`mailto:${email}`}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  {email}
                </Link>
              </li>
              <li>
                <span className="text-sm text-text-secondary">{location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 md:mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-tertiary">
            &copy; {year} {siteName}. All rights reserved.
          </p>
          <p className="text-[10px] text-text-disabled tracking-wider uppercase">
            Built with Next.js, Tailwind CSS &amp; Framer Motion
          </p>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full glass glass-hover shadow-lg text-text-secondary hover:text-accent transition-all duration-300"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </footer>
  );
}
