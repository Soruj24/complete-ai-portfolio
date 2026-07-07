"use client";

import { Button } from "@/components/ui/button";
import { RefreshCcw, Save } from "lucide-react";
import { GeneralSettingsCard } from "./admin-settings/general-settings-card";
import { PersonalInfoCard } from "./admin-settings/personal-info-card";
import { SystemStatusCard } from "./admin-settings/system-status-card";
import { QuickLinksCard } from "./admin-settings/quick-links-card";

interface SettingsData {
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
}

interface AdminSettingsProps {
  settings: SettingsData;
  loading: boolean;
  onUpdate: (e: React.FormEvent) => void;
  onChange: (settings: Partial<SettingsData>) => void;
}

export function AdminSettings({ settings, loading, onUpdate, onChange }: AdminSettingsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <form onSubmit={onUpdate} className="space-y-6">
          <GeneralSettingsCard
            siteName={settings.siteName}
            contactEmail={settings.contactEmail}
            allowRegistration={settings.allowRegistration}
            maintenanceMode={settings.maintenanceMode}
            onChange={onChange}
          />
          <PersonalInfoCard
            fullName={settings.fullName}
            professionalTitle={settings.professionalTitle}
            bio={settings.bio}
            location={settings.location}
            phone={settings.phone}
            githubUrl={settings.githubUrl}
            linkedinUrl={settings.linkedinUrl}
            twitterUrl={settings.twitterUrl}
            specializations={settings.specializations}
            onChange={onChange}
          />
          <div className="flex justify-end">
            <Button disabled={loading} className="h-9 rounded-lg text-sm px-5 gap-2">
              {loading ? <RefreshCcw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save Settings
            </Button>
          </div>
        </form>
      </div>
      <div className="space-y-6">
        <SystemStatusCard />
        <QuickLinksCard />
      </div>
    </div>
  );
}
