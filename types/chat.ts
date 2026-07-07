export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatHistoryEntry {
  role: "user" | "assistant";
  content: string;
}
