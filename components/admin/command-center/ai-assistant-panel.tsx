"use client";

import { useState, type FormEvent } from "react";
import { Sparkles, Send, Bot, PenLine, Workflow, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const suggestions = [
  { label: "Generate blog post", icon: PenLine, href: "/admin/blogs" },
  { label: "Optimize project", icon: Workflow, href: "/admin/projects" },
  { label: "AI content ideas", icon: Lightbulb, href: "/admin/ai/settings" },
];

export function AiAssistantPanel() {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;
    router.push("/admin/ai/settings");
  }

  return (
    <div className="rounded-xl border border-border-subtle bg-surface">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-border-subtle">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-rose-500 to-purple-600">
          <Sparkles className="h-3.5 w-3.5 text-white" />
        </div>
        <h2 className="text-sm font-semibold text-text-primary">AI Assistant</h2>
      </div>
      <div className="p-5 space-y-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="relative flex-1">
            <Bot className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
            <Input
              placeholder="Ask AI anything..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="pl-9 h-9 text-sm bg-background border-border-subtle rounded-lg"
            />
          </div>
          <Button
            type="submit"
            size="icon"
            disabled={!prompt.trim()}
            className="h-9 w-9 shrink-0 rounded-lg"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>

        <div>
          <p className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider mb-2">Suggested</p>
          <div className="grid grid-cols-1 gap-1.5">
            {suggestions.map((s) => (
              <motion.button
                key={s.label}
                whileHover={{ x: 3 }}
                onClick={() => router.push(s.href)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors text-left"
              >
                <s.icon className="h-3.5 w-3.5 text-accent shrink-0" />
                {s.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
