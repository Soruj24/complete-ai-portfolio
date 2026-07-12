"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Mail, MapPin, Loader2, CheckCircle2, AlertCircle, Github, Linkedin, Globe } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Section, SectionHeader } from "@/components/ui/section";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import type { ISettings, ISocialLink } from "@/shared/types";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const methodIcons: Record<string, React.ElementType> = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
  website: Globe,
  location: MapPin,
};

export function Contact() {
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [settings, setSettings] = useState<ISettings | null>(null);
  const [socialLinks, setSocialLinks] = useState<ISocialLink[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, socialRes] = await Promise.all([
          fetch("/api/settings/public"),
          fetch("/api/social-links"),
        ]);

        if (settingsRes.ok) {
          const data = await settingsRes.json();
          if (data.success) setSettings(data.data);
        }

        if (socialRes.ok) {
          const data = await socialRes.json();
          if (data.success) setSocialLinks(data.data);
        }
      } catch {
        // Graceful degradation
      }
    };
    fetchData();
  }, []);

  const contactMethods = [];

  if (settings?.contactEmail) {
    contactMethods.push({ icon: Mail, label: "Email", value: settings.contactEmail, href: `mailto:${settings.contactEmail}` });
  }
  if (settings?.location) {
    contactMethods.push({ icon: MapPin, label: "Location", value: settings.location });
  }

  socialLinks.forEach((link) => {
    const Icon = methodIcons[link.platform.toLowerCase()];
    if (Icon) {
      contactMethods.push({ icon: Icon, label: link.label, value: link.handle || link.url, href: link.url });
    }
  });

  if (contactMethods.length === 0) {
    contactMethods.push(
      { icon: Mail, label: "Email", value: "sorujmahmudb2h@gmail.com", href: "mailto:sorujmahmudb2h@gmail.com" },
      { icon: MapPin, label: "Location", value: "Bangladesh" },
    );
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setSubmitState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: abortRef.current.signal,
      });

      if (!res.ok) throw new Error("Failed");

      setSubmitState("success");
      reset();
      setTimeout(() => setSubmitState("idle"), 5000);
    } catch {
      setSubmitState("error");
      setTimeout(() => setSubmitState("idle"), 5000);
    }
  };

  return (
    <Section id="contact" variant="alt">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--accent-subtle),transparent_50%)] pointer-events-none" />

      <div className="container relative">
        <SectionHeader
          label="Contact"
          title="Let's Work Together"
          description="Have a project, opportunity, or just want to connect? I respond within 24 hours."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-4xl mx-auto">
          <div className="lg:col-span-2 space-y-3">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return method.href ? (
                <a key={method.label} href={method.href}>
                  <GlassCard variant="interactive" className="p-4 flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-accent/10 text-accent shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] text-text-tertiary font-medium">{method.label}</p>
                      <p className="text-sm font-medium truncate">{method.value}</p>
                    </div>
                  </GlassCard>
                </a>
              ) : (
                <GlassCard key={method.label} className="p-4 flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-accent/10 text-accent shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-text-tertiary font-medium">{method.label}</p>
                    <p className="text-sm font-medium truncate">{method.value}</p>
                  </div>
                </GlassCard>
              );
            })}

            <GlassCard className="p-4">
              <p className="text-[11px] text-text-tertiary font-medium mb-2">Availability</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success" />
                <span className="text-sm font-medium text-success">Open to opportunities</span>
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-3">
            <GlassCard className="p-6 md:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    id="contact-name"
                    label="Name"
                    error={errors.name?.message}
                    placeholder="Your name"
                    {...register("name")}
                  />
                  <InputField
                    id="contact-email"
                    label="Email"
                    type="email"
                    error={errors.email?.message}
                    placeholder="your@email.com"
                    {...register("email")}
                  />
                </div>
                <InputField
                  id="contact-subject"
                  label="Subject"
                  error={errors.subject?.message}
                  placeholder="What's this about?"
                  {...register("subject")}
                />
                <TextareaField
                  id="contact-message"
                  label="Message"
                  error={errors.message?.message}
                  placeholder="Tell me about your project or opportunity..."
                  {...register("message")}
                />
                <button
                  type="submit"
                  disabled={submitState === "loading"}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm",
                    "bg-accent text-accent-foreground hover:brightness-110 transition-all",
                    "disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                  )}
                >
                  {submitState === "loading" ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                  ) : submitState === "success" ? (
                    <><CheckCircle2 className="w-4 h-4" /> Sent! I'll respond within 24h</>
                  ) : submitState === "error" ? (
                    <><AlertCircle className="w-4 h-4" /> Failed. Try email directly</>
                  ) : (
                    <><Send className="w-4 h-4" /> Send Message</>
                  )}
                </button>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </Section>
  );
}

function InputField({
  id,
  label,
  error,
  placeholder,
  type = "text",
  ...props
}: {
  id: string;
  label: string;
  error?: string;
  placeholder?: string;
  type?: string;
  [key: string]: unknown;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-medium text-text-secondary">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "w-full px-3.5 py-2.5 text-sm rounded-xl border bg-background transition-colors",
          "placeholder:text-text-tertiary/60",
          "focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50",
          error ? "border-error" : "border-border"
        )}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function TextareaField({
  id,
  label,
  error,
  placeholder,
  ...props
}: {
  id: string;
  label: string;
  error?: string;
  placeholder?: string;
  [key: string]: unknown;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-medium text-text-secondary">
        {label}
      </label>
      <textarea
        id={id}
        rows={4}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "w-full px-3.5 py-2.5 text-sm rounded-xl border bg-background transition-colors resize-none",
          "placeholder:text-text-tertiary/60",
          "focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50",
          error ? "border-error" : "border-border"
        )}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
