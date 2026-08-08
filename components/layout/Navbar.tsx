"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import { useScrolledPast, useSiteSettings } from "@/lib/hooks";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navbar() {
  const scrolled = useScrolledPast(50);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { settings } = useSiteSettings();
  const siteName = settings?.siteName || "Soruj";
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
          className="container flex items-center justify-between h-14 md:h-16"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="text-[15px] font-semibold tracking-[-0.02em] text-text-primary hover:text-accent transition-colors duration-200"
          >
            {siteName}
            <span className="text-accent">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-0.5">
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
                    "relative px-3 py-1.5 text-[13px] font-medium rounded-md transition-colors duration-200",
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
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
            <div className="ml-3 pl-3 border-l border-border-subtle flex items-center gap-1">
              <ModeToggle />
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="gap-1.5 text-[13px] text-text-tertiary hover:text-text-secondary"
              >
                <Link href="/admin/dashboard">
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  Dashboard
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex md:hidden items-center gap-1">
            <ModeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md hover:bg-surface transition-colors duration-200"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 top-14 z-40 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <nav
              className="container py-6 flex flex-col gap-0.5"
              aria-label="Mobile navigation"
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "px-3 py-2.5 text-[15px] font-medium rounded-lg transition-colors duration-200",
                    activeSection === item.href.slice(2)
                      ? "text-text-primary bg-surface"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface/50",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-border-subtle">
                <Button asChild className="w-full gap-2">
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setMobileOpen(false)}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Admin Dashboard
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
