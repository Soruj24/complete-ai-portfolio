import mongoose, { Schema, Document } from "mongoose";

export interface IPageView extends Document {
  path: string;
  ip?: string;
  userAgent?: string;
  timestamp: Date;
  country?: string;
  countryCode?: string;
  city?: string;
  region?: string;
  lat?: number;
  lon?: number;
  deviceType?: string;
  browser?: string;
  os?: string;
  referrer?: string;
  language?: string;
}

const PageViewSchema = new Schema<IPageView>(
  {
    path: { type: String, required: true },
    ip: String,
    userAgent: String,
    timestamp: { type: Date, default: Date.now },
    country: String,
    countryCode: String,
    city: String,
    region: String,
    lat: Number,
    lon: Number,
    deviceType: String,
    browser: String,
    os: String,
    referrer: String,
    language: String,
  },
  { timestamps: true }
);

PageViewSchema.index({ timestamp: -1 });
PageViewSchema.index({ path: 1, timestamp: -1 });
PageViewSchema.index({ country: 1, timestamp: -1 });
PageViewSchema.index({ deviceType: 1, timestamp: -1 });
PageViewSchema.index({ browser: 1, timestamp: -1 });
PageViewSchema.index({ os: 1, timestamp: -1 });
PageViewSchema.index({ referrer: 1, timestamp: -1 });

export const PageView =
  mongoose.models.PageView || mongoose.model<IPageView>("PageView", PageViewSchema);
