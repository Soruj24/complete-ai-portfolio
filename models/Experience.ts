import mongoose, { Schema, model, models } from "mongoose";

const ExperienceSchema = new Schema({
  year: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String },
  technologies: [{ type: String }],
  icon: { type: String },
  color: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  current: { type: Boolean, default: false },
  location: { type: String },
  companyUrl: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const Experience = models.Experience || model("Experience", ExperienceSchema);
