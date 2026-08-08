"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MessageSquare, Send, CheckCircle, Loader2 } from "lucide-react";

interface Props {
  formData: { name: string; email: string; subject: string; message: string };
  isSubmitting: boolean;
  isSubmitted: boolean;
  onFieldChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
}

export function ContactForm({ formData, isSubmitting, isSubmitted, onFieldChange, onSubmit, onReset }: Props) {
  return (
    <div className="contact-form-card">
      <Card className="border border-border-subtle rounded-xl overflow-hidden bg-surface">
        <CardContent className="p-5">
          {isSubmitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-10">
              <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mb-5">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-[18px] font-semibold text-text-primary mb-2">Message Sent!</h3>
              <p className="text-[13px] text-text-secondary mb-6 max-w-sm">
                Thank you for reaching out. I&apos;ve received your message and will get back to you as soon as possible.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <Button onClick={onReset} variant="outline" className="flex-1">
                  Send Another
                </Button>
                <Button onClick={() => window.dispatchEvent(new Event("openSorujChat"))} className="flex-1 gap-2">
                  <MessageSquare className="h-3.5 w-3.5" /> Chat with Soruj
                </Button>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-lg bg-accent/8 flex items-center justify-center text-accent">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <h4 className="text-[15px] font-semibold text-text-primary">Send a Message</h4>
              </div>
              <form onSubmit={onSubmit} className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-text-secondary">Your Name</label>
                    <Input
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => onFieldChange("name", e.target.value)}
                      className="h-9 rounded-lg bg-background border border-border-subtle text-[13px]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-text-secondary">Email Address</label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => onFieldChange("email", e.target.value)}
                      className="h-9 rounded-lg bg-background border border-border-subtle text-[13px]"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-text-secondary">Subject</label>
                  <Input
                    placeholder="Project Inquiry"
                    value={formData.subject}
                    onChange={(e) => onFieldChange("subject", e.target.value)}
                    className="h-9 rounded-lg bg-background border border-border-subtle text-[13px]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-text-secondary">Message</label>
                  <Textarea
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={(e) => onFieldChange("message", e.target.value)}
                    className="min-h-[100px] rounded-lg bg-background border border-border-subtle p-3 resize-none text-[13px]"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full gap-2"
                >
                  {isSubmitting ? (
                    <>Processing... <Loader2 className="h-3.5 w-3.5 animate-spin" /></>
                  ) : (
                    <>Send Message <Send className="h-3.5 w-3.5" /></>
                  )}
                </Button>
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
