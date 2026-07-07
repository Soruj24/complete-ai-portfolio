"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkle } from "lucide-react";
import { SITE } from "@/lib/constants";
import { useInView } from "@/lib/hooks";

export function CTA() {
  const [ref, isVisible] = useInView();

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-surface">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--accent-subtle),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-subtle)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

      <div ref={ref} className="container relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex justify-center mb-6">
            <span className="p-2.5 rounded-xl bg-accent/10 text-accent">
              <Sparkle className="w-5 h-5" />
            </span>
          </div>
          <h2 className="text-[clamp(1.75rem,4vw,3.25rem)] font-semibold tracking-tight leading-[1.1] text-balance">
            Ready to build something{" "}
            <span className="gradient-text">extraordinary</span>?
          </h2>
          <p className="mt-4 text-[clamp(0.9rem,1.5vw,1.1rem)] text-text-secondary max-w-lg mx-auto leading-relaxed">
            I&apos;m currently open to new opportunities and collaborations.
            Let&apos;s discuss how I can contribute to your team&apos;s success.
          </p>
          <div className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${SITE.email}`}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground text-sm font-medium hover:brightness-110 transition-all active:scale-[0.98]"
            >
              Start a Conversation
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={SITE.resumeUrl}
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-text-secondary text-sm font-medium hover:bg-surface hover:text-text-primary transition-all active:scale-[0.98]"
            >
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
