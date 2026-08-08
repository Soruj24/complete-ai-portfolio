"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  LayoutDashboard,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { useRef } from "react";
import { useSession } from "next-auth/react";
import { useSiteSettings } from "@/lib/hooks";
import { useSectionAnimation } from "@/lib/hooks/use-section-animation";
import { SITE, SOCIAL } from "@/lib/constants";
import { TechBadge } from "@/components/ui/tech-icon";

const CORE_STACK = ["Next.js", "TypeScript", "Node.js", "MongoDB", "PostgreSQL", "AI"];

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
};

export function Hero() {
  const { data: session } = useSession();
  const containerRef = useRef(null);
  const { settings, socialLinks, loading } = useSiteSettings();
  const isAdmin = session?.user?.role === "admin";

  useSectionAnimation(
    containerRef,
    (tl) => {
      if (loading) return;

      tl.from(".hero-badge", { y: 8, opacity: 0, duration: 0.4, ease: "power3.out" })
        .from(".hero-heading", { y: 10, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.2")
        .from(".hero-name", { y: 8, opacity: 0, duration: 0.4, ease: "power3.out" }, "-=0.3")
        .from(".hero-bio", { y: 8, opacity: 0, duration: 0.4, ease: "power3.out" }, "-=0.3")
        .from(".hero-ctas", { y: 8, opacity: 0, duration: 0.4, ease: "power3.out" }, "-=0.2")
        .from(".hero-stack", { y: 6, opacity: 0, duration: 0.4, ease: "power3.out" }, "-=0.2")
        .from(".hero-socials", { opacity: 0, duration: 0.4, ease: "power3.out" }, "-=0.2");
    },
    { deps: [loading], scrollTrigger: false },
  );

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </section>
    );
  }

  const fullName = settings?.fullName || SITE.name;
  const email = settings?.contactEmail || SITE.email;
  const githubUrl = settings?.githubUrl || SOCIAL.github.url;
  const linkedinUrl = settings?.linkedinUrl || SOCIAL.linkedin.url;

  const socialFromLinks = socialLinks.length > 0 ? socialLinks : [];
  const githubLink = socialFromLinks.find((l) => l.platform.toLowerCase() === "github")?.url || githubUrl;
  const linkedinLink = socialFromLinks.find((l) => l.platform.toLowerCase() === "linkedin")?.url || linkedinUrl;
  const emailLink = socialFromLinks.find((l) => l.platform.toLowerCase() === "email")?.url || `mailto:${email}`;

  const socialIcons = [
    { icon: Github, href: githubLink, label: "GitHub" },
    { icon: Linkedin, href: linkedinLink, label: "LinkedIn" },
    { icon: Mail, href: emailLink, label: "Email" },
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Subtle grid */}
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

      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Badge */}
          <div className="mb-5 hero-badge">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-medium tracking-wide text-text-secondary bg-surface border border-border-subtle rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Available for opportunities
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.03em] leading-[1.1] hero-heading">
            <span className="text-text-primary">Building Scalable Web Apps</span>
            <span className="block text-text-primary">&amp; AI Products</span>
          </h1>

          {/* Name */}
          <p className="mt-3 text-[clamp(0.8rem,1.2vw,0.95rem)] font-medium text-text-tertiary uppercase tracking-[0.06em] hero-name">
            {fullName}
          </p>

          {/* Bio */}
          <p className="mt-4 text-[clamp(0.875rem,1.3vw,1rem)] text-text-secondary leading-relaxed max-w-md mx-auto hero-bio">
            {settings?.bio || "I architect production-grade AI systems and full-stack applications with LangChain, MCP servers, and scalable infrastructure."}
          </p>

          {/* CTAs */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5 hero-ctas">
            <Button asChild variant="outline" size="lg">
              <Link href="#projects">
                View Projects
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button asChild size="lg">
              <Link href={SITE.resumeUrl} download="Soruj_Mahmud_CV.txt">
                <Download className="h-3.5 w-3.5" />
                Download Resume
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="#contact">
                <Mail className="h-3.5 w-3.5" />
                Contact Me
              </Link>
            </Button>
            {isAdmin && (
              <Button asChild variant="outline" size="lg">
                <Link href="/admin/dashboard">
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  Dashboard
                </Link>
              </Button>
            )}
          </div>

          {/* Tech Stack */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 hero-stack">
            {CORE_STACK.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>

          {/* Socials */}
          <div className="mt-6 flex items-center justify-center gap-1 hero-socials">
            {socialIcons.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200"
                aria-label={item.label}
              >
                <item.icon className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hero-bio">
        <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-text-disabled">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-border to-transparent" />
      </div>
    </section>
  );
}
