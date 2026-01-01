"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, LayoutDashboard, User, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useSession } from "next-auth/react";
import { ModeToggle } from "@/components/mode-toggle";

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
  const [settings, setSettings] = useState<Record<string, unknown> | null>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings/public");
        
        // Check if response is JSON
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          return;
        }

        const data = await res.json();
        if (data.success) {
          setSettings(data.settings);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoText = settings?.siteName || "SORUJ";
  const isAdmin = session?.user?.role === "admin";

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "py-3 md:py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]" 
            : "py-6 md:py-8 bg-transparent"
        }`}
      >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="#home" className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tighter group">
            <>{logoText}<span className="text-blue-600 group-hover:animate-pulse">.</span></>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:scale-105"
              >
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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ModeToggle />
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-900 dark:text-white"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <Link href="#home" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">
                <>{logoText}<span className="text-blue-600">.</span></>
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 rounded-xl"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-10">
              <div className="flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link 
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-4xl font-black uppercase tracking-tight text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
              {session ? (
                <Button asChild className="w-full rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black h-16 text-lg">
                  <Link href={isAdmin ? "/admin/dashboard" : "/dashboard"} onClick={() => setIsMobileMenuOpen(false)}>
                    {isAdmin ? "Admin Dashboard" : "User Dashboard"}
                  </Link>
                </Button>
              ) : (
                <Button asChild className="w-full rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black h-16 text-lg shadow-xl shadow-blue-200 dark:shadow-none">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                </Button>
              )}
              <div className="flex justify-center pt-4">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
                  © {mounted ? new Date().getFullYear() : ""} {String(logoText)}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.nav>
    </>
  );
}
