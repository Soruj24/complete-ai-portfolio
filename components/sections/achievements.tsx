"use client";

import { useState, useEffect } from "react";
import { Trophy, Star, ExternalLink, Loader2 } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GlassCard } from "@/components/ui/glass-card";

interface Achievement {
  _id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  date: string;
  issuer: string;
  url?: string;
  featured: boolean;
}

export function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/achievements");
        if (res.ok) {
          const data = await res.json();
          if (data.success) setAchievements(data.data);
        }
      } catch {
        // Graceful degradation
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Section id="achievements">
        <div className="container flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-accent" />
        </div>
      </Section>
    );
  }

  if (achievements.length === 0) return null;

  const featured = achievements.filter((a) => a.featured);
  const display = featured.length > 0 ? featured : achievements;

  return (
    <Section id="achievements">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--accent-subtle),transparent_50%)] pointer-events-none" />
      <SectionHeader
        label="Achievements"
        title="Recognition & Milestones"
        description="Key accomplishments that highlight my journey and impact."
      />
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {display.slice(0, 6).map((item, i) => (
            <AnimatedSection key={item._id} delay={i * 0.05}>
              <GlassCard variant="interactive" className="p-5 h-full">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 text-accent shrink-0">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-text-primary text-sm">{item.title}</h3>
                      {item.url && (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="p-1 rounded-lg text-text-tertiary hover:text-accent shrink-0">
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-text-secondary mt-1 line-clamp-2">{item.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {item.category && (
                        <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-accent/10 text-accent">
                          {item.category}
                        </span>
                      )}
                      {item.date && (
                        <span className="text-[10px] text-text-tertiary">
                          {new Date(item.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        </span>
                      )}
                      {item.featured && <Star className="w-3 h-3 text-warning" />}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </Section>
  );
}
