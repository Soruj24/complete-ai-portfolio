"use client";

import { cn } from "@/lib/utils";
import { useAdminChat } from "@/hooks/use-admin-chat";
import { UserList } from "@/components/admin/chat/user-list";
import { ChatConversation } from "@/components/admin/chat/chat-conversation";
import { ChatInputPanel } from "@/components/admin/chat/chat-input-panel";
import { EmptyState } from "@/components/admin/chat/empty-state";

export default function AdminChat() {
  const {
    selectedUser, setSelectedUser,
    messages, newMessage, setNewMessage,
    loading, usersLoading, searchQuery, setSearchQuery,
    scrollRef, filteredUsers, users,
    handleSendMessage,
  } = useAdminChat();

  return (
    <div className="flex h-[600px] md:h-[700px] rounded-xl overflow-hidden border border-border-subtle bg-surface">
      <div className={cn("w-full md:w-72", selectedUser ? "hidden md:flex" : "flex")}>
        <UserList
          users={users}
          filteredUsers={filteredUsers}
          selectedUser={selectedUser}
          usersLoading={usersLoading}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectUser={setSelectedUser}
        />
      </div>

      <div className={cn("flex-1 flex flex-col", selectedUser ? "flex" : "hidden md:flex")}>
        {selectedUser ? (
          <>
            <ChatConversation selectedUser={selectedUser} messages={messages} scrollRef={scrollRef} onBack={() => setSelectedUser(null)} />
            <ChatInputPanel newMessage={newMessage} loading={loading} onMessageChange={setNewMessage} onSend={handleSendMessage} />
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
