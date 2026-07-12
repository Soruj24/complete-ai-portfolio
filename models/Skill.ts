import mongoose, { Schema, model, models } from "mongoose";

const SkillSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String },
  level: { type: Number, required: true, min: 0, max: 100 },
  icon: { type: String },
  color: { type: String },
  description: { type: String },
  category: { type: String, required: true },
  yearsOfExperience: { type: Number, default: 0 },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const Skill = models.Skill || model("Skill", SkillSchema);
