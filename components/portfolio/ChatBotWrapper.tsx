"use client";

import dynamic from "next/dynamic";

const AIChatBot = dynamic(() => import("./AIChatBot"), {
  ssr: false,
  loading: () => (
    <div className="fixed bottom-6 right-6 z-[100]">
      <div className="h-16 w-16 animate-pulse rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-50" />
    </div>
  ),
});

export default function ChatBotWrapper() {
  return <AIChatBot />;
}
