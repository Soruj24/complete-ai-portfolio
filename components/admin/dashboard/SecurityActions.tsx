"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, ShieldCheck } from "lucide-react";

interface Props {
  onSetup2FA: () => void;
}

export function SecurityActions({ onSetup2FA }: Props) {
  return (
    <Card className="border border-border-subtle shadow-none rounded-xl bg-surface">
      <CardHeader className="pb-3 px-5 pt-5">
        <CardTitle className="text-sm font-semibold text-text-primary flex items-center gap-2">
          <Shield className="h-4 w-4 text-text-tertiary" />
          Security
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 space-y-4">
        <p className="text-xs text-text-tertiary leading-relaxed">
          Two-factor authentication adds an extra layer of security to your account.
        </p>
        <Button
          onClick={onSetup2FA}
          variant="outline"
          className="w-full h-9 rounded-lg text-xs font-medium border-border-subtle"
        >
          <ShieldCheck className="h-3.5 w-3.5 mr-2" />
          Enable 2FA
        </Button>
      </CardContent>
    </Card>
  );
}
