"use client";

import { useRef } from "react";
import { Loader2 } from "lucide-react";
import { useContact } from "@/hooks/use-contact";
import { ContactInfo } from "./contact-info";
import { ContactForm } from "./contact-form";
import { useSectionAnimation } from "@/lib/hooks/use-section-animation";

export function Contact() {
  const sectionRef = useRef(null);
  const {
    settings, loading, isSubmitting, isSubmitted, formData, setFormData,
    setIsSubmitted, handleSubmit,
  } = useContact();

  useSectionAnimation(
    sectionRef,
    (tl) => {
      if (loading || !settings) return;
      tl.from(".contact-reveal-text", { y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" })
        .from(".contact-info-item", { x: -30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }, "-=0.5")
        .from(".contact-form-card", { x: 30, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8");
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

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-28 bg-background border-t border-border-subtle relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-10 contact-reveal-text">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-tertiary mb-2 block">
            Contact
          </span>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-semibold tracking-[-0.02em] text-text-primary">
            Let&apos;s build something{" "}
            <span className="text-text-tertiary">extraordinary together.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
          <div className="lg:col-span-2 space-y-3 contact-reveal-text">
            <div className="mb-4">
              <h4 className="text-[15px] font-semibold text-text-primary mb-1">Contact Information</h4>
              <p className="text-[12px] text-text-secondary leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
            </div>
            <ContactInfo settings={settings} />
          </div>

          <div className="lg:col-span-3 contact-form-card">
            <ContactForm
              formData={formData}
              isSubmitting={isSubmitting}
              isSubmitted={isSubmitted}
              onFieldChange={(field, value) => setFormData((prev) => ({ ...prev, [field]: value }))}
              onSubmit={handleSubmit}
              onReset={() => setIsSubmitted(false)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
