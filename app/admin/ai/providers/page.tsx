"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Server, Plus, Search, Wifi, WifiOff, ExternalLink, Key, Trash2, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const providers = [
  { name: "OpenAI", status: "connected", endpoint: "https://api.openai.com/v1", model: "gpt-4o", latency: "124ms", usage: "78%", tier: "Production" },
  { name: "Anthropic", status: "connected", endpoint: "https://api.anthropic.com/v1", model: "claude-3-opus", latency: "210ms", usage: "45%", tier: "Production" },
  { name: "Google AI", status: "connected", endpoint: "https://generativelanguage.googleapis.com", model: "gemini-pro", latency: "180ms", usage: "32%", tier: "Staging" },
  { name: "Ollama", status: "disconnected", endpoint: "http://localhost:11434", model: "llama3", latency: "-", usage: "0%", tier: "Development" },
  { name: "Cohere", status: "error", endpoint: "https://api.cohere.ai/v1", model: "command-r", latency: "3.2s", usage: "12%", tier: "Testing" },
  { name: "Hugging Face", status: "disconnected", endpoint: "https://api-inference.huggingface.co", model: "mixtral-8x7b", latency: "-", usage: "0%", tier: "Development" },
];

const statusConfig = {
  connected: { icon: Wifi, color: "text-success", bg: "bg-success/10", label: "Connected" },
  disconnected: { icon: WifiOff, color: "text-text-tertiary", bg: "bg-surface-hover", label: "Disconnected" },
  error: { icon: WifiOff, color: "text-error", bg: "bg-error/10", label: "Error" },
};

export default function ProvidersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">AI Providers</h1>
          <p className="text-sm text-text-secondary mt-1">Manage API provider connections and credentials</p>
        </div>
        <Button className="gap-1.5 rounded-xl bg-accent hover:bg-accent/90 h-9 text-xs">
          <Plus className="h-3.5 w-3.5" /> Add Provider
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
        <Input placeholder="Search providers..." className="pl-10 border-border-subtle bg-surface h-10 rounded-xl text-sm" />
      </div>

      <div className="grid gap-4">
        {providers.map((provider, i) => {
          const status = statusConfig[provider.status as keyof typeof statusConfig];
          const StatusIcon = status.icon;
          return (
            <motion.div key={provider.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="border-border-subtle bg-surface hover:border-border transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={cn("p-2.5 rounded-xl", status.bg)}>
                        <StatusIcon className={cn("h-5 w-5", status.color)} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm text-text-primary">{provider.name}</h3>
                          <Badge variant="outline" className={cn("text-[9px] px-1.5 py-0 rounded-full border-0 font-medium", status.color, status.bg)}>
                            {status.label}
                          </Badge>
                          <Badge variant="outline" className="text-[9px] px-1.5 py-0 rounded-full border-border-subtle text-text-tertiary">
                            {provider.tier}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-1.5 text-[11px] text-text-tertiary font-mono">
                          <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> {provider.endpoint}</span>
                          <span>{provider.model}</span>
                          {provider.latency !== "-" && <span>⏱ {provider.latency}</span>}
                          <span>📊 {provider.usage}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                        <Key className="h-3.5 w-3.5 text-text-tertiary" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                        <ExternalLink className="h-3.5 w-3.5 text-text-tertiary" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:text-error">
                        <Trash2 className="h-3.5 w-3.5 text-text-tertiary" />
                      </Button>
                      <Switch defaultChecked={provider.status === "connected"} className="ml-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
