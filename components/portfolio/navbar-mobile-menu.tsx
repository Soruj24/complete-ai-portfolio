"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Download } from "lucide-react";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { SITE } from "@/lib/constants";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  logoText: string;
  githubLink: string;
  linkedinLink: string;
}

export function MobileMenu({ open, onClose, logoText, githubLink, linkedinLink }: MobileMenuProps) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="fixed inset-0 top-14 z-[60] md:hidden bg-background/95 backdrop-blur-xl border-b border-border-subtle flex flex-col"
        >
          {/* Close button */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle">
            <Link href="#home" onClick={onClose}
              className="text-[14px] font-semibold text-text-primary tracking-[-0.02em]">
              {logoText}<span className="text-accent">.</span>
            </Link>
            <button onClick={onClose} className="p-1.5 rounded-md hover:bg-surface text-text-secondary transition-colors duration-200">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Nav links */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="flex flex-col gap-0.5">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.15 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block px-3 py-2.5 text-[15px] font-medium text-text-secondary hover:text-text-primary hover:bg-surface rounded-lg transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom actions */}
          <div className="px-4 py-3 border-t border-border-subtle space-y-2">
            <div className="flex items-center gap-1">
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
            <div className="flex flex-col gap-2">
              {isAdmin ? (
                <Link
                  href="/admin/dashboard"
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg bg-accent text-accent-foreground text-[13px] font-medium hover:brightness-110 transition-all duration-200"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg border border-border-subtle text-text-secondary text-[13px] font-medium hover:bg-surface hover:text-text-primary hover:border-border transition-all duration-200"
                >
                  Login
                </Link>
              )}
              <a
                href={SITE.resumeUrl}
                download
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg border border-border-subtle text-text-secondary text-[13px] font-medium hover:bg-surface hover:text-text-primary hover:border-border transition-all duration-200"
              >
                <Download className="h-3.5 w-3.5" />
                Resume
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
