"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Globe, Shield, Lock } from "lucide-react";

interface Props {
  siteName: string;
  contactEmail: string;
  allowRegistration: boolean;
  maintenanceMode: boolean;
  onChange: (updates: Record<string, unknown>) => void;
}

export function GeneralSettingsCard({ siteName, contactEmail, allowRegistration, maintenanceMode, onChange }: Props) {
  return (
    <Card className="border border-border-subtle rounded-xl shadow-none bg-surface">
      <CardHeader className="border-b border-border-subtle py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/10 rounded-lg">
            <Globe className="h-4 w-4 text-accent" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold text-text-primary">General Settings</CardTitle>
            <p className="text-xs text-text-tertiary mt-0.5">Configure your website&apos;s basic information.</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-text-secondary">Site Name</Label>
            <Input value={siteName} onChange={(e) => onChange({ siteName: e.target.value })} placeholder="e.g. YOURAPP" className="h-10 rounded-lg border-border-subtle bg-background text-sm" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-text-secondary">Contact Email</Label>
            <Input type="email" value={contactEmail} onChange={(e) => onChange({ contactEmail: e.target.value })} placeholder="admin@yourapp.com" className="h-10 rounded-lg border-border-subtle bg-background text-sm" />
          </div>
        </div>
        <div className="pt-4 mt-4 border-t border-border-subtle space-y-3">
          <div className="flex items-center justify-between p-4 rounded-lg bg-surface-hover">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-info/10 rounded-lg">
                <Shield className="h-4 w-4 text-info" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Allow New Registrations</p>
                <p className="text-xs text-text-tertiary">Enable or disable new user signups.</p>
              </div>
            </div>
            <Switch checked={allowRegistration} onCheckedChange={(v) => onChange({ allowRegistration: v })} />
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-error/5">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-error/10 rounded-lg">
                <Lock className="h-4 w-4 text-error" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Maintenance Mode</p>
                <p className="text-xs text-text-tertiary">Put the entire site into maintenance mode.</p>
              </div>
            </div>
            <Switch checked={maintenanceMode} onCheckedChange={(v) => onChange({ maintenanceMode: v })} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
