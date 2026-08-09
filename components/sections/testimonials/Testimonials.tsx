"use client";

import { useState, useEffect } from "react";
import { Star, Quote, Loader2 } from "lucide-react";
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

interface TestimonialsProps {
  initialTestimonials?: Testimonial[];
}

export function Testimonials({ initialTestimonials = [] }: TestimonialsProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [loading, setLoading] = useState(initialTestimonials.length === 0);

  useEffect(() => {
    if (initialTestimonials.length > 0) return;
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
  }, [initialTestimonials.length]);

  if (loading) {
    return (
      <Section id="testimonials">
        <div className="container flex items-center justify-center py-20">
          <Loader2 className="w-5 h-5 animate-spin text-text-tertiary" role="status" aria-label="Loading testimonials" />
        </div>
      </Section>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <Section id="testimonials">
      <SectionHeader
        label="Testimonials"
        title="What People Say"
        description="Feedback from colleagues, clients, and collaborators I've worked with."
      />
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {testimonials.slice(0, 4).map((item, i) => (
            <AnimatedSection key={item._id} delay={i * 0.05}>
              <GlassCard variant="interactive" className="p-5 h-full">
                <Quote className="w-5 h-5 text-text-disabled mb-2.5" aria-hidden="true" />
                <p className="text-[13px] text-text-secondary leading-relaxed line-clamp-4">
                  &ldquo;{item.content}&rdquo;
                </p>
                <div className="flex items-center gap-0.5 mt-3" role="img" aria-label={`Rating: ${item.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={11} className={j < item.rating ? "text-warning fill-warning" : "text-text-disabled"} />
                  ))}
                </div>
                <div className="flex items-center gap-2.5 mt-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-text-primary">{item.name}</p>
                    <p className="text-[11px] text-text-tertiary">{item.role}{item.company ? `, ${item.company}` : ""}</p>
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
