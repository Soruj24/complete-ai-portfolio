"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { 
  MessageCircle, 
  X, 
  Send, 
  User as UserIcon,
  Loader2,
  Minus,
  Maximize2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface Message {
  _id: string;
  senderId: string;
  senderName: string;
  senderImage?: string;
  message: string;
  isAdmin: boolean;
  createdAt: string;
}

export default function ChatWidget() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatMode, setChatMode] = useState<"human" | "ai">("ai");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Poll for new messages every 3 seconds
  useEffect(() => {
    if (isOpen && !isMinimized && session) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [isOpen, isMinimized, session, chatMode]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const endpoint = chatMode === "ai" ? "/api/chat/ai" : "/api/chat";
      const res = await fetch(endpoint);
      
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
    if (!newMessage.trim() || !session) return;

    const messageContent = newMessage;
    setNewMessage("");
    setLoading(true);

    try {
      if (chatMode === "ai") {
        // Optimistically add user message
        const tempUserMsg = {
          _id: Date.now().toString(),
          senderId: session.user.id,
          senderName: session.user.name,
          message: messageContent,
          isAdmin: false,
          createdAt: new Date().toISOString()
        };
        setMessages(prev => [...prev, { ...tempUserMsg, senderName: tempUserMsg.senderName ?? "Anonymous" }]);

        const res = await fetch("/api/chat/ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: messageContent }),
        });

        if (!res.ok) throw new Error("Failed to connect to AI");

        // Handle streaming response
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let aiMessageContent = "";
        
        // Add a placeholder AI message that we'll update as chunks arrive
        const tempAiMsgId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, {
          _id: tempAiMsgId,
          senderId: "ai",
          senderName: "AI Assistant",
          message: "",
          isAdmin: true,
          createdAt: new Date().toISOString()
        }]);

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value, { stream: true });
            aiMessageContent += chunk;
            
            // Update the placeholder AI message with new content
            setMessages(prev => prev.map(msg => 
              msg._id === tempAiMsgId ? { ...msg, message: aiMessageContent } : msg
            ));
          }
        }
      } else {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: messageContent,
            receiverId: "65897c5e26775825785938f3", // Placeholder
            isAdmin: false
          }),
        });

        if (res.ok) {
          fetchMessages();
        }
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!session || session.user.role === "admin") return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <Card className={cn(
          "mb-4 w-80 md:w-96 shadow-2xl border-none overflow-hidden transition-all duration-300",
          isMinimized ? "h-14" : "h-[500px]"
        )}>
          <CardHeader className="bg-purple-600 text-white p-4 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-8 w-8 border border-white/20">
                  <AvatarImage src={chatMode === "ai" ? "/ai-avatar.png" : "/admin-avatar.png"} />
                  <AvatarFallback>{chatMode === "ai" ? "AI" : "AD"}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-purple-600 rounded-full" />
              </div>
              <div className="flex flex-col">
                <CardTitle className="text-sm font-black">
                  {chatMode === "ai" ? "AI Assistant" : "Nexus Support"}
                </CardTitle>
                <div className="flex gap-1.5 mt-1">
                  <button 
                    onClick={() => setChatMode("ai")}
                    className={cn(
                      "text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider transition-all",
                      chatMode === "ai" ? "bg-white text-purple-600" : "bg-purple-500/50 text-purple-100 hover:bg-purple-500"
                    )}
                  >
                    AI
                  </button>
                  <button 
                    onClick={() => setChatMode("human")}
                    className={cn(
                      "text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider transition-all",
                      chatMode === "human" ? "bg-white text-purple-600" : "bg-purple-500/50 text-purple-100 hover:bg-purple-500"
                    )}
                  >
                    Human
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:bg-white/10"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:bg-white/10"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              <CardContent 
                ref={scrollRef}
                className="p-4 h-[380px] overflow-y-auto bg-gray-50 flex flex-col gap-4 no-scrollbar"
              >
                <div className="text-center py-4">
                  <span className="bg-gray-200/50 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Today
                  </span>
                </div>

                {messages.length === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 opacity-50">
                    <MessageCircle className="h-12 w-12 text-gray-300" />
                    <p className="text-sm font-medium text-gray-500">Hi {session.user.name}! <br/> How can we help you today?</p>
                  </div>
                )}

                {messages.map((msg) => (
                  <div 
                    key={msg._id}
                    className={cn(
                      "flex flex-col max-w-[80%]",
                      msg.senderId === session.user.id ? "ml-auto items-end" : "mr-auto items-start"
                    )}
                  >
                    <div className={cn(
                      "px-4 py-2.5 rounded-2xl text-sm font-medium shadow-sm",
                      msg.senderId === session.user.id 
                        ? "bg-purple-600 text-white rounded-tr-none" 
                        : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                    )}>
                      {msg.message}
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase">
                      {format(new Date(msg.createdAt), "h:mm a")}
                    </span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="p-4 bg-white border-t border-gray-100">
                <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                  <Input 
                    placeholder="Type your message..." 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 h-10 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-purple-100"
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={loading || !newMessage.trim()}
                    className="h-10 w-10 rounded-xl bg-purple-600 hover:bg-purple-700 shrink-0 shadow-lg shadow-purple-100"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      )}

      <Button 
        onClick={() => setIsOpen(true)}
        className={cn(
          "h-16 w-16 rounded-full bg-purple-600 hover:bg-purple-700 shadow-2xl shadow-purple-200 transition-all duration-500 hover:scale-110 group",
          isOpen && "scale-0 opacity-0 pointer-events-none"
        )}
      >
        <MessageCircle className="h-8 w-8 text-white group-hover:rotate-12 transition-transform" />
        <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 border-2 border-white rounded-full flex items-center justify-center">
          <span className="text-[10px] font-black text-white">1</span>
        </div>
      </Button>
    </div>
  );
}
