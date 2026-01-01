"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Shield, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SecurityActionsProps {
  onSetup2FA: () => void;
}

export function SecurityActions({ onSetup2FA }: SecurityActionsProps) {
  return (
    <Card className="border-none shadow-xl shadow-gray-200/50 dark:shadow-none dark:bg-slate-900/50 dark:border dark:border-slate-800 rounded-[32px] overflow-hidden transition-all duration-300">
      <CardHeader className="bg-white dark:bg-slate-900/80 border-b border-gray-100 dark:border-slate-800 py-6 px-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <Lock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <CardTitle className="text-xl font-black text-gray-900 dark:text-white">Security Actions</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <div>
                <p className="font-bold text-gray-900 dark:text-slate-100">Two-Factor Authentication</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Secure your admin account with 2FA</p>
              </div>
            </div>
            <Button
              size="sm"
              onClick={onSetup2FA}
              className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 rounded-xl font-bold transition-colors"
            >
              Enable 2FA
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
