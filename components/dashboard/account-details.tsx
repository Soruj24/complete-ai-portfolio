"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { Shield, CheckCircle2, LogOut } from "lucide-react";

interface Props {
  session: Session;
}

export function AccountDetails({ session }: Props) {
  return (
    <Card className="border-none shadow-xl shadow-gray-100 dark:shadow-none rounded-[32px] overflow-hidden bg-gradient-to-br from-gray-900 to-black text-white">
      <CardContent className="p-8 space-y-8">
        <div>
          <h3 className="text-lg font-black mb-6 flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-400" />
            Account Details
          </h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-gray-400 font-bold text-sm uppercase tracking-wider">Role</span>
              <span className="font-black text-blue-400 uppercase tracking-widest text-xs bg-blue-400/10 px-3 py-1 rounded-full">
                {session.user.role || "User"}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-gray-400 font-bold text-sm uppercase tracking-wider">Status</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-black text-green-400 uppercase tracking-widest text-xs">Active</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-bold text-sm uppercase tracking-wider">Verified</span>
              <CheckCircle2 className="h-5 w-5 text-blue-400" />
            </div>
          </div>
        </div>
        <div className="pt-4">
          <p className="text-xs font-medium text-gray-500 leading-relaxed">
            This account is managed by NexusAuth security systems. Your data is encrypted and protected.
          </p>
        </div>
        <Button variant="ghost" className="w-full h-14 rounded-2xl font-black text-red-400 hover:text-red-300 hover:bg-red-400/10 gap-3 mt-4 border-none">
          <LogOut className="h-5 w-5" />
          Sign Out
        </Button>
      </CardContent>
    </Card>
  );
}
