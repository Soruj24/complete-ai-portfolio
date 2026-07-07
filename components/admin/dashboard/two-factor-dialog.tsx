"use client";

import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";

interface TwoFactorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  qrCodeUrl?: string;
  token: string;
  onTokenChange: (token: string) => void;
  onVerify: () => void;
}

export function TwoFactorDialog({ open, onOpenChange, qrCodeUrl, token, onTokenChange, onVerify }: TwoFactorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] rounded-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-text-tertiary" />
            Setup 2FA
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-5 py-4 flex flex-col items-center">
          {qrCodeUrl && (
            <img src={qrCodeUrl} alt="2FA QR Code" className="w-48 h-48 rounded-xl border border-border-subtle" />
          )}
          <p className="text-sm text-center text-text-tertiary">
            Scan this QR code with your authenticator app.
          </p>
          <div className="w-full space-y-2">
            <Label>Verification Token</Label>
            <Input placeholder="Enter 6-digit code" value={token} onChange={(e) => onTokenChange(e.target.value)} className="h-11 text-center text-lg font-mono tracking-widest" />
          </div>
          <Button onClick={onVerify} className="w-full">Verify & Enable</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
