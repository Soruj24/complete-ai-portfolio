"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useGetAdminUsersQuery, useUpdateAdminUserMutation, useDeleteAdminUserMutation, useGetActivityQuery } from "@/lib/store/api/admin-api";
import { useGetContactMessagesQuery, useDeleteContactMessageMutation } from "@/lib/store/api/contact-api";
import { useGetSettingsQuery, useUpdateSettingsMutation } from "@/lib/store/api/portfolio-api";
import { useCreateBlogPostMutation } from "@/lib/store/api/blog-api";
import { useSetupTwoFactorMutation, useVerifyTwoFactorMutation } from "@/lib/store/api/auth-api";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  isVerified: boolean;
  createdAt: string;
}

export type ContactMessage = import("@/shared/types").ContactMessage;

export interface AdminSettingsData {
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

export interface BlogPostData {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  image: string;
}

export interface TwoFactorData {
  qrCodeUrl: string;
  secret: string;
}

export interface ActivityDataPoint {
  date: string;
  count: number;
}

export interface UserPagination {
  page: number;
  pages: number;
  total: number;
}

export function useAdminDashboard() {
  const [session, setSession] = useState<{ user: { id: string; email: string; name: string; role: string } } | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => { if (d.success) setSession({ user: { id: d.user.id, email: d.user.email, name: d.user.name, role: d.user.role } }); })
      .catch(() => setSession(null));
  }, []);

  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [userPage, setUserPage] = useState(1);

  const { data: usersResponse, isLoading: loading, refetch: refetchUsers } = useGetAdminUsersQuery();
  const [deleteUser] = useDeleteAdminUserMutation();
  const [updateUser] = useUpdateAdminUserMutation();
  const { data: activityResponse } = useGetActivityQuery();
  const { data: contactResponse, refetch: refetchContact } = useGetContactMessagesQuery();
  const [deleteContactMessage] = useDeleteContactMessageMutation();
  const { data: settingsResponse } = useGetSettingsQuery();
  const [updateSettings] = useUpdateSettingsMutation();
  const [createBlogPost] = useCreateBlogPostMutation();
  const [setup2FAMutation] = useSetupTwoFactorMutation();
  const [verify2FAMutation] = useVerifyTwoFactorMutation();

  const users = (usersResponse?.data as User[]) || [];
  const contactMessages = (contactResponse?.data as unknown as ContactMessage[]) || [];
  const activityData = (activityResponse?.data as unknown as ActivityDataPoint[]) || [];

  const [blogPost, setBlogPost] = useState<BlogPostData>({
    title: "", content: "", excerpt: "", category: "Security",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
  });
  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<User | null>(null);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);

  const settings = settingsResponse?.data as AdminSettingsData | undefined;
  const [adminSettings, setAdminSettings] = useState<AdminSettingsData>({
    siteName: "YOURAPP", contactEmail: "admin@yourapp.com",
    allowRegistration: true, maintenanceMode: false,
    fullName: "Soruj Mahmud", professionalTitle: "Aspiring Full-Stack Developer",
    bio: "Self-taught developer with comprehensive project-based learning in modern web technologies and AI applications",
    location: "Tangail, Dhaka, Bangladesh", phone: "+8801795397598",
    githubUrl: "https://github.com/", linkedinUrl: "https://linkedin.com/",
    twitterUrl: "https://twitter.com/", specializations: ["LangChain and AI Applications", "MCP Server Development", "Next.js, React, TypeScript", "MongoDB, Node.js", "Modern Web Technologies"],
  });
  const [settingsLoading, setSettingsLoading] = useState(false);

  useEffect(() => {
    if (settings) setAdminSettings(settings);
  }, [settings]);

  const [twoFactorSetup, setTwoFactorSetup] = useState<TwoFactorData | null>(null);
  const [twoFactorToken, setTwoFactorToken] = useState("");
  const [is2FADialogOpen, setIs2FADialogOpen] = useState(false);

  const setup2FA = useCallback(async () => {
    try {
      const result = await setup2FAMutation().unwrap();
      if (result.data) {
        setTwoFactorSetup(result.data as unknown as TwoFactorData);
        setIs2FADialogOpen(true);
      }
    } catch {
      toast.error("Failed to setup 2FA");
    }
  }, [setup2FAMutation]);

  const verify2FA = useCallback(async () => {
    try {
      await verify2FAMutation({ token: twoFactorToken }).unwrap();
      toast.success("2FA enabled successfully");
      setIs2FADialogOpen(false);
    } catch {
      toast.error("Error verifying 2FA");
    }
  }, [twoFactorToken, verify2FAMutation]);

  const handleUpdateSettings = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsLoading(true);
    try {
      await updateSettings(adminSettings).unwrap();
      toast.success("Settings updated successfully");
    } catch {
      toast.error("Error updating settings");
    }
    setSettingsLoading(false);
  }, [adminSettings, updateSettings]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    const userId = searchParams.get("userId");
    if (tab && tab !== activeTab) setActiveTab(tab);
    if (userId) {
      localStorage.setItem("selectedChatUser", userId);
      setTimeout(() => window.dispatchEvent(new Event("chatUserSelected")), 500);
    }
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.push(`/admin/dashboard?tab=${value}`, { scroll: false });
  };

  const filteredUsers = users.filter(
    (u) => u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteUser = useCallback(async (userId: string) => {
    const result = await Swal.fire({ title: "Delete user?", text: "Are you sure?", icon: "warning", showCancelButton: true, confirmButtonText: "Yes, delete", cancelButtonText: "Cancel", confirmButtonColor: "#dc2626", reverseButtons: true });
    if (!result.isConfirmed) return;
    try {
      await deleteUser(userId).unwrap();
      toast.success("User deleted");
    } catch {
      toast.error("Failed to delete user");
    }
  }, [deleteUser]);

  const handleChangeRole = useCallback(async (userId: string, newRole: string) => {
    try {
      await updateUser({ userId, data: { role: newRole } }).unwrap();
      toast.success("Role updated");
    } catch {
      toast.error("Failed to update role");
    }
  }, [updateUser]);

  const handleUpdateStatus = useCallback(async (userId: string, newStatus: string) => {
    try {
      await updateUser({ userId, data: { status: newStatus } }).unwrap();
      toast.success(`User ${newStatus}`);
    } catch {
      toast.error("Failed to update status");
    }
  }, [updateUser]);

  const handleCreateBlogPost = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBlogPost(blogPost).unwrap();
      toast.success("Blog post created successfully!");
      setIsBlogDialogOpen(false);
      setBlogPost({ title: "", content: "", excerpt: "", category: "Security", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80" });
    } catch {
      toast.error("Error creating blog post");
    }
  }, [blogPost, createBlogPost]);

  const handleDeleteContactMessage = useCallback(async (id: string) => {
    try {
      await deleteContactMessage(id).unwrap();
      toast.success("Message deleted");
    } catch {
      toast.error("Failed to delete message");
    }
  }, [deleteContactMessage]);

  return {
    session, activeTab, users, userPagination: usersResponse?.pagination ? { page: usersResponse.pagination.page, pages: usersResponse.pagination.totalPages, total: usersResponse.pagination.total } : { page: 1, pages: 1, total: users.length },
    loading, searchQuery, contactMessages,
    blogPost, isBlogDialogOpen, setIsBlogDialogOpen, setBlogPost,
    selectedMessage, setSelectedMessage, isMessageDialogOpen, setIsMessageDialogOpen,
    selectedUserForEdit, setSelectedUserForEdit, isEditUserDialogOpen, setIsEditUserDialogOpen,
    adminSettings, settingsLoading, activityData, twoFactorSetup, twoFactorToken, setTwoFactorToken,
    is2FADialogOpen, setIs2FADialogOpen,
    setSearchQuery, fetchUsers: (page?: number) => { if (page) setUserPage(page); refetchUsers(); },
    handleTabChange, handleDeleteUser, handleChangeRole, handleUpdateStatus,
    handleCreateBlogPost, handleUpdateSettings, setAdminSettings,
    fetchContactMessages: refetchContact, handleDeleteContactMessage,
    setup2FA, verify2FA, filteredUsers,
  };
}
