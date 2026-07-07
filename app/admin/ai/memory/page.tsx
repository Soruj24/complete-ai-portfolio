"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Search, Trash2, Archive, Clock, User, Bot, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface Session {
  id: string;
  title: string;
  preview: string;
  model: string;
  messages: number;
  tokens: number;
  duration: string;
  updated: string;
  user: string;
}

const sessions: Session[] = [
  { id: "1", title: "Code Review - Authentication Module", preview: "Can you review this auth middleware for security vulnerabilities?", model: "GPT-4o", messages: 12, tokens: 8450, duration: "8m 32s", updated: "15m ago", user: "You" },
  { id: "2", title: "Blog Post Drafting", preview: "Write an article about microservices architecture best practices", model: "Claude 3 Opus", messages: 8, tokens: 6210, duration: "5m 10s", updated: "1h ago", user: "You" },
  { id: "3", title: "Data Analysis - Q3 Metrics", preview: "Analyze this CSV export and identify trends in user engagement", model: "GPT-4o", messages: 15, tokens: 12300, duration: "12m 45s", updated: "3h ago", user: "You" },
  { id: "4", title: "SQL Query Optimization", preview: "Help me optimize this slow-running query on the orders table", model: "GPT-4o Mini", messages: 6, tokens: 3800, duration: "3m 20s", updated: "5h ago", user: "You" },
  { id: "5", title: "Translation - French Docs", preview: "Translate the API documentation from English to French", model: "Gemini Pro", messages: 4, tokens: 2900, duration: "2m 15s", updated: "1d ago", user: "You" },
  { id: "6", title: "Debugging - Memory Leak", preview: "We're seeing a memory leak in the WebSocket handler...", model: "Claude 3 Sonnet", messages: 20, tokens: 15700, duration: "18m 05s", updated: "2d ago", user: "You" },
];

export default function MemoryPage() {
  const [search, setSearch] = useState("");

  const filtered = sessions.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.preview.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Chat History</h1>
          <p className="text-sm text-text-secondary mt-1">Browse past conversations and AI interactions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 rounded-xl border-border-subtle text-xs gap-1">
            <Archive className="h-3.5 w-3.5" /> Archive All
          </Button>
          <Button variant="outline" size="sm" className="h-9 rounded-xl border-border-subtle text-xs gap-1 text-error">
            <Trash2 className="h-3.5 w-3.5" /> Clear History
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search conversations..." className="pl-10 border-border-subtle bg-surface h-10 rounded-xl text-sm" />
      </div>

      <div className="space-y-2">
        {filtered.map((session, i) => (
          <motion.div key={session.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <Card className="border-border-subtle bg-surface hover:border-border transition-all cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-9 w-9 rounded-xl bg-accent/10 text-accent shrink-0">
                    <AvatarFallback className="rounded-xl text-xs font-semibold">
                      <MessageSquare className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-text-primary truncate">{session.title}</h3>
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <Badge variant="outline" className="text-[8px] px-1.5 py-0 rounded-full border-border-subtle text-text-tertiary">
                          {session.messages} msgs
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-lg opacity-0 group-hover:opacity-100">
                          <Trash2 className="h-3 w-3 text-text-tertiary hover:text-error" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-text-tertiary mt-0.5 line-clamp-1">{session.preview}</p>
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-text-tertiary/60">
                      <span className="flex items-center gap-1"><Bot className="h-3 w-3" /> {session.model}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {session.updated}</span>
                      <span>{session.tokens.toLocaleString()} tokens</span>
                      <span>⏱ {session.duration}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
