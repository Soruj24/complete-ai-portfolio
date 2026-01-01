import mongoose, { Schema, Document } from "mongoose";

export interface IAuditLog extends Document {
  action: string;
  userId: string;
  userEmail: string;
  entityType: string;
  entityId: mongoose.Types.ObjectId | string;
  changes: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    action: {
      type: String,
      required: true,
      enum: [
        "CREATE",
        "UPDATE",
        "DELETE",
        "LOGIN",
        "LOGOUT",
        "PASSWORD_CHANGE",
        "ROLE_CHANGE",
        "STATUS_CHANGE",
        "2FA_ENABLED",
        "2FA_DISABLED",
        "LOGIN_FAILED",          // Ensure this is here
        "SIGNUP_SUCCESS",
        "SIGNUP_FAILED",
        "2FA_SUCCESS",
        "2FA_FAILED",
        "PASSWORD_RESET",
        "PASSWORD_RESET_SUCCESS",
        "PASSWORD_RESET_FAILED",
      ],
    },
    userId: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    entityType: {
      type: String,
      required: true,
      enum: ["USER", "SESSION", "TOKEN", "AUDIT_LOG"],
    },
    entityId: {
      type: mongoose.Schema.Types.Mixed, // Allows ObjectId or string
      required: true,
    },
    changes: {
      type: Schema.Types.Mixed,
      default: {},
    },
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

AuditLogSchema.index({ userId: 1, createdAt: -1 });
AuditLogSchema.index({ entityType: 1, entityId: 1 });
AuditLogSchema.index({ action: 1, createdAt: -1 });

// Force overwrite if model already exists (critical for dev/hot reload)
export default mongoose.models.AuditLog || mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);