"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useRef, useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ISkill } from "@/types";

gsap.registerPlugin(ScrollTrigger);
// import { skillCategories } from "@/data/skills"; // Removed static import

export function Skills() {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch("/api/skills");
        
        // Check if response is JSON
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          console.error("Non-JSON response received from /api/skills");
          return;
        }

        const data = await res.json();
        if (data.success) {
          setSkills(data.skills);
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // Group skills by category
  interface SkillCategory {
    title: string;
    icon: string;
    skills: ISkill[];
  }

  const categories = skills.reduce((acc: SkillCategory[], skill: ISkill) => {
    const category = acc.find((c) => c.title === skill.category);
    if (category) {
      category.skills.push(skill);
    } else {
      acc.push({
        title: skill.category,
        icon: skill.icon || "🛠️",
        skills: [skill]
      });
    }
    return acc;
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.from(".skills-reveal-text", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    })
    .from(".skill-card", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.5")
    .from(".skill-progress-bar", {
      width: 0,
      duration: 1.5,
      stagger: 0.05,
      ease: "power4.out"
    }, "-=0.8");
  }, { scope: sectionRef });

  return (
    <section id="skills" ref={sectionRef} className="py-20 md:py-32 bg-[#fafafa] dark:bg-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-24">
          <h2 className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400 mb-4 md:mb-6 skills-reveal-text">
            Technical Arsenal
          </h2>
          <h3 className="text-3xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 md:mb-8 skills-reveal-text">
            Modern tools for <br />
            <span className="text-gray-400 dark:text-gray-500">complex problems.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading ? (
            <div className="col-span-full flex justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600 dark:text-blue-400" />
            </div>
          ) : categories.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-500 dark:text-gray-400">
              No skills found.
            </div>
          ) : (
            categories.map((category: SkillCategory, index: number) => (
              <div key={index} className="skill-card h-full">
                <Card className="border-none shadow-2xl shadow-gray-200/50 dark:shadow-none rounded-[24px] md:rounded-[40px] overflow-hidden bg-white dark:bg-gray-800/50 hover:-translate-y-2 transition-all duration-500 h-full">
                  <CardContent className="p-6 md:p-10">
                    <div className="flex items-center gap-3 md:gap-5 mb-6 md:mb-10">
                      <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-xl md:text-3xl">
                        {category.icon}
                      </div>
                      <h3 className="text-lg md:text-2xl font-black text-gray-900 dark:text-white tracking-tight">{category.title}</h3>
                    </div>
                    <div className="space-y-4 md:space-y-8">
                      {category.skills.map((skill: ISkill, sIndex: number) => (
                        <div key={sIndex} className="group">
                          <div className="flex justify-between items-center mb-1.5 md:mb-3">
                            <span className="font-bold text-xs md:text-base text-gray-700 dark:text-gray-300 flex items-center gap-2 md:gap-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              <span className="text-base md:text-xl">{skill.icon}</span> 
                              <span>{skill.name}</span>
                            </span>
                            <span className="text-[10px] md:text-sm font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 md:px-3 py-0.5 md:py-1 rounded-full">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="h-1.5 md:h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              style={{ width: `${skill.level}%` }}
                              className={`h-full bg-gradient-to-r ${skill.color} rounded-full skill-progress-bar origin-left`}
                            />
                          </div>
                          {skill.description && (
                            <p className="text-[9px] text-gray-400 dark:text-gray-500 font-bold mt-2 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0 hidden md:block">
                              {skill.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
