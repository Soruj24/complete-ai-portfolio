"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, SITE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface MobileMenuProps {
  activeSection: string;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  githubLink: string;
  linkedinLink: string;
  onClose: () => void;
}

export const MobileMenu = forwardRef<HTMLDivElement, MobileMenuProps>(
  ({ activeSection, onNavClick, githubLink, linkedinLink, onClose }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="fixed inset-0 top-14 z-40 bg-background/95 backdrop-blur-xl border-b border-border-subtle md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <nav
          className="container py-5 flex flex-col gap-1"
          aria-label="Mobile navigation"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => onNavClick(e, item.href)}
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

          <div className="mt-4 pt-4 border-t border-border-subtle flex flex-col gap-3">
            <div className="flex items-center gap-2 px-3">
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
            <Button asChild variant="outline" className="w-full gap-2 min-h-[44px] text-[14px]">
              <a href={SITE.resumeUrl} download onClick={onClose}>
                <Download className="h-4 w-4" aria-hidden="true" />
                Download Resume
              </a>
            </Button>
          </div>
        </nav>
      </motion.div>
    );
  },
);
MobileMenu.displayName = "MobileMenu";
