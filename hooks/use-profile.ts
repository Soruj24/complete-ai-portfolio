"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export function useProfile() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [name, setName] = useState(session?.user?.name || "");
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
    } catch {
      toast.error("Something went wrong");
    }
    setLoading(false);
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
    } catch {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  const handleUploadImage = async (imageUrl: string) => {
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageUrl }),
      });
      const contentType = res.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        console.error("Non-JSON response:", await res.text());
        return;
      }
      const data = await res.json();
      if (data.success) {
        await update({ image: imageUrl });
        toast.success("Profile picture updated!");
      }
    } catch {
      toast.error("Failed to update profile picture");
    }
  };

  return {
    session,
    loading,
    activeTab,
    setActiveTab,
    name,
    setName,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleUpdateProfile,
    handleChangePassword,
    handleUploadImage,
  };
}
