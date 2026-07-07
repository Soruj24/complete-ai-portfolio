import mongoose, { Schema, Document } from "mongoose";

export interface IDownload extends Document {
  file: string;
  ip?: string;
  timestamp: Date;
}

const DownloadSchema = new Schema<IDownload>(
  {
    file: { type: String, required: true },
    ip: String,
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

DownloadSchema.index({ timestamp: -1 });

export const Download =
  mongoose.models.Download || mongoose.model<IDownload>("Download", DownloadSchema);
