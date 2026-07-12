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
      <div className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-accent/12 via-accent/8 to-transparent blur-[100px]" />
      <div className="absolute -bottom-48 -left-48 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-blue-500/10 via-cyan-500/8 to-transparent blur-[100px]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-gradient-to-r from-violet-500/8 to-fuchsia-500/8 blur-[80px]" />
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
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
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
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium tracking-wide text-accent bg-accent/8 rounded-full ring-1 ring-accent/10">
              <Sparkle className="w-3 h-3" />
              {settings?.professionalTitle?.includes("Available") ? "Available for opportunities" : "Open to opportunities"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.2rem,6vw,4.5rem)] font-semibold tracking-tight leading-[1.05]"
          >
            <span className="text-text-primary">{settings?.fullName || "Soruj Mahmud"}</span>
            <span className="block mt-2 gradient-text text-[clamp(1.3rem,3.5vw,2.75rem)] font-medium">
              {settings?.professionalTitle || "AI Engineer & Full-Stack Developer"}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-[clamp(0.95rem,1.5vw,1.15rem)] text-text-secondary leading-relaxed max-w-lg mx-auto"
          >
            {settings?.bio || "I architect production-grade AI systems and full-stack applications with LangChain, MCP servers, and scalable infrastructure."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              onClick={() => scrollToSection("contact")}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground text-sm font-medium hover:brightness-110 transition-all active:scale-[0.98]"
            >
              Get in Touch
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-text-secondary text-sm font-medium hover:bg-surface hover:text-text-primary transition-all active:scale-[0.98]"
            >
              View Projects
            </button>
            <a
              href={SITE.resumeUrl}
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-text-tertiary text-sm font-medium hover:text-accent transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-10 flex items-center justify-center gap-3"
          >
            {socialIcons.map((item) => item && (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl text-text-tertiary hover:text-accent hover:bg-accent/8 transition-all"
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
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-tertiary/60">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-text-tertiary/30 to-transparent" />
      </motion.div>
    </section>
  );
}
