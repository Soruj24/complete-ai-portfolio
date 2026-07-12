import mongoose, { Schema, model, models } from "mongoose";

const SocialLinkSchema = new Schema({
  platform: { type: String, required: true },
  label: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String },
  handle: { type: String },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

SocialLinkSchema.index({ platform: 1 }, { unique: true });
SocialLinkSchema.index({ order: 1 });

export const SocialLink = models.SocialLink || model("SocialLink", SocialLinkSchema);
