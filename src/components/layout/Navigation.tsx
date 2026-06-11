"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, Command } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useCommandPalette } from "@/components/ui/CommandPalette";

const navLinks = [
  { label: "What we do", href: "#what-we-do" },
  { label: "Products", href: "#products" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const { open: openCommand } = useCommandPalette();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass border-b border-white/5 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNav("#home")}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src="/logo-fd.png"
                alt="Flare Digital"
                width={32}
                height={32}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <span className="font-bold text-lg tracking-tight text-[var(--foreground)]" style={{ fontFamily: "var(--font-poppins)" }}>
              Flare Digital
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="px-3 py-1.5 text-sm text-[var(--foreground)]/60 hover:text-[var(--foreground)] hover:bg-white/5 rounded-md transition-all duration-150"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={openCommand}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-[var(--foreground)]/40 glass rounded-md hover:text-[var(--foreground)]/70 transition-colors"
            >
              <Command className="w-3 h-3" />
              <span>/</span>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-[var(--foreground)]/60 hover:text-[var(--foreground)] hover:bg-white/5 transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-md text-[var(--foreground)]/60 hover:text-[var(--foreground)] hover:bg-white/5 transition-all"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 glass border-b border-white/5 md:hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="px-3 py-2 text-sm text-left text-[var(--foreground)]/70 hover:text-[var(--foreground)] hover:bg-white/5 rounded-md transition-all"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
