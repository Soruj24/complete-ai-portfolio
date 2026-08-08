"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Github, Linkedin, Download } from "lucide-react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { ModeToggle } from "@/components/mode-toggle";
import { MobileMenu } from "./navbar-mobile-menu";
import { useSiteSettings } from "@/lib/hooks";
import { SITE, SOCIAL } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { settings, socialLinks } = useSiteSettings();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoText = (settings?.siteName as string)?.split(" ")[0] || "Soruj";
  const isAdmin = session?.user?.role === "admin";

  const githubLink = socialLinks.find((l) => l.platform.toLowerCase() === "github")?.url || SOCIAL.github.url;
  const linkedinLink = socialLinks.find((l) => l.platform.toLowerCase() === "linkedin")?.url || SOCIAL.linkedin.url;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border-subtle"
            : "bg-transparent",
        )}
      >
        <nav className="container mx-auto px-4 flex items-center justify-between h-14" aria-label="Main navigation">
          {/* Logo */}
          <Link href="#home" className="text-[14px] font-semibold text-text-primary tracking-[-0.02em]">
            {logoText}<span className="text-accent">.</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-0.5 mr-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-2.5 py-1 text-[13px] font-medium text-text-tertiary hover:text-text-secondary rounded-md transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="h-4 w-px bg-border-subtle" />

            <div className="flex items-center gap-0.5 ml-4">
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>

              <div className="h-4 w-px bg-border-subtle mx-1" />

              <ModeToggle />

              <Link
                href={isAdmin ? "/admin/dashboard" : "/login"}
                className="ml-1 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-medium border border-border-subtle text-text-secondary hover:bg-surface hover:text-text-primary hover:border-border transition-all duration-200"
              >
                {isAdmin ? "Dashboard" : "Login"}
              </Link>
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-0.5">
            <ModeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-md hover:bg-surface transition-colors duration-200 text-text-secondary"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        logoText={logoText}
        githubLink={githubLink}
        linkedinLink={linkedinLink}
      />
    </>
  );
}
