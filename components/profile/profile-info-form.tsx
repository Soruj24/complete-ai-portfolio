"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, User as UserIcon } from "lucide-react";

interface Props {
  email: string;
  name: string;
  loading: boolean;
  onNameChange: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ProfileInfoForm({ email, name, loading, onNameChange, onSubmit }: Props) {
  return (
    <Card className="border-none shadow-xl shadow-gray-200/50 rounded-3xl overflow-hidden">
      <CardHeader className="bg-gray-50/50 border-b border-gray-100 p-8">
        <CardTitle className="text-2xl font-bold text-gray-900">Personal Information</CardTitle>
        <CardDescription className="text-gray-500 text-base">Update your public profile details and how people see you.</CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={onSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-bold text-gray-700 uppercase tracking-wider">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <Input id="email" value={email} disabled className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-xl" />
              </div>
              <p className="text-[11px] text-gray-400 font-medium">Your primary email cannot be changed for security.</p>
            </div>
            <div className="space-y-3">
              <Label htmlFor="name" className="text-sm font-bold text-gray-700 uppercase tracking-wider">Full Name</Label>
              <div className="relative group">
                <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <Input id="name" value={name} onChange={(e) => onNameChange(e.target.value)} required className="pl-10 h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all" placeholder="e.g. John Doe" />
              </div>
            </div>
          </div>
          <div className="flex justify-end border-t pt-8">
            <Button type="submit" disabled={loading} className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 font-bold transition-all hover:scale-[1.02]">
              {loading ? "Saving Changes..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
