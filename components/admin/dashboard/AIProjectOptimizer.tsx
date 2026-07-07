"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Sparkles, Copy, Check, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function AIProjectOptimizer() {
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [loading, setLoading] = useState(false);
  const [optimized, setOptimized] = useState("");
  const [copied, setCopied] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const handleOptimize = async () => {
    if (!description.trim()) {
      toast.error("Please enter a project description");
      return;
    }

    const controller = new AbortController();
    setAbortController(controller);
    setLoading(true);
    setOptimized("");
    try {
      const res = await fetch("/api/admin/ai/optimize-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          techStack: techStack.split(",").map(k => k.trim()),
        }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error("Failed to optimize");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setOptimized((prev) => prev + chunk);
      }

      toast.success("Description optimized!");
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        toast.info("Optimization stopped");
      } else {
        toast.error("Failed to optimize description");
      }
    } finally {
      setLoading(false);
      setAbortController(null);
    }
  };

  const stopOptimization = () => {
    if (abortController) {
      abortController.abort();
    }
  };

  const copyToClipboard = () => {
    if (!optimized) return;
    navigator.clipboard.writeText(optimized);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied to clipboard!");
  };

  return (
    <Card className="border border-border-subtle shadow-lg bg-surface rounded-[24px] md:rounded-[32px] overflow-hidden transition-all duration-300">
      <CardHeader className="p-5 md:p-8 pb-3 md:pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2.5 text-accent text-xl md:text-2xl font-black">
              <div className="p-2 md:p-2.5 bg-accent/10 rounded-xl md:rounded-2xl">
                <Wand2 className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              Project Optimizer
            </CardTitle>
            <CardDescription className="text-text-secondary text-xs md:text-sm font-medium">
              Polish your project descriptions for maximum impact
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5 md:p-8 pt-0 md:pt-0 space-y-5 md:space-y-6">
        <div className="space-y-5 md:space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] md:text-xs font-black text-text-tertiary uppercase tracking-[0.2em]">Original Description</label>
            <Textarea
              placeholder="Describe what you built..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-surface border-border-subtle rounded-xl md:rounded-2xl min-h-[100px] md:min-h-[120px] text-sm md:text-base px-4 md:px-5 focus:ring-2 focus:ring-accent/20 transition-all resize-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] md:text-xs font-black text-text-tertiary uppercase tracking-[0.2em]">Tech Stack</label>
            <Input
              placeholder="e.g., Next.js, TypeScript, Tailwind CSS"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="bg-surface border-border-subtle rounded-xl md:rounded-2xl h-11 md:h-14 text-sm md:text-base px-4 md:px-5 focus:ring-2 focus:ring-accent/20 transition-all"
            />
          </div>
        </div>
        <Button 
          onClick={loading ? stopOptimization : handleOptimize} 
          disabled={!loading && !description.trim()}
          className={cn(
            "w-full rounded-xl md:rounded-2xl h-11 md:h-14 font-black gap-2 text-sm md:text-base shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99]",
            loading
              ? "bg-error hover:bg-error/90"
              : "bg-accent hover:bg-accent/90"
          )}
        >
          {loading ? <Loader2 className="h-4 w-4 md:h-5 md:w-5 animate-spin" /> : <Sparkles className="h-4 w-4 md:h-5 md:w-5" />}
          {loading ? "Stop Optimization" : "Optimize Description"}
        </Button>

        {optimized && (
          <div className="mt-6 md:mt-8 space-y-3 md:space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center justify-between">
              <label className="text-[10px] md:text-xs font-black text-text-tertiary uppercase tracking-[0.2em]">Optimized Result</label>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={copyToClipboard} 
                className="h-8 md:h-9 px-3 md:px-4 gap-2 text-accent hover:bg-accent/10 rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy Result"}
              </Button>
            </div>
            <div className="p-4 md:p-6 bg-accent/5 border border-accent/10 rounded-xl md:rounded-2xl text-text-secondary leading-relaxed italic text-sm md:text-lg font-medium shadow-inner">
              {optimized}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
