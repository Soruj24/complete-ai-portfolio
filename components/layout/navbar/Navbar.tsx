"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, SITE, SOCIAL } from "@/lib/constants";
import { useScrolledPast, useSiteSettings } from "@/lib/hooks";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const scrolled = useScrolledPast(50);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { settings, socialLinks } = useSiteSettings();
  const siteName = settings?.siteName?.split(" ")[0] || "Soruj";
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith("/#")) {
        e.preventDefault();
        const id = href.slice(2);
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          setActiveSection(id);
        }
        setMobileOpen(false);
      }
    },
    [],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" },
    );

    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      const firstFocusable = menuRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      firstFocusable?.focus();
    } else {
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const githubLink = socialLinks.find((l) => l.platform.toLowerCase() === "github")?.url || SOCIAL.github.url;
  const linkedinLink = socialLinks.find((l) => l.platform.toLowerCase() === "linkedin")?.url || SOCIAL.linkedin.url;

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border-subtle"
            : "bg-transparent",
        )}
      >
        <nav
          className="container flex items-center justify-between h-14"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="text-[14px] font-semibold tracking-[-0.02em] text-text-primary hover:text-accent transition-colors duration-200"
          >
            {siteName}
            <span className="text-accent">.</span>
          </Link>

          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-0.5 mr-4">
              {NAV_ITEMS.map((item) => {
                const isActive = item.href.startsWith("/#")
                  ? activeSection === item.href.slice(2)
                  : false;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      "relative px-2.5 py-1 text-[13px] font-medium rounded-md transition-colors duration-200",
                      isActive
                        ? "text-text-primary"
                        : "text-text-tertiary hover:text-text-secondary",
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 bg-surface border border-border-subtle rounded-md -z-10"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="h-4 w-px bg-border-subtle" />

            <div className="flex items-center gap-0.5 ml-4">
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200 min-h-[36px] min-w-[36px] flex items-center justify-center"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200 min-h-[36px] min-w-[36px] flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>

              <div className="h-4 w-px bg-border-subtle mx-1" />

              <ModeToggle />

              <Button
                asChild
                variant="outline"
                size="sm"
                className="ml-1 gap-1.5"
              >
                <a href={SITE.resumeUrl} download>
                  <Download className="h-3 w-3" aria-hidden="true" />
                  Resume
                </a>
              </Button>
            </div>
          </div>

          <div className="flex md:hidden items-center gap-1">
            <ModeToggle />
            <button
              ref={triggerRef}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2.5 rounded-lg hover:bg-surface transition-colors duration-200 text-text-secondary min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            ref={menuRef}
            activeSection={activeSection}
            onNavClick={handleNavClick}
            githubLink={githubLink}
            linkedinLink={linkedinLink}
            onClose={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
