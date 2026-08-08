"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, Download, Sparkle, Globe, Twitter } from "lucide-react";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useSiteSettings } from "@/lib/hooks";

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
  website: Globe,
};

function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-accent/[0.04] blur-[80px]" />
      <div className="absolute -bottom-32 -left-32 w-[350px] h-[350px] rounded-full bg-blue-500/[0.03] blur-[80px]" />
    </div>
  );
}

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { settings, socialLinks, loading } = useSiteSettings();

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
        <GradientOrbs />
        <div className="w-5 h-5 border-[1.5px] border-border-strong/30 border-t-accent rounded-full animate-spin" />
      </section>
    );
  }

  const socialIcons = socialLinks.length > 0
    ? socialLinks.map((link) => {
        const Icon = iconMap[link.platform.toLowerCase()];
        if (!Icon) return null;
        return { icon: Icon, href: link.url, label: link.label };
      }).filter(Boolean)
    : [
        { icon: Github, href: "https://github.com/Soruj24", label: "GitHub" },
        { icon: Linkedin, href: "https://linkedin.com/in/soruj-mahmud", label: "LinkedIn" },
        { icon: Mail, href: "mailto:sorujmahmudb2h@gmail.com", label: "Email" },
      ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      <GradientOrbs />

      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-[0.08em] uppercase text-text-tertiary">
              <Sparkle className="w-3 h-3" />
              {settings?.professionalTitle?.includes("Available") ? "Available for opportunities" : "Open to opportunities"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2rem,5.5vw,4rem)] font-semibold tracking-[-0.03em] leading-[1.08]"
          >
            <span className="text-text-primary">{settings?.fullName || "Soruj Mahmud"}</span>
            <span className="block mt-1.5 gradient-text text-[clamp(1.1rem,3vw,2.25rem)] font-medium tracking-[-0.02em]">
              {settings?.professionalTitle || "AI Engineer & Full-Stack Developer"}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 text-[clamp(0.875rem,1.3vw,1.05rem)] text-text-secondary leading-relaxed max-w-md mx-auto"
          >
            {settings?.bio || "I architect production-grade AI systems and full-stack applications with LangChain, MCP servers, and scalable infrastructure."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 flex flex-wrap items-center justify-center gap-2.5"
          >
            <button
              onClick={() => scrollToSection("contact")}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-[13px] font-medium hover:brightness-110 transition-all duration-200 active:scale-[0.98]"
            >
              Get in Touch
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border-subtle text-text-secondary text-[13px] font-medium hover:bg-surface hover:text-text-primary hover:border-border transition-all duration-200 active:scale-[0.98]"
            >
              View Projects
            </button>
            <a
              href={SITE.resumeUrl}
              download
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-text-tertiary text-[13px] font-medium hover:text-text-secondary transition-colors duration-200"
            >
              <Download className="w-3.5 h-3.5" />
              Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-8 flex items-center justify-center gap-1"
          >
            {socialIcons.map((item) => item && (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200"
                aria-label={item.label}
              >
                <item.icon className="w-4 h-4" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
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
