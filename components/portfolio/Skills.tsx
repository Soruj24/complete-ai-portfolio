"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useRef, useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { ISkill } from "@/types";
import { useSectionAnimation } from "@/lib/hooks/use-section-animation";

export function Skills() {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch("/api/skills");
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

  useSectionAnimation(sectionRef, (tl) => {
    tl.from(".skills-reveal-text", { y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" })
      .from(".skill-card", { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }, "-=0.5")
      .from(".skill-progress-bar", { width: 0, duration: 1.5, stagger: 0.05, ease: "power4.out" }, "-=0.8");
  });

  return (
    <section id="skills" ref={sectionRef} className="py-20 md:py-28 bg-background border-t border-border-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-10 skills-reveal-text">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-tertiary mb-2 block">
            Skills
          </span>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-semibold tracking-[-0.02em] text-text-primary">
            Modern tools for{" "}
            <span className="text-text-tertiary">complex problems.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {loading ? (
            <div className="col-span-full flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          ) : categories.length === 0 ? (
            <div className="col-span-full text-center py-20 text-text-secondary">
              No skills found.
            </div>
          ) : (
            categories.map((category: SkillCategory, index: number) => (
              <div key={index} className="skill-card h-full">
                <Card className="border border-border-subtle rounded-xl overflow-hidden bg-surface hover:border-border transition-all duration-200 h-full">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-lg bg-accent/8 flex items-center justify-center text-xl">
                        {category.icon}
                      </div>
                      <h3 className="text-[15px] font-semibold text-text-primary tracking-[-0.01em]">{category.title}</h3>
                    </div>
                    <div className="space-y-4">
                      {category.skills.map((skill: ISkill, sIndex: number) => (
                        <div key={sIndex} className="group">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="font-medium text-[12px] text-text-secondary flex items-center gap-2 group-hover:text-accent transition-colors duration-200">
                              <span className="text-base">{skill.icon}</span>
                              <span>{skill.name}</span>
                            </span>
                            <span className="text-[10px] font-semibold text-accent bg-accent/8 px-2 py-0.5 rounded-md">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="h-1.5 bg-surface-hover rounded-full overflow-hidden">
                            <div
                              style={{ width: `${skill.level}%` }}
                              className={`h-full bg-gradient-to-r ${skill.color} rounded-full skill-progress-bar origin-left`}
                            />
                          </div>
                          {skill.description && (
                            <p className="text-[10px] text-text-tertiary font-medium mt-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 hidden md:block">
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
