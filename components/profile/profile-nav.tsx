"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User as UserIcon, Lock, Settings } from "lucide-react";

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function ProfileNav({ activeTab, onTabChange }: Props) {
  return (
    <Card className="border-none shadow-xl shadow-gray-200/50 rounded-2xl p-2 sticky top-24">
      <div className="flex flex-col space-y-1">
        <Button
          variant="ghost"
          onClick={() => onTabChange("profile")}
          className={`w-full justify-start gap-3 px-4 py-6 rounded-xl transition-all font-medium ${activeTab === "profile" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
        >
          <UserIcon className="w-5 h-5" /> Profile Settings
        </Button>
        <Button
          variant="ghost"
          onClick={() => onTabChange("password")}
          className={`w-full justify-start gap-3 px-4 py-6 rounded-xl transition-all font-medium ${activeTab === "password" ? "bg-purple-50 text-purple-600" : "text-gray-600 hover:bg-gray-50"}`}
        >
          <Lock className="w-5 h-5" /> Security & Privacy
        </Button>
        <Button
          variant="ghost"
          onClick={() => onTabChange("preferences")}
          className={`w-full justify-start gap-3 px-4 py-6 rounded-xl transition-all font-medium ${activeTab === "preferences" ? "bg-orange-50 text-orange-600" : "text-gray-600 hover:bg-gray-50"}`}
        >
          <Settings className="w-5 h-5" /> Preferences
        </Button>
      </div>
    </Card>
  );
}
