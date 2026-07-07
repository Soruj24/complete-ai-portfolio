"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera, Save, Loader2 } from "lucide-react";

interface Props {
  name: string;
  image: string;
  email: string;
  loading: boolean;
  onNameChange: (name: string) => void;
  onImageChange: (image: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ProfileForm({ name, image, email, loading, onNameChange, onImageChange, onSubmit }: Props) {
  return (
    <Card className="lg:col-span-2 border-none shadow-xl shadow-gray-100 dark:shadow-none rounded-[32px] overflow-hidden dark:bg-gray-900 dark:border dark:border-gray-800">
      <CardHeader className="bg-white dark:bg-gray-900 border-b border-gray-50 dark:border-gray-800 p-8">
        <CardTitle className="text-2xl font-black dark:text-white">Profile Information</CardTitle>
        <CardDescription className="font-medium text-gray-500 dark:text-gray-400">Update your personal details and how others see you.</CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={onSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
              <Input value={name} onChange={(e) => onNameChange(e.target.value)} placeholder="Your full name" className="h-14 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-6 font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30" />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
              <Input disabled value={email} className="h-14 bg-gray-100 dark:bg-gray-800/50 border-none rounded-2xl px-6 font-bold text-gray-400 dark:text-gray-500 cursor-not-allowed" />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Profile Image URL</label>
            <div className="flex gap-4">
              <Input value={image} onChange={(e) => onImageChange(e.target.value)} placeholder="https://example.com/image.jpg" className="h-14 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-6 font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 flex-1" />
              <div className="h-14 w-14 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500">
                <Camera className="h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="pt-4">
            <Button disabled={loading} className="h-14 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 font-black text-lg shadow-xl shadow-blue-100 dark:shadow-none gap-3 transition-all hover:scale-[1.02]">
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Save className="h-6 w-6" />}
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
