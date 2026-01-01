"use client";

import { useState, useEffect, useRef } from "react";
import {
  Send,
  User as UserIcon,
  Loader2,
  Search,
  MessageCircle,
  Clock,
  ArrowLeft,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Smile, Paperclip, Image as ImageIcon, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const QUICK_REPLIES = [
  "Hi, how can I help you today?",
  "Thank you for reaching out! I'll check and get back to you.",
  "I've received your message. Let's discuss this further.",
  "Could you please provide more details about your requirement?",
  "Sure, I can help with that. What exactly are you looking for?",
  "I'm currently busy, but I'll reply as soon as possible.",
];

interface ChatUser {
  _id: string;
  name: string;
  email: string;
  image?: string;
  status: string;
}

interface Message {
  _id: string;
  senderId: string;
  senderName: string;
  message: string;
  isAdmin: boolean;
  createdAt: string;
}

export default function AdminChat() {
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleQuickReply = (reply: string) => {
    setNewMessage(reply);
    setShowQuickReplies(false);
  };

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchUsers, 10000);

    const handleChatUserSelected = () => {
      const userId = localStorage.getItem("selectedChatUser");
      if (userId) {
        const user = users.find((u) => u._id === userId);
        if (user) {
          setSelectedUser(user);
          localStorage.removeItem("selectedChatUser");
        } else {
          // If user not in current list, fetch again or wait
          fetchUsers().then(() => {
            const updatedUser = users.find((u) => u._id === userId);
            if (updatedUser) {
              setSelectedUser(updatedUser);
              localStorage.removeItem("selectedChatUser");
            }
          });
        }
      }
    };

    window.addEventListener("chatUserSelected", handleChatUserSelected);
    return () => {
      clearInterval(interval);
      window.removeEventListener("chatUserSelected", handleChatUserSelected);
    };
  }, [users]);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/chat/admin");

      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        return;
      }

      const data = await res.json();
      if (Array.isArray(data)) {
        setUsers(data);
      }
    } catch (error) {
      console.error("Failed to fetch users");
    } finally {
      setUsersLoading(false);
    }
  };

  const fetchMessages = async () => {
    if (!selectedUser) return;
    try {
      const res = await fetch(`/api/chat/admin?userId=${selectedUser._id}`);

      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        return;
      }

      const data = await res.json();
      if (Array.isArray(data)) {
        setMessages(data);
      }
    } catch (error) {
      console.error("Failed to fetch messages");
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: newMessage,
          receiverId: selectedUser._id,
        }),
      });

      if (res.ok) {
        setNewMessage("");
        fetchMessages();
      }
    } catch (error) {
      console.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[600px] md:h-[700px] bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-slate-800 transition-all duration-300 relative">
      {/* Sidebar - User List */}
      <div
        className={cn(
          "w-full md:w-80 border-r border-gray-100 dark:border-slate-800 flex flex-col bg-gray-50/50 dark:bg-slate-900/50 transition-all duration-300",
          selectedUser ? "hidden md:flex" : "flex"
        )}
      >
        <div className="p-6">
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            Messages
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 bg-white dark:bg-slate-900 border-none dark:border dark:border-slate-800 shadow-sm rounded-xl text-sm dark:text-white"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-3 space-y-1">
          {usersLoading ? (
            <div className="flex flex-col items-center justify-center h-40 gap-2 opacity-50">
              <Loader2 className="h-6 w-6 animate-spin text-purple-600 dark:text-purple-400" />
              <span className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase">
                Loading chats...
              </span>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-10 px-4">
              <p className="text-sm font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                No active chats
              </p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-2xl transition-all group",
                  selectedUser?._id === user._id
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-100 dark:shadow-purple-900/20"
                    : "hover:bg-white dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 hover:shadow-sm"
                )}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-white dark:border-slate-800">
                    <AvatarImage src={user.image} />
                    <AvatarFallback
                      className={cn(
                        "font-black text-lg",
                        selectedUser?._id === user._id
                          ? "bg-purple-500 text-white"
                          : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                      )}
                    >
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {user.status === "active" && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full" />
                  )}
                </div>
                <div className="flex flex-col items-start overflow-hidden">
                  <span className="font-bold truncate w-full">{user.name}</span>
                  <span
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-widest truncate w-full",
                      selectedUser?._id === user._id
                        ? "text-purple-100"
                        : "text-gray-400 dark:text-slate-500"
                    )}
                  >
                    {user.email}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div
        className={cn(
          "flex-1 flex flex-col bg-white dark:bg-slate-900 transition-all duration-300",
          selectedUser ? "flex" : "hidden md:flex"
        )}
      >
        {selectedUser ? (
          <>
            <div className="p-4 md:p-6 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-3 md:gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden rounded-full"
                  onClick={() => setSelectedUser(null)}
                >
                  <ArrowLeft className="h-5 w-5 text-gray-500" />
                </Button>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedUser.image} />
                  <AvatarFallback className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-black">
                    {selectedUser.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-black text-gray-900 dark:text-white leading-none text-sm md:text-base">
                    {selectedUser.name}
                  </h3>
                  <span className="text-[9px] md:text-[10px] font-bold text-green-500 uppercase tracking-widest flex items-center gap-1 mt-1 md:mt-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Active Now
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-400 dark:text-slate-500 hover:text-purple-600 dark:hover:text-purple-400"
              >
                <Clock className="h-5 w-5" />
              </Button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 md:space-y-6 bg-gray-50/30 dark:bg-slate-950/30 no-scrollbar"
            >
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={cn(
                    "flex flex-col max-w-[85%] md:max-w-[70%]",
                    msg.isAdmin ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div
                    className={cn(
                      "px-4 py-2.5 md:px-5 md:py-3 rounded-[20px] md:rounded-[24px] text-xs md:text-sm font-medium shadow-sm leading-relaxed",
                      msg.isAdmin
                        ? "bg-purple-600 text-white rounded-tr-none shadow-purple-100 dark:shadow-none"
                        : "bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 rounded-tl-none border border-gray-100 dark:border-slate-700"
                    )}
                  >
                    {msg.message}
                  </div>
                  <span className="text-[9px] md:text-[10px] font-black text-gray-400 dark:text-slate-500 mt-1.5 md:mt-2 uppercase tracking-tighter">
                    {format(new Date(msg.createdAt), "h:mm a")}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 md:p-6 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 relative">
              {/* Quick Replies Overlay */}
              {showQuickReplies && (
                <div className="absolute bottom-full left-0 right-0 p-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 shadow-2xl animate-in slide-in-from-bottom-2 duration-200 z-20">
                  <div className="flex items-center justify-between mb-3 px-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-purple-600 dark:text-purple-400 flex items-center gap-2">
                      <Zap className="h-3 w-3 fill-purple-600" />
                      Quick Replies
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowQuickReplies(false)}
                      className="h-6 w-6 p-0 rounded-full"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_REPLIES.map((reply, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuickReply(reply)}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-all border border-gray-100 dark:border-slate-700"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <form
                onSubmit={handleSendMessage}
                className="flex flex-col gap-3"
              >
                <div className="flex items-center gap-2 px-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowQuickReplies(!showQuickReplies)}
                    className={cn(
                      "h-8 w-8 rounded-full transition-all",
                      showQuickReplies
                        ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                        : "text-gray-400 hover:text-purple-600"
                    )}
                  >
                    <Zap className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-gray-400 hover:text-purple-600"
                  >
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-gray-400 hover:text-purple-600"
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-gray-400 hover:text-purple-600"
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2 md:gap-3">
                  <Input
                    placeholder={`Type your professional reply...`}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onFocus={() => setShowQuickReplies(false)}
                    className="flex-1 h-11 md:h-12 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-slate-800 border-none dark:border dark:border-slate-700 px-4 md:px-6 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900/30 font-medium dark:text-white text-sm"
                  />
                  <Button
                    type="submit"
                    disabled={loading || !newMessage.trim()}
                    className="h-11 md:h-12 px-4 md:px-8 rounded-xl md:rounded-2xl bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 shadow-lg shadow-purple-100 dark:shadow-none font-bold gap-2 transition-all hover:scale-[1.02]"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                    <span className="hidden sm:inline">Send</span>
                  </Button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 md:p-12 bg-gray-50/30 dark:bg-slate-950/30">
            <div className="w-16 h-16 md:w-24 md:h-24 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4 md:mb-6">
              <MessageCircle className="h-8 w-8 md:h-12 md:w-12 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-2">
              Support Center
            </h3>
            <p className="text-sm md:text-base text-gray-500 dark:text-slate-400 font-medium max-w-xs px-4">
              Select a user from the sidebar to start a real-time conversation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
