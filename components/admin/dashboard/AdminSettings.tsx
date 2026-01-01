"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Globe, Shield, Lock, RefreshCcw, ShieldCheck, User as UserIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface AdminSettingsProps {
  settings: {
    siteName: string;
    contactEmail: string;
    allowRegistration: boolean;
    maintenanceMode: boolean;
    fullName: string;
    professionalTitle: string;
    bio: string;
    location: string;
    phone: string;
    githubUrl: string;
    linkedinUrl: string;
    twitterUrl: string;
    specializations: string[];
  };
  loading: boolean;
  onUpdate: (e: React.FormEvent) => void;
  onChange: (settings: Partial<AdminSettingsProps['settings']>) => void;
}

export function AdminSettings({
  settings,
  loading,
  onUpdate,
  onChange,
}: AdminSettingsProps) {
  const [newSpecialization, setNewSpecialization] = useState("");

  const addSpecialization = () => {
    if (newSpecialization.trim()) {
      onChange({
        ...settings,
        specializations: [...settings.specializations, newSpecialization.trim()],
      });
      setNewSpecialization("");
    }
  };

  const removeSpecialization = (index: number) => {
    const updated = settings.specializations.filter((_, i) => i !== index);
    onChange({ ...settings, specializations: updated });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
      <div className="lg:col-span-2 space-y-6">
        <form onSubmit={onUpdate} className="space-y-6">
          <Card className="border-none shadow-xl shadow-gray-200/50 dark:shadow-none dark:bg-slate-900/50 dark:border dark:border-slate-800 rounded-[24px] md:rounded-[32px] overflow-hidden transition-all duration-300">
            <CardHeader className="bg-white dark:bg-slate-900/80 border-b border-gray-100 dark:border-slate-800 py-6 md:py-8 px-6 md:px-8">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="p-2 md:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl md:rounded-2xl">
                  <Globe className="h-5 w-5 md:h-6 md:w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-xl md:text-2xl font-black text-gray-900 dark:text-white">General Settings</CardTitle>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-slate-400 font-medium mt-0.5 md:mt-1">
                    Configure your website&apos;s basic information.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2 md:space-y-3">
                  <Label className="text-[10px] md:text-sm font-black text-gray-700 dark:text-slate-300 ml-1 uppercase tracking-wider">
                    Site Name
                  </Label>
                  <Input
                    value={settings.siteName}
                    onChange={(e) => onChange({ ...settings, siteName: e.target.value })}
                    placeholder="e.g. YOURAPP"
                    className="h-12 md:h-14 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 transition-all font-bold text-gray-900 dark:text-white text-sm md:text-base"
                  />
                </div>
                <div className="space-y-2 md:space-y-3">
                  <Label className="text-[10px] md:text-sm font-black text-gray-700 dark:text-slate-300 ml-1 uppercase tracking-wider">
                    Contact Email
                  </Label>
                  <Input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => onChange({ ...settings, contactEmail: e.target.value })}
                    placeholder="admin@yourapp.com"
                    className="h-12 md:h-14 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 transition-all font-bold text-gray-900 dark:text-white text-sm md:text-base"
                  />
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 dark:border-slate-800 space-y-4 md:space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-6 bg-gray-50 dark:bg-slate-800/30 rounded-xl md:rounded-[24px] gap-4">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg md:rounded-xl">
                      <Shield className="h-4 w-4 md:h-5 md:w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm md:text-base font-bold text-gray-900 dark:text-slate-100">Allow New Registrations</p>
                      <p className="text-[10px] md:text-sm text-gray-500 dark:text-slate-400 font-medium">
                        Enable or disable new user signups on the platform.
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.allowRegistration}
                    onCheckedChange={(v) => onChange({ ...settings, allowRegistration: v })}
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-6 bg-red-50/50 dark:bg-red-900/10 rounded-xl md:rounded-[24px] gap-4">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg md:rounded-xl">
                      <Lock className="h-4 w-4 md:h-5 md:w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm md:text-base font-bold text-gray-900 dark:text-slate-100">Maintenance Mode</p>
                      <p className="text-[10px] md:text-sm text-gray-500 dark:text-slate-400 font-medium">
                        Put the entire site into maintenance mode.
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(v) => onChange({ ...settings, maintenanceMode: v })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl shadow-gray-200/50 dark:shadow-none dark:bg-slate-900/50 dark:border dark:border-slate-800 rounded-[24px] md:rounded-[32px] overflow-hidden transition-all duration-300">
            <CardHeader className="bg-white dark:bg-slate-900/80 border-b border-gray-100 dark:border-slate-800 py-6 md:py-8 px-6 md:px-8">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="p-2 md:p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl md:rounded-2xl">
                  <UserIcon className="h-5 w-5 md:h-6 md:w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <CardTitle className="text-xl md:text-2xl font-black text-gray-900 dark:text-white">Personal Information</CardTitle>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-slate-400 font-medium mt-0.5 md:mt-1">
                    Manage your public profile and contact details.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2 md:space-y-3">
                  <Label className="text-[10px] md:text-sm font-black text-gray-700 dark:text-slate-300 ml-1 uppercase tracking-wider">
                    Full Name
                  </Label>
                  <Input
                    value={settings.fullName}
                    onChange={(e) => onChange({ ...settings, fullName: e.target.value })}
                    placeholder="e.g. Soruj Mahmud"
                    className="h-12 md:h-14 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/20 transition-all font-bold text-gray-900 dark:text-white text-sm md:text-base"
                  />
                </div>
                <div className="space-y-2 md:space-y-3">
                  <Label className="text-[10px] md:text-sm font-black text-gray-700 dark:text-slate-300 ml-1 uppercase tracking-wider">
                    Professional Title
                  </Label>
                  <Input
                    value={settings.professionalTitle}
                    onChange={(e) => onChange({ ...settings, professionalTitle: e.target.value })}
                    placeholder="e.g. Full-Stack Developer"
                    className="h-12 md:h-14 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/20 transition-all font-bold text-gray-900 dark:text-white text-sm md:text-base"
                  />
                </div>
              </div>

              <div className="space-y-2 md:space-y-3">
                <Label className="text-[10px] md:text-sm font-black text-gray-700 dark:text-slate-300 ml-1 uppercase tracking-wider">
                  Bio / Summary
                </Label>
                <Textarea
                  value={settings.bio}
                  onChange={(e) => onChange({ ...settings, bio: e.target.value })}
                  placeholder="Tell something about yourself..."
                  className="min-h-[100px] md:min-h-[120px] rounded-xl md:rounded-2xl bg-gray-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/20 transition-all font-bold text-gray-900 dark:text-white p-3 md:p-4 text-sm md:text-base"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2 md:space-y-3">
                  <Label className="text-[10px] md:text-sm font-black text-gray-700 dark:text-slate-300 ml-1 uppercase tracking-wider">
                    Location
                  </Label>
                  <Input
                    value={settings.location}
                    onChange={(e) => onChange({ ...settings, location: e.target.value })}
                    placeholder="City, Country"
                    className="h-12 md:h-14 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/20 transition-all font-bold text-gray-900 dark:text-white text-sm md:text-base"
                  />
                </div>
                <div className="space-y-2 md:space-y-3">
                  <Label className="text-[10px] md:text-sm font-black text-gray-700 dark:text-slate-300 ml-1 uppercase tracking-wider">
                    Phone Number
                  </Label>
                  <Input
                    value={settings.phone}
                    onChange={(e) => onChange({ ...settings, phone: e.target.value })}
                    placeholder="+000 0000 000"
                    className="h-12 md:h-14 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/20 transition-all font-bold text-gray-900 dark:text-white text-sm md:text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                <div className="space-y-2 md:space-y-3">
                  <Label className="text-[10px] md:text-sm font-black text-gray-700 dark:text-slate-300 ml-1 uppercase tracking-wider">
                    GitHub URL
                  </Label>
                  <Input
                    value={settings.githubUrl}
                    onChange={(e) => onChange({ ...settings, githubUrl: e.target.value })}
                    placeholder="https://github.com/username"
                    className="h-12 md:h-14 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/20 transition-all font-bold text-gray-900 dark:text-white text-sm md:text-base"
                  />
                </div>
                <div className="space-y-2 md:space-y-3">
                  <Label className="text-[10px] md:text-sm font-black text-gray-700 dark:text-slate-300 ml-1 uppercase tracking-wider">
                    LinkedIn URL
                  </Label>
                  <Input
                    value={settings.linkedinUrl}
                    onChange={(e) => onChange({ ...settings, linkedinUrl: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                    className="h-12 md:h-14 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/20 transition-all font-bold text-gray-900 dark:text-white text-sm md:text-base"
                  />
                </div>
                <div className="space-y-2 md:space-y-3">
                  <Label className="text-[10px] md:text-sm font-black text-gray-700 dark:text-slate-300 ml-1 uppercase tracking-wider">
                    Twitter URL
                  </Label>
                  <Input
                    value={settings.twitterUrl}
                    onChange={(e) => onChange({ ...settings, twitterUrl: e.target.value })}
                    placeholder="https://twitter.com/username"
                    className="h-12 md:h-14 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/20 transition-all font-bold text-gray-900 dark:text-white text-sm md:text-base"
                  />
                </div>
              </div>

              <div className="space-y-3 md:space-y-4 pt-6 border-t border-gray-100 dark:border-slate-800">
                <Label className="text-[10px] md:text-sm font-black text-gray-700 dark:text-slate-300 ml-1 uppercase tracking-wider">
                  Technical Specializations
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={newSpecialization}
                    onChange={(e) => setNewSpecialization(e.target.value)}
                    placeholder="Add a specialization..."
                    className="h-10 md:h-12 rounded-lg md:rounded-xl bg-gray-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/20 font-bold dark:text-white text-sm"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSpecialization())}
                  />
                  <Button type="button" onClick={addSpecialization} className="h-10 md:h-12 rounded-lg md:rounded-xl px-4 md:px-6 font-bold bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors text-xs md:text-sm">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {settings.specializations.map((spec, index) => (
                    <Badge
                      key={index}
                      className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border-none font-bold flex items-center gap-2 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors text-[10px] md:text-xs"
                    >
                      {spec}
                      <button
                        type="button"
                        onClick={() => removeSpecialization(index)}
                        className="text-indigo-400 dark:text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-6 md:pt-8">
                <Button
                  disabled={loading}
                  className="h-12 md:h-14 px-6 md:px-10 rounded-xl md:rounded-2xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-lg shadow-blue-100 dark:shadow-none font-bold gap-2 transition-all hover:scale-[1.02] text-sm md:text-base w-full sm:w-auto"
                >
                  {loading && <RefreshCcw className="h-4 w-4 animate-spin" />}
                  Save All Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>

      <div className="space-y-6">
        <Card className="border-none shadow-xl shadow-gray-200/50 rounded-[24px] md:rounded-[32px] bg-gradient-to-br from-indigo-600 to-blue-700 text-white overflow-hidden">
          <CardHeader className="pb-2 p-6 md:p-8">
            <CardTitle className="text-base md:text-lg font-bold flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 md:h-5 md:w-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 md:space-y-6 p-6 md:p-8 pt-0 md:pt-0">
            <div className="space-y-1 md:space-y-2">
              <p className="text-blue-100 text-[10px] md:text-xs font-bold uppercase tracking-widest">Database</p>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-green-400" />
                <span className="font-bold text-sm md:text-base">Connected</span>
              </div>
            </div>
            <div className="space-y-1 md:space-y-2">
              <p className="text-blue-100 text-[10px] md:text-xs font-bold uppercase tracking-widest">Environment</p>
              <span className="font-bold text-sm md:text-base">Production</span>
            </div>
            <div className="space-y-1 md:space-y-2">
              <p className="text-blue-100 text-[10px] md:text-xs font-bold uppercase tracking-widest">Last Backup</p>
              <span className="font-bold text-sm md:text-base">2 hours ago</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl shadow-gray-200/50 dark:shadow-none dark:bg-slate-900/50 dark:border dark:border-slate-800 rounded-[24px] md:rounded-[32px] p-6 md:p-8 space-y-4">
          <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-[10px] md:text-xs">Quick Links</h4>
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 h-10 md:h-12 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/10 text-sm md:text-base"
            >
              Clear Cache
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
