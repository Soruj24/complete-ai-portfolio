import Providers from "../providers";
import { AdminLayout } from "@/components/admin/layout/admin-layout";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <AdminLayout>{children}</AdminLayout>
    </Providers>
  );
}
