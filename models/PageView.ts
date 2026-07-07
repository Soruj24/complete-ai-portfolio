import mongoose, { Schema, Document } from "mongoose";

export interface IPageView extends Document {
  path: string;
  ip?: string;
  userAgent?: string;
  timestamp: Date;
}

const PageViewSchema = new Schema<IPageView>(
  {
    path: { type: String, required: true },
    ip: String,
    userAgent: String,
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

PageViewSchema.index({ timestamp: -1 });
PageViewSchema.index({ path: 1, timestamp: -1 });

export const PageView =
  mongoose.models.PageView || mongoose.model<IPageView>("PageView", PageViewSchema);
