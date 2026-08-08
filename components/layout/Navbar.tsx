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

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
};

export function Navbar() {
  const scrolled = useScrolledPast(50);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { settings, socialLinks } = useSiteSettings();
  const siteName = settings?.siteName?.split(" ")[0] || "Soruj";
  const navRef = useRef<HTMLElement>(null);

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
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
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
          {/* Logo */}
          <Link
            href="/"
            className="text-[14px] font-semibold tracking-[-0.02em] text-text-primary hover:text-accent transition-colors duration-200"
          >
            {siteName}
            <span className="text-accent">.</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center">
            {/* Nav links */}
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

            {/* Separator */}
            <div className="h-4 w-px bg-border-subtle" />

            {/* Right side actions */}
            <div className="flex items-center gap-0.5 ml-4">
              {/* Social links */}
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200 min-h-[36px] min-w-[36px] flex items-center justify-center"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200 min-h-[36px] min-w-[36px] flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>

              {/* Separator */}
              <div className="h-4 w-px bg-border-subtle mx-1" />

              {/* Theme toggle */}
              <ModeToggle />

              {/* Resume */}
              <Button
                asChild
                variant="outline"
                size="sm"
                className="ml-1 gap-1.5"
              >
                <a href={SITE.resumeUrl} download>
                  <Download className="h-3 w-3" />
                  Resume
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-1">
            <ModeToggle />
            <button
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

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed inset-0 top-14 z-40 bg-background/95 backdrop-blur-xl border-b border-border-subtle md:hidden"
          >
            <nav
              className="container py-5 flex flex-col gap-1"
              aria-label="Mobile navigation"
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "px-4 py-3 text-[15px] font-medium rounded-lg transition-colors duration-200 min-h-[44px] flex items-center",
                    activeSection === item.href.slice(2)
                      ? "text-text-primary bg-surface"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface/50",
                  )}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile actions */}
              <div className="mt-4 pt-4 border-t border-border-subtle flex flex-col gap-3">
                <div className="flex items-center gap-2 px-3">
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={linkedinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
                <Button asChild variant="outline" className="w-full gap-2 min-h-[44px] text-[14px]">
                  <a href={SITE.resumeUrl} download onClick={() => setMobileOpen(false)}>
                    <Download className="h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
