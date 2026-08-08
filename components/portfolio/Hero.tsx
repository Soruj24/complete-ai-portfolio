"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Loader2,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { useRef } from "react";
import { useSession } from "next-auth/react";
import { useSiteSettings } from "@/lib/hooks";
import { useSectionAnimation } from "@/lib/hooks/use-section-animation";

export function Hero() {
  const { data: session } = useSession();
  const containerRef = useRef(null);
  const { settings, socialLinks, loading } = useSiteSettings();
  const isAdmin = session?.user?.role === "admin";

  useSectionAnimation(
    containerRef,
    (tl) => {
      if (loading) return;

      tl.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.2,
      })
        .from(
          ".reveal-subtext",
          { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        )
        .from(
          ".reveal-button",
          { y: 20, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 },
          "-=0.4",
        );

      gsap.to(".float-element", {
        y: 20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.5,
      });
    },
    { deps: [loading], scrollTrigger: false },
  );

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </section>
    );
  }

  const siteName = settings?.siteName || "Soruj Mahmud";
  const fullName = settings?.fullName || "Soruj Mahmud";
  const professionalTitle = settings?.professionalTitle || "Full-Stack Developer";
  const email = settings?.contactEmail || "sorujmahmudb2h@gmail.com";
  const githubUrl = settings?.githubUrl || "https://github.com/sorujmahmud";
  const linkedinUrl = settings?.linkedinUrl || "#";

  const socialFromLinks = socialLinks.length > 0 ? socialLinks : [];
  const githubLink = socialFromLinks.find((l) => l.platform.toLowerCase() === "github")?.url || githubUrl;
  const linkedinLink = socialFromLinks.find((l) => l.platform.toLowerCase() === "linkedin")?.url || linkedinUrl;
  const emailLink = socialFromLinks.find((l) => l.platform.toLowerCase() === "email")?.url || `mailto:${email}`;

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-24 md:pt-32 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[30rem] md:w-[40rem] h-[30rem] md:h-[40rem] bg-accent/[0.03] blur-[80px] md:blur-[120px] rounded-full float-element" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[30rem] md:w-[40rem] h-[30rem] md:h-[40rem] bg-accent/[0.02] blur-[80px] md:blur-[120px] rounded-full float-element" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-surface border border-border-subtle text-[11px] font-semibold tracking-[0.12em] uppercase text-text-tertiary mb-6 reveal-button">
            <Sparkles className="h-3 w-3" />
            {siteName}
          </div>

          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.03em] text-text-primary leading-[1.1] mb-5 reveal-text">
            Design<span className="text-accent">.</span> Code
            <span className="text-accent">.</span>{" "}
            <br className="hidden sm:block" />
            <span className="gradient-text">
              Innovate.
            </span>
          </h1>

          <p className="text-[clamp(0.875rem,1.3vw,1.05rem)] text-text-secondary max-w-xl mx-auto leading-relaxed mb-7 reveal-subtext">
            Hello, I&apos;m{" "}
            <span className="text-text-primary font-semibold">
              {fullName}
            </span>
            . A {professionalTitle} dedicated to building
            scalable, high-impact digital experiences.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 reveal-button">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link href="#projects">
                Explore Projects{" "}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            {isAdmin && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Link href="/admin/dashboard" className="flex items-center">
                  Dashboard{" "}
                  <LayoutDashboard className="h-4 w-4" />
                </Link>
              </Button>
            )}

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link
                href="/Soruj_Mahmud_CV.txt"
                download="Soruj_Mahmud_CV.txt"
                className="flex items-center"
              >
                Download CV <Download className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-1 pt-10 reveal-button">
            {[
              { icon: Github, href: githubLink, label: "GitHub" },
              { icon: Linkedin, href: linkedinLink, label: "LinkedIn" },
              { icon: Mail, href: emailLink, label: "Email" },
            ].map((social, i) => (
              <Link
                key={i}
                href={social.href}
                target="_blank"
                className="group flex flex-col items-center gap-1.5"
              >
                <div className="p-2.5 rounded-lg bg-surface border border-border-subtle text-text-tertiary group-hover:text-accent group-hover:border-border transition-all duration-200">
                  <social.icon className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-text-tertiary group-hover:text-accent transition-colors duration-200">
                  {social.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 reveal-subtext">
        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-text-disabled">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-border to-transparent" />
      </div>
    </section>
  );
}
