import mongoose, { Schema, Document } from "mongoose";

export interface ISession extends Document {
  userId: string;
  sessionToken: string;
  expires: Date;
  ipAddress?: string;
  userAgent?: string;
  revoked: boolean;
}

const SessionSchema = new Schema<ISession>(
  {
    userId: {
      type: String,
      required: true,
    },
    sessionToken: {
      type: String,
      required: true,
      unique: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
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

// Create index for faster session lookups
SessionSchema.index({ sessionToken: 1, revoked: 1 });
SessionSchema.index({ userId: 1, revoked: 1 });

export default mongoose.models.Session ||
  mongoose.model<ISession>("Session", SessionSchema);
