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
      <section className="py-32 flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-500">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 dark:text-blue-400" />
      </section>
    );
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-32 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-24">
          <h2 className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400 mb-4 md:mb-6 contact-reveal-text">
            Get In Touch
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 md:mb-8 contact-reveal-text">
            Let&apos;s build something <br />
            <span className="text-gray-400 dark:text-gray-500">extraordinary together.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 max-w-6xl mx-auto">
          <div className="space-y-8 md:space-y-12">
            <div className="space-y-4 md:space-y-8 contact-reveal-text text-center lg:text-left">
              <h4 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white">Contact Information</h4>
              <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
                I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
            </div>
            <ContactInfo settings={settings} />
          </div>

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
      <div className="absolute left-0 bottom-0 w-64 h-64 bg-blue-50/50 dark:bg-blue-900/10 rounded-tr-[100px] -z-10" />
    </section>
  );
}
