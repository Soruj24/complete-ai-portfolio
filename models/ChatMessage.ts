import mongoose, { Schema, Document } from "mongoose";

export interface IChatMessage extends Document {
  senderId: string;
  senderName: string;
  senderImage?: string;
  receiverId: string; // For admin, this could be a generic 'admin' or specific admin ID
  message: string;
  isAdmin: boolean;
  isRead: boolean;
  createdAt: Date;
}

const ChatMessageSchema = new Schema<IChatMessage>(
  {
    senderId: { type: String, required: true },
    senderName: { type: String, required: true },
    senderImage: { type: String },
    receiverId: { type: String, required: true },
    message: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Indexing for faster queries
ChatMessageSchema.index({ senderId: 1, receiverId: 1, createdAt: -1 });

export const ChatMessage = mongoose.models.ChatMessage || mongoose.model<IChatMessage>("ChatMessage", ChatMessageSchema);
