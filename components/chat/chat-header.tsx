"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { X, Minus, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  chatMode: "human" | "ai";
  isMinimized: boolean;
  onModeChange: (mode: "human" | "ai") => void;
  onToggleMinimize: () => void;
  onClose: () => void;
}

export function ChatHeader({ chatMode, isMinimized, onModeChange, onToggleMinimize, onClose }: Props) {
  return (
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
          <CardTitle className="text-sm font-black">{chatMode === "ai" ? "AI Assistant" : "Soruj Support"}</CardTitle>
          <div className="flex gap-1.5 mt-1">
            <button onClick={() => onModeChange("ai")} className={cn("text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider transition-all", chatMode === "ai" ? "bg-white text-purple-600" : "bg-purple-500/50 text-purple-100 hover:bg-purple-500")}>AI</button>
            <button onClick={() => onModeChange("human")} className={cn("text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider transition-all", chatMode === "human" ? "bg-white text-purple-600" : "bg-purple-500/50 text-purple-100 hover:bg-purple-500")}>Human</button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10" onClick={onToggleMinimize}>
          {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
  );
}
