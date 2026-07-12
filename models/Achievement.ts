import mongoose, { Schema, model, models } from "mongoose";

const AchievementSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  icon: { type: String },
  date: { type: String },
  issuer: { type: String },
  url: { type: String },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

AchievementSchema.index({ category: 1 });
AchievementSchema.index({ featured: 1 });

export const Achievement = models.Achievement || model("Achievement", AchievementSchema);
