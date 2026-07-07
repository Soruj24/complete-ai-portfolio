import { z } from "zod";

export const sendMessageSchema = z.object({
  receiverId: z.string().min(1, "Receiver ID is required"),
  message: z.string().min(1, "Message is required").max(2000),
});

export const aiChatSchema = z.object({
  message: z.string().min(1, "Message is required").max(4000),
  history: z.array(z.object({
    id: z.string(),
    role: z.enum(["user", "assistant", "system"]),
    content: z.string(),
    timestamp: z.string(),
  })).default([]),
});

export const portfolioAiChatSchema = z.object({
  message: z.string().min(1, "Message is required").max(4000),
  history: z.array(z.object({
    id: z.string(),
    role: z.enum(["user", "assistant", "system"]),
    content: z.string(),
    timestamp: z.string(),
  })).default([]),
});
