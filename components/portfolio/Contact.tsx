"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Github, Linkedin, MapPin, Phone, Send, MessageSquare, Loader2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const { data: session } = useSession();
  const sectionRef = useRef(null);
  const [settings, setSettings] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      import("sonner").then(({ toast }) => toast.error("Please fill in all required fields"));
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userId: session?.user?.id || null,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        import("sonner").then(({ toast }) => toast.success("Message sent successfully!"));
        setIsSubmitted(true);
        // Reset form data but keep isSubmitted true to show success UI
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(data.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      import("sonner").then(({ toast }) => toast.error("Failed to send message. Please try again later."));
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings/public");
        
        // Check if response is JSON
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          console.error("Non-JSON response received from /api/settings/public");
          return;
        }

        const data = await res.json();
        if (data.success) {
          setSettings(data.settings);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  useGSAP(() => {
    if (loading || !settings) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.from(".contact-reveal-text", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    })
    .from(".contact-info-item", {
      x: -30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.5")
    .from(".contact-form-card", {
      x: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.8");
  }, { scope: sectionRef, dependencies: [loading, settings] });

  if (loading) {
    return (
      <section className="py-32 flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-500">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 dark:text-blue-400" />
      </section>
    );
  }

  const contactInfo = [
    {
      label: "Email",
      value: settings?.contactEmail || "sorujmahmudb2h@gmail.com",
      link: `mailto:${settings?.contactEmail || "sorujmahmudb2h@gmail.com"}`,
    },
    {
      label: "LinkedIn",
      value: "Soruj Mahmud",
      link: settings?.linkedinUrl || "#",
    },
    {
      label: "GitHub",
      value: "sorujmahmud",
      link: settings?.githubUrl || "https://github.com/sorujmahmud",
    },
    {
      label: "Location",
      value: settings?.location || "Tangail, Bangladesh",
      link: "#",
    },
  ];

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
          {/* Contact Info */}
          <div className="space-y-8 md:space-y-12">
            <div className="space-y-4 md:space-y-8 contact-reveal-text text-center lg:text-left">
              <h4 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white">Contact Information</h4>
              <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
                I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 md:gap-6">
              {contactInfo.map((info, index) => (
                <Link 
                  key={index} 
                  href={info.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group contact-info-item block"
                >
                  <Card className="border-none shadow-xl shadow-gray-100/50 dark:shadow-none rounded-[20px] md:rounded-[32px] overflow-hidden bg-[#fafafa] dark:bg-gray-800/50 group-hover:bg-white dark:group-hover:bg-gray-800 group-hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-4 md:p-6 flex items-center gap-4 md:gap-6">
                      <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white dark:bg-gray-900 shadow-sm flex items-center justify-center text-lg md:text-2xl group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:text-white transition-colors">
                        {info.label === "Email" && <Mail className="h-4 w-4 md:h-6 md:w-6" />}
                        {info.label === "LinkedIn" && <Linkedin className="h-4 w-4 md:h-6 md:w-6" />}
                        {info.label === "GitHub" && <Github className="h-4 w-4 md:h-6 md:w-6" />}
                        {info.label === "Portfolio" && <Send className="h-4 w-4 md:h-6 md:w-6" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9px] md:text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-0.5 md:mb-1">{info.label}</p>
                        <p className="text-sm md:text-xl font-black text-gray-900 dark:text-white truncate">{String(info.value)}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-card">
            <Card className="border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-none rounded-[24px] md:rounded-[48px] overflow-hidden bg-white dark:bg-gray-800/50">
              <CardContent className="p-6 md:p-12">
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-10 md:py-20"
                  >
                    <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center mb-6 md:mb-8">
                      <CheckCircle className="h-10 w-10 md:h-12 md:w-12 text-green-500" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4">Message Sent!</h3>
                    <p className="text-sm md:text-base text-gray-500 dark:text-slate-400 mb-8 md:mb-12 max-w-sm">
                      Thank you for reaching out. I've received your message and will get back to you as soon as possible.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                      <Button 
                        onClick={() => setIsSubmitted(false)}
                        variant="outline"
                        className="flex-1 h-12 md:h-14 rounded-xl md:rounded-2xl font-bold border-2"
                      >
                        Send Another
                      </Button>
                      <Button 
                        onClick={() => {
                          window.dispatchEvent(new Event("openNexusChat"));
                        }}
                        className="flex-1 h-12 md:h-14 rounded-xl md:rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200 dark:shadow-none"
                      >
                        <MessageSquare className="mr-2 h-4 w-4" /> Chat with Nexus
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
                      <div className="w-9 h-9 md:w-12 md:h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <MessageSquare className="h-4 w-4 md:h-6 md:w-6" />
                      </div>
                      <h4 className="text-lg md:text-2xl font-black text-gray-900 dark:text-white">Send a Message</h4>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        <div className="space-y-1.5 md:space-y-3">
                          <label className="text-[9px] md:text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Your Name</label>
                          <Input 
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="h-12 md:h-16 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-gray-900 border-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-500 font-bold px-4 md:px-6 text-sm md:text-base text-gray-900 dark:text-white"
                          />
                        </div>
                        <div className="space-y-1.5 md:space-y-3">
                          <label className="text-[9px] md:text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                          <Input 
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="h-12 md:h-16 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-gray-900 border-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-500 font-bold px-4 md:px-6 text-sm md:text-base text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5 md:space-y-3">
                        <label className="text-[9px] md:text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Subject</label>
                        <Input 
                          placeholder="Project Inquiry"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="h-12 md:h-16 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-gray-900 border-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-500 font-bold px-4 md:px-6 text-sm md:text-base text-gray-900 dark:text-white"
                        />
                      </div>
                      <div className="space-y-1.5 md:space-y-3">
                        <label className="text-[9px] md:text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Message</label>
                        <Textarea 
                          placeholder="Tell me about your project..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="min-h-[120px] md:min-h-[200px] rounded-xl md:rounded-2xl bg-gray-50 dark:bg-gray-900 border-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-500 font-bold p-4 md:p-6 resize-none text-sm md:text-base text-gray-900 dark:text-white"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full h-12 md:h-16 rounded-xl md:rounded-2xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-black text-sm md:text-lg shadow-xl shadow-blue-100 dark:shadow-none transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>Processing... <Loader2 className="ml-2 h-4 w-4 md:h-5 md:w-5 animate-spin" /></>
                        ) : (
                          <>Send Message <Send className="ml-2 h-4 w-4 md:h-5 md:w-5" /></>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute left-0 bottom-0 w-64 h-64 bg-blue-50/50 dark:bg-blue-900/10 rounded-tr-[100px] -z-10" />
    </section>
  );
}
