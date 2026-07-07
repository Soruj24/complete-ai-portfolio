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
      <Card className="border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-none rounded-[24px] md:rounded-[48px] overflow-hidden bg-white dark:bg-gray-800/50">
        <CardContent className="p-6 md:p-12">
          {isSubmitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-10 md:py-20">
              <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center mb-6 md:mb-8">
                <CheckCircle className="h-10 w-10 md:h-12 md:w-12 text-green-500" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4">Message Sent!</h3>
              <p className="text-sm md:text-base text-gray-500 dark:text-slate-400 mb-8 md:mb-12 max-w-sm">
                Thank you for reaching out. I&apos;ve received your message and will get back to you as soon as possible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Button onClick={onReset} variant="outline" className="flex-1 h-12 md:h-14 rounded-xl md:rounded-2xl font-bold border-2">Send Another</Button>
                <Button onClick={() => window.dispatchEvent(new Event("openSorujChat"))} className="flex-1 h-12 md:h-14 rounded-xl md:rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200 dark:shadow-none">
                  <MessageSquare className="mr-2 h-4 w-4" /> Chat with Soruj
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
              <form onSubmit={onSubmit} className="space-y-4 md:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  <div className="space-y-1.5 md:space-y-3">
                    <label className="text-[9px] md:text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Your Name</label>
                    <Input placeholder="John Doe" value={formData.name} onChange={(e) => onFieldChange("name", e.target.value)} className="h-12 md:h-16 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-gray-900 border-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-500 font-bold px-4 md:px-6 text-sm md:text-base text-gray-900 dark:text-white" />
                  </div>
                  <div className="space-y-1.5 md:space-y-3">
                    <label className="text-[9px] md:text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                    <Input type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => onFieldChange("email", e.target.value)} className="h-12 md:h-16 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-gray-900 border-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-500 font-bold px-4 md:px-6 text-sm md:text-base text-gray-900 dark:text-white" />
                  </div>
                </div>
                <div className="space-y-1.5 md:space-y-3">
                  <label className="text-[9px] md:text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Subject</label>
                  <Input placeholder="Project Inquiry" value={formData.subject} onChange={(e) => onFieldChange("subject", e.target.value)} className="h-12 md:h-16 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-gray-900 border-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-500 font-bold px-4 md:px-6 text-sm md:text-base text-gray-900 dark:text-white" />
                </div>
                <div className="space-y-1.5 md:space-y-3">
                  <label className="text-[9px] md:text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Message</label>
                  <Textarea placeholder="Tell me about your project..." value={formData.message} onChange={(e) => onFieldChange("message", e.target.value)} className="min-h-[120px] md:min-h-[200px] rounded-xl md:rounded-2xl bg-gray-50 dark:bg-gray-900 border-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-500 font-bold p-4 md:p-6 resize-none text-sm md:text-base text-gray-900 dark:text-white" />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full h-12 md:h-16 rounded-xl md:rounded-2xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-black text-sm md:text-lg shadow-xl shadow-blue-100 dark:shadow-none transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed">
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
  );
}
