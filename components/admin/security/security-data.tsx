"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Shield, Database, HardDrive, RefreshCw, CheckCircle2, XCircle, AlertTriangle, Clock, RotateCcw, Copy, Check, Download, FileKey, Lock, Unlock, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { BACKUP_STATUS, RECOVERY_CODES } from "./data";

export function DataProtectionTab() {
  const [dataTab, setDataTab] = useState("backup");
  const [showCodes, setShowCodes] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);

  const storagePercent = (BACKUP_STATUS.databases.reduce((s, d) => {
    const num = parseFloat(d.size);
    return s + (d.size.includes("GB") ? num * 1024 : num);
  }, 0) / (200 * 1024)) * 100;

  const copyCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <Tabs value={dataTab} onValueChange={setDataTab} className="space-y-4">
      <TabsList className="bg-surface-hover p-0.5 rounded-xl">
        <TabsTrigger value="backup" className="rounded-lg text-xs gap-1.5 data-[state=active]:bg-surface data-[state=active]:shadow-sm">
          <HardDrive className="h-3.5 w-3.5" /> Backup Status
        </TabsTrigger>
        <TabsTrigger value="encryption" className="rounded-lg text-xs gap-1.5 data-[state=active]:bg-surface data-[state=active]:shadow-sm">
          <Lock className="h-3.5 w-3.5" /> DB Encryption
        </TabsTrigger>
        <TabsTrigger value="recovery" className="rounded-lg text-xs gap-1.5 data-[state=active]:bg-surface data-[state=active]:shadow-sm">
          <FileKey className="h-3.5 w-3.5" /> Recovery Codes
        </TabsTrigger>
      </TabsList>

      {/* Backup Status */}
      <TabsContent value="backup" className="mt-0 space-y-4">
        {/* Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Last Backup", value: BACKUP_STATUS.lastBackup, icon: Clock, color: "text-accent" },
            { label: "Backup Size", value: BACKUP_STATUS.lastBackupSize, icon: HardDrive, color: "text-success" },
            { label: "Total Backups", value: BACKUP_STATUS.totalBackups.toString(), icon: Database, color: "text-purple-500" },
            { label: "Storage Used", value: `${Math.round(storagePercent)}%`, icon: RefreshCw, color: "text-amber-500" },
          ].map((stat) => (
            <Card key={stat.label} className="border-border-subtle bg-surface">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <stat.icon className={cn("h-4 w-4", stat.color)} />
                  <Badge className={cn(
                    "text-[7px] px-1 py-0 rounded border-0",
                    stat.label === "Last Backup" && (BACKUP_STATUS.status === "healthy" ? "bg-success/10 text-success" : "bg-error/10 text-error"),
                  )}>
                    {stat.label === "Last Backup" ? BACKUP_STATUS.status : ""}
                  </Badge>
                </div>
                <p className="text-lg font-bold text-text-primary">{stat.value}</p>
                <p className="text-[10px] text-text-tertiary mt-0.5">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Schedule */}
        <Card className="border-border-subtle bg-surface">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-text-primary">Backup Schedule</CardTitle>
            <CardDescription>Automated backup configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Schedule", value: BACKUP_STATUS.schedule },
                { label: "Next Backup", value: BACKUP_STATUS.nextBackup },
                { label: "Retention Policy", value: "30 daily, 12 weekly, 6 monthly" },
                { label: "Encryption", value: "AES-256-GCM" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-surface-hover border border-border-subtle">
                  <span className="text-[10px] text-text-tertiary">{item.label}</span>
                  <span className="text-[10px] font-medium text-text-primary">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Database Backups */}
        <Card className="border-border-subtle bg-surface">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-text-primary">Database Backups</CardTitle>
            <CardDescription>Per-database backup status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {BACKUP_STATUS.databases.map((db, i) => (
              <motion.div key={db.name} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-3 rounded-xl bg-surface-hover border border-border-subtle"
              >
                <div className="flex items-center gap-3">
                  <Database className="h-4 w-4 text-text-secondary" />
                  <div>
                    <p className="text-xs font-semibold text-text-primary">{db.name}</p>
                    <p className="text-[9px] text-text-tertiary">{db.size} &middot; Last backup {db.lastBackup}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {db.status === "success" ? (
                    <Badge className="text-[7px] px-1 py-0 rounded border-0 bg-success/10 text-success flex items-center gap-1">
                      <CheckCircle2 className="h-2.5 w-2.5" /> Success
                    </Badge>
                  ) : (
                    <Badge className="text-[7px] px-1 py-0 rounded border-0 bg-error/10 text-error flex items-center gap-1">
                      <XCircle className="h-2.5 w-2.5" /> Failed
                    </Badge>
                  )}
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg">
                    <Download className="h-3.5 w-3.5 text-text-tertiary" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg">
                    <RefreshCw className="h-3.5 w-3.5 text-text-tertiary" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      {/* DB Encryption */}
      <TabsContent value="encryption" className="mt-0 space-y-4">
        <Card className="border-border-subtle bg-surface">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
                  <Lock className="h-4 w-4 text-accent" />
                  Database Encryption
                </CardTitle>
                <CardDescription>Manage encryption at rest and in transit</CardDescription>
              </div>
              <Switch checked={encryptionEnabled} onCheckedChange={setEncryptionEnabled} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Encryption at Rest", value: "AES-256-GCM", status: "enabled" as const, desc: "Data is encrypted on disk" },
                { label: "Encryption in Transit", value: "TLS 1.3", status: "enabled" as const, desc: "All connections use TLS" },
                { label: "Key Rotation", value: "Every 90 days", status: "active" as const, desc: "Automatic key rotation" },
                { label: "Key Management", value: "AWS KMS", status: "active" as const, desc: "HashiCorp Vault integration" },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-xl bg-surface-hover border border-border-subtle">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-medium text-text-primary">{item.label}</span>
                    <Badge className={cn(
                      "text-[7px] px-1 py-0 rounded border-0",
                      item.status === "enabled" ? "bg-success/10 text-success" : "bg-accent/10 text-accent",
                    )}>
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-xs font-bold text-text-primary">{item.value}</p>
                  <p className="text-[8px] text-text-tertiary mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-background border border-border-subtle">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-text-primary">Encryption Key</p>
                <Button variant="outline" size="sm" className="h-7 text-[9px] gap-1 rounded-lg border-border-subtle">
                  <RotateCcw className="h-3 w-3" /> Rotate Key
                </Button>
              </div>
              <code className="text-[9px] font-mono text-text-tertiary bg-surface-hover px-1.5 py-0.5 rounded block truncate">
                arn:aws:kms:us-east-1:123456789:key/mrk-8f4e9d2a1b3c4d5e6f7a8b9c0d1e2f3a
              </code>
              <div className="flex items-center gap-3 mt-2 text-[8px] text-text-tertiary">
                <span>Created: 3 months ago</span>
                <span>Last rotated: 2 weeks ago</span>
                <span>Next rotation: 10 weeks</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Recovery Codes */}
      <TabsContent value="recovery" className="mt-0 space-y-4">
        <Card className="border-border-subtle bg-surface">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
                  <FileKey className="h-4 w-4 text-amber-500" />
                  Recovery Codes
                </CardTitle>
                <CardDescription>One-time codes for account recovery and 2FA backup</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowCodes(!showCodes)}
                  className="h-7 text-[10px] gap-1 rounded-lg border-border-subtle">
                  {showCodes ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  {showCodes ? "Hide" : "Show"}
                </Button>
                <Button size="sm" className="h-7 text-[10px] gap-1 rounded-lg bg-accent hover:bg-accent/90">
                  <RefreshCw className="h-3 w-3" /> Regenerate
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {RECOVERY_CODES.map((rc) => (
                <div key={rc.code} className={cn(
                  "flex items-center justify-between p-2.5 rounded-lg border font-mono text-[10px] transition-all",
                  rc.used ? "border-border-subtle bg-surface-hover text-text-tertiary/50 line-through" : "border-border-subtle bg-background text-text-primary",
                )}>
                  <span>{showCodes ? rc.code : "••••-••••-••••"}</span>
                  {!rc.used && showCodes && (
                    <button onClick={() => copyCode(rc.code)} className="h-5 w-5 rounded flex items-center justify-center hover:bg-surface-hover">
                      {copiedCode === rc.code ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3 text-text-tertiary" />}
                    </button>
                  )}
                  {rc.used && <Badge className="text-[7px] px-1 py-0 rounded border-0 bg-surface-hover text-text-tertiary">Used</Badge>}
                </div>
              ))}
            </div>
            <p className="text-[9px] text-text-tertiary mt-2">
              {RECOVERY_CODES.filter((c) => !c.used).length} codes remaining &middot; Regenerating codes will invalidate all previous codes
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
