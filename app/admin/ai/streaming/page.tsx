"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Radio, Play, StopCircle, Wifi, Activity, Clock, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreamConfig {
  endpoint: string;
  bufferSize: number;
  maxBackoff: number;
  keepAlive: boolean;
  compression: boolean;
  chunked: boolean;
}

export default function StreamingPage() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "[12:34:22] Stream connected to gpt-4o",
    "[12:34:22] Received chunk: 256 bytes",
    "[12:34:23] Received chunk: 512 bytes",
    "[12:34:23] Received chunk: 128 bytes",
    "[12:34:24] Stream complete: 7 chunks, 1,024 tokens",
  ]);
  const [config, setConfig] = useState<StreamConfig>({
    endpoint: "wss://api.openai.com/v1/realtime",
    bufferSize: 1024,
    maxBackoff: 30,
    keepAlive: true,
    compression: true,
    chunked: true,
  });

  const toggleStream = () => {
    setIsStreaming(!isStreaming);
    if (!isStreaming) {
      const newLogs = [...logs, `[${new Date().toLocaleTimeString()}] Stream connecting...`];
      setTimeout(() => {
        setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Stream established`]);
        let count = 0;
        const interval = setInterval(() => {
          count++;
          setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Chunk ${count}: ${config.bufferSize} bytes`]);
          if (count >= 5) { clearInterval(interval); setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Stream complete`]); setIsStreaming(false); }
        }, 1000);
      }, 500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Streaming</h1>
          <p className="text-sm text-text-secondary mt-1">Monitor real-time AI streaming connections</p>
        </div>
        <Button onClick={toggleStream}
          className={cn("gap-1.5 rounded-xl h-9 text-xs", isStreaming ? "bg-error hover:bg-error/90" : "bg-accent hover:bg-accent/90")}
        >
          {isStreaming ? <StopCircle className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {isStreaming ? "Stop Stream" : "Test Stream"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Config */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-border-subtle bg-surface">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
                <Radio className="h-4 w-4 text-accent" />
                Stream Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-text-secondary">WebSocket Endpoint</label>
                <Input value={config.endpoint} onChange={(e) => setConfig({ ...config, endpoint: e.target.value })}
                  className="border-border-subtle bg-surface h-9 text-xs font-mono rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-text-secondary">Buffer Size (bytes)</label>
                  <Input type="number" value={config.bufferSize} onChange={(e) => setConfig({ ...config, bufferSize: Number(e.target.value) })}
                    className="border-border-subtle bg-surface h-9 text-xs rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-text-secondary">Max Backoff (s)</label>
                  <Input type="number" value={config.maxBackoff} onChange={(e) => setConfig({ ...config, maxBackoff: Number(e.target.value) })}
                    className="border-border-subtle bg-surface h-9 text-xs rounded-xl" />
                </div>
              </div>
              {([["Keep-Alive", "keepAlive"], ["Compression", "compression"], ["Chunked Transfer", "chunked"]] as const).map(([label, key]) => (
                <div key={key} className="flex items-center justify-between">
                  <label className="text-xs font-medium text-text-secondary">{label}</label>
                  <Switch checked={config[key]} onCheckedChange={(v) => setConfig({ ...config, [key]: v })} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="border-border-subtle bg-surface">
            <CardContent className="p-4 space-y-3">
              {[
                { label: "Active Streams", value: isStreaming ? "1" : "0", icon: Wifi, color: isStreaming ? "text-accent" : "text-text-tertiary" },
                { label: "Bytes Received", value: "--", icon: Activity, color: "text-success" },
                { label: "Avg Chunk Size", value: "--", icon: BarChart3, color: "text-amber-500" },
                { label: "Latency", value: "--", icon: Clock, color: "text-purple-500" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <stat.icon className={cn("h-3.5 w-3.5", stat.color)} />
                    <span className="text-[11px] text-text-tertiary">{stat.label}</span>
                  </div>
                  <span className="text-xs font-semibold text-text-primary">{stat.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Logs */}
        <div className="lg:col-span-2">
          <Card className="border-border-subtle bg-surface">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-text-primary">Stream Logs</CardTitle>
              <CardDescription>Real-time streaming connection events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] overflow-y-auto rounded-xl bg-background border border-border-subtle p-4 font-mono text-xs space-y-1 no-scrollbar">
                {logs.map((log, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    className={cn(
                      "py-1 border-b border-border-subtle/30 last:border-0",
                      log.includes("complete") ? "text-success" :
                      log.includes("error") ? "text-error" :
                      log.includes("connected") || log.includes("established") ? "text-accent" :
                      "text-text-tertiary",
                    )}
                  >
                    <span className="text-text-tertiary/50">{log.split("]")[0]}]</span>
                    <span className="ml-1">{log.split("]").slice(1).join("]")}</span>
                  </motion.div>
                ))}
                {isStreaming && (
                  <motion.div animate={{ opacity: [1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8 }}
                    className="text-accent py-1"
                  >
                    <span className="text-text-tertiary/50">[{new Date().toLocaleTimeString()}]</span>
                    <span className="ml-1">Waiting for next chunk...</span>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
