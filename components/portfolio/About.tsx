"use client";

import {
  MapPin,
  Briefcase,
  Code2,
  Layers,
  Zap,
  ArrowUpRight,
  BookOpen,
  Loader2,
} from "lucide-react";
import { useRef } from "react";
import { useSiteSettings } from "@/lib/hooks";
import { useSectionAnimation } from "@/lib/hooks/use-section-animation";
import { SITE } from "@/lib/constants";
import { TechBadge } from "@/components/ui/tech-icon";

const PRIMARY_STACK = ["Next.js", "TypeScript", "Node.js", "MongoDB", "AI"];

function InfoCard({
  icon: Icon,
  label,
  value,
  children,
}: {
  icon: React.ElementType;
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface border border-border-subtle">
      <div className="p-2 rounded-lg bg-accent/8 text-accent shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-text-tertiary mb-0.5">
          {label}
        </p>
        {value && (
          <p className="text-[13px] font-medium text-text-primary leading-snug">
            {value}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { settings, loading } = useSiteSettings();

  useSectionAnimation(
    sectionRef,
    (tl) => {
      if (loading || !settings) return;

      tl.from(".about-heading", { y: 10, opacity: 0, duration: 0.5, ease: "power3.out" })
        .from(".about-intro", { y: 8, opacity: 0, duration: 0.4, ease: "power3.out" }, "-=0.3")
        .from(".about-card", { y: 12, opacity: 0, duration: 0.4, stagger: 0.06, ease: "power3.out" }, "-=0.2")
        .from(".about-detail", { y: 8, opacity: 0, duration: 0.4, stagger: 0.08, ease: "power3.out" }, "-=0.2");
    },
    { deps: [loading, settings] },
  );

  if (loading) {
    return (
      <section className="py-20 md:py-28 flex items-center justify-center bg-background border-t border-border-subtle">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </section>
    );
  }

  const fullName = settings?.fullName || SITE.name;
  const title = settings?.professionalTitle || SITE.title;
  const bio =
    settings?.bio ||
    "I architect production-grade AI systems and full-stack applications with LangChain, MCP servers, and scalable infrastructure.";
  const location = settings?.location || SITE.location;
  const specializations = settings?.specializations || [];
  const yearsActive = new Date().getFullYear() - SITE.since;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-28 bg-background border-t border-border-subtle relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Left — Introduction */}
          <div className="lg:col-span-3 space-y-7">
            <div className="about-heading">
              <h2 className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-semibold tracking-[-0.02em] text-text-primary mb-2">
                Engineering Reliable Systems
              </h2>
              <p className="text-[14px] text-text-secondary">
                A focused developer building production-grade applications with modern tools and honest practices.
              </p>
            </div>

            <div className="space-y-4 about-intro">
              <p className="text-[14px] text-text-secondary leading-relaxed">
                {bio}
              </p>
              <p className="text-[14px] text-text-secondary leading-relaxed">
                I focus on building systems that are maintainable, well-structured, and built to last.
                Every project starts with understanding the problem deeply before writing a single line of code.
              </p>
            </div>

            {/* Philosophy */}
            <div className="space-y-3 about-detail">
              <h3 className="text-[17px] font-semibold text-text-primary tracking-[-0.01em]">
                Developer Philosophy
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Write code that other developers can read and maintain",
                  "Optimize for real user experience, not vanity metrics",
                  "Choose boring technology when it solves the problem",
                  "Build systems you can debug at 3 AM",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2 p-2.5 rounded-lg bg-surface border border-border-subtle"
                  >
                    <Zap className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                    <span className="text-[12.5px] text-text-secondary leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specializations */}
            {specializations.length > 0 && (
              <div className="space-y-3 about-detail">
                <h3 className="text-[17px] font-semibold text-text-primary tracking-[-0.01em]">
                  What I Specialize In
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {specializations.map((spec) => (
                    <span
                      key={spec}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11.5px] font-medium rounded-md bg-surface text-text-secondary border border-border-subtle"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Building & Learning */}
            <div className="space-y-3 about-detail">
              <h3 className="text-[17px] font-semibold text-text-primary tracking-[-0.01em]">
                Currently Building &amp; Learning
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  {
                    label: "Building",
                    items: [
                      "MCP server tooling for AI agents",
                      "Full-stack apps with Next.js 15 + App Router",
                    ],
                  },
                  {
                    label: "Learning",
                    items: [
                      "LangGraph for multi-agent orchestration",
                      "Advanced RAG patterns and retrieval strategies",
                    ],
                  },
                ].map((group) => (
                  <div
                    key={group.label}
                    className="p-3.5 rounded-xl bg-surface border border-border-subtle space-y-2"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">
                      {group.label}
                    </p>
                    {group.items.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <ArrowUpRight className="w-3 h-3 text-text-tertiary shrink-0 mt-0.5" />
                        <span className="text-[12.5px] text-text-secondary leading-snug">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Info Cards */}
          <div className="lg:col-span-2 space-y-2.5">
            <InfoCard icon={MapPin} label="Location" value={location} />
            <InfoCard icon={Briefcase} label="Role" value={title} />
            <InfoCard icon={Code2} label="Experience" value={`${yearsActive}+ years`} />
            <InfoCard icon={Layers} label="Primary Stack">
              <div className="flex flex-wrap gap-1 mt-1">
                {PRIMARY_STACK.map((tech) => (
                  <TechBadge key={tech} name={tech} />
                ))}
              </div>
            </InfoCard>
            <InfoCard icon={BookOpen} label="Availability">
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-[13px] font-medium text-success">
                  Open to opportunities
                </span>
              </div>
            </InfoCard>

            {/* Highlights */}
            <div className="mt-4 p-4 rounded-xl bg-surface border border-border-subtle space-y-3 about-card">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">
                Highlights
              </p>
              <div className="space-y-2.5">
                {[
                  "Self-taught developer with project-based learning approach",
                  "Experience building AI-powered applications with LangChain",
                  "Strong focus on clean architecture and code quality",
                  "Comfortable working across the full stack independently",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent shrink-0 mt-[5px]" />
                    <span className="text-[12.5px] text-text-secondary leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
