"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Star, Quote, Loader2 } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GlassCard } from "@/components/ui/glass-card";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  featured: boolean;
  source: string;
  date: string;
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/testimonials");
        if (res.ok) {
          const data = await res.json();
          if (data.success) setTestimonials(data.data);
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
      <Section id="testimonials" variant="alt">
        <div className="container flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-accent" />
        </div>
      </Section>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <Section id="testimonials" variant="alt">
      <SectionHeader
        label="Testimonials"
        title="What People Say"
        description="Feedback from colleagues, clients, and collaborators I've worked with."
      />
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.slice(0, 4).map((item, i) => (
            <AnimatedSection key={item._id} delay={i * 0.05}>
              <GlassCard variant="interactive" className="p-6 h-full">
                <Quote className="w-6 h-6 text-accent/30 mb-3" />
                <p className="text-sm text-text-secondary leading-relaxed line-clamp-4">
                  &ldquo;{item.content}&rdquo;
                </p>
                <div className="flex items-center gap-1 mt-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={12} className={j < item.rating ? "text-warning fill-warning" : "text-text-tertiary"} />
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-xs font-semibold text-accent">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{item.name}</p>
                    <p className="text-xs text-text-tertiary">{item.role}{item.company ? `, ${item.company}` : ""}</p>
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
