"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Shield, Monitor, Smartphone, History, AlertTriangle, LogOut, QrCode, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSecurityQuery, SecurityInnerTabs, TabsContent } from "./shared";
import { SessionRow } from "./rows/session-row";
import { DeviceRow } from "./rows/device-row";
import { LoginRow } from "./rows/login-row";
import { FailedLoginRow } from "./rows/failed-login-row";

export function AuthenticationTab() {
  const [twoFAEnabled, setTwoFAEnabled] = useState(true);
  const [showRecovery, setShowRecovery] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [authTab, setAuthTab] = useState("sessions");
  const { data: sessionsData } = useSecurityQuery("sessions");
  const { data: loginData } = useSecurityQuery("login-history");
  const { data: recoveryResponse } = useSecurityQuery("security/recovery");
  const SESSIONS = (sessionsData as any).sessions || [];
  const DEVICES = (sessionsData as any).devices || [];
  const FAILED_LOGINS = (Array.isArray(loginData) ? loginData : []) as any[];
  const RECOVERY_CODES = (Array.isArray(recoveryResponse) ? recoveryResponse : []) as any[];

  const copyCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const innerTabs = [
    { value: "sessions", label: "Sessions", icon: Monitor },
    { value: "devices", label: "Devices", icon: Smartphone },
    { value: "2fa", label: "2FA", icon: Shield },
    { value: "history", label: "Login History", icon: History },
    { value: "failed", label: "Failed Logins", icon: AlertTriangle },
  ];

  return (
    <SecurityInnerTabs tabs={innerTabs} value={authTab} onValueChange={setAuthTab}>
      <TabsContent value="sessions" className="space-y-3 mt-0">
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-text-tertiary">{SESSIONS.length} active session{SESSIONS.length !== 1 ? "s" : ""}</p>
          <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1 rounded-lg border-border-subtle text-error">
            <LogOut className="h-3 w-3" /> Revoke All
          </Button>
        </div>
        {SESSIONS.map((s: any, i: number) => (
          <motion.div key={s.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <SessionRow session={s} />
          </motion.div>
        ))}
      </TabsContent>

      <TabsContent value="devices" className="space-y-3 mt-0">
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-text-tertiary">{DEVICES.length} trusted device{DEVICES.length !== 1 ? "s" : ""}</p>
          <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1 rounded-lg border-border-subtle text-error">
            <LogOut className="h-3 w-3" /> Remove All
          </Button>
        </div>
        {DEVICES.map((d: any, i: number) => (
          <motion.div key={d.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <DeviceRow device={d} />
          </motion.div>
        ))}
      </TabsContent>

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
                  {RECOVERY_CODES.map((rc: any) => (
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
                <p className="text-[9px] text-text-tertiary mt-2">{RECOVERY_CODES.filter((c: any) => !c.used).length} codes remaining</p>
              </CardContent>
            </Card>
          </>
        )}
      </TabsContent>

      <TabsContent value="history" className="space-y-1 mt-0">
        {[...FAILED_LOGINS, ...SESSIONS.map((s: any) => ({
          id: `lh-${s.id}`, user: "admin@portfolio.dev", ip: s.ip, location: s.location, device: s.device, browser: s.browser,
          status: "success" as const, timestamp: s.lastActive,
        }))].sort((a: any, b: any) => {
          const tA = a.timestamp.includes("min") ? 0 : a.timestamp.includes("h") ? 1 : a.timestamp.includes("d") ? 2 : a.timestamp.includes("w") ? 3 : 4;
          const tB = b.timestamp.includes("min") ? 0 : b.timestamp.includes("h") ? 1 : b.timestamp.includes("d") ? 2 : b.timestamp.includes("w") ? 3 : 4;
          return tA - tB;
        }).map((entry: any, i: number) => (
          <motion.div key={entry.id} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}>
            <LoginRow entry={entry} />
          </motion.div>
        ))}
      </TabsContent>

      <TabsContent value="failed" className="space-y-1 mt-0">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] text-text-tertiary">{FAILED_LOGINS.length} failed attempt{FAILED_LOGINS.length !== 1 ? "s" : ""} in the last 7 days</p>
          <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1 rounded-lg border-border-subtle">
            <History className="h-3 w-3" /> View All
          </Button>
        </div>
        {FAILED_LOGINS.map((entry: any, i: number) => (
          <motion.div key={entry.id} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
            <FailedLoginRow entry={entry} />
          </motion.div>
        ))}
      </TabsContent>
    </SecurityInnerTabs>
  );
}
