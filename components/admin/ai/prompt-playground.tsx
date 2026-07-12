"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, StopCircle, RotateCcw, Settings2, MessageSquare, Code, BarChart3, Clock, Sparkles, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { PromptMessage } from "./prompt-message";
import { PromptParameters } from "./prompt-parameters";

interface Message {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
  timestamp: number;
}

export function PromptPlayground() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "system", content: "You are a helpful AI assistant.", timestamp: Date.now() },
  ]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1024);
  const [model, setModel] = useState("gpt-4o");
  const [showSettings, setShowSettings] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tokenCount, setTokenCount] = useState(0);
  const [latency, setLatency] = useState(0);
  const [activeTab, setActiveTab] = useState("preview");
  const outputRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsGenerating(true);
    setOutput("");
    setActiveTab("preview");
    const startTime = Date.now();

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const demoResponses = [
      "Based on my analysis, here are the key findings:\n\n",
      "1. **Performance Optimization**: The system shows significant improvement when caching is enabled.\n\n",
      "2. **Resource Utilization**: GPU memory usage can be reduced by 40% with proper batch processing.\n\n",
      "3. **Latency Reduction**: Response times improved by 60% after implementing the streaming pipeline.\n\n",
      "Would you like me to dive deeper into any of these areas?",
    ];

    for (const chunk of demoResponses) {
      if (!isGenerating) break;
      for (let i = 0; i < chunk.length; i++) {
        setOutput((prev) => prev + chunk[i]);
        setTokenCount((prev) => prev + 1);
        await new Promise((r) => setTimeout(r, 20));
      }
    }

    setLatency(Date.now() - startTime);
    const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: output + demoResponses.join(""), timestamp: Date.now() };
    setMessages((prev) => [...prev, assistantMsg]);
    setIsGenerating(false);
  };

  const stopGeneration = () => setIsGenerating(false);
  const clearChat = () => {
    setMessages([{ id: "1", role: "system", content: "You are a helpful AI assistant.", timestamp: Date.now() }]);
    setOutput(""); setTokenCount(0); setLatency(0);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output || "No output to copy");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateMessage = (id: string, content: string) => {
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, content } : m));
  };

  const removeMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const addSystemMessage = () => {
    setMessages((prev) => [...prev, { id: Date.now().toString(), role: "system", content: "", timestamp: Date.now() }]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-4">
        <Card className="border-border-subtle bg-surface">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-text-primary flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                Prompt Playground
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1 text-[10px] border-border-subtle font-mono">
                  <BarChart3 className="h-3 w-3" /> {tokenCount} tokens
                </Badge>
                {latency > 0 && (
                  <Badge variant="outline" className="gap-1 text-[10px] border-border-subtle font-mono">
                    <Clock className="h-3 w-3" /> {latency}ms
                  </Badge>
                )}
                <Button variant="ghost" size="sm" onClick={clearChat} className="h-7 text-xs gap-1 rounded-md">
                  <RotateCcw className="h-3 w-3" /> Clear
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 max-h-[300px] overflow-y-auto no-scrollbar">
              <AnimatePresence>
                {messages.map((msg) => (
                  <PromptMessage key={msg.id} msg={msg} onUpdate={updateMessage} onRemove={removeMessage} />
                ))}
              </AnimatePresence>
            </div>

            <Button variant="ghost" size="sm" onClick={addSystemMessage} className="text-xs gap-1 rounded-md h-7">
              <Plus className="h-3 w-3" /> Add System Message
            </Button>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-surface-hover p-0.5 rounded-lg">
                <TabsTrigger value="preview" className="rounded-md text-xs gap-1.5 data-[state=active]:bg-surface data-[state=active]:shadow-sm">
                  <MessageSquare className="h-3.5 w-3.5" /> Preview
                </TabsTrigger>
                <TabsTrigger value="raw" className="rounded-md text-xs gap-1.5 data-[state=active]:bg-surface data-[state=active]:shadow-sm">
                  <Code className="h-3.5 w-3.5" /> Raw
                </TabsTrigger>
              </TabsList>
              <TabsContent value="preview" className="mt-3">
                <div ref={outputRef}
                  className="min-h-[180px] p-4 rounded-xl bg-background border border-border-subtle text-sm text-text-primary whitespace-pre-wrap leading-relaxed"
                >
                  {output || <span className="text-text-tertiary italic">Output will appear here...</span>}
                  {isGenerating && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block h-4 w-2 bg-accent ml-0.5" />}
                </div>
              </TabsContent>
              <TabsContent value="raw" className="mt-3">
                <pre className="min-h-[180px] p-4 rounded-xl bg-background border border-border-subtle text-xs text-text-primary font-mono overflow-auto whitespace-pre-wrap">
                  {output ? JSON.stringify({ role: "assistant", content: output, model, temperature, maxTokens, tokens: tokenCount, latency: `${latency}ms` }, null, 2) : "..."}
                </pre>
              </TabsContent>
            </Tabs>

            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Textarea value={input} onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter your prompt..."
                  className="min-h-[44px] max-h-[120px] pr-20 border-border-subtle bg-background rounded-xl text-sm resize-none"
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleGenerate(); } }}
                />
                <div className="absolute right-2 bottom-2 flex items-center gap-1">
                  {isGenerating ? (
                    <Button size="icon" onClick={stopGeneration} className="h-8 w-8 rounded-lg bg-error hover:bg-error/90">
                      <StopCircle className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button size="icon" onClick={handleGenerate} disabled={!input.trim()} className="h-8 w-8 rounded-lg bg-accent hover:bg-accent/90">
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              <Button variant="outline" size="icon" onClick={() => setShowSettings(!showSettings)}
                className={cn("h-[44px] w-[44px] rounded-xl border-border-subtle transition-colors", showSettings && "bg-accent/10 border-accent/30")}
              >
                <Settings2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <AnimatePresence>
        {showSettings && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="lg:col-span-1">
            <PromptParameters
              model={model} onModelChange={setModel}
              temperature={temperature} onTemperatureChange={setTemperature}
              maxTokens={maxTokens} onMaxTokensChange={setMaxTokens}
              isGenerating={isGenerating} onGenerate={handleGenerate} onStop={stopGeneration}
              onCopy={copyOutput} copied={copied} input={input}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
