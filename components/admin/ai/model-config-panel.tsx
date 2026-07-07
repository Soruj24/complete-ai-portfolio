"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save, RotateCcw, Info } from "lucide-react";
import { toast } from "sonner";

interface ModelConfig {
  provider: string;
  model: string;
  temperature: number;
  topP: number;
  maxTokens: number;
  contextWindow: number;
  streaming: boolean;
  frequencyPenalty: number;
  presencePenalty: number;
  stopSequences: string;
}

const providers = [
  { value: "openai", label: "OpenAI" },
  { value: "anthropic", label: "Anthropic" },
  { value: "google", label: "Google AI" },
  { value: "ollama", label: "Ollama" },
];

const modelsByProvider: Record<string, { value: string; label: string }[]> = {
  openai: [
    { value: "gpt-4o", label: "GPT-4o" },
    { value: "gpt-4o-mini", label: "GPT-4o Mini" },
    { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
  ],
  anthropic: [
    { value: "claude-3-opus", label: "Claude 3 Opus" },
    { value: "claude-3-sonnet", label: "Claude 3 Sonnet" },
    { value: "claude-3-haiku", label: "Claude 3 Haiku" },
  ],
  google: [
    { value: "gemini-pro", label: "Gemini Pro" },
    { value: "gemini-ultra", label: "Gemini Ultra" },
  ],
  ollama: [
    { value: "llama3", label: "Llama 3" },
    { value: "mistral", label: "Mistral" },
    { value: "codellama", label: "CodeLlama" },
  ],
};

export function ModelConfigPanel() {
  const [config, setConfig] = useState<ModelConfig>({
    provider: "openai",
    model: "gpt-4o",
    temperature: 0.7,
    topP: 1,
    maxTokens: 2048,
    contextWindow: 128000,
    streaming: true,
    frequencyPenalty: 0,
    presencePenalty: 0,
    stopSequences: "",
  });

  const update = <K extends keyof ModelConfig>(key: K, value: ModelConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    if (key === "provider") {
      const models = modelsByProvider[value as string];
      if (models) setConfig((prev) => ({ ...prev, model: models[0].value }));
    }
  };

  const handleSave = () => {
    toast.success("Model configuration saved");
  };

  const handleReset = () => {
    setConfig({ provider: "openai", model: "gpt-4o", temperature: 0.7, topP: 1, maxTokens: 2048, contextWindow: 128000, streaming: true, frequencyPenalty: 0, presencePenalty: 0, stopSequences: "" });
    toast.success("Configuration reset to defaults");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Provider & Model Selection */}
      <Card className="border-border-subtle bg-surface lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-text-primary">Model Configuration</CardTitle>
          <CardDescription>Configure the default model parameters for AI operations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-text-secondary">Provider</Label>
              <Select value={config.provider} onValueChange={(v) => update("provider", v)}>
                <SelectTrigger className="border-border-subtle bg-surface h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {providers.map((p) => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-text-secondary">Model</Label>
              <Select value={config.model} onValueChange={(v) => update("model", v)}>
                <SelectTrigger className="border-border-subtle bg-surface h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(modelsByProvider[config.provider] || []).map((m) => (
                    <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium text-text-secondary">Temperature</Label>
                <motion.span key={config.temperature} initial={{ scale: 1.2 }} animate={{ scale: 1 }}
                  className="text-sm font-bold text-text-primary font-mono"
                >
                  {config.temperature.toFixed(2)}
                </motion.span>
              </div>
              <Slider value={[config.temperature]} onValueChange={([v]) => update("temperature", v)} min={0} max={2} step={0.01} />
              <p className="text-[10px] text-text-tertiary">Controls randomness: 0 = deterministic, 2 = very random</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium text-text-secondary">Top P</Label>
                <motion.span key={config.topP} initial={{ scale: 1.2 }} animate={{ scale: 1 }}
                  className="text-sm font-bold text-text-primary font-mono"
                >
                  {config.topP.toFixed(2)}
                </motion.span>
              </div>
              <Slider value={[config.topP]} onValueChange={([v]) => update("topP", v)} min={0} max={1} step={0.01} />
              <p className="text-[10px] text-text-tertiary">Nucleus sampling: lower = more focused</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium text-text-secondary">Max Tokens</Label>
                <span className="text-sm font-bold text-text-primary font-mono">{config.maxTokens.toLocaleString()}</span>
              </div>
              <Slider value={[config.maxTokens]} onValueChange={([v]) => update("maxTokens", v)} min={64} max={16384} step={64} />
              <p className="text-[10px] text-text-tertiary">Maximum tokens in the generated response</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium text-text-secondary">Context Window</Label>
                <span className="text-sm font-bold text-text-primary font-mono">{config.contextWindow.toLocaleString()}</span>
              </div>
              <Slider value={[config.contextWindow]} onValueChange={([v]) => update("contextWindow", v)} min={4096} max={200000} step={1024} />
              <p className="text-[10px] text-text-tertiary">Maximum input context length</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-text-secondary">Frequency Penalty</Label>
              <Input type="number" value={config.frequencyPenalty} onChange={(e) => update("frequencyPenalty", Number(e.target.value))}
                min={-2} max={2} step={0.1} className="border-border-subtle bg-surface h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-text-secondary">Presence Penalty</Label>
              <Input type="number" value={config.presencePenalty} onChange={(e) => update("presencePenalty", Number(e.target.value))}
                min={-2} max={2} step={0.1} className="border-border-subtle bg-surface h-10" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium text-text-secondary">Stop Sequences</Label>
            <Input value={config.stopSequences} onChange={(e) => update("stopSequences", e.target.value)}
              placeholder="Comma-separated (e.g., \n\n, Human:, AI:)" className="border-border-subtle bg-surface h-10" />
          </div>
        </CardContent>
      </Card>

      {/* Sidebar Info */}
      <div className="space-y-4">
        <Card className="border-border-subtle bg-surface">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
              <Info className="h-4 w-4 text-accent" />
              Streaming
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-xs font-medium text-text-secondary">Enable Streaming</Label>
              <Switch checked={config.streaming} onCheckedChange={(v) => update("streaming", v)} />
            </div>
            <p className="text-[10px] text-text-tertiary">Stream responses token-by-token for real-time output</p>
          </CardContent>
        </Card>

        <Card className="border-border-subtle bg-surface">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-text-primary">Current Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs">
            {Object.entries(config).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between py-1 border-b border-border-subtle/50 last:border-0">
                <span className="text-text-tertiary capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                <span className="font-mono text-text-primary">{String(val)}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button onClick={handleSave} className="flex-1 gap-1.5 rounded-lg bg-accent hover:bg-accent/90 h-10">
            <Save className="h-4 w-4" /> Save Config
          </Button>
          <Button variant="outline" onClick={handleReset} className="gap-1.5 rounded-lg border-border-subtle h-10">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
