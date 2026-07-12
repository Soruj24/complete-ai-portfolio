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
          className="fixed inset-0 z-[60] md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl flex flex-col"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
            <Link href="#home" onClick={onClose}
              className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">
              {logoText}<span className="text-blue-600">.</span>
            </Link>
            <button onClick={onClose} className="p-2 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 rounded-xl">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-10">
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div key={link.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                  <Link href={link.href} onClick={onClose}
                    className="text-4xl font-black uppercase tracking-tight text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="p-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
            {session ? (
              <Button asChild className="w-full rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black h-16 text-lg">
                <Link href={isAdmin ? "/admin/dashboard" : "/dashboard"} onClick={onClose}>
                  {isAdmin ? "Admin Dashboard" : "User Dashboard"}
                </Link>
              </Button>
            ) : (
              <Button asChild className="w-full rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black h-16 text-lg shadow-xl shadow-blue-200 dark:shadow-none">
                <Link href="/login" onClick={onClose}>Sign In</Link>
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
