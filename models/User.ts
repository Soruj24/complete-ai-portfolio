// models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  status: "active" | "banned";
  isVerified: boolean;
  verificationToken?: string;
  verificationTokenExpires?: Date;
  image?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  refreshToken?: string;
  twoFactorSecret?: string;
  twoFactorEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // ← This creates the unique index automatically
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "banned"],
      default: "active",
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    verificationTokenExpires: Date,
    image: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
      select: true,
    },
    resetPasswordExpires: {
      type: Date,
      select: true,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    twoFactorSecret: {
      type: String,
      select: false,
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// ONLY keep these indexes — remove the duplicate { email: 1 }
userSchema.index(
  { resetPasswordToken: 1 },
  {
    expireAfterSeconds: 3600, // Auto-expire after 1 hour
    partialFilterExpression: { resetPasswordExpires: { $exists: true } },
  }
);

export const User =
  mongoose.models.User ?? mongoose.model<IUser>("User", userSchema);
