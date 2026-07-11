"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Key, Eye, EyeOff, Copy, Check, RotateCcw, Plus, Trash2, Shield, Clock, Server, FileKey, Variable, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";

interface APIKey {
  id: string;
  name: string;
  key: string;
  status: "active" | "expired" | "revoked";
  permissions: string[];
  created: string;
  expires?: string;
  lastUsed: string;
}

interface EnvVar {
  id: string;
  key: string;
  value: string;
  environment: string;
  sensitive: boolean;
  lastRotated: string;
}

const EMPTY_API_KEYS: never[] = [];
const EMPTY_ENV_VARS: never[] = [];

const statusConfig = {
  active: { color: "text-success bg-success/10", label: "Active" },
  expired: { color: "text-text-tertiary bg-surface-hover", label: "Expired" },
  revoked: { color: "text-error bg-error/10", label: "Revoked" },
};

function APIKeyRow({ keyItem }: { keyItem: APIKey }) {
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

function EnvVarRow({ envVar }: { envVar: EnvVar }) {
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

export function SecretsTab() {
  const [secretsTab, setSecretsTab] = useState("api-keys");
  const { data: keysResponse } = useGetAdminResourceQuery({ resource: "api-keys" });
  const { data: envResponse } = useGetAdminResourceQuery({ resource: "environment" });
  const API_KEYS = (keysResponse?.data || EMPTY_API_KEYS) as any[];
  const ENV_VARS = (envResponse?.data || EMPTY_ENV_VARS) as any[];

  return (
    <Tabs value={secretsTab} onValueChange={setSecretsTab} className="space-y-4">
      <TabsList className="bg-surface-hover p-0.5 rounded-xl">
        <TabsTrigger value="api-keys" className="rounded-lg text-xs gap-1.5 data-[state=active]:bg-surface data-[state=active]:shadow-sm">
          <Key className="h-3.5 w-3.5" /> API Keys
        </TabsTrigger>
        <TabsTrigger value="env" className="rounded-lg text-xs gap-1.5 data-[state=active]:bg-surface data-[state=active]:shadow-sm">
          <Variable className="h-3.5 w-3.5" /> Environment Variables
        </TabsTrigger>
        <TabsTrigger value="jwt" className="rounded-lg text-xs gap-1.5 data-[state=active]:bg-surface data-[state=active]:shadow-sm">
          <FileKey className="h-3.5 w-3.5" /> JWT Management
        </TabsTrigger>
      </TabsList>

      {/* API Keys */}
      <TabsContent value="api-keys" className="mt-0 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-text-tertiary">{API_KEYS.length} API keys</p>
          <Button size="sm" className="h-7 text-[10px] gap-1 rounded-lg bg-accent hover:bg-accent/90">
            <Plus className="h-3 w-3" /> Create Key
          </Button>
        </div>
        {API_KEYS.map((k) => <APIKeyRow key={k.id} keyItem={k} />)}
      </TabsContent>

      {/* Environment Variables */}
      <TabsContent value="env" className="mt-0 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-text-tertiary">{ENV_VARS.length} environment variables</p>
          <Button size="sm" className="h-7 text-[10px] gap-1 rounded-lg bg-accent hover:bg-accent/90">
            <Plus className="h-3 w-3" /> Add Variable
          </Button>
        </div>
        {ENV_VARS.map((ev, i) => (
          <motion.div key={ev.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <EnvVarRow envVar={ev} />
          </motion.div>
        ))}
      </TabsContent>

      {/* JWT Management */}
      <TabsContent value="jwt" className="mt-0 space-y-4">
        <Card className="border-border-subtle bg-surface">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-text-primary">JWT Configuration</CardTitle>
            <CardDescription>Configure JSON Web Token settings and signing keys</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Access Token TTL", value: "15 minutes", desc: "Short-lived access tokens" },
                { label: "Refresh Token TTL", value: "7 days", desc: "Long-lived refresh tokens" },
                { label: "Remember Me TTL", value: "30 days", desc: "Extended session duration" },
                { label: "Signing Algorithm", value: "RS256", desc: "RSA with SHA-256" },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-xl bg-surface-hover border border-border-subtle">
                  <p className="text-xs font-medium text-text-primary">{item.value}</p>
                  <p className="text-[10px] text-text-primary font-semibold">{item.label}</p>
                  <p className="text-[8px] text-text-tertiary mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-surface-hover border border-border-subtle">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-text-primary">Current Signing Key</p>
                <div className="flex items-center gap-2">
                  <Badge className="text-[7px] px-1 py-0 rounded border-0 bg-success/10 text-success">Active</Badge>
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-lg">
                    <RotateCcw className="h-3 w-3 text-text-tertiary" />
                  </Button>
                </div>
              </div>
              <code className="text-[9px] font-mono text-text-tertiary bg-background px-1.5 py-0.5 rounded block truncate">
                -----BEGIN RSA PRIVATE KEY-----&#10;MIIEpAIBAAKCAQEA8TzF••••••••••••••••••••••••••••••••&#10;-----END RSA PRIVATE KEY-----
              </code>
              <div className="flex items-center gap-3 mt-2 text-[8px] text-text-tertiary">
                <span>Key ID: <code className="font-mono">k4e9f8d2-a1b3-4c5d-8e6f-7a0b1c2d3e4f</code></span>
                <span>Created: 2 weeks ago</span>
                <span>Next rotation: 10 weeks</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
