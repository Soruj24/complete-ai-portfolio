import mongoose, { Schema, model, models } from "mongoose";

const CertificateSchema = new Schema({
  name: { type: String, required: true },
  provider: { type: String, enum: ["aws", "google", "microsoft", "coursera", "udemy", "linkedin", "other"], default: "other" },
  providerLabel: { type: String },
  description: { type: String },
  issueDate: { type: String },
  expiryDate: { type: String, default: null },
  credentialId: { type: String },
  credentialUrl: { type: String },
  image: { type: String },
  skills: [{ type: String }],
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const Certificate = models.Certificate || model("Certificate", CertificateSchema);
