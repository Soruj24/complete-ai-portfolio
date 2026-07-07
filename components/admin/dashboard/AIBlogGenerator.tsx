"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Sparkles, Send, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

export function AIBlogGenerator() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [generatedPost, setGeneratedPost] = useState<{
    title: string;
    content: string;
    excerpt: string;
    category: string;
  } | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic");
      return;
    }

    const controller = new AbortController();
    setAbortController(controller);
    setLoading(true);
    setGeneratedPost(null);
    let fullContent = "";
    
    try {
      const res = await fetch("/api/admin/ai/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          keywords: keywords.split(",").map(k => k.trim()),
        }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error("Failed to generate");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        fullContent += chunk;
        
        // Update UI with partial content
        let displayTitle = topic;
        let displayContent = "";
        let displayExcerpt = "Generating content...";
        let displayCategory = "Technology";

        try {
          // Extract title
          const titleMatch = fullContent.match(/"title":\s*"([^"]*)"/);
          if (titleMatch) displayTitle = titleMatch[1];

          // Extract content - handle partial content more robustly
          const contentMatch = fullContent.match(/"content":\s*"([\s\S]*?)"(?=\s*,|\s*\})/);
          if (contentMatch) {
            displayContent = contentMatch[1].replace(/\\n/g, "\n").replace(/\\"/g, '"');
          } else {
            // If "content": " has started but not finished
            const contentStartMatch = fullContent.match(/"content":\s*"([\s\S]*)$/);
            if (contentStartMatch) {
              displayContent = contentStartMatch[1].replace(/\\n/g, "\n").replace(/\\"/g, '"');
            }
          }

          // Extract excerpt
          const excerptMatch = fullContent.match(/"excerpt":\s*"([^"]*)"/);
          if (excerptMatch) displayExcerpt = excerptMatch[1];

          // Extract category
          const categoryMatch = fullContent.match(/"category":\s*"([^"]*)"/);
          if (categoryMatch) displayCategory = categoryMatch[1];
        } catch (e) {}

        setGeneratedPost({
          title: displayTitle || topic,
          content: displayContent,
          excerpt: displayExcerpt,
          category: displayCategory
        });
      }

      // Final attempt to parse JSON to ensure we have the complete structure
      try {
        const jsonMatch = fullContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed.title && parsed.content) {
            setGeneratedPost(parsed);
          }
        }
      } catch (e) {
        // Fallback already handled by the stream update
      }

      toast.success("Blog post generated!");
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        toast.info("Generation stopped");
      } else {
        toast.error("Failed to generate blog post");
      }
    } finally {
      setLoading(false);
      setAbortController(null);
    }
  };

  const stopGeneration = () => {
    if (abortController) {
      abortController.abort();
    }
  };

  const copyToClipboard = () => {
    if (!generatedPost) return;
    navigator.clipboard.writeText(generatedPost.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Content copied to clipboard!");
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <Card className="border border-border-subtle shadow-lg bg-surface rounded-[24px] md:rounded-[32px] overflow-hidden transition-all duration-300">
        <CardHeader className="p-5 md:p-8 pb-3 md:pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2.5 text-accent text-xl md:text-2xl font-black">
                <div className="p-2 md:p-2.5 bg-accent/10 rounded-xl md:rounded-2xl">
                  <Sparkles className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                AI Blog Generator
              </CardTitle>
              <CardDescription className="text-text-secondary text-[10px] md:text-sm font-medium">
                Generate professional blog posts using Gemma 4
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-8 pt-0 md:pt-0 space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[9px] md:text-xs font-black text-text-tertiary uppercase tracking-[0.2em]">Topic</label>
              <Input
                placeholder="e.g., The Future of Next.js and AI"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="bg-surface border-border-subtle rounded-xl md:rounded-2xl h-10 md:h-14 text-xs md:text-base px-3 md:px-5 focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>
            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[9px] md:text-xs font-black text-text-tertiary uppercase tracking-[0.2em]">Keywords</label>
              <Input
                placeholder="e.g., react, ai, development"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="bg-surface border-border-subtle rounded-xl md:rounded-2xl h-10 md:h-14 text-xs md:text-base px-3 md:px-5 focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>
          </div>
          <Button 
            onClick={loading ? stopGeneration : handleGenerate} 
            disabled={!loading && !topic.trim()}
            className={cn(
              "w-full rounded-xl md:rounded-2xl h-10 md:h-14 font-black gap-2 text-xs md:text-base shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99]",
              loading 
                ? "bg-error hover:bg-error/90" 
                : "bg-accent hover:bg-accent/90"
            )}
          >
            {loading ? <Loader2 className="h-4 w-4 md:h-5 md:w-5 animate-spin" /> : <Send className="h-4 w-4 md:h-5 md:w-5" />}
            {loading ? "Stop Generation" : "Generate Blog Post"}
          </Button>
        </CardContent>
      </Card>

      {generatedPost && (
        <Card className="border border-border-subtle shadow-lg bg-surface rounded-[20px] md:rounded-[32px] overflow-hidden transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
          <CardHeader className="border-b border-border-subtle p-4 md:p-8 flex flex-row items-center justify-between gap-3 md:gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-1.5 py-0.5 rounded-md bg-accent/10 text-accent text-[9px] md:text-xs font-bold uppercase tracking-wider">
                  {generatedPost.category}
                </span>
              </div>
              <CardTitle className="text-base md:text-2xl font-black truncate leading-tight">
                {generatedPost.title}
              </CardTitle>
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={copyToClipboard} 
              className="h-9 w-9 md:h-12 md:w-12 rounded-lg md:rounded-2xl border-border-subtle hover:bg-surface-hover shrink-0 transition-all"
            >
              {copied ? <Check className="h-4 w-4 md:h-5 md:w-5 text-success" /> : <Copy className="h-4 w-4 md:h-5 md:w-5 text-text-tertiary" />}
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 md:p-8 bg-surface/50 min-h-[150px] md:min-h-[400px]">
              <div className="font-medium text-text-secondary leading-relaxed text-xs md:text-sm max-w-none prose prose-p:leading-relaxed prose-headings:font-black prose-headings:text-text-primary prose-a:text-accent">
                <ReactMarkdown>{generatedPost.content}</ReactMarkdown>
              </div>
            </div>
            <div className="p-4 md:p-8 border-t border-border-subtle bg-surface">
              <h4 className="text-[9px] md:text-xs font-black text-text-tertiary mb-2 md:mb-3 uppercase tracking-[0.2em]">Quick Excerpt</h4>
              <p className="text-text-secondary text-[10px] md:text-base italic font-medium leading-relaxed">
                {generatedPost.excerpt}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
