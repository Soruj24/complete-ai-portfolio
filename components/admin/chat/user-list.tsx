"use client";

import { Search, Loader2, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { ChatUser } from "@/types/admin-chat";

interface UserListProps {
  users: ChatUser[];
  filteredUsers: ChatUser[];
  selectedUser: ChatUser | null;
  usersLoading: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectUser: (user: ChatUser) => void;
}

export function UserList({ filteredUsers, selectedUser, usersLoading, searchQuery, onSearchChange, onSelectUser }: UserListProps) {
  return (
    <div className="w-full md:w-72 border-r border-border-subtle flex flex-col bg-background/50">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-text-tertiary" />
          Messages
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-tertiary" />
          <Input placeholder="Search users..." value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} className="pl-9 h-9 text-xs rounded-lg border-border-subtle bg-surface" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-2 space-y-0.5">
        {usersLoading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="h-4 w-4 animate-spin text-text-tertiary" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-10 text-xs text-text-tertiary">No active chats</div>
        ) : (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => onSelectUser(user)}
              className={cn(
                "w-full flex items-center gap-3 p-2.5 rounded-lg transition-colors text-left",
                selectedUser?._id === user._id
                  ? "bg-accent/10 text-accent"
                  : "hover:bg-surface-hover text-text-secondary",
              )}
            >
              <div className="relative shrink-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image} />
                  <AvatarFallback className="text-xs font-medium bg-accent/10 text-accent">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {user.status === "active" && (
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-success rounded-full border-2 border-background" />
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium truncate">{user.name}</span>
                <span className="text-[10px] text-text-tertiary truncate">{user.email}</span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
