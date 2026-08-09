"use client";

import { useState, type FormEvent } from "react";
import { Sparkles, Send, Bot, PenLine, Workflow, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="rounded-lg border border-border-subtle bg-surface">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border-subtle">
        <div className="flex h-5 w-5 items-center justify-center rounded bg-accent/10 text-accent">
          <Sparkles className="h-3 w-3" />
        </div>
        <h2 className="text-[13px] font-medium text-text-primary">AI Assistant</h2>
      </div>
      <div className="p-4 space-y-3">
        <form onSubmit={handleSubmit} className="flex items-center gap-1.5">
          <div className="relative flex-1">
            <Bot className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-tertiary" />
            <Input
              placeholder="Ask AI anything..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="pl-8 h-8 text-[13px] bg-background border-border-subtle rounded-md"
            />
          </div>
          <Button
            type="submit"
            size="icon"
            disabled={!prompt.trim()}
            className="h-8 w-8 shrink-0 rounded-md"
          >
            <Send className="h-3.5 w-3.5" />
          </Button>
        </form>

        <div>
          <p className="text-[10px] font-medium text-text-tertiary uppercase tracking-wider mb-1.5">Suggested</p>
          <div className="grid grid-cols-1 gap-1">
            {suggestions.map((s) => (
              <button
                key={s.label}
                onClick={() => router.push(s.href)}
                className="flex items-center gap-2 rounded px-2 py-1.5 text-[12px] text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors text-left"
              >
                <s.icon className="h-3 w-3 text-accent shrink-0" />
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
