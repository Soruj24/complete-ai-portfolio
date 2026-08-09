"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Globe,
} from "lucide-react";
import { SITE, SOCIAL } from "@/lib/constants";
import { useReducedMotion } from "@/lib/hooks";
import { TechBadge } from "@/components/ui/tech-icon";
import type { ISettings, ISocialLink } from "@/shared/types";

interface HeroProps {
  settings: Partial<ISettings>;
  socialLinks: ISocialLink[];
}

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
  website: Globe,
};

const CORE_STACK = ["Next.js", "TypeScript", "Node.js", "MongoDB", "PostgreSQL", "AI"];

const ease = [0.16, 1, 0.3, 1] as const;

function HeroGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none"
      aria-hidden="true"
      style={{
        backgroundImage: `linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 100%)",
      }}
    />
  );
}

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export function Hero({ settings, socialLinks }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const socialIcons = socialLinks.length > 0
    ? socialLinks.map((link) => {
        const Icon = iconMap[link.platform.toLowerCase()];
        if (!Icon) return null;
        return { icon: Icon, href: link.url, label: link.label };
      }).filter(Boolean)
    : [
        { icon: Github, href: SOCIAL.github.url, label: "GitHub" },
        { icon: Linkedin, href: SOCIAL.linkedin.url, label: "LinkedIn" },
        { icon: Mail, href: `mailto:${SITE.email}`, label: "Email" },
      ];

  const anim = reducedMotion
    ? { initial: false, animate: undefined, transition: undefined }
    : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease } };

  const animUp = reducedMotion
    ? { initial: false, animate: undefined, transition: undefined }
    : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.04, ease } };

  const animBio = reducedMotion
    ? { initial: false, animate: undefined, transition: undefined }
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.12, ease } };

  const animCta = reducedMotion
    ? { initial: false, animate: undefined, transition: undefined }
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.16, ease } };

  const animStack = reducedMotion
    ? { initial: false, animate: undefined, transition: undefined }
    : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.2, ease } };

  const animSocial = reducedMotion
    ? { initial: false, animate: undefined, transition: undefined }
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5, delay: 0.24 } };

  const animScroll = reducedMotion
    ? { initial: false, animate: undefined, transition: undefined }
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6, delay: 0.4 } };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      <HeroGrid />

      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            {...anim}
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-medium tracking-wide text-text-secondary bg-surface border border-border-subtle rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Available for opportunities
            </span>
          </motion.div>

          <motion.h1
            {...animUp}
            className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.03em] leading-[1.1]"
          >
            <span className="text-text-primary">
              Building Scalable Web Apps
            </span>
            <span className="block text-text-primary">
              &amp; AI Products
            </span>
          </motion.h1>

          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={reducedMotion ? undefined : { duration: 0.5, delay: 0.08, ease }}
            className="mt-3 text-[clamp(0.8rem,1.2vw,0.95rem)] font-medium text-text-tertiary uppercase tracking-[0.06em]"
          >
            {settings?.fullName || SITE.name}
          </motion.p>

          <motion.p
            {...animBio}
            className="mt-4 text-[clamp(0.875rem,1.3vw,1rem)] text-text-secondary leading-relaxed max-w-md mx-auto"
          >
            {settings?.bio || "I architect production-grade AI systems and full-stack applications with LangChain, MCP servers, and scalable infrastructure."}
          </motion.p>

          <motion.div
            {...animCta}
            className="mt-7 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5 w-full"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-border-subtle bg-background text-text-primary text-[13px] font-medium hover:bg-surface hover:border-border transition-all duration-200 active:scale-[0.98] min-h-[44px]"
            >
              View Projects
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
            <a
              href={SITE.resumeUrl}
              download
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-[13px] font-medium hover:brightness-110 transition-all duration-200 active:scale-[0.98] min-h-[44px]"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              Download Resume
            </a>
            <button
              onClick={() => scrollToSection("contact")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-text-tertiary text-[13px] font-medium hover:text-text-secondary hover:bg-surface transition-all duration-200 active:scale-[0.98] min-h-[44px]"
            >
              <Mail className="w-3.5 h-3.5" aria-hidden="true" />
              Contact Me
            </button>
          </motion.div>

          <motion.div
            {...animStack}
            className="mt-6 flex flex-wrap items-center justify-center gap-1.5"
          >
            {CORE_STACK.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </motion.div>

          <motion.div
            {...animSocial}
            className="mt-6 flex items-center justify-center gap-1"
          >
            {socialIcons.map(
              (item) =>
                item && (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label={item.label}
                  >
                    <item.icon className="w-4 h-4" />
                  </a>
                )
            )}
          </motion.div>
        </div>
      </div>

      <motion.div
        {...animScroll}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-text-disabled">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-border to-transparent" />
      </motion.div>
    </section>
  );
}
