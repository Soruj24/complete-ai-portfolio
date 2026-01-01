"use client";

import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MoreHorizontal,
  Trash2,
  ShieldCheck,
  User as UserIcon,
  Users,
  Settings,
  Ban,
  CheckCircle,
  AlertTriangle,
  Search,
  UserPlus,
  RefreshCcw,
  ShieldAlert,
  Calendar,
  Mail,
  FileText,
  Plus,
  MessageCircle,
  Inbox,
  Briefcase,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardStats } from "@/components/admin/dashboard/DashboardStats";
import { ActivityChart } from "@/components/admin/dashboard/ActivityChart";
import { SecurityActions } from "@/components/admin/dashboard/SecurityActions";
import { UserTable } from "@/components/admin/dashboard/UserTable";
import { SystemHealth } from "@/components/admin/dashboard/SystemHealth";
import { ContactInquiries } from "@/components/admin/dashboard/ContactInquiries";
import { AdminSettings } from "@/components/admin/dashboard/AdminSettings";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  History,
  BarChart3,
  Code2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { AIBlogGenerator } from "@/components/admin/dashboard/AIBlogGenerator";
import { AIProjectOptimizer } from "@/components/admin/dashboard/AIProjectOptimizer";

import AdminChat from "@/components/admin/AdminChat";
import { CldUploadWidget } from "next-cloudinary";
import Navbar from "@/components/layout/Navbar";
import { ProjectManager } from "@/components/admin/dashboard/ProjectManager";
import { SkillManager } from "@/components/admin/dashboard/SkillManager";
import { ExperienceManager } from "@/components/admin/dashboard/ExperienceManager";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  isVerified: boolean;
  createdAt: string;
}

interface ContactMessage {
  _id: string;
  userId?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

function AdminDashboardContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "overview");
  const [users, setUsers] = useState<User[]>([]);
  const [userPagination, setUserPagination] = useState({
    page: 1,
    pages: 1,
    total: 0
  });
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [blogPost, setBlogPost] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "Security",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
  });
  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);

  const [selectedUserForEdit, setSelectedUserForEdit] = useState<User | null>(
    null
  );
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);

  const [adminSettings, setAdminSettings] = useState({
    siteName: "YOURAPP",
    contactEmail: "admin@yourapp.com",
    allowRegistration: true,
    maintenanceMode: false,
    fullName: "Soruj Mahmud",
    professionalTitle: "Aspiring Full-Stack Developer",
    bio: "Self-taught developer with comprehensive project-based learning in modern web technologies and AI applications",
    location: "Tangail, Dhaka, Bangladesh",
    phone: "+8801795397598",
    githubUrl: "https://github.com/",
    linkedinUrl: "https://linkedin.com/",
    twitterUrl: "https://twitter.com/",
    specializations: [
      "LangChain and AI Applications",
      "MCP Server Development",
      "Next.js, React, TypeScript",
      "MongoDB, Node.js",
      "Modern Web Technologies",
    ],
  });
  const [settingsLoading, setSettingsLoading] = useState(false);

  const [activityData, setActivityData] = useState<
    {
      date: string;
      count: number;
    }[]
  >([]);
  const [twoFactorSetup, setTwoFactorSetup] = useState<{
    qrCodeUrl: string;
    secret: string;
  } | null>(null);
  const [twoFactorToken, setTwoFactorToken] = useState("");
  const [is2FADialogOpen, setIs2FADialogOpen] = useState(false);

  const fetchActivityData = async () => {
    try {
      const res = await fetch("/api/admin/activity");

      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Non-JSON response received:", await res.text());
        return;
      }

      const data = await res.json();
      if (data.success) {
        setActivityData(data.data);
      }
    } catch (error) {
      console.error("Error fetching activity data:", error);
    }
  };

  const setup2FA = async () => {
    try {
      const res = await fetch("/api/auth/2fa/setup", { method: "POST" });

      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Non-JSON response received:", await res.text());
        return;
      }

      const data = await res.json();
      if (data.qrCodeUrl) {
        setTwoFactorSetup(data);
        setIs2FADialogOpen(true);
      }
    } catch (error) {
      toast.error("Failed to setup 2FA");
    }
  };

  const verify2FA = async () => {
    try {
      const res = await fetch("/api/auth/2fa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: twoFactorToken }),
      });

      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Non-JSON response received:", await res.text());
        return;
      }

      const data = await res.json();
      if (data.success) {
        toast.success("2FA enabled successfully");
        setIs2FADialogOpen(false);
        fetchSettings(); // Refresh user data
      } else {
        toast.error(data.error || "Invalid token");
      }
    } catch (error) {
      toast.error("Error verifying 2FA");
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");

      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Non-JSON response received:", await res.text());
        return;
      }

      const data = await res.json();
      if (data.success) {
        setAdminSettings(data.settings);
      }
    } catch (error) {
      console.error("Failed to fetch settings");
    }
  };

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsLoading(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminSettings),
      });

      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Non-JSON response received:", await res.text());
        return;
      }

      const data = await res.json();
      if (data.success) {
        toast.success("Settings updated successfully");
      } else {
        toast.error(data.error || "Failed to update settings");
      }
    } catch (error) {
      toast.error("Error updating settings");
    } finally {
      setSettingsLoading(false);
    }
  };

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/users?page=${page}&limit=10&search=${searchQuery}`);
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
        setUserPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchContactMessages = async () => {
    try {
      const res = await fetch("/api/contact");

      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Non-JSON response received:", await res.text());
        return;
      }

      const data = await res.json();
      if (Array.isArray(data)) {
        setContactMessages(data);
      }
    } catch (error) {
      console.error("Failed to fetch contact messages");
    }
  };

  const handleDeleteContactMessage = async (id: string) => {
    try {
      const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setContactMessages(contactMessages.filter((m) => m._id !== id));
        toast.success("Message deleted");
      }
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  useEffect(() => {
    if (session?.user?.role === "admin") {
      fetchUsers();
      fetchContactMessages();
      fetchSettings();
      fetchActivityData();
    }
  }, [session]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    const userId = searchParams.get("userId");
    
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }

    if (userId) {
      localStorage.setItem("selectedChatUser", userId);
      setTimeout(() => {
        window.dispatchEvent(new Event("chatUserSelected"));
      }, 500);
    }
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.push(`/admin/dashboard?tab=${value}`, { scroll: false });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (res.ok) {
        setUsers(users.filter((u) => u._id !== userId));
        toast.success("User deleted");
      }
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const handleChangeRole = async (userId: string, newRole: string) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });
      if (res.ok) {
        setUsers(
          users.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
        toast.success("Role updated");
      }
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const handleUpdateStatus = async (userId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, status: newStatus }),
      });
      if (res.ok) {
        setUsers(
          users.map((u) => (u._id === userId ? { ...u, status: newStatus } : u))
        );
        toast.success(`User ${newStatus}`);
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleCreateBlogPost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogPost),
      });
      if (res.ok) {
        toast.success("Blog post created successfully!");
        setIsBlogDialogOpen(false);
        setBlogPost({
          title: "",
          content: "",
          excerpt: "",
          category: "Security",
          image:
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
        });
      } else {
        toast.error("Failed to create blog post");
      }
    } catch (error) {
      toast.error("Error creating blog post");
    }
  };

  const handleUpdateUserByAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserForEdit) return;

    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: selectedUserForEdit._id,
          name: selectedUserForEdit.name,
        }),
      });

      if (res.ok) {
        setUsers(
          users.map((u) =>
            u._id === selectedUserForEdit._id ? selectedUserForEdit : u
          )
        );
        toast.success("User profile updated");
        setIsEditUserDialogOpen(false);
      }
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  if (session?.user?.role !== "admin") {
    return <div className="p-10 text-center">Access Denied</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container px-4 md:px-6 py-12 md:py-24 max-w-7xl mx-auto space-y-6 md:space-y-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-8">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 bg-blue-600 rounded-xl md:rounded-2xl shadow-xl shadow-blue-200/50 dark:shadow-none">
                <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              Admin Hub
            </h1>
            <p className="text-gray-500 dark:text-slate-400 font-medium text-sm md:text-base max-w-md">
              Manage your community, monitor activity and security performance.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
            <div className="relative group flex-1 sm:w-64 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-11 md:h-14 bg-white dark:bg-slate-900/50 border-gray-100 dark:border-slate-800 dark:text-white rounded-xl md:rounded-2xl focus:ring-2 focus:ring-blue-500/10 transition-all shadow-sm text-sm md:text-base"
              />
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <Button
                onClick={() => fetchUsers()}
                variant="outline"
                className="h-11 w-11 md:h-14 md:w-14 rounded-xl md:rounded-2xl border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all shadow-sm shrink-0"
              >
                <RefreshCcw
                  className={cn(
                    "h-4 w-4 md:h-5 md:w-5 text-gray-600 dark:text-slate-400",
                    loading && "animate-spin"
                  )}
                />
              </Button>

              <Dialog open={isBlogDialogOpen} onOpenChange={setIsBlogDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex-1 sm:flex-none h-11 md:h-14 px-5 md:px-8 rounded-xl md:rounded-2xl bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 shadow-xl shadow-purple-200/50 dark:shadow-none font-black gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] text-sm md:text-base">
                    <Plus className="h-4 w-4 md:h-5 md:w-5" />
                    New Post
                  </Button>
                </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] rounded-[32px] border-none shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-800">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                    <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    Create Blog Post
                  </DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={handleCreateBlogPost}
                  className="space-y-6 pt-4"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-slate-300 ml-1">
                      Post Title
                    </label>
                    <Input
                      required
                      value={blogPost.title}
                      onChange={(e) =>
                        setBlogPost({ ...blogPost, title: e.target.value })
                      }
                      placeholder="Enter post title"
                      className="h-12 rounded-xl bg-gray-50 dark:bg-slate-950 border-none dark:text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 dark:text-slate-300 ml-1">
                        Category
                      </label>
                      <Input
                        required
                        value={blogPost.category}
                        onChange={(e) =>
                          setBlogPost({ ...blogPost, category: e.target.value })
                        }
                        placeholder="e.g. Security"
                        className="h-12 rounded-xl bg-gray-50 dark:bg-slate-950 border-none dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 dark:text-slate-300 ml-1">
                        Featured Image
                      </label>
                      <div className="flex gap-2">
                        <Input
                          required
                          value={blogPost.image}
                          onChange={(e) =>
                            setBlogPost({ ...blogPost, image: e.target.value })
                          }
                          placeholder="https://..."
                          className="h-12 rounded-xl bg-gray-50 dark:bg-slate-950 border-none dark:text-white flex-1"
                        />
                        <CldUploadWidget
                          uploadPreset="ml_default"
                          onSuccess={(result: any) => {
                            if (
                              result.info &&
                              typeof result.info !== "string"
                            ) {
                              setBlogPost({
                                ...blogPost,
                                image: result.info.secure_url,
                              });
                              toast.success("Image uploaded successfully!");
                            }
                          }}
                        >
                          {({ open }) => (
                            <Button
                              type="button"
                              onClick={() => open()}
                              className="h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50 border-none"
                            >
                              Upload
                            </Button>
                          )}
                        </CldUploadWidget>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-slate-300 ml-1">
                      Short Excerpt
                    </label>
                    <Input
                      required
                      value={blogPost.excerpt}
                      onChange={(e) =>
                        setBlogPost({ ...blogPost, excerpt: e.target.value })
                      }
                      placeholder="Brief summary of the post"
                      className="h-12 rounded-xl bg-gray-50 dark:bg-slate-950 border-none dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-slate-300 ml-1">
                      Content (Markdown supported)
                    </label>
                    <Textarea
                      required
                      value={blogPost.content}
                      onChange={(e) =>
                        setBlogPost({ ...blogPost, content: e.target.value })
                      }
                      placeholder="Write your blog content here..."
                      className="min-h-[200px] rounded-xl bg-gray-50 dark:bg-slate-950 border-none p-4 dark:text-white"
                    />
                  </div>
                  <DialogFooter className="pt-4">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setIsBlogDialogOpen(false)}
                      className="rounded-xl font-bold dark:hover:bg-slate-800"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="rounded-xl bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 font-bold px-8"
                    >
                      Publish Post
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Button className="h-12 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-lg shadow-blue-100 dark:shadow-none font-bold gap-2 transition-all hover:scale-[1.02]">
              <UserPlus className="h-5 w-5" />
              Invite User
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs 
        value={activeTab} 
        onValueChange={handleTabChange}
        className="space-y-6 md:space-y-10"
      >
          <div className="bg-white/50 dark:bg-slate-900/50 p-1.5 md:p-2 rounded-2xl md:rounded-[28px] border border-gray-100 dark:border-slate-800 shadow-sm overflow-x-auto no-scrollbar">
            <TabsList className="bg-transparent h-10 md:h-14 gap-1 md:gap-2 p-0 flex flex-nowrap min-w-max">
              <TabsTrigger
                value="overview"
                className="rounded-xl md:rounded-2xl px-4 md:px-8 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-200/50 dark:data-[state=active]:shadow-none transition-all font-bold text-xs md:text-sm"
              >
                <BarChart3 className="w-4 h-4 mr-2 hidden md:inline" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="rounded-xl md:rounded-2xl px-4 md:px-8 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-200/50 dark:data-[state=active]:shadow-none transition-all font-bold text-xs md:text-sm"
              >
                <Users className="w-4 h-4 mr-2 hidden md:inline" />
                Users
              </TabsTrigger>
              <TabsTrigger
                value="portfolio"
                className="rounded-xl md:rounded-2xl px-4 md:px-8 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-200/50 dark:data-[state=active]:shadow-none transition-all font-bold text-xs md:text-sm"
              >
                <Briefcase className="w-4 h-4 mr-2 hidden md:inline" />
                Portfolio
              </TabsTrigger>
              <TabsTrigger
                value="ai-tools"
                className="rounded-xl md:rounded-2xl px-4 md:px-8 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-200/50 dark:data-[state=active]:shadow-none transition-all font-bold text-xs md:text-sm"
              >
                <Sparkles className="w-4 h-4 mr-2 hidden md:inline" />
                AI Tools
              </TabsTrigger>
              <TabsTrigger
                value="inquiries"
                className="rounded-xl md:rounded-2xl px-4 md:px-8 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-200/50 dark:data-[state=active]:shadow-none transition-all font-bold text-xs md:text-sm"
              >
                <Inbox className="w-4 h-4 mr-2 hidden md:inline" />
                Inquiries
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="rounded-xl md:rounded-2xl px-4 md:px-8 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-200/50 dark:data-[state=active]:shadow-none transition-all font-bold text-xs md:text-sm"
              >
                <Settings className="w-4 h-4 mr-2 hidden md:inline" />
                Settings
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6 md:space-y-10 focus-visible:outline-none">
            <DashboardStats 
              activeUsers={users.filter((u) => u.status === "active").length}
              totalAdmins={users.filter((u) => u.role === "admin").length}
              bannedUsers={users.filter((u) => u.status === "banned").length}
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
              <div className="lg:col-span-2 space-y-6 md:space-y-10">
                <ActivityChart data={activityData} />
                <SystemHealth />
              </div>
              <div className="space-y-6 md:space-y-10">
                <SecurityActions onSetup2FA={setup2FA} />
                <AdminChat />
              </div>
            </div>

            <Dialog open={is2FADialogOpen} onOpenChange={setIs2FADialogOpen}>
              <DialogContent className="sm:max-w-[400px] rounded-[32px] dark:bg-slate-900 dark:border dark:border-slate-800">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black dark:text-white">
                    Setup 2FA
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4 flex flex-col items-center">
                  {twoFactorSetup?.qrCodeUrl && (
                    <img
                      src={twoFactorSetup.qrCodeUrl}
                      alt="2FA QR Code"
                      className="w-48 h-48 rounded-2xl shadow-lg dark:shadow-none"
                    />
                  )}
                  <p className="text-sm text-center text-gray-500 dark:text-slate-400 font-medium">
                    Scan this QR code with your Google Authenticator or any TOTP
                    app.
                  </p>
                  <div className="w-full space-y-2">
                    <Label className="font-bold dark:text-slate-300">Verification Token</Label>
                    <Input
                      placeholder="Enter 6-digit code"
                      value={twoFactorToken}
                      onChange={(e) => setTwoFactorToken(e.target.value)}
                      className="h-12 rounded-xl bg-gray-50 dark:bg-slate-950 border-none text-center text-xl font-black tracking-widest dark:text-white"
                    />
                  </div>
                  <Button
                    onClick={verify2FA}
                    className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl h-12 font-bold"
                  >
                    Verify & Enable
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="users" className="focus-visible:outline-none">
            <Card className="border-none shadow-xl shadow-gray-200/50 dark:shadow-none dark:bg-slate-900/50 dark:border dark:border-slate-800 rounded-[32px] overflow-hidden">
              <CardHeader className="bg-white dark:bg-slate-900/80 border-b border-gray-100 dark:border-slate-800 py-6 px-8">
                <CardTitle className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  User Directory
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <UserTable
                  users={filteredUsers}
                  loading={loading}
                  onEdit={(user) => {
                    setSelectedUserForEdit(user);
                    setIsEditUserDialogOpen(true);
                  }}
                  onChangeRole={handleChangeRole}
                  onUpdateStatus={handleUpdateStatus}
                  onDelete={handleDeleteUser}
                  onClearSearch={() => setSearchQuery("")}
                />
                {userPagination.pages > 1 && (
                  <div className="flex justify-end items-center gap-2 mt-4 p-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fetchUsers(userPagination.page - 1)}
                      disabled={userPagination.page === 1}
                      className="rounded-xl font-bold dark:border-slate-800 dark:hover:bg-slate-800"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                    </Button>
                    <span className="text-sm font-bold text-gray-500 dark:text-slate-400 mx-2">
                      Page {userPagination.page} of {userPagination.pages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fetchUsers(userPagination.page + 1)}
                      disabled={userPagination.page === userPagination.pages}
                      className="rounded-xl font-bold dark:border-slate-800 dark:hover:bg-slate-800"
                    >
                      Next <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6 md:space-y-10 focus-visible:outline-none">
            <Card className="border-none shadow-2xl shadow-purple-500/10 dark:shadow-none dark:bg-slate-900/50 dark:border dark:border-slate-800 rounded-3xl overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
              <CardContent className="p-6 space-y-6 md:space-y-10">
                <ProjectManager />
                <ExperienceManager />
                <SkillManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-tools" className="space-y-6 md:space-y-10 focus-visible:outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <AIBlogGenerator />
              <AIProjectOptimizer />
            </div>
          </TabsContent>

          <TabsContent value="inquiries" className="focus-visible:outline-none">
            <Card className="border-none shadow-xl shadow-gray-200/50 dark:shadow-none dark:bg-slate-900/50 dark:border dark:border-slate-800 rounded-[32px] overflow-hidden">
              <CardHeader className="bg-white dark:bg-slate-900/80 border-b border-gray-100 dark:border-slate-800 py-6 px-8">
                <CardTitle className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <Inbox className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  Contact Inquiries
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ContactInquiries
                  messages={contactMessages}
                  onDelete={handleDeleteContactMessage}
                  onViewFull={(msg) => {
                    setSelectedMessage({
                      ...msg,
                      status: "unread",
                    });
                    setIsMessageDialogOpen(true);
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="focus-visible:outline-none">
            <AdminSettings
              settings={adminSettings}
              loading={settingsLoading}
              onUpdate={handleUpdateSettings}
              onChange={(settings) =>
                setAdminSettings((prev) => ({ ...prev, ...settings }))
              }
            />
          </TabsContent>

          {/* Message Detail Dialog */}
          <Dialog
            open={isMessageDialogOpen}
            onOpenChange={setIsMessageDialogOpen}
          >
            <DialogContent className="max-w-2xl rounded-[32px]">
              {selectedMessage && (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-black">
                      {selectedMessage.subject}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 pt-4">
                    <div className="flex justify-between items-start bg-gray-50 p-6 rounded-2xl">
                      <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
                          From
                        </p>
                        <p className="font-bold text-gray-900">
                          {selectedMessage.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {selectedMessage.email}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
                          Date
                        </p>
                        <p className="font-bold text-gray-900">
                          {new Date(selectedMessage.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white border border-gray-100 p-8 rounded-[24px]">
                      <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>
                  <DialogFooter className="gap-3 flex-col sm:flex-row pt-4">
                    {selectedMessage.userId && (
                      <Button
                        className="rounded-xl bg-purple-600 hover:bg-purple-700 font-bold flex-1 h-12"
                        onClick={() => {
                          // 1. Close Dialog
                          setIsMessageDialogOpen(false);

                          // 2. Switch to Chat tab
                          const chatTab = document.querySelector(
                            '[value="chat"]'
                          ) as HTMLButtonElement;
                          if (chatTab) chatTab.click();

                          // 3. Set selection
                          localStorage.setItem(
                            "selectedChatUser",
                            selectedMessage.userId!
                          );

                          // 4. Small delay to ensure tab has switched and component is mounted
                          setTimeout(() => {
                            window.dispatchEvent(new Event("chatUserSelected"));
                          }, 100);
                        }}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Reply via Chat
                      </Button>
                    )}
                    <a
                      href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent("Re: " + selectedMessage.subject)}&body=${encodeURIComponent("\n\n--- Original Message ---\n" + (selectedMessage.message.length > 500 ? selectedMessage.message.substring(0, 500) + "..." : selectedMessage.message))}`}
                      className="inline-flex items-center justify-center rounded-xl bg-white border-2 border-gray-100 px-6 font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-200 transition-all flex-1 h-12 shadow-sm"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Reply via Email
                    </a>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>
        </Tabs>
      </div>
    </>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminDashboardContent />
    </Suspense>
  );
}
