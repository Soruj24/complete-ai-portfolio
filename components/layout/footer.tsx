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
      <div className="container py-8 sm:py-10 md:py-12">
        {/* Main row */}
        <div className="flex flex-col gap-8">
          {/* Top row — Brand + Links */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
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
            <div className="flex flex-wrap gap-x-6 gap-y-1.5">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[12px] font-medium text-text-tertiary hover:text-text-secondary transition-colors duration-200 py-1"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom row — Social + Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-border-subtle">
            <p className="text-[11px] text-text-tertiary">
              &copy; {year} {name}
            </p>

            {/* Social links */}
            <div className="flex items-center gap-0.5">
              <Link
                href={SOCIAL.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200 min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label="GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={SOCIAL.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200 min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={`mailto:${email}`}
                className="p-2.5 rounded-lg text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200 min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={SITE.resumeUrl}
                download
                className="p-2.5 rounded-lg text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200 min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label="Download Resume"
              >
                <Download className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="text-[10px] text-text-disabled hidden sm:block">
              Built with Next.js &amp; TypeScript
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 p-3 rounded-lg bg-surface border border-border-subtle shadow-sm text-text-tertiary hover:text-text-secondary hover:border-border transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </footer>
  );
}
