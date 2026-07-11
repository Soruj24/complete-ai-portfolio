"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Copy, Check, Play, Star, Clock, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";

const categories = ["All", "System", "Development", "Content", "Analysis", "Utility"];

export default function PromptsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedPrompt, setSelectedPrompt] = useState<any | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { data: response, isLoading } = useGetAdminResourceQuery({ resource: "ai/prompts" });
  const prompts = response?.data ?? [];

  const filtered = prompts.filter((p: any) => {
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

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-surface animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="border-border-subtle bg-surface">
          <CardContent className="p-8 text-center">
            <p className="text-sm text-text-tertiary">No prompts found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((prompt: any, i: number) => (
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
      )}

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
