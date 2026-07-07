"use client";

import { ArrowUp, Mail, Github, Linkedin, Twitter } from "lucide-react";
import { SOCIAL, SITE, NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
} as const;

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" data-section className="relative border-t border-border bg-surface">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div className="space-y-4">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              {SITE.name}
              <span className="text-accent">.</span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              {SITE.description}
            </p>
            <div className="flex items-center gap-2">
              {(Object.entries(SOCIAL) as [keyof typeof SOCIAL, typeof SOCIAL[keyof typeof SOCIAL]][]).map(
                ([key, social]) => {
                  const Icon = iconMap[key];
                  return (
                    <Link
                      key={key}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-text-tertiary hover:text-accent hover:bg-accent/10 transition-all"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </Link>
                  );
                }
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
                  href={`mailto:${SITE.email}`}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  {SITE.email}
                </Link>
              </li>
              <li>
                <span className="text-sm text-text-secondary">{SITE.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 md:mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-tertiary">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
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
