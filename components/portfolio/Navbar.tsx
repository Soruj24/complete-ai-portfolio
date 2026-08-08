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
      <motion.div className="fixed top-0 left-0 right-0 h-[1px] bg-accent origin-left z-[100]" style={{ scaleX: scrollYProgress }} />
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? "py-3 bg-background/80 backdrop-blur-xl border-b border-border-subtle"
            : "py-4 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="#home" className="text-[15px] font-semibold text-text-primary tracking-[-0.02em] group">
              {logoText}<span className="text-accent group-hover:animate-pulse">.</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}
                  className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-tertiary hover:text-accent transition-colors duration-200">
                  {link.name}
                </Link>
              ))}

              <div className="flex items-center gap-2 border-l border-border-subtle pl-6">
                <ModeToggle />
                {session ? (
                  <Button asChild variant="ghost" size="sm" className="gap-1.5 text-[13px]">
                    <Link href={isAdmin ? "/admin/dashboard" : "/dashboard"}>
                      {isAdmin ? <LayoutDashboard className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                      {isAdmin ? "Admin" : "Dashboard"}
                    </Link>
                  </Button>
                ) : (
                  <Button asChild variant="ghost" size="sm" className="text-[13px]">
                    <Link href="/login">Login</Link>
                  </Button>
                )}

                <Button asChild className="gap-2">
                  <Link href="#contact">
                    Let&apos;s Work <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <ModeToggle />
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-text-primary hover:bg-surface rounded-lg transition-colors duration-200">
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <MobileMenu open={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} logoText={logoText} />
    </>
  );
}
