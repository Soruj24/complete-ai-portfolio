"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, ShieldX, Gauge, KeyRound, Users, Grid3X3, Plus, Trash2, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";

interface IPEntry {
  id: string;
  address: string;
  status: "active" | "inactive";
  reason: string;
  addedBy: string;
  expiresAt?: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  color: string;
  users: number;
  permissions: string[];
}

const EMPTY_IP_WHITELIST: never[] = [];
const EMPTY_IP_BLACKLIST: never[] = [];
const EMPTY_RATE_LIMITS: never[] = [];
const EMPTY_ROLES: never[] = [];
const PERMISSION_ACTIONS = ["create", "read", "update", "delete"] as const;
const PERMISSION_RESOURCES = ["users", "projects", "skills", "certifications", "settings"] as const;

const PASSWORD_POLICY_DEFAULT = {
  minLength: 12,
  expirationDays: 90,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSymbols: true,
  historyCount: 5,
  maxAttempts: 5,
  lockoutDuration: 30,
};

function IPTable({ items, type }: { items: IPEntry[]; type: "whitelist" | "blacklist" }) {
  const Icon = type === "whitelist" ? ShieldCheck : ShieldX;
  const color = type === "whitelist" ? "text-success" : "text-error";
  const bg = type === "whitelist" ? "bg-success/10" : "bg-error/10";

  return (
    <div className="space-y-2 mt-2">
      {items.map((item, i) => (
        <motion.div key={item.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
          className="flex items-center gap-3 p-3 rounded-xl border border-border-subtle bg-surface-hover"
        >
          <div className={cn("p-1.5 rounded-lg", bg)}>
            <Icon className={cn("h-4 w-4", color)} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <code className="text-xs font-mono font-semibold text-text-primary">{item.address}</code>
              <Badge className={cn("text-[7px] px-1 py-0 rounded border-0", item.status === "active" ? "bg-success/10 text-success" : "bg-surface-hover text-text-tertiary")}>
                {item.status}
              </Badge>
            </div>
            <div className="flex items-center gap-3 mt-0.5 text-[9px] text-text-tertiary">
              <span>Reason: {item.reason}</span>
              <span>Added by: {item.addedBy}</span>
              {item.expiresAt && <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5" /> Expires {item.expiresAt}</span>}
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-text-tertiary hover:text-error">
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

function PermissionCell({ granted }: { granted: boolean }) {
  return (
    <div className={cn(
      "h-7 w-7 rounded-md flex items-center justify-center transition-all",
      granted ? "bg-success/10 text-success" : "bg-surface-hover text-text-tertiary/30",
    )}>
      {granted ? <CheckCircle2 className="h-3.5 w-3.5" /> : "-"}
    </div>
  );
}

export function AccessControlTab() {
  const [policy, setPolicy] = useState(PASSWORD_POLICY_DEFAULT);
  const [accessTab, setAccessTab] = useState("ip");
  const { data: accessResponse } = useGetAdminResourceQuery({ resource: "security/access" });
  const accessData = (accessResponse?.data || {}) as Record<string, any>;
  const IP_WHITELIST = (accessData.whitelist || EMPTY_IP_WHITELIST) as any[];
  const IP_BLACKLIST = (accessData.blacklist || EMPTY_IP_BLACKLIST) as any[];
  const RATE_LIMITS = (accessData.rateLimits || EMPTY_RATE_LIMITS) as any[];
  const ROLES = (accessData.roles || EMPTY_ROLES) as any[];

  return (
    <Tabs value={accessTab} onValueChange={setAccessTab} className="space-y-4">
      <TabsList className="bg-surface-hover p-0.5 rounded-xl flex-wrap">
        <TabsTrigger value="ip" className="rounded-lg text-xs gap-1.5 data-[state=active]:bg-surface data-[state=active]:shadow-sm">
          <ShieldCheck className="h-3.5 w-3.5" /> IP Lists
        </TabsTrigger>
        <TabsTrigger value="rate" className="rounded-lg text-xs gap-1.5 data-[state=active]:bg-surface data-[state=active]:shadow-sm">
          <Gauge className="h-3.5 w-3.5" /> Rate Limiting
        </TabsTrigger>
        <TabsTrigger value="password" className="rounded-lg text-xs gap-1.5 data-[state=active]:bg-surface data-[state=active]:shadow-sm">
          <KeyRound className="h-3.5 w-3.5" /> Password Policy
        </TabsTrigger>
        <TabsTrigger value="roles" className="rounded-lg text-xs gap-1.5 data-[state=active]:bg-surface data-[state=active]:shadow-sm">
          <Users className="h-3.5 w-3.5" /> Roles
        </TabsTrigger>
        <TabsTrigger value="permissions" className="rounded-lg text-xs gap-1.5 data-[state=active]:bg-surface data-[state=active]:shadow-sm">
          <Grid3X3 className="h-3.5 w-3.5" /> Permissions
        </TabsTrigger>
      </TabsList>

      {/* IP Lists */}
      <TabsContent value="ip" className="mt-0 space-y-4">
        <Card className="border-border-subtle bg-surface">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-success" />
                IP Whitelist
              </CardTitle>
              <Button size="sm" className="h-7 text-[10px] gap-1 rounded-lg bg-accent hover:bg-accent/90">
                <Plus className="h-3 w-3" /> Add IP
              </Button>
            </div>
            <CardDescription>Only these IPs and ranges can access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <IPTable items={IP_WHITELIST} type="whitelist" />
          </CardContent>
        </Card>

        <Card className="border-border-subtle bg-surface">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
                <ShieldX className="h-4 w-4 text-error" />
                IP Blacklist
              </CardTitle>
              <Button size="sm" className="h-7 text-[10px] gap-1 rounded-lg bg-accent hover:bg-accent/90">
                <Plus className="h-3 w-3" /> Add IP
              </Button>
            </div>
            <CardDescription>Blocked IPs and ranges from accessing the system</CardDescription>
          </CardHeader>
          <CardContent>
            <IPTable items={IP_BLACKLIST} type="blacklist" />
          </CardContent>
        </Card>
      </TabsContent>

      {/* Rate Limiting */}
      <TabsContent value="rate" className="mt-0 space-y-3">
        <div className="grid gap-3">
          {RATE_LIMITS.map((rl, i) => (
            <motion.div key={rl.endpoint} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="p-3 rounded-xl border border-border-subtle bg-surface"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <code className="text-xs font-mono font-semibold text-text-primary">{rl.endpoint}</code>
                  <div className="flex items-center gap-3 mt-1 text-[9px] text-text-tertiary">
                    <span>Limit: {rl.limit} requests per {rl.window}</span>
                    <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5" /> Reset in {rl.resetIn}</span>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-text-primary">{rl.remaining}</span>
                    <span className="text-[9px] text-text-tertiary">/ {rl.limit}</span>
                  </div>
                  <div className="h-1.5 w-24 rounded-full bg-background mt-1 overflow-hidden">
                    <div className={cn(
                      "h-full rounded-full transition-all",
                      (rl.current / rl.limit) > 0.8 ? "bg-error" :
                      (rl.current / rl.limit) > 0.5 ? "bg-warning" : "bg-success",
                    )} style={{ width: `${(rl.current / rl.limit) * 100}%` }} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </TabsContent>

      {/* Password Policy */}
      <TabsContent value="password" className="mt-0">
        <Card className="border-border-subtle bg-surface">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-text-primary">Password Policy</CardTitle>
            <CardDescription>Configure password requirements and lockout rules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-text-secondary">Minimum Length</Label>
                  <span className="text-xs font-bold font-mono text-text-primary">{policy.minLength}</span>
                </div>
                <Slider value={[policy.minLength]} onValueChange={([v]) => setPolicy({ ...policy, minLength: v })} min={6} max={64} step={1} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-text-secondary">Expiration (days)</Label>
                  <span className="text-xs font-bold font-mono text-text-primary">{policy.expirationDays}</span>
                </div>
                <Slider value={[policy.expirationDays]} onValueChange={([v]) => setPolicy({ ...policy, expirationDays: v })} min={0} max={365} step={30} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Require Uppercase", key: "requireUppercase" as const },
                { label: "Require Lowercase", key: "requireLowercase" as const },
                { label: "Require Numbers", key: "requireNumbers" as const },
                { label: "Require Symbols", key: "requireSymbols" as const },
              ].map((req) => (
                <div key={req.key} className="flex items-center justify-between p-2.5 rounded-lg bg-surface-hover border border-border-subtle">
                  <Label className="text-xs font-medium text-text-secondary">{req.label}</Label>
                  <Switch checked={policy[req.key]} onCheckedChange={(v) => setPolicy({ ...policy, [req.key]: v })} />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-text-secondary">Password History</Label>
                  <span className="text-xs font-bold font-mono text-text-primary">{policy.historyCount}</span>
                </div>
                <Slider value={[policy.historyCount]} onValueChange={([v]) => setPolicy({ ...policy, historyCount: v })} min={0} max={24} step={1} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-text-secondary">Max Login Attempts</Label>
                  <span className="text-xs font-bold font-mono text-text-primary">{policy.maxAttempts}</span>
                </div>
                <Slider value={[policy.maxAttempts]} onValueChange={([v]) => setPolicy({ ...policy, maxAttempts: v })} min={3} max={20} step={1} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium text-text-secondary">Lockout Duration (minutes)</Label>
                <span className="text-xs font-bold font-mono text-text-primary">{policy.lockoutDuration}</span>
              </div>
              <Slider value={[policy.lockoutDuration]} onValueChange={([v]) => setPolicy({ ...policy, lockoutDuration: v })} min={5} max={120} step={5} />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Roles */}
      <TabsContent value="roles" className="mt-0 space-y-3">
        {ROLES.map((role, i) => (
          <motion.div key={role.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="p-3 rounded-xl border border-border-subtle bg-surface"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: `${role.color}15`, color: role.color }}>
                  {role.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">{role.name}</h3>
                  <p className="text-[10px] text-text-tertiary">{role.description} &middot; {role.users} user{role.users !== 1 ? "s" : ""}</p>
                </div>
              </div>
              <Badge variant="outline" className="text-[9px] px-1.5 py-0 rounded-full border-border-subtle text-text-tertiary font-mono">
                {role.permissions.length === 1 && role.permissions[0] === "all" ? "All Permissions" : `${role.permissions.length} permissions`}
              </Badge>
            </div>
          </motion.div>
        ))}
      </TabsContent>

      {/* Permission Matrix */}
      <TabsContent value="permissions" className="mt-0">
        <Card className="border-border-subtle bg-surface overflow-x-auto">
          <CardContent className="p-3">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="text-left pb-2 text-[9px] text-text-tertiary uppercase tracking-wider font-medium">Role</th>
                  {PERMISSION_RESOURCES.map((res) => (
                    <th key={res} className="text-center pb-2 text-[9px] text-text-tertiary uppercase tracking-wider font-medium px-1">{res}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROLES.map((role) => (
                  <tr key={role.id} className="border-b border-border-subtle/50 last:border-0">
                    <td className="py-2 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold text-text-primary">{role.name}</span>
                      </div>
                    </td>
                    {PERMISSION_RESOURCES.map((res) => {
                      const hasPerm = role.permissions.includes("all") || role.permissions.some((p: string) => p.startsWith(res));
                      return (
                        <td key={res} className="text-center py-2 px-1">
                          <PermissionCell granted={hasPerm} />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
