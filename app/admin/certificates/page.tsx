"use client";

import "@/lib/admin/init";
import dynamic from "next/dynamic";
import { getResourceConfig } from "@/lib/admin/registry";

const ResourcePage = dynamic(
  () => import("@/components/admin/crud/resource-page").then((m) => m.ResourcePage),
  { ssr: false }
);

export default function CertificatesPage() {
  const config = getResourceConfig("/admin/certificates");
  if (!config) return null;
  return <ResourcePage config={config} />;
}
