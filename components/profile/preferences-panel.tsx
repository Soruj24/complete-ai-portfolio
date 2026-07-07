"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export function PreferencesPanel() {
  return (
    <Card className="border-none shadow-xl shadow-gray-200/50 rounded-3xl overflow-hidden">
      <CardHeader className="bg-gray-50/50 border-b border-gray-100 p-8">
        <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Settings className="w-6 h-6 text-orange-600" /> Account Preferences
        </CardTitle>
        <CardDescription className="text-gray-500 text-base">Manage your notification settings and other account preferences.</CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="space-y-1">
              <p className="font-bold text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive emails about your account activity and security.</p>
            </div>
            <div className="h-6 w-11 bg-blue-600 rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm" />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="space-y-1">
              <p className="font-bold text-gray-900">Marketing Emails</p>
              <p className="text-sm text-gray-500">Get updates about new features and promotions.</p>
            </div>
            <div className="h-6 w-11 bg-gray-200 rounded-full relative cursor-pointer">
              <div className="absolute left-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm" />
            </div>
          </div>
          <div className="pt-6 border-t flex justify-end">
            <Button variant="outline" className="h-12 px-8 rounded-xl border-gray-200 font-bold hover:bg-gray-50 transition-all">
              Reset to Defaults
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
