"use client";

import { Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CldUploadWidget } from "next-cloudinary";
import { Camera, Mail, ShieldCheck, CheckCircle2 } from "lucide-react";

interface Props {
  session: Session | null;
  onUploadImage: (url: string) => void;
}

export function ProfileHeader({ session, onUploadImage }: Props) {
  return (
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
              if (result.info && typeof result.info !== "string") {
                onUploadImage(result.info.secure_url || "");
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
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-20">
        <div className="h-64 w-64 rounded-full bg-white" />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 blur-3xl opacity-20">
        <div className="h-48 w-48 rounded-full bg-white" />
      </div>
    </div>
  );
}
