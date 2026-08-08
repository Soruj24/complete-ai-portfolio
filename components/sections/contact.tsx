"use client";

import { useState, useRef } from "react";
import {
  Send,
  Mail,
  Github,
  Linkedin,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/ui/animated-section";
import { cn } from "@/lib/utils";
import { InputField } from "./contact-input-field";
import { TextareaField } from "./contact-textarea-field";
import { useSiteSettings } from "@/lib/hooks";
import { SITE, SOCIAL } from "@/lib/constants";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactMethod {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}

export function Contact() {
  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const { settings, socialLinks } = useSiteSettings();
  const abortRef = useRef<AbortController | null>(null);

  const email =
    settings?.contactEmail || SITE.email;
  const githubUrl =
    socialLinks.find((l) => l.platform.toLowerCase() === "github")?.url ||
    SOCIAL.github.url;
  const linkedinUrl =
    socialLinks.find((l) => l.platform.toLowerCase() === "linkedin")?.url ||
    SOCIAL.linkedin.url;

  const contactMethods: ContactMethod[] = [
    { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
    {
      icon: Github,
      label: "GitHub",
      value: SOCIAL.github.handle,
      href: githubUrl,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: SOCIAL.linkedin.handle,
      href: linkedinUrl,
    },
  ];

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
    <Section id="contact">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 max-w-5xl mx-auto">
          {/* Left — Info */}
          <AnimatedSection className="lg:col-span-2 space-y-7" delay={0}>
            <div>
              <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-semibold tracking-[-0.02em] leading-[1.15] text-text-primary mb-3">
                Let&apos;s build something
                <span className="block text-accent">great together.</span>
              </h2>
              <p className="text-[14px] text-text-secondary leading-relaxed">
                Have a project in mind, a question about my work, or want to
                discuss an opportunity? I&apos;m always open to new challenges and
                collaborations.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-2">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                const content = (
                  <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-surface border border-border-subtle hover:border-border transition-all duration-200 group min-h-[52px]">
                    <div className="p-2.5 rounded-lg bg-accent/8 text-accent group-hover:bg-accent/12 transition-colors duration-200">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-text-tertiary">
                        {method.label}
                      </p>
                      <p className="text-[13px] font-medium text-text-primary truncate">
                        {method.value}
                      </p>
                    </div>
                    {method.href && (
                      <ArrowUpRight className="w-3.5 h-3.5 text-text-tertiary group-hover:text-accent transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    )}
                  </div>
                );

                return method.href ? (
                  <a key={method.label} href={method.href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={method.label}>{content}</div>
                );
              })}
            </div>

            {/* Availability */}
            <div className="p-4 rounded-xl bg-surface border border-border-subtle">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-text-tertiary mb-2">
                Availability
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-[13px] font-medium text-success">
                  Open to opportunities
                </span>
              </div>
            </div>
          </AnimatedSection>

          {/* Right — Form */}
          <AnimatedSection className="lg:col-span-3" delay={0.08}>
            <div className="p-4 sm:p-5 md:p-7 rounded-2xl bg-surface border border-border-subtle">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
              >
                <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4">
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
                    "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-[13px] transition-all duration-200 min-h-[44px]",
                    "bg-accent text-accent-foreground hover:brightness-110 active:scale-[0.98]",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    submitState === "success" && "bg-success text-white",
                    submitState === "error" && "bg-error text-white"
                  )}
                >
                  {submitState === "loading" ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Sending...
                    </>
                  ) : submitState === "success" ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Sent! I&apos;ll respond within 24h
                    </>
                  ) : submitState === "error" ? (
                    <>
                      <AlertCircle className="w-3.5 h-3.5" />
                      Failed. Try email directly
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </Section>
  );
}
