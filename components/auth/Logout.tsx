"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function Logout() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <Button
      type="button"
      onClick={handleLogout}
      variant="outline"
      className="w-full my-2"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  );
}
