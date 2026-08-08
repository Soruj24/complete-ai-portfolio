"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkle } from "lucide-react";
import { SITE } from "@/lib/constants";
import { useInView, useSiteSettings } from "@/lib/hooks";

export function CTA() {
  const [ref, isVisible] = useInView();
  const { settings } = useSiteSettings();

  const email = settings?.contactEmail || "sorujmahmudb2h@gmail.com";
  const resumeUrl = SITE.resumeUrl;

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-background border-t border-border-subtle">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--accent-subtle),transparent_60%)] pointer-events-none opacity-50" />

      <div ref={ref} className="container relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex justify-center mb-5">
            <span className="p-2 rounded-lg bg-accent/8 text-accent">
              <Sparkle className="w-4 h-4" />
            </span>
          </div>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-semibold tracking-[-0.02em] leading-[1.15] text-balance">
            Ready to build something{" "}
            <span className="gradient-text">extraordinary</span>?
          </h2>
          <p className="mt-3 text-[clamp(0.875rem,1.3vw,1rem)] text-text-secondary max-w-md mx-auto leading-relaxed">
            I&apos;m currently open to new opportunities and collaborations.
            Let&apos;s discuss how I can contribute to your team&apos;s success.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            <a
              href={`mailto:${email}`}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-[13px] font-medium hover:brightness-110 transition-all duration-200 active:scale-[0.98]"
            >
              Start a Conversation
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href={resumeUrl}
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border-subtle text-text-secondary text-[13px] font-medium hover:bg-surface hover:text-text-primary hover:border-border transition-all duration-200 active:scale-[0.98]"
            >
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
