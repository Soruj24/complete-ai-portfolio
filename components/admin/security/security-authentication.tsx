"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Shield, Smartphone, Monitor, Globe, Key, CheckCircle2, AlertTriangle, Clock, LogOut, History, XCircle, Terminal, Laptop, Tablet, QrCode, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SESSIONS, DEVICES, FAILED_LOGINS, type Session, type Device, type LoginEntry, RECOVERY_CODES } from "./data";

function SessionRow({ session }: { session: Session }) {
  return (
    <div className={cn(
      "flex items-center gap-3 p-3 rounded-xl border transition-all",
      session.isCurrent ? "border-accent/20 bg-accent/5" : "border-border-subtle bg-surface-hover",
    )}>
      <div className="p-2 rounded-lg bg-background">
        <Monitor className="h-4 w-4 text-text-secondary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-text-primary">{session.device}</span>
          {session.isCurrent && <Badge className="text-[7px] px-1 py-0 rounded border-0 bg-accent/10 text-accent">Current</Badge>}
          {session.isTrusted && <Badge variant="outline" className="text-[7px] px-1 py-0 rounded border-border-subtle text-text-tertiary">Trusted</Badge>}
        </div>
        <div className="flex items-center gap-3 mt-0.5 text-[9px] text-text-tertiary font-mono">
          <span>{session.browser} on {session.os}</span>
          <span>{session.ip}</span>
          <span>{session.location}</span>
        </div>
      </div>
      <div className="text-right text-[9px] text-text-tertiary shrink-0">
        <p>Active {session.lastActive}</p>
        <p className="mt-0.5">Since {session.createdAt}</p>
      </div>
      {!session.isCurrent && (
        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-text-tertiary hover:text-error">
          <XCircle className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
}

function DeviceRow({ device }: { device: Device }) {
  const Icon = device.type === "Phone" ? Smartphone : device.type === "Tablet" ? Tablet : Laptop;
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-border-subtle bg-surface-hover">
      <div className="p-2 rounded-lg bg-background">
        <Icon className="h-4 w-4 text-text-secondary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-text-primary">{device.name}</span>
          <Badge variant="outline" className="text-[7px] px-1 py-0 rounded border-border-subtle text-text-tertiary">{device.type}</Badge>
          {device.trusted && <Badge className="text-[7px] px-1 py-0 rounded border-0 bg-success/10 text-success">Trusted</Badge>}
        </div>
        <div className="flex items-center gap-3 mt-0.5 text-[9px] text-text-tertiary font-mono">
          <span>{device.os}</span>
          <span>{device.browser}</span>
          <span>{device.ip}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Switch defaultChecked={device.trusted} />
        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-text-tertiary hover:text-error">
          <LogOut className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

function LoginRow({ entry }: { entry: LoginEntry }) {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface-hover transition-colors">
      <div className={cn("p-1.5 rounded-lg", entry.status === "success" ? "bg-success/10" : "bg-error/10")}>
        {entry.status === "success" ? <CheckCircle2 className="h-3.5 w-3.5 text-success" /> : <XCircle className="h-3.5 w-3.5 text-error" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium text-text-primary">{entry.location}</span>
          <Badge className={cn(
            "text-[7px] px-1 py-0 rounded border-0 font-medium",
            entry.status === "success" ? "bg-success/10 text-success" : "bg-error/10 text-error",
          )}>
            {entry.status}
          </Badge>
        </div>
        <div className="flex items-center gap-2 mt-0.5 text-[8px] text-text-tertiary font-mono">
          <span>{entry.ip}</span>
          <span>{entry.device}</span>
          <span>{entry.browser}</span>
          {entry.reason && <span className="text-warning">{entry.reason}</span>}
        </div>
      </div>
      <span className="text-[9px] text-text-tertiary shrink-0">{entry.timestamp}</span>
    </div>
  );
}

export function AuthenticationTab() {
  const [twoFAEnabled, setTwoFAEnabled] = useState(true);
  const [showRecovery, setShowRecovery] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [authTab, setAuthTab] = useState("sessions");

  const copyCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <Tabs value={authTab} onValueChange={setAuthTab} className="space-y-4">
      <TabsList className="bg-surface-hover p-0.5 rounded-xl">
        <TabsTrigger value="sessions" className="rounded-lg text-xs gap-1.5 data-[state=active]:bg-surface data-[state=active]:shadow-sm">
          <Monitor className="h-3.5 w-3.5" /> Sessions
        </TabsTrigger>
        <TabsTrigger value="devices" className="rounded-lg text-xs gap-1.5 data-[state=active]:bg-surface data-[state=active]:shadow-sm">
          <Smartphone className="h-3.5 w-3.5" /> Devices
        </TabsTrigger>
        <TabsTrigger value="2fa" className="rounded-lg text-xs gap-1.5 data-[state=active]:bg-surface data-[state=active]:shadow-sm">
          <Shield className="h-3.5 w-3.5" /> 2FA
        </TabsTrigger>
        <TabsTrigger value="history" className="rounded-lg text-xs gap-1.5 data-[state=active]:bg-surface data-[state=active]:shadow-sm">
          <History className="h-3.5 w-3.5" /> Login History
        </TabsTrigger>
        <TabsTrigger value="failed" className="rounded-lg text-xs gap-1.5 data-[state=active]:bg-surface data-[state=active]:shadow-sm">
          <AlertTriangle className="h-3.5 w-3.5" /> Failed Logins
        </TabsTrigger>
      </TabsList>

      {/* Sessions */}
      <TabsContent value="sessions" className="space-y-3 mt-0">
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-text-tertiary">{SESSIONS.length} active session{SESSIONS.length !== 1 ? "s" : ""}</p>
          <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1 rounded-lg border-border-subtle text-error">
            <LogOut className="h-3 w-3" /> Revoke All
          </Button>
        </div>
        {SESSIONS.map((s, i) => (
          <motion.div key={s.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <SessionRow session={s} />
          </motion.div>
        ))}
      </TabsContent>

      {/* Devices */}
      <TabsContent value="devices" className="space-y-3 mt-0">
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-text-tertiary">{DEVICES.length} trusted device{DEVICES.length !== 1 ? "s" : ""}</p>
          <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1 rounded-lg border-border-subtle text-error">
            <LogOut className="h-3 w-3" /> Remove All
          </Button>
        </div>
        {DEVICES.map((d, i) => (
          <motion.div key={d.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <DeviceRow device={d} />
          </motion.div>
        ))}
      </TabsContent>

      {/* 2FA */}
      <TabsContent value="2fa" className="mt-0 space-y-4">
        <Card className="border-border-subtle bg-surface">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-accent/10">
                  <Shield className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">Two-Factor Authentication</h3>
                  <p className="text-[10px] text-text-tertiary">Add an extra layer of security to your account</p>
                </div>
              </div>
              <Switch checked={twoFAEnabled} onCheckedChange={setTwoFAEnabled} />
            </div>
          </CardContent>
        </Card>

        {twoFAEnabled && (
          <>
            <Card className="border-border-subtle bg-surface">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-text-primary">Authenticator App</CardTitle>
                <CardDescription>Scan this QR code with your authenticator app</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-background border border-border-subtle">
                    <QrCode className="h-24 w-24 text-text-primary" />
                  </div>
                  <div className="space-y-2 text-[10px] text-text-tertiary">
                    <p>1. Install an authenticator app (Google Authenticator, Authy, etc.)</p>
                    <p>2. Scan the QR code or enter the setup key manually</p>
                    <p>3. Enter the 6-digit code from the app to verify</p>
                    <div className="flex items-center gap-2 mt-2">
                      <code className="px-2 py-1 rounded bg-background border border-border-subtle text-[9px] font-mono text-text-primary">
                        JBSWY3DPEHPK3PXP
                      </code>
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-lg">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recovery Codes */}
            <Card className="border-border-subtle bg-surface">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-semibold text-text-primary">Recovery Codes</CardTitle>
                    <CardDescription>Use these one-time codes if you lose access to your authenticator</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setShowRecovery(!showRecovery)}
                    className="h-7 text-[10px] gap-1 rounded-lg border-border-subtle">
                    {showRecovery ? "Hide" : "Show Codes"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {RECOVERY_CODES.map((rc) => (
                    <div key={rc.code} className={cn(
                      "flex items-center justify-between p-2.5 rounded-lg border font-mono text-[10px] transition-all",
                      rc.used ? "border-border-subtle bg-surface-hover text-text-tertiary/50 line-through" : "border-border-subtle bg-background text-text-primary",
                    )}>
                      <span>{showRecovery ? rc.code : "••••-••••-••••"}</span>
                      {!rc.used && showRecovery && (
                        <button onClick={() => copyCode(rc.code)} className="h-5 w-5 rounded flex items-center justify-center hover:bg-surface-hover">
                          {copiedCode === rc.code ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3 text-text-tertiary" />}
                        </button>
                      )}
                      {rc.used && <Badge className="text-[7px] px-1 py-0 rounded border-0 bg-surface-hover text-text-tertiary">Used</Badge>}
                    </div>
                  ))}
                </div>
                <p className="text-[9px] text-text-tertiary mt-2">{RECOVERY_CODES.filter((c) => !c.used).length} codes remaining</p>
              </CardContent>
            </Card>
          </>
        )}
      </TabsContent>

      {/* Login History */}
      <TabsContent value="history" className="space-y-1 mt-0">
        {[...FAILED_LOGINS, ...SESSIONS.map((s) => ({
          id: `lh-${s.id}`, user: "admin@portfolio.dev", ip: s.ip, location: s.location, device: s.device, browser: s.browser,
          status: "success" as const, timestamp: s.lastActive,
        }))].sort((a, b) => {
          const tA = a.timestamp.includes("min") ? 0 : a.timestamp.includes("h") ? 1 : a.timestamp.includes("d") ? 2 : a.timestamp.includes("w") ? 3 : 4;
          const tB = b.timestamp.includes("min") ? 0 : b.timestamp.includes("h") ? 1 : b.timestamp.includes("d") ? 2 : b.timestamp.includes("w") ? 3 : 4;
          return tA - tB;
        }).map((entry, i) => (
          <motion.div key={entry.id} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}>
            <LoginRow entry={entry as LoginEntry} />
          </motion.div>
        ))}
      </TabsContent>

      {/* Failed Logins */}
      <TabsContent value="failed" className="space-y-1 mt-0">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] text-text-tertiary">{FAILED_LOGINS.length} failed attempt{FAILED_LOGINS.length !== 1 ? "s" : ""} in the last 7 days</p>
          <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1 rounded-lg border-border-subtle">
            <History className="h-3 w-3" /> View All
          </Button>
        </div>
        {FAILED_LOGINS.map((entry, i) => (
          <motion.div key={entry.id} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 p-2.5 rounded-lg bg-error/5 border border-error/10"
          >
            <div className="p-1.5 rounded-lg bg-error/10">
              <XCircle className="h-3.5 w-3.5 text-error" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium text-text-primary">{entry.location}</span>
                <span className="text-[8px] text-text-tertiary font-mono">{entry.ip}</span>
              </div>
              <div className="flex items-center gap-2 text-[8px] text-text-tertiary font-mono">
                <span>{entry.device}</span>
                <span>{entry.browser}</span>
                {entry.reason && <span className="text-error">{entry.reason}</span>}
              </div>
            </div>
            <span className="text-[9px] text-text-tertiary shrink-0">{entry.timestamp}</span>
          </motion.div>
        ))}
      </TabsContent>
    </Tabs>
  );
}
