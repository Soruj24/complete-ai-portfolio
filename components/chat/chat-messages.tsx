"use client";

import { CardContent } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface Message {
  _id: string;
  senderId: string;
  message: string;
  createdAt: string;
}

interface Props {
  messages: Message[];
  userId: string | undefined;
  userName: string;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

export function ChatMessages({ messages, userId, userName, scrollRef }: Props) {
  return (
    <CardContent ref={scrollRef} className="p-4 h-[380px] overflow-y-auto bg-gray-50 flex flex-col gap-4 no-scrollbar">
      <div className="text-center py-4">
        <span className="bg-gray-200/50 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Today</span>
      </div>

      {messages.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 opacity-50">
          <MessageCircle className="h-12 w-12 text-gray-300" />
          <p className="text-sm font-medium text-gray-500">Hi {userName}! <br/> How can we help you today?</p>
        </div>
      )}

      {messages.map((msg) => (
        <div key={msg._id} className={cn("flex flex-col max-w-[80%]", msg.senderId === userId ? "ml-auto items-end" : "mr-auto items-start")}>
          <div className={cn("px-4 py-2.5 rounded-2xl text-sm font-medium shadow-sm", msg.senderId === userId ? "bg-purple-600 text-white rounded-tr-none" : "bg-white text-gray-800 rounded-tl-none border border-gray-100")}>
            {msg.message}
          </div>
          <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase">{format(new Date(msg.createdAt), "h:mm a")}</span>
        </div>
      ))}
    </CardContent>
  );
}
