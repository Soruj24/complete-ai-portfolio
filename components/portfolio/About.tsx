"use client";

import {
  Brain,
  Code2,
  GraduationCap,
  Rocket,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useRef } from "react";
import { useSiteSettings } from "@/lib/hooks";
import { useSectionAnimation } from "@/lib/hooks/use-section-animation";
import profilePic from "@/public/soruj-DESKTOP-Q8KK3O8.jpg";

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { settings, loading } = useSiteSettings();

  useSectionAnimation(
    sectionRef,
    (tl) => {
      if (loading || !settings) return;

      tl.from(".about-reveal-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      })
        .from(
          ".about-value-item",
          { x: -20, opacity: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" },
          "-=0.5",
        )
        .from(
          ".about-card",
          { scale: 0.9, opacity: 0, duration: 0.8, stagger: 0.15, ease: "elastic.out(1, 0.8)" },
          "-=0.5",
        );
    },
    { deps: [loading, settings] },
  );

  if (loading) {
    return (
      <section className="py-20 md:py-28 flex items-center justify-center bg-background border-t border-border-subtle">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </section>
    );
  }

  const specializations = settings?.specializations || [];
  const bio = settings?.bio || "";
  const fullName = settings?.fullName || "Soruj Mahmud";

  const features = [
    {
      title: "AI & Innovation",
      description: specializations[0] || "AI Applications",
      icon: Brain,
    },
    {
      title: "Full-Stack Mastery",
      description: specializations[1] || "Next.js & React",
      icon: Code2,
    },
    {
      title: "Scalable Solutions",
      description: specializations[2] || "Modern web architecture and scalable solutions.",
      icon: Rocket,
    },
    {
      title: "Expertise",
      description: settings?.professionalTitle || "Full-Stack Developer",
      icon: GraduationCap,
    },
  ];

  const coreValues = [
    "Clean & Maintainable Code",
    "Performance Optimization",
    "User-Centric Design",
    "Scalable Architecture",
    "Modern Tech Stack",
    "Agile Methodology",
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-28 bg-background border-t border-border-subtle relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="relative about-image-container order-2 lg:order-1 px-4 md:px-0">
            <div className="aspect-square rounded-xl bg-accent/5 overflow-hidden relative group border border-border-subtle">
              <div
                className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${profilePic.src})`,
                }}
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-semibold tracking-[-0.02em] text-text-primary mb-4 about-reveal-text">
              Crafting Digital{" "}
              <span className="text-accent">
                Masterpieces
              </span>
            </h2>

            <p className="text-[13px] text-text-secondary mb-6 leading-relaxed about-reveal-text">
              {bio || `${fullName} is a passionate developer dedicated to building high-performance web applications.`}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {coreValues.map((value, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 about-value-item p-2.5 rounded-lg bg-surface border border-border-subtle"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                  <span className="font-medium text-[12px] text-text-secondary">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
