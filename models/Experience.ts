import mongoose, { Schema, model, models } from "mongoose";

const ExperienceSchema = new Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, default: "" },
  employmentType: { type: String, default: "full-time" },
  startDate: { type: String, default: "" },
  endDate: { type: String, default: null },
  current: { type: Boolean, default: false },
  description: { type: String, default: "" },
  responsibilities: [{ type: String }],
  technologies: [{ type: String }],
  achievements: [{ type: String }],
  order: { type: Number, default: 0 },
  enabled: { type: Boolean, default: true },
}, { timestamps: true });

export const Experience = models.Experience || model("Experience", ExperienceSchema);
