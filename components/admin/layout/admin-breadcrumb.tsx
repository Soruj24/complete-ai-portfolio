"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { allNavItems } from "@/lib/admin/nav-data";

function formatLabel(segment: string): string {
  const item = allNavItems.find((i) => {
    const parts = i.href.split("/").filter(Boolean);
    return parts[parts.length - 1] === segment;
  });
  if (item) return item.label;
  return segment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function AdminBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length <= 1) return null;

  const items = segments.map((seg, i) => ({
    label: formatLabel(seg),
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/admin/dashboard" className="text-[12px]">
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {items.map((item) => (
          <BreadcrumbItem key={item.href}>
            <BreadcrumbSeparator />
            {item.isLast ? (
              <BreadcrumbPage className="text-[12px]">{item.label}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link href={item.href} className="text-[12px]">
                  {item.label}
                </Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
