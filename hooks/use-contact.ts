"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useSendContactMessageMutation } from "@/lib/store/api/contact-api";
import { useGetPublicSettingsQuery } from "@/lib/store/api/portfolio-api";
import { toast } from "sonner";

export function useContact() {
  const { data: session } = useSession();
  const { data: settingsData, isLoading: loading } = useGetPublicSettingsQuery();
  const [sendContact, { isLoading: isSubmitting }] = useSendContactMessageMutation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", subject: "", message: "",
  });

  const settings = settingsData?.data || null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      await sendContact(formData).unwrap();
      toast.success("Message sent successfully!");
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return {
    settings, loading, isSubmitting, isSubmitted, formData, setFormData,
    setIsSubmitted, handleSubmit,
  };
}
