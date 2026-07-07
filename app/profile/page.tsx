import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";

export default async function ProfilePage() {
  const session = await getSession();
  redirect(session ? "/admin/profile" : "/login");
}
