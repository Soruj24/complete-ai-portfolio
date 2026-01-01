"use client"; // Required if doLogout uses server actions (common in Next.js App Router)

import { doLogout } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react"; // Optional: nice logout icon

const Logout = () => {
  return (
    <form action={doLogout}>
      <Button
        type="submit"
        variant="outline" // or "destructive" for a red accent, "ghost" for minimal
        className="w-full my-2" // Adjust width as needed (e.g., remove w-full if inline)
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </form>
  );
};

export default Logout;