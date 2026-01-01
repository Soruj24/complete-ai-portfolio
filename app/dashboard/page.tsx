"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { 
  User as UserIcon, 
  Mail, 
  Shield, 
  Calendar, 
  Settings, 
  LogOut, 
  Camera,
  CheckCircle2,
  Loader2,
  Save,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";

export default function DashboardPage() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        image: session.user.image || "",
      });
    }
  }, [session]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Force refresh the page to update all session instances
        await update({
          ...session,
          user: {
            ...session?.user,
            name: formData.name,
            image: formData.image,
          },
        });
        
        toast.success("Profile updated successfully!");
        
        // Use a small delay before refresh to allow toast and session update
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(data.error || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container py-24 max-w-6xl mx-auto space-y-10">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-gray-900 p-8 rounded-[32px] shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <Avatar className="h-24 w-24 border-4 border-blue-50 dark:border-blue-900/30 shadow-xl">
              <AvatarImage src={session.user.image || ""} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-3xl font-black">
                {session.user.name?.charAt(0) || session.user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-green-500 h-6 w-6 rounded-full border-4 border-white dark:border-gray-900 shadow-sm" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              Welcome back, <span className="text-blue-600">{session.user.name || "User"}!</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium flex items-center gap-2 mt-1">
              <Mail className="h-4 w-4" />
              {session.user.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-2xl h-12 px-6 font-bold gap-2 border-gray-200 dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700">
            <Bell className="h-5 w-5 text-gray-400" />
            Notifications
          </Button>
          <Button className="rounded-2xl h-12 px-6 bg-gray-900 dark:bg-blue-600 dark:hover:bg-blue-700 hover:bg-black font-bold gap-2 shadow-lg shadow-gray-200 dark:shadow-none">
            <Settings className="h-5 w-5" />
            Account Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-gray-100/50 dark:bg-gray-800/50 p-1 rounded-2xl mb-8">
          <TabsTrigger value="profile" className="gap-2 rounded-xl px-8 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm data-[state=active]:text-blue-600 font-bold">
            <UserIcon className="h-4 w-4" />
            My Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2 rounded-xl px-8 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm data-[state=active]:text-blue-600 font-bold">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="activity" className="gap-2 rounded-xl px-8 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm data-[state=active]:text-blue-600 font-bold">
            <Calendar className="h-4 w-4" />
            Recent Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Edit Form */}
            <Card className="lg:col-span-2 border-none shadow-xl shadow-gray-100 dark:shadow-none rounded-[32px] overflow-hidden dark:bg-gray-900 dark:border dark:border-gray-800">
              <CardHeader className="bg-white dark:bg-gray-900 border-b border-gray-50 dark:border-gray-800 p-8">
                <CardTitle className="text-2xl font-black dark:text-white">Profile Information</CardTitle>
                <CardDescription className="font-medium text-gray-500 dark:text-gray-400">Update your personal details and how others see you.</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleUpdateProfile} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                      <Input 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name" 
                        className="h-14 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-6 font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                      <Input 
                        disabled
                        value={session.user.email || ""}
                        className="h-14 bg-gray-100 dark:bg-gray-800/50 border-none rounded-2xl px-6 font-bold text-gray-400 dark:text-gray-500 cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Profile Image URL</label>
                    <div className="flex gap-4">
                      <Input 
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://example.com/image.jpg" 
                        className="h-14 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-6 font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 flex-1"
                      />
                      <div className="h-14 w-14 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500">
                        <Camera className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button 
                      disabled={loading}
                      className="h-14 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 font-black text-lg shadow-xl shadow-blue-100 dark:shadow-none gap-3 transition-all hover:scale-[1.02]"
                    >
                      {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Save className="h-6 w-6" />}
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Account Info Card */}
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
          </div>
        </TabsContent>

        <TabsContent value="security">
          <Card className="border-none shadow-xl shadow-gray-100 dark:shadow-none rounded-[32px] p-20 text-center bg-white dark:bg-gray-900 dark:border dark:border-gray-800">
            <Shield className="h-16 w-16 text-blue-100 dark:text-blue-900/30 mx-auto mb-6" />
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Security Settings</h3>
            <p className="text-gray-500 dark:text-gray-400 font-medium max-w-sm mx-auto leading-relaxed">
              Enhance your account security with two-factor authentication and password management.
            </p>
            <Button className="mt-10 h-14 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 font-black text-lg shadow-xl shadow-blue-100 dark:shadow-none">
              Update Password
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card className="border-none shadow-xl shadow-gray-100 dark:shadow-none rounded-[32px] p-20 text-center bg-white dark:bg-gray-900 dark:border dark:border-gray-800">
            <Calendar className="h-16 w-16 text-blue-100 dark:text-blue-900/30 mx-auto mb-6" />
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Recent Activity</h3>
            <p className="text-gray-500 dark:text-gray-400 font-medium max-w-sm mx-auto leading-relaxed">
              Monitor your recent login attempts and account changes to keep your profile safe.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  </>
  );
}

