import mongoose, { Schema, Document } from "mongoose";

export interface IAdminResource extends Document {
  resource: string;
  data: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const AdminResourceSchema = new Schema<IAdminResource>(
  {
    resource: { type: String, required: true, index: true },
    data: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

AdminResourceSchema.index({ resource: 1, createdAt: -1 });

export const AdminResource =
  mongoose.models.AdminResource ||
  mongoose.model<IAdminResource>("AdminResource", AdminResourceSchema);
