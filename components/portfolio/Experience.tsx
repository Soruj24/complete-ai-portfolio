"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRef, useState, useEffect } from "react";
import { Loader2, Briefcase, Calendar, GraduationCap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { IExperience } from "@/types";

gsap.registerPlugin(ScrollTrigger);
// import { experiences } from "@/data/experience"; // Removed static import

export function Experience() {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await fetch("/api/experience");

        // Check if response is JSON
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          console.error("Non-JSON response received from /api/experience");
          return;
        }

        const data = await res.json();
        if (data.success) {
          setExperiences(data.experiences);
        }
      } catch (error) {
        console.error("Failed to fetch experiences:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".experience-reveal-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      })
        .from(
          ".experience-line",
          {
            scaleY: 0,
            transformOrigin: "top",
            duration: 1.5,
            ease: "none",
          },
          "-=0.5"
        )
        .from(
          ".experience-item",
          {
            x: (index) => (index % 2 === 0 ? -100 : 100),
            opacity: 0,
            duration: 1,
            stagger: 0.3,
            ease: "power4.out",
          },
          "-=1"
        )
        .from(
          ".experience-dot",
          {
            scale: 0,
            duration: 0.5,
            stagger: 0.3,
            ease: "back.out(2)",
          },
          "-=1.2"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section id="experience" ref={sectionRef} className="py-20 md:py-32 bg-[#fafafa] dark:bg-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-24">
          <h2 className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400 mb-4 md:mb-6 experience-reveal-text">
            Career Path
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 md:mb-8 experience-reveal-text">
            My journey through <br />
            <span className="text-gray-400 dark:text-gray-500">tech & innovation.</span>
          </h3>
        </div>

        <div className="max-w-5xl mx-auto relative px-2 md:px-0">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800 md:-translate-x-1/2 experience-line" />

          <div className="space-y-12 md:space-y-24">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-10 w-10 md:h-12 md:w-12 animate-spin text-blue-600 dark:text-blue-400" />
              </div>
            ) : experiences.length === 0 ? (
              <div className="text-center py-20 text-gray-500 dark:text-gray-400">
                No experience records found.
              </div>
            ) : (
              experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-12 experience-item ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full md:w-[45%] pl-10 md:pl-0">
                    <Card className="border-none shadow-2xl shadow-gray-200/50 dark:shadow-none rounded-[24px] md:rounded-[40px] overflow-hidden bg-white dark:bg-gray-800/50 group hover:-translate-y-2 transition-all duration-500">
                      <CardContent className="p-6 md:p-10">
                        <div className="flex items-center justify-between mb-4 md:mb-8">
                          <Badge
                            className={`bg-gradient-to-r ${exp.color} text-white border-none font-black px-4 md:px-6 py-1.5 md:py-2 rounded-lg md:rounded-2xl text-[9px] md:text-xs uppercase tracking-widest shadow-lg`}
                          >
                            {exp.year}
                          </Badge>
                          <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-2xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-lg md:text-2xl text-gray-900 dark:text-white group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:text-white transition-all">
                            {exp.icon}
                          </div>
                        </div>
                        <h3 className="text-xl md:text-3xl font-black text-gray-900 dark:text-white mb-2">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black mb-3 md:mb-6 uppercase tracking-wider text-[10px] md:text-sm">
                          <Briefcase className="h-3.5 w-3.5 md:h-4 md:w-4" />
                          {exp.company}
                        </div>
                        <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-6 md:mb-10">
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-2 md:gap-3">
                          {exp.technologies?.map(
                            (tech: string, tIndex: number) => (
                              <Badge
                                key={tIndex}
                                variant="secondary"
                                className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 border-none font-black px-2.5 md:px-4 py-1 md:py-2 rounded-md md:rounded-xl text-[9px] md:text-[10px] uppercase tracking-tighter group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                              >
                                {tech}
                              </Badge>
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-4 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-white dark:bg-gray-950 border-2 md:border-4 border-blue-600 dark:border-blue-500 shadow-[0_0_0_6px_rgba(37,99,235,0.1)] md:shadow-[0_0_0_8px_rgba(37,99,235,0.1)] dark:shadow-[0_0_0_6px_rgba(37,99,235,0.05)] md:dark:shadow-[0_0_0_8px_rgba(37,99,235,0.05)] z-10 experience-dot" />

                  {/* Empty space for opposite side */}
                  <div className="hidden md:block w-[45%]" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
