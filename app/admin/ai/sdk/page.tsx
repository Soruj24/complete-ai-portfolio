"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, Copy, Check, Terminal, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { sdks, codeSnippets, installCommands } from "./sdk-data";

export default function SDKPage() {
  const [activeLang, setActiveLang] = useState("python");
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(codeSnippets[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">SDK Configuration</h1>
          <p className="text-sm text-text-secondary mt-1">Integrate AI capabilities into your applications</p>
        </div>
        <Button variant="outline" className="gap-1.5 rounded-xl border-border-subtle h-9 text-xs">
          <Settings2 className="h-3.5 w-3.5" /> Global Settings
        </Button>
      </div>

      {/* SDK Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {sdks.map((sdk) => (
          <motion.div key={sdk.name} whileHover={{ scale: 1.02 }}>
            <Card className={cn(
              "border-border-subtle bg-surface cursor-pointer transition-all",
              activeLang === sdk.name.toLowerCase() && "ring-2 ring-accent/30 border-accent/30",
            )}
              onClick={() => setActiveLang(sdk.name.toLowerCase())}
            >
              <CardContent className="p-4 text-center">
                <div className={cn("p-2.5 rounded-xl inline-flex mx-auto", sdk.bg)}>
                  <sdk.icon className={cn("h-5 w-5", sdk.color)} />
                </div>
                <h3 className="text-sm font-semibold text-text-primary mt-2">{sdk.name}</h3>
                <div className="flex items-center justify-center gap-2 mt-1 text-[10px] text-text-tertiary">
                  <Badge variant="outline" className="text-[8px] px-1.5 py-0 rounded-full border-border-subtle">v{sdk.version}</Badge>
                  <span>{sdk.updated}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Code Snippet */}
      <Card className="border-border-subtle bg-surface">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
              <Code className="h-4 w-4 text-accent" />
              Quick Start - {activeLang.charAt(0).toUpperCase() + activeLang.slice(1)}
            </CardTitle>
            <Button variant="outline" size="sm" onClick={copyCode} className="h-7 text-xs gap-1 rounded-lg border-border-subtle">
              {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative rounded-xl bg-background border border-border-subtle overflow-hidden">
            <pre className="p-4 text-xs font-mono text-text-primary overflow-x-auto leading-relaxed">
              <code>{codeSnippets[activeLang]}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Install Commands */}
      <Card className="border-border-subtle bg-surface">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-text-primary">Installation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {installCommands.map(({ lang, cmd }) => (
              <div key={lang} className="flex items-center justify-between p-3 rounded-xl bg-background border border-border-subtle">
                <div className="flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5 text-text-tertiary" />
                  <span className="text-xs font-mono text-text-primary">{cmd}</span>
                </div>
                <button onClick={() => navigator.clipboard.writeText(cmd)}>
                  <Copy className="h-3 w-3 text-text-tertiary hover:text-text-primary" />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
