"use client";

import {
  Brain,
  Code2,
  GraduationCap,
  Rocket,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useState, useEffect } from "react";
import profilePic from "@/public/soruj-DESKTOP-Q8KK3O8.jpg";

gsap.registerPlugin(ScrollTrigger);

interface Settings {
  specializations?: string[];
  bio?: string;
  [key: string]: unknown;
}

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings/public");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          console.error("Non-JSON response received from /api/settings/public");
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

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            markers: false, // Set to true for debugging
          },
        });

        tl.from(".about-reveal-text", {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        })
          .from(
            ".about-value-item",
            {
              x: -20,
              opacity: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: "back.out(1.7)",
            },
            "-=0.5"
          )
          .from(
            ".about-card",
            {
              scale: 0.9,
              opacity: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "elastic.out(1, 0.8)",
            },
            "-=0.5"
          );
      }, sectionRef);

      return () => ctx.revert();
    },
    { dependencies: [loading, settings] }
  );

  if (loading) {
    return (
      <section className="py-32 flex items-center justify-center bg-white dark:bg-gray-900">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 dark:text-blue-400" />
      </section>
    );
  }

  const features = [
    {
      title: "AI & Innovation",
      description: settings?.specializations?.[0] || "AI Applications",
      icon: Brain,
      color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    },
    {
      title: "Full-Stack Mastery",
      description: settings?.specializations?.[2] || "Next.js & React",
      icon: Code2,
      color:
        "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
    },
    {
      title: "Scalable Solutions",
      description: "Modern web architecture and scalable solutions.",
      icon: Rocket,
      color: "bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white",
    },
    {
      title: "Expertise",
      description:
        settings?.bio ||
        "Self-taught developer with deep technical proficiency.",
      icon: GraduationCap,
      color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
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
      className="py-16 md:py-32 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-500"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
          <div className="relative about-image-container order-2 lg:order-1 px-4 md:px-0">
            <div className="aspect-square rounded-[24px] md:rounded-[80px] bg-gradient-to-br from-blue-600 to-indigo-900 overflow-hidden relative group">
              {/* Fixed image background */}
              <div
                className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${profilePic})`,
                }}
              />
              <div className="absolute inset-0 bg-blue-600/20  " />
            </div>

            {/* <div className="absolute -bottom-4 -right-2 md:-bottom-10 md:-right-10 bg-white dark:bg-gray-800 p-4 md:p-10 rounded-2xl md:rounded-[40px] shadow-2xl reveal-card about-card">
              <div className="text-2xl md:text-6xl font-black text-blue-600 dark:text-blue-400 mb-0.5 md:mb-1">5+</div>
              <div className="text-[8px] md:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Years Experience</div>
            </div> */}
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-6 md:mb-10 tracking-tight leading-tight about-reveal-text">
              Crafting Digital <br />
              <span className="text-blue-600 dark:text-blue-500">
                Masterpieces
              </span>
            </h2>

            <p className="text-sm md:text-xl text-gray-600 dark:text-gray-400 mb-8 md:mb-12 leading-relaxed about-reveal-text">
              {settings?.bio ||
                "I am a passionate developer dedicated to building high-performance web applications. With a focus on user experience and modern technologies, I turn complex problems into elegant solutions."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
              {coreValues.map((value, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 about-value-item p-3 md:p-4 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-gray-800/50"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 md:h-5 md:w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span className="font-bold text-xs md:text-base text-gray-700 dark:text-gray-300">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/4 h-full bg-blue-50/30 dark:bg-blue-900/10 -z-10 rounded-l-[50px] md:rounded-l-[100px]" />
    </section>
  );
}
