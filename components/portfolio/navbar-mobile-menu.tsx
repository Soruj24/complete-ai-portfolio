"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function MobileMenu({ open, onClose, logoText }: { open: boolean; onClose: () => void; logoText: string }) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[60] md:hidden bg-background flex flex-col"
        >
          <div className="flex items-center justify-between p-5 border-b border-border-subtle">
            <Link href="#home" onClick={onClose}
              className="text-[15px] font-semibold text-text-primary tracking-[-0.02em]">
              {logoText}<span className="text-accent">.</span>
            </Link>
            <button onClick={onClose} className="p-2 text-text-primary bg-surface rounded-lg">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-8">
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div key={link.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                  <Link href={link.href} onClick={onClose}
                    className="text-[28px] font-semibold uppercase tracking-[-0.02em] text-text-primary hover:text-accent transition-colors duration-200">
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="p-5 border-t border-border-subtle space-y-3">
            {session ? (
              <Button asChild className="w-full">
                <Link href={isAdmin ? "/admin/dashboard" : "/dashboard"} onClick={onClose}>
                  {isAdmin ? "Admin Dashboard" : "User Dashboard"}
                </Link>
              </Button>
            ) : (
              <Button asChild className="w-full">
                <Link href="/login" onClick={onClose}>Sign In</Link>
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
