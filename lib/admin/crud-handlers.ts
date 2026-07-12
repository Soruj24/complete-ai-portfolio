import { NextResponse } from "next/server";
import { dbConnect } from "@/config/db";
import { AdminResource } from "@/models/AdminResource";
import { getModel, isDedicatedModel } from "./route-utils";

export async function handleDedicatedGET(key: string, search: string | undefined, page: number, limit: number) {
  const model = getModel(key);
  const filter: Record<string, unknown> = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { title: { $regex: search, $options: "i" } },
    ];
  }
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    model.find(filter).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit).lean(),
    model.countDocuments(filter),
  ]);

  return NextResponse.json({
    success: true,
    data: items,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit), hasNext: page * limit < total, hasPrev: page > 1 },
  });
}

export async function handleGenericGET(key: string, search: string | undefined, page: number, limit: number) {
  const filter: Record<string, unknown> = { resource: key };
  if (search) {
    filter.$text = { $search: search };
  }
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    AdminResource.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    AdminResource.countDocuments(filter),
  ]);

  return NextResponse.json({
    success: true,
    data: items.map((item) => ({ _id: item._id, ...item.data })),
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit), hasNext: page * limit < total, hasPrev: page > 1 },
  });
}

export async function handleDedicatedPOST(key: string, body: Record<string, unknown>) {
  const model = getModel(key);
  const doc = await model.create(body);
  const obj = doc.toObject ? doc.toObject() : doc;
  return NextResponse.json(
    { success: true, data: obj, message: "Created successfully" },
    { status: 201 },
  );
}

export async function handleGenericPOST(key: string, body: Record<string, unknown>) {
  const resource = await AdminResource.create({ resource: key, data: body });
  return NextResponse.json(
    { success: true, data: { _id: resource._id, ...resource.data }, message: "Created successfully" },
    { status: 201 },
  );
}

export async function handleDedicatedPUT(key: string, id: string, body: Record<string, unknown>) {
  const model = getModel(key);
  const { _id, ...updateData } = body;
  const doc = await model.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true }).lean();
  if (!doc) {
    return NextResponse.json({ success: false, error: { message: "Not found" } }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: doc, message: "Updated successfully" });
}

export async function handleGenericPUT(id: string, body: Record<string, unknown>) {
  const { _id, ...updateData } = body;
  const resource = await AdminResource.findByIdAndUpdate(
    id, { $set: { data: updateData } }, { new: true, runValidators: true },
  ).lean();
  if (!resource) {
    return NextResponse.json({ success: false, error: { message: "Not found" } }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: { _id: resource._id, ...resource.data }, message: "Updated successfully" });
}

export async function handleDedicatedDELETE(key: string, id: string) {
  const model = getModel(key);
  const doc = await model.findByIdAndDelete(id).lean();
  if (!doc) {
    return NextResponse.json({ success: false, error: { message: "Not found" } }, { status: 404 });
  }
  return NextResponse.json({ success: true, message: "Deleted successfully" });
}

export async function handleGenericDELETE(id: string) {
  const resource = await AdminResource.findByIdAndDelete(id).lean();
  if (!resource) {
    return NextResponse.json({ success: false, error: { message: "Not found" } }, { status: 404 });
  }
  return NextResponse.json({ success: true, message: "Deleted successfully" });
}

export async function handleBulkDELETE(key: string, ids: string[]) {
  if (ids.length === 0) return NextResponse.json({ success: true, message: "Bulk delete completed" });
  if (isDedicatedModel(key)) {
    const model = getModel(key);
    await model.deleteMany({ _id: { $in: ids } });
  } else {
    await AdminResource.deleteMany({ _id: { $in: ids } });
  }
  return NextResponse.json({ success: true, message: "Bulk delete completed" });
}
