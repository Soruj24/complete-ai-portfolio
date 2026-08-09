"use client";

import dynamic from "next/dynamic";

const AIChatBot = dynamic(() => import("./AIChatBot").then((m) => ({ default: m.AIChatBot })), {
  ssr: false,
  loading: () => (
    <div className="fixed bottom-6 right-6 z-[100]">
      <div className="h-12 w-12 animate-pulse rounded-full bg-accent opacity-50" />
    </div>
  ),
});

export default function ChatBotWrapper() {
  return <AIChatBot />;
}
