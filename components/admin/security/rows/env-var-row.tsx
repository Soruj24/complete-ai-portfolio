"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Variable, Eye, EyeOff, Copy, Check, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EnvVar } from "../types";

export function EnvVarRow({ envVar }: { envVar: EnvVar }) {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyValue = async () => {
    await navigator.clipboard.writeText(envVar.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
      className="p-3 rounded-xl border border-border-subtle bg-surface"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={cn("p-2 rounded-lg", envVar.sensitive ? "bg-warning/10" : "bg-accent/10")}>
            <Variable className={cn("h-4 w-4", envVar.sensitive ? "text-warning" : "text-accent")} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <code className="text-xs font-mono font-semibold text-text-primary">{envVar.key}</code>
              <Badge variant="outline" className="text-[7px] px-1 py-0 rounded border-border-subtle text-text-tertiary">{envVar.environment}</Badge>
              {envVar.sensitive && <Badge className="text-[7px] px-1 py-0 rounded border-0 bg-warning/10 text-warning">Sensitive</Badge>}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <code className="text-[9px] font-mono text-text-tertiary bg-surface-hover px-1.5 py-0.5 rounded truncate max-w-[300px]">
                {visible ? envVar.value : envVar.value.replace(/[^:/.@-]/g, "•").slice(0, 40)}
              </code>
              <button onClick={() => setVisible(!visible)} className="h-5 w-5 rounded flex items-center justify-center hover:bg-surface-hover shrink-0">
                {visible ? <EyeOff className="h-3 w-3 text-text-tertiary" /> : <Eye className="h-3 w-3 text-text-tertiary" />}
              </button>
              <button onClick={copyValue} className="h-5 w-5 rounded flex items-center justify-center hover:bg-surface-hover shrink-0">
                {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3 text-text-tertiary" />}
              </button>
            </div>
            <p className="text-[8px] text-text-tertiary mt-1">Last rotated: {envVar.lastRotated}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg shrink-0 ml-2">
          <RefreshCw className="h-3.5 w-3.5 text-text-tertiary" />
        </Button>
      </div>
    </motion.div>
  );
}
