"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Key, Variable, FileKey, Plus, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSecurityQuery, SecurityInnerTabs, TabsContent } from "./shared";
import { APIKeyRow } from "./rows/api-key-row";
import { EnvVarRow } from "./rows/env-var-row";

export function SecretsTab() {
  const [secretsTab, setSecretsTab] = useState("api-keys");
  const { data: keysResponse } = useSecurityQuery("api-keys");
  const { data: envResponse } = useSecurityQuery("environment");
  const API_KEYS = (Array.isArray(keysResponse) ? keysResponse : []) as any[];
  const ENV_VARS = (Array.isArray(envResponse) ? envResponse : []) as any[];

  const innerTabs = [
    { value: "api-keys", label: "API Keys", icon: Key },
    { value: "env", label: "Environment Variables", icon: Variable },
    { value: "jwt", label: "JWT Management", icon: FileKey },
  ];

  return (
    <SecurityInnerTabs tabs={innerTabs} value={secretsTab} onValueChange={setSecretsTab}>
      <TabsContent value="api-keys" className="mt-0 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-text-tertiary">{API_KEYS.length} API keys</p>
          <Button size="sm" className="h-7 text-[10px] gap-1 rounded-lg bg-accent hover:bg-accent/90">
            <Plus className="h-3 w-3" /> Create Key
          </Button>
        </div>
        {API_KEYS.map((k: any) => <APIKeyRow key={k.id} keyItem={k} />)}
      </TabsContent>

      <TabsContent value="env" className="mt-0 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-text-tertiary">{ENV_VARS.length} environment variables</p>
          <Button size="sm" className="h-7 text-[10px] gap-1 rounded-lg bg-accent hover:bg-accent/90">
            <Plus className="h-3 w-3" /> Add Variable
          </Button>
        </div>
        {ENV_VARS.map((ev: any, i: number) => (
          <motion.div key={ev.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <EnvVarRow envVar={ev} />
          </motion.div>
        ))}
      </TabsContent>

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
    </SecurityInnerTabs>
  );
}
