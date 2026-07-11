"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Inbox } from "lucide-react";
import { useGetAdminResourceQuery } from "@/lib/store/api/admin-api";

interface Message {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read?: boolean;
  createdAt?: string;
}

export default function MessagesPage() {
  const { data: response, isLoading } = useGetAdminResourceQuery({ resource: "messages" });
  const items: Message[] = response?.data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Messages</h1>
          <p className="text-sm text-text-secondary mt-1">Manage communications and inquiries</p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-surface animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <Card className="border-border-subtle bg-surface">
          <CardContent className="p-8 text-center">
            <Inbox className="h-10 w-10 text-text-tertiary mx-auto mb-3" />
            <p className="text-sm text-text-tertiary">No messages yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {items.map((item: Message) => (
            <Card key={item._id} className={`border-border-subtle bg-surface hover:border-border transition-all ${!item.read ? "border-l-2 border-l-accent" : ""}`}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`p-2.5 rounded-xl ${!item.read ? "bg-accent/10" : "bg-surface-hover"}`}>
                    <Mail className={`h-5 w-5 ${!item.read ? "text-accent" : "text-text-tertiary"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm text-text-primary">{item.name}</h3>
                      {!item.read && <Badge className="text-[9px] px-1.5 py-0 rounded-full bg-accent/10 text-accent border-0">New</Badge>}
                    </div>
                    <p className="text-xs text-text-tertiary mt-0.5 font-mono">{item.email}</p>
                    {item.subject && <p className="text-xs text-text-secondary mt-1 font-medium">{item.subject}</p>}
                    <p className="text-xs text-text-tertiary mt-1 line-clamp-2">{item.message}</p>
                    {item.createdAt && <p className="text-[10px] text-text-tertiary/60 mt-2">{item.createdAt}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
