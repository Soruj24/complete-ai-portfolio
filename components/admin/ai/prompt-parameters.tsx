"use client";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, StopCircle, Copy, Check, Save } from "lucide-react";

export function PromptParameters({ model, onModelChange, temperature, onTemperatureChange, maxTokens, onMaxTokensChange,
  isGenerating, onGenerate, onStop, onCopy, copied, input }: {
  model: string; onModelChange: (v: string) => void;
  temperature: number; onTemperatureChange: (v: number) => void;
  maxTokens: number; onMaxTokensChange: (v: number) => void;
  isGenerating: boolean; onGenerate: () => void; onStop: () => void;
  onCopy: () => void; copied: boolean; input: string;
}) {
  return (
    <Card className="border-border-subtle bg-surface">
      <CardHeader>
        <CardTitle className="text-sm font-semibold text-text-primary">Parameters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label className="text-xs font-medium text-text-secondary">Model</Label>
          <Select value={model} onValueChange={onModelChange}>
            <SelectTrigger className="border-border-subtle bg-surface h-9 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4o">GPT-4o</SelectItem>
              <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
              <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
              <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
              <SelectItem value="llama3">Llama 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-medium text-text-secondary">Temperature</Label>
            <span className="text-xs font-bold font-mono text-text-primary">{temperature.toFixed(2)}</span>
          </div>
          <Slider value={[temperature]} onValueChange={([v]) => onTemperatureChange(v)} min={0} max={2} step={0.01} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-medium text-text-secondary">Max Tokens</Label>
            <span className="text-xs font-bold font-mono text-text-primary">{maxTokens}</span>
          </div>
          <Slider value={[maxTokens]} onValueChange={([v]) => onMaxTokensChange(v)} min={64} max={8192} step={64} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-medium text-text-secondary">Streaming</Label>
            <Switch checked={true} />
          </div>
        </div>

        <div className="pt-2 space-y-2">
          <Button onClick={onGenerate} disabled={!input.trim() || isGenerating} className="w-full gap-1.5 rounded-lg bg-accent hover:bg-accent/90 h-9 text-xs">
            {isGenerating ? <StopCircle className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {isGenerating ? "Generating..." : "Run Test"}
          </Button>
          <Button variant="outline" onClick={onCopy} className="w-full gap-1.5 rounded-lg border-border-subtle h-9 text-xs">
            {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy Output"}
          </Button>
          <Button variant="ghost" onClick={() => {}} className="w-full gap-1.5 rounded-lg h-9 text-xs">
            <Save className="h-3.5 w-3.5" /> Save as Template
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
