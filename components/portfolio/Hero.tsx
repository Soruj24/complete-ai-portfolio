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
import { useGSAP } from "@gsap/react";
import { useRef, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export function Hero() {
  const { data: session } = useSession();
  const containerRef = useRef(null);
  const [settings, setSettings] = useState<Record<string, unknown> | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const isAdmin = session?.user?.role === "admin";

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings/public");

        // Check if response is JSON
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          console.error("Non-JSON response received:", text.substring(0, 100));
          return;
        }

        const data = await res.json();
        if (data.success) {
          setSettings(data.settings);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  useGSAP(
    () => {
      if (loading || !settings) return;

      const tl = gsap.timeline();

      tl.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.2,
      })
        .from(
          ".reveal-subtext",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          ".reveal-button",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
          },
          "-=0.4"
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
    { scope: containerRef, dependencies: [loading, settings] }
  );

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </section>
    );
  }

  const personal_info = settings || {
    fullName: "Soruj Mahmud",
    professionalTitle: "Aspiring Full-Stack Developer",
    email: "sorujmahmudb2h@gmail.com",
    githubUrl: "https://github.com/sorujmahmud",
    linkedinUrl: "#",
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-24 md:pt-32 overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-500"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:44px_44px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]" />
        <div className="absolute -top-[10%] -left-[10%] w-[30rem] md:w-[40rem] h-[30rem] md:h-[40rem] bg-blue-400/10 dark:bg-blue-600/5 blur-[80px] md:blur-[120px] rounded-full float-element" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[30rem] md:w-[40rem] h-[30rem] md:h-[40rem] bg-indigo-400/10 dark:bg-indigo-600/5 blur-[80px] md:blur-[120px] rounded-full float-element" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 md:px-6 py-2 md:py-2.5 rounded-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm text-blue-600 dark:text-blue-400 text-xs md:text-sm font-black mb-6 md:mb-10 reveal-button">
            <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4 animate-pulse" />
            <span className="uppercase tracking-[0.2em]">
              {settings?.siteName as React.ReactNode || "Big Company Ready Portfolio"}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-black tracking-tight text-gray-900 dark:text-white leading-[0.95] md:leading-[0.9] mb-6 md:mb-10 reveal-text">
            Design<span className="text-blue-600">.</span> Code
            <span className="text-blue-600">.</span> <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-400 dark:to-white">
              Innovate.
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-2xl lg:text-3xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium mb-8 md:mb-12 reveal-subtext px-4 sm:px-0">
            Hello, I&apos;m{" "}
            <span className="text-gray-900 dark:text-white font-black">
              {personal_info.fullName as React.ReactNode}
            </span>
            . A <>{personal_info.professionalTitle}</> dedicated to building
            scalable, high-impact digital experiences.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 reveal-button px-4 sm:px-0">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 rounded-xl md:rounded-2xl bg-gray-900 dark:bg-white hover:bg-blue-600 dark:hover:bg-blue-500 text-white dark:text-gray-900 shadow-2xl shadow-gray-200 dark:shadow-none transition-all hover:-translate-y-1 font-black text-sm sm:text-base md:text-lg"
            >
              <Link href="#projects">
                Explore Projects <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </Button>

            {isAdmin && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 rounded-xl md:rounded-2xl border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all hover:-translate-y-1 font-black text-sm sm:text-base md:text-lg shadow-lg shadow-blue-50 dark:shadow-none"
              >
                <Link href="/admin/dashboard" className="flex items-center">
                  Dashboard <LayoutDashboard className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
            )}

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 rounded-xl md:rounded-2xl border-2 border-gray-100 dark:border-gray-800 font-black hover:bg-gray-50 dark:hover:bg-gray-800 transition-all hover:-translate-y-1 text-sm sm:text-base md:text-lg dark:text-white"
            >
              <Link
                href="/Soruj_Mahmud_CV.txt"
                download="Soruj_Mahmud_CV.txt"
                className="flex items-center"
              >
                Download CV <Download className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 md:gap-10 pt-12 md:pt-20 reveal-button">
            {[
              {
                icon: Github,
                href:
                  personal_info.githubUrl || "https://github.com/sorujmahmud",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: personal_info.linkedinUrl || "#",
                label: "LinkedIn",
              },
              {
                icon: Mail,
                href: `mailto:${personal_info.contactEmail || "sorujmahmudb2h@gmail.com"}`,
                label: "Email",
              },
            ].map((social, i) => (
              <Link
                key={i}
                href={social.href}
                target="_blank"
                className="group flex flex-col items-center gap-2"
              >
                <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-100 dark:group-hover:border-blue-900/50 group-hover:shadow-md transition-all duration-300">
                  <social.icon className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {social.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 reveal-subtext">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 dark:text-gray-500">
          Scroll
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-gray-100 dark:border-gray-800 p-1">
          <div className="w-1 h-2 bg-blue-600 rounded-full mx-auto animate-bounce" />
        </div>
      </div>
    </section>
  );
}
