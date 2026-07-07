"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export function useDashboard() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", image: "" });

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
        await update({ ...session, user: { ...session?.user, name: formData.name, image: formData.image } });
        toast.success("Profile updated successfully!");
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error(data.error || "Failed to update profile");
      }
    } catch {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return { session, loading, formData, setFormData, handleUpdateProfile };
}
