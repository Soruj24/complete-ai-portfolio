import mongoose, { Schema, Document } from "mongoose";

export interface IToken extends Document {
  userId: string;
  token: string;
  type: "refresh" | "reset" | "verify";
  expiresAt: Date;
  revoked: boolean;
  createdAt: Date;
}

const TokenSchema = new Schema<IToken>(
  {
    userId: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["refresh", "reset", "verify"],
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
    revoked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create compound index for faster lookups
TokenSchema.index({ userId: 1, type: 1, revoked: 1 });

export default mongoose.models.Token ||
  mongoose.model<IToken>("Token", TokenSchema);
