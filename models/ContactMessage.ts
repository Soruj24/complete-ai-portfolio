import mongoose, { Schema, Document } from "mongoose";

export interface IContactMessage extends Document {
  userId?: string; // Optional: if user is logged in
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'pending' | 'read' | 'replied';
  createdAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>(
  {
    userId: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['pending', 'read', 'replied'], 
      default: 'pending' 
    },
  },
  { timestamps: true }
);

export const ContactMessage = mongoose.models.ContactMessage || mongoose.model<IContactMessage>("ContactMessage", ContactMessageSchema);
