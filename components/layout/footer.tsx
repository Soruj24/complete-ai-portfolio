"use client";

import { useCallback } from "react";
import { ArrowUp, Mail, Github, Linkedin, Download } from "lucide-react";
import { NAV_ITEMS, SITE, SOCIAL } from "@/lib/constants";
import { useSiteSettings } from "@/lib/hooks";
import Link from "next/link";

export function Footer() {
  const { settings } = useSiteSettings();
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const name = settings?.fullName || SITE.name;
  const email = settings?.contactEmail || SITE.email;
  const year = new Date().getFullYear();

  return (
    <footer id="footer" data-section className="relative border-t border-border-subtle bg-background">
      <div className="container py-10 md:py-12">
        {/* Main row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Left — Brand */}
          <div className="space-y-2.5 max-w-xs">
            <Link href="/" className="text-[14px] font-semibold tracking-[-0.02em] text-text-primary">
              {name}
              <span className="text-accent">.</span>
            </Link>
            <p className="text-[12px] text-text-tertiary leading-relaxed">
              {settings?.professionalTitle || SITE.title}
            </p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              <span className="text-[11px] font-medium text-success">
                Available for opportunities
              </span>
            </div>
          </div>

          {/* Middle — Navigation */}
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[12px] font-medium text-text-tertiary hover:text-text-secondary transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right — Links */}
          <div className="flex items-center gap-1">
            <Link
              href={SOCIAL.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200"
              aria-label="GitHub"
            >
              <Github className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={SOCIAL.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={`mailto:${email}`}
              className="p-2 rounded-lg text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200"
              aria-label="Email"
            >
              <Mail className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={SITE.resumeUrl}
              download
              className="p-2 rounded-lg text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200"
              aria-label="Download Resume"
            >
              <Download className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-8 pt-5 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-text-tertiary">
            &copy; {year} {name}
          </p>
          <p className="text-[10px] text-text-disabled">
            Built with Next.js &amp; TypeScript
          </p>
        </div>
      </div>

      {/* Scroll to top */}
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
