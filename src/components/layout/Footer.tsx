"use client";

import { Zap } from "lucide-react";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const links = [
  { label: "Ecosystem", href: "ecosystem" },
  { label: "Products", href: "products" },
  { label: "Experiments", href: "experiments" },
  { label: "Journal", href: "journal" },
  { label: "About", href: "about" },
  { label: "Contact", href: "contact" },
];

export function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={() => scrollTo("home")}
            className="flex items-center gap-2"
          >
            <div className="w-7 h-7 rounded-md bg-[#A8FF3E] flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-[#121824]" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-[var(--foreground)]" style={{ fontFamily: "var(--font-poppins)" }}>Flare Digital</span>
          </button>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {links.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="text-xs text-[var(--foreground)]/40 hover:text-[var(--foreground)]/70 transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <p className="text-xs text-[var(--foreground)]/25">
            © {new Date().getFullYear()} Flare Digital. Do more than you think.
          </p>
        </div>
      </div>
    </footer>
  );
}
