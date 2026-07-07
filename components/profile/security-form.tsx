"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface Props {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  loading: boolean;
  onCurrentChange: (v: string) => void;
  onNewChange: (v: string) => void;
  onConfirmChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function SecurityForm({ currentPassword, newPassword, confirmPassword, loading, onCurrentChange, onNewChange, onConfirmChange, onSubmit }: Props) {
  return (
    <Card className="border-none shadow-xl shadow-gray-200/50 rounded-3xl overflow-hidden">
      <CardHeader className="bg-gray-50/50 border-b border-gray-100 p-8">
        <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Lock className="w-6 h-6 text-purple-600" /> Security Settings
        </CardTitle>
        <CardDescription className="text-gray-500 text-base">Keep your account secure by using a strong password and updating it regularly.</CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={onSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="current" className="text-sm font-bold text-gray-700 uppercase tracking-wider">Current Password</Label>
              <Input id="current" type="password" value={currentPassword} onChange={(e) => onCurrentChange(e.target.value)} required className="h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-100 transition-all" placeholder="••••••••" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="new" className="text-sm font-bold text-gray-700 uppercase tracking-wider">New Password</Label>
                <Input id="new" type="password" value={newPassword} onChange={(e) => onNewChange(e.target.value)} required className="h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-100 transition-all" placeholder="Min. 8 characters" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="confirm" className="text-sm font-bold text-gray-700 uppercase tracking-wider">Confirm New Password</Label>
                <Input id="confirm" type="password" value={confirmPassword} onChange={(e) => onConfirmChange(e.target.value)} required className="h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-100 transition-all" placeholder="Re-type new password" />
              </div>
            </div>
          </div>
          <div className="flex justify-end border-t pt-8">
            <Button type="submit" disabled={loading} className="h-12 px-8 rounded-xl bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-100 font-bold transition-all hover:scale-[1.02]">
              {loading ? "Updating Password..." : "Update Password"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
