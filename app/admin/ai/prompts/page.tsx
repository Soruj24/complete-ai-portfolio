"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Plus, Search, Copy, Check, Play, Star, Clock, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Prompt {
  id: string;
  name: string;
  description: string;
  content: string;
  category: string;
  model: string;
  starred: boolean;
  updated: string;
  versions: number;
  tokens: number;
}

const prompts: Prompt[] = [
  { id: "1", name: "System Prompt - Assistant", description: "Default system prompt for general AI assistant", content: "You are a helpful, harmless, and honest AI assistant.", category: "System", model: "GPT-4o", starred: true, updated: "2h ago", versions: 5, tokens: 24 },
  { id: "2", name: "Code Review Prompt", description: "Analyze code for bugs, security issues, and best practices", content: "Review the following code and identify...", category: "Development", model: "Claude 3 Opus", starred: true, updated: "1d ago", versions: 3, tokens: 89 },
  { id: "3", name: "Content Writer", description: "Generate blog posts and articles from outlines", content: "Write a comprehensive article about...", category: "Content", model: "GPT-4o", starred: false, updated: "3d ago", versions: 8, tokens: 156 },
  { id: "4", name: "Data Analyzer", description: "Extract insights from CSV and structured data", content: "Analyze the following dataset and provide...", category: "Analysis", model: "GPT-4o", starred: false, updated: "5d ago", versions: 2, tokens: 210 },
  { id: "5", name: "Translation Assistant", description: "Translate content with context awareness", content: "Translate the following text to...", category: "Utility", model: "Gemini Pro", starred: true, updated: "1w ago", versions: 4, tokens: 62 },
  { id: "6", name: "SQL Generator", description: "Convert natural language to SQL queries", content: "Generate a SQL query to...", category: "Development", model: "GPT-4o Mini", starred: false, updated: "1w ago", versions: 6, tokens: 118 },
];

const categories = ["All", "System", "Development", "Content", "Analysis", "Utility"];

export default function PromptsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = prompts.filter((p) => {
    if (category !== "All" && p.category !== category) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const copyPrompt = async (id: string, content: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Prompt Library</h1>
          <p className="text-sm text-text-secondary mt-1">Manage and organize your AI prompts</p>
        </div>
        <Button className="gap-1.5 rounded-xl bg-accent hover:bg-accent/90 h-9 text-xs">
          <Plus className="h-3.5 w-3.5" /> Create Prompt
        </Button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search prompts..." className="pl-10 border-border-subtle bg-surface h-10 rounded-xl text-sm" />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-40 h-10 border-border-subtle bg-surface rounded-xl text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((prompt, i) => (
          <motion.div key={prompt.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Card className={cn(
              "border-border-subtle bg-surface hover:border-border transition-all cursor-pointer group",
              selectedPrompt?.id === prompt.id && "ring-2 ring-accent/30 border-accent/30",
            )}
              onClick={() => setSelectedPrompt(prompt)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm text-text-primary truncate">{prompt.name}</h3>
                      <Badge variant="outline" className="text-[9px] px-1.5 py-0 rounded-full border-border-subtle text-text-tertiary shrink-0">
                        {prompt.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-text-tertiary mt-1 line-clamp-1">{prompt.description}</p>
                    <p className="text-[10px] font-mono text-text-tertiary/60 mt-2 line-clamp-1">{prompt.content}</p>
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-text-tertiary/60">
                      <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> v{prompt.versions}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {prompt.updated}</span>
                      <span>{prompt.tokens} tokens</span>
                      <Badge variant="outline" className="text-[8px] px-1 py-0 rounded border-border-subtle text-text-tertiary">{prompt.model}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 ml-3 shrink-0">
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => { e.stopPropagation(); copyPrompt(prompt.id, prompt.content); }}
                    >
                      {copiedId === prompt.id ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3 text-text-tertiary" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-3 w-3 text-text-tertiary" />
                    </Button>
                    <Star className={cn("h-3.5 w-3.5", prompt.starred ? "text-amber-500 fill-amber-500" : "text-text-tertiary/40")} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Prompt Detail Panel */}
      <AnimatePresence>
        {selectedPrompt && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <Card className="border-border-subtle bg-surface">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-text-primary">{selectedPrompt.name}</CardTitle>
                    <CardDescription>{selectedPrompt.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 rounded-lg border-border-subtle text-xs gap-1">
                      <Copy className="h-3 w-3" /> Copy
                    </Button>
                    <Button size="sm" className="h-8 rounded-lg bg-accent hover:bg-accent/90 text-xs gap-1">
                      <Play className="h-3 w-3" /> Run in Playground
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea value={selectedPrompt.content} readOnly className="min-h-[120px] border-border-subtle bg-background rounded-xl text-sm font-mono" />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
