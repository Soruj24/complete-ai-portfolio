"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

import { 
  User as UserIcon, 
  Lock, 
  Mail, 
  Camera, 
  ShieldCheck,
  CheckCircle2,
  Settings
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CldUploadWidget } from "next-cloudinary";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  
  // Profile state
  const [name, setName] = useState(session?.user?.name || "");
  
  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (data.success) {
        await update({ name: data.user.name });
        toast.success("Profile updated successfully");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error("New passwords do not match");
    }
    setLoading(true);
    try {
      const res = await fetch("/api/user/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-5xl py-12 px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header with Background */}
      <div className="relative rounded-3xl bg-gradient-to-r from-blue-600 to-purple-700 p-8 md:p-12 overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-white">
          <div className="relative group">
            <Avatar className="h-32 w-32 border-4 border-white/20 shadow-2xl transition-transform group-hover:scale-105">
              <AvatarImage src={session?.user?.image || ""} />
              <AvatarFallback className="bg-white/10 text-4xl font-bold backdrop-blur-sm">
                {session?.user?.name?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <CldUploadWidget 
              uploadPreset="ml_default"
              onSuccess={async (result: { info?: { secure_url?: string } | string }) => {
                if (result.info && typeof result.info !== 'string') {
                  const imageUrl = result.info.secure_url;
                  try {
                    const res = await fetch("/api/user/profile", {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ image: imageUrl }),
                    });
                    
                    // Check if response is JSON
                    const contentType = res.headers.get("content-type");
                    if (!contentType || !contentType.includes("application/json")) {
                      console.error("Non-JSON response received:", await res.text());
                      return;
                    }

                    const data = await res.json();
                    if (data.success) {
                      await update({ image: imageUrl });
                      toast.success("Profile picture updated!");
                    }
                  } catch (error) {
                    toast.error("Failed to update profile picture");
                  }
                }
              }}
            >
              {({ open }) => (
                <div 
                  onClick={() => open()}
                  className="absolute bottom-1 right-1 bg-white text-blue-600 p-2 rounded-full shadow-lg cursor-pointer hover:bg-blue-50 transition-colors"
                >
                  <Camera className="w-5 h-5" />
                </div>
              )}
            </CldUploadWidget>
          </div>
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{session?.user?.name}</h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-blue-100">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm text-sm">
                <Mail className="w-4 h-4" /> {session?.user?.email}
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm text-sm">
                <ShieldCheck className="w-4 h-4" /> {session?.user?.role?.toUpperCase()}
              </div>
              <div className="flex items-center gap-1.5 bg-green-400/20 px-3 py-1 rounded-full backdrop-blur-sm text-sm text-green-300">
                <CheckCircle2 className="w-4 h-4" /> VERIFIED
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-20">
          <div className="h-64 w-64 rounded-full bg-white" />
        </div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 blur-3xl opacity-20">
          <div className="h-48 w-48 rounded-full bg-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-none shadow-xl shadow-gray-200/50 rounded-2xl p-2 sticky top-24">
            <div className="flex flex-col space-y-1">
              <Button 
                variant="ghost" 
                onClick={() => setActiveTab("profile")}
                className={`w-full justify-start gap-3 px-4 py-6 rounded-xl transition-all font-medium ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <UserIcon className="w-5 h-5" /> Profile Settings
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setActiveTab("password")}
                className={`w-full justify-start gap-3 px-4 py-6 rounded-xl transition-all font-medium ${activeTab === 'password' ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Lock className="w-5 h-5" /> Security & Privacy
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setActiveTab("preferences")}
                className={`w-full justify-start gap-3 px-4 py-6 rounded-xl transition-all font-medium ${activeTab === 'preferences' ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Settings className="w-5 h-5" /> Preferences
              </Button>
            </div>
          </Card>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} className="w-full">
            <TabsContent value="profile" className="mt-0 focus-visible:ring-0 animate-in fade-in duration-500">
              <Card className="border-none shadow-xl shadow-gray-200/50 rounded-3xl overflow-hidden">
                <CardHeader className="bg-gray-50/50 border-b border-gray-100 p-8">
                  <CardTitle className="text-2xl font-bold text-gray-900">Personal Information</CardTitle>
                  <CardDescription className="text-gray-500 text-base">Update your public profile details and how people see you.</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleUpdateProfile} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-sm font-bold text-gray-700 uppercase tracking-wider">Email Address</Label>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                          <Input id="email" value={session?.user?.email || ""} disabled className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-xl" />
                        </div>
                        <p className="text-[11px] text-gray-400 font-medium">Your primary email cannot be changed for security.</p>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-sm font-bold text-gray-700 uppercase tracking-wider">Full Name</Label>
                        <div className="relative group">
                          <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                          <Input 
                            id="name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                            className="pl-10 h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all"
                            placeholder="e.g. John Doe"
                          />
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
            </TabsContent>
            
            <TabsContent value="password" className="mt-0 focus-visible:ring-0 animate-in fade-in duration-500">
              <Card className="border-none shadow-xl shadow-gray-200/50 rounded-3xl overflow-hidden">
                <CardHeader className="bg-gray-50/50 border-b border-gray-100 p-8">
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Lock className="w-6 h-6 text-purple-600" /> Security Settings
                  </CardTitle>
                  <CardDescription className="text-gray-500 text-base">Keep your account secure by using a strong password and updating it regularly.</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleChangePassword} className="space-y-8">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="current" className="text-sm font-bold text-gray-700 uppercase tracking-wider">Current Password</Label>
                        <Input 
                          id="current" 
                          type="password" 
                          value={currentPassword} 
                          onChange={(e) => setCurrentPassword(e.target.value)} 
                          required 
                          className="h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-100 transition-all"
                          placeholder="••••••••"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="new" className="text-sm font-bold text-gray-700 uppercase tracking-wider">New Password</Label>
                          <Input 
                            id="new" 
                            type="password" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                            required 
                            className="h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-100 transition-all"
                            placeholder="Min. 8 characters"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="confirm" className="text-sm font-bold text-gray-700 uppercase tracking-wider">Confirm New Password</Label>
                          <Input 
                            id="confirm" 
                            type="password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required 
                            className="h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-100 transition-all"
                            placeholder="Re-type new password"
                          />
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
            </TabsContent>

            <TabsContent value="preferences" className="mt-0 focus-visible:ring-0 animate-in fade-in duration-500">
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
