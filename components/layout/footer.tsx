"use client";

import { useCallback } from "react";
import { ArrowUp, Mail, Github, Linkedin, Twitter, Globe } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { useSiteSettings } from "@/lib/hooks";
import Link from "next/link";

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
  website: Globe,
};

export function Footer() {
  const { settings, socialLinks } = useSiteSettings();

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
    <footer id="footer" data-section className="relative border-t border-border-subtle bg-background">
      <div className="container py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <div className="space-y-3">
            <Link href="/" className="text-[15px] font-semibold tracking-[-0.02em]">
              {siteName}
              <span className="text-accent">.</span>
            </Link>
            <p className="text-[13px] text-text-secondary leading-relaxed max-w-xs">
              {description}
            </p>
            <div className="flex items-center gap-0.5">
              {displaySocialLinks.map((link) => {
                const Icon = iconMap[link.platform.toLowerCase()];
                if (!Icon) return null;
                return (
                  <Link
                    key={link._id || link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200"
                    aria-label={link.label}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </Link>
                );
              })}
              {displaySocialLinks.length === 0 && (
                <>
                  <Link href="https://github.com/Soruj24" target="_blank" className="p-2 rounded-lg text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200" aria-label="GitHub"><Github className="w-3.5 h-3.5" /></Link>
                  <Link href="https://linkedin.com/in/soruj-mahmud" target="_blank" className="p-2 rounded-lg text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200" aria-label="LinkedIn"><Linkedin className="w-3.5 h-3.5" /></Link>
                  <Link href={`mailto:${email}`} className="p-2 rounded-lg text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200" aria-label="Email"><Mail className="w-3.5 h-3.5" /></Link>
                </>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-text-tertiary">
              Navigation
            </h3>
            <ul className="space-y-1.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[13px] text-text-secondary hover:text-text-primary transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-text-tertiary">
              Contact
            </h3>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href={`mailto:${email}`}
                  className="text-[13px] text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  {email}
                </Link>
              </li>
              <li>
                <span className="text-[13px] text-text-secondary">{location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 md:mt-12 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-text-tertiary">
            &copy; {year} {siteName}. All rights reserved.
          </p>
          <p className="text-[10px] text-text-disabled tracking-wider uppercase">
            Built with Next.js, Tailwind CSS &amp; Framer Motion
          </p>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 z-40 p-2.5 rounded-lg bg-surface border border-border-subtle shadow-sm text-text-tertiary hover:text-text-secondary hover:border-border transition-all duration-200"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-3.5 h-3.5" />
      </button>
    </footer>
  );
}
