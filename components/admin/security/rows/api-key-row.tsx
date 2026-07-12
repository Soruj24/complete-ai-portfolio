"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Key, Eye, EyeOff, Copy, Check, RotateCcw, Trash2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { APIKey } from "../types";

const statusConfig = {
  active: { color: "text-success bg-success/10", label: "Active" },
  expired: { color: "text-text-tertiary bg-surface-hover", label: "Expired" },
  revoked: { color: "text-error bg-error/10", label: "Revoked" },
};

export function APIKeyRow({ keyItem }: { keyItem: APIKey }) {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const status = statusConfig[keyItem.status];

  const copyKey = async () => {
    await navigator.clipboard.writeText(keyItem.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
      className="p-3 rounded-xl border border-border-subtle bg-surface"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-background">
            <Key className="h-4 w-4 text-text-secondary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-semibold text-text-primary">{keyItem.name}</h4>
              <Badge className={cn("text-[7px] px-1 py-0 rounded border-0 font-medium", status.color)}>{status.label}</Badge>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <code className="text-[9px] font-mono text-text-tertiary bg-surface-hover px-1.5 py-0.5 rounded">
                {visible ? keyItem.key : keyItem.key.replace(/[a-f0-9]/gi, "•")}
              </code>
              <button onClick={() => setVisible(!visible)} className="h-5 w-5 rounded flex items-center justify-center hover:bg-surface-hover">
                {visible ? <EyeOff className="h-3 w-3 text-text-tertiary" /> : <Eye className="h-3 w-3 text-text-tertiary" />}
              </button>
              <button onClick={copyKey} className="h-5 w-5 rounded flex items-center justify-center hover:bg-surface-hover">
                {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3 text-text-tertiary" />}
              </button>
            </div>
            <div className="flex items-center gap-3 mt-1.5 text-[8px] text-text-tertiary font-mono">
              <span>{keyItem.permissions.join(", ")}</span>
              <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5" /> Created {keyItem.created}</span>
              {keyItem.expires && <span>Expires {keyItem.expires}</span>}
              <span>Last used {keyItem.lastUsed}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0 ml-3">
          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg">
            <RotateCcw className="h-3.5 w-3.5 text-text-tertiary" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg hover:text-error">
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
