"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { User, Plus, X } from "lucide-react";

interface Props {
  fullName: string;
  professionalTitle: string;
  bio: string;
  location: string;
  phone: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  specializations: string[];
  onChange: (updates: Record<string, unknown>) => void;
}

export function PersonalInfoCard({
  fullName, professionalTitle, bio, location, phone,
  githubUrl, linkedinUrl, twitterUrl, specializations, onChange,
}: Props) {
  const [newSpec, setNewSpec] = useState("");

  const addSpec = () => {
    if (newSpec.trim()) {
      onChange({ specializations: [...specializations, newSpec.trim()] });
      setNewSpec("");
    }
  };

  const removeSpec = (index: number) => {
    onChange({ specializations: specializations.filter((_, i) => i !== index) });
  };

  return (
    <Card className="border border-border-subtle rounded-xl shadow-none bg-surface">
      <CardHeader className="border-b border-border-subtle py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/10 rounded-lg">
            <User className="h-4 w-4 text-accent" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold text-text-primary">Personal Information</CardTitle>
            <p className="text-xs text-text-tertiary mt-0.5">Manage your public profile and contact details.</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-text-secondary">Full Name</Label>
            <Input value={fullName} onChange={(e) => onChange({ fullName: e.target.value })} className="h-10 rounded-lg border-border-subtle bg-background text-sm" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-text-secondary">Professional Title</Label>
            <Input value={professionalTitle} onChange={(e) => onChange({ professionalTitle: e.target.value })} className="h-10 rounded-lg border-border-subtle bg-background text-sm" />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-medium text-text-secondary">Bio</Label>
          <Textarea value={bio} onChange={(e) => onChange({ bio: e.target.value })} className="min-h-[80px] rounded-lg border-border-subtle bg-background text-sm" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-text-secondary">Location</Label>
            <Input value={location} onChange={(e) => onChange({ location: e.target.value })} className="h-10 rounded-lg border-border-subtle bg-background text-sm" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-text-secondary">Phone</Label>
            <Input value={phone} onChange={(e) => onChange({ phone: e.target.value })} className="h-10 rounded-lg border-border-subtle bg-background text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-text-secondary">GitHub</Label>
            <Input value={githubUrl} onChange={(e) => onChange({ githubUrl: e.target.value })} className="h-10 rounded-lg border-border-subtle bg-background text-sm" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-text-secondary">LinkedIn</Label>
            <Input value={linkedinUrl} onChange={(e) => onChange({ linkedinUrl: e.target.value })} className="h-10 rounded-lg border-border-subtle bg-background text-sm" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-text-secondary">Twitter</Label>
            <Input value={twitterUrl} onChange={(e) => onChange({ twitterUrl: e.target.value })} className="h-10 rounded-lg border-border-subtle bg-background text-sm" />
          </div>
        </div>
        <div className="pt-4 mt-2 border-t border-border-subtle space-y-3">
          <Label className="text-xs font-medium text-text-secondary">Technical Specializations</Label>
          <div className="flex gap-2">
            <Input value={newSpec} onChange={(e) => setNewSpec(e.target.value)} placeholder="Add a specialization..." className="h-9 rounded-lg border-border-subtle bg-background text-sm" onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSpec())} />
            <Button type="button" onClick={addSpec} size="sm" className="h-9 rounded-lg gap-1 text-xs">
              <Plus className="h-3.5 w-3.5" /> Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {specializations.map((spec, index) => (
              <Badge key={index} className="rounded-full bg-accent/10 text-accent border-none text-xs font-medium gap-1.5 py-1.5 px-3">
                {spec}
                <button type="button" onClick={() => removeSpec(index)} className="hover:bg-accent/20 rounded-full p-0.5 transition-colors">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
