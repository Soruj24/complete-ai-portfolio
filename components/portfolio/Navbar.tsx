"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, LayoutDashboard, User } from "lucide-react";
import { motion, useScroll } from "framer-motion";
import { useSession } from "next-auth/react";
import { ModeToggle } from "@/components/mode-toggle";
import { MobileMenu } from "./navbar-mobile-menu";
import { useSiteSettings } from "@/lib/hooks";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const { settings } = useSiteSettings();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoText = (settings?.siteName as string) || "SORUJ";
  const isAdmin = session?.user?.role === "admin";

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[100]" style={{ scaleX: scrollYProgress }} />
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-3 md:py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "py-6 md:py-8 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="#home" className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tighter group">
              {logoText}<span className="text-blue-600 group-hover:animate-pulse">.</span>
            </Link>

            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}
                  className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:scale-105">
                  {link.name}
                </Link>
              ))}

              <div className="flex items-center gap-4 border-l border-gray-100 dark:border-gray-800 pl-8">
                <ModeToggle />
                {session ? (
                  <Button asChild variant="ghost" className="rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white font-black flex items-center gap-2">
                    <Link href={isAdmin ? "/admin/dashboard" : "/dashboard"}>
                      {isAdmin ? <LayoutDashboard className="h-4 w-4" /> : <User className="h-4 w-4" />}
                      {isAdmin ? "Admin" : "Dashboard"}
                    </Link>
                  </Button>
                ) : (
                  <Button asChild variant="ghost" className="rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white font-black flex items-center gap-2">
                    <Link href="/login">Login</Link>
                  </Button>
                )}

                <Button asChild className="rounded-2xl bg-gray-900 hover:bg-blue-600 text-white px-8 h-12 font-black transition-all hover:-translate-y-1 shadow-lg shadow-gray-200">
                  <Link href="#contact" className="flex items-center gap-2">
                    Let&apos;s Work <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="md:hidden flex items-center gap-4">
              <ModeToggle />
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-900 dark:text-white">
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <MobileMenu open={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} logoText={logoText} />
    </>
  );
}
