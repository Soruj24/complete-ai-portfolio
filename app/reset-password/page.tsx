import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { Suspense } from "react";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm token={token} />
      </Suspense>
    </div>
  );
}
