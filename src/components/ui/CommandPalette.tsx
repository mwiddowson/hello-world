"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Package, BookOpen, Globe, Mail, Zap, FlaskConical, User
} from "lucide-react";

interface Command {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteContextValue {
  open: () => void;
  close: () => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextValue>({
  open: () => {},
  close: () => {},
});

export const useCommandPalette = () => useContext(CommandPaletteContext);

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const commands: Command[] = [
    { id: "home", label: "Go Home", description: "Back to the top", icon: <Zap className="w-4 h-4" />, action: () => scrollTo("home") },
    { id: "ecosystem", label: "Explore the Ecosystem", description: "See what Flare is building", icon: <Globe className="w-4 h-4" />, action: () => scrollTo("ecosystem") },
    { id: "products", label: "View Products", description: "Live tools and digital assets", icon: <Package className="w-4 h-4" />, action: () => scrollTo("products") },
    { id: "experiments", label: "Experiments", description: "Active projects and prototypes", icon: <FlaskConical className="w-4 h-4" />, action: () => scrollTo("experiments") },
    { id: "journal", label: "Read the Journal", description: "Automation, AI, and building in public", icon: <BookOpen className="w-4 h-4" />, action: () => scrollTo("journal") },
    { id: "about", label: "About Flare", description: "Mission and vision", icon: <User className="w-4 h-4" />, action: () => scrollTo("about") },
    { id: "contact", label: "Contact", description: "Get in touch or subscribe", icon: <Mail className="w-4 h-4" />, action: () => scrollTo("contact") },
  ];

  const filtered = query
    ? commands.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => { setIsOpen(false); setQuery(""); }, []);

  const run = (cmd: Command) => { cmd.action(); close(); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        open();
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <CommandPaletteContext.Provider value={{ open, close }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
              onClick={close}
            />
            <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="w-full max-w-lg glass rounded-xl shadow-2xl overflow-hidden pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
                  <Search className="w-4 h-4 text-[var(--foreground)]/40 flex-shrink-0" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search or jump to..."
                    className="flex-1 bg-transparent text-sm text-[var(--foreground)] placeholder-[var(--foreground)]/30 outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && filtered[0]) run(filtered[0]);
                    }}
                  />
                  <kbd className="text-xs text-[var(--foreground)]/30 bg-white/5 px-1.5 py-0.5 rounded">Esc</kbd>
                </div>
                <div className="py-2 max-h-80 overflow-y-auto">
                  {filtered.length === 0 && (
                    <p className="px-4 py-8 text-center text-sm text-[var(--foreground)]/30">
                      No results
                    </p>
                  )}
                  {filtered.map((cmd) => (
                    <button
                      key={cmd.id}
                      onClick={() => run(cmd)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors text-left group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#A8FF3E] group-hover:bg-[#A8FF3E]/10 transition-colors flex-shrink-0">
                        {cmd.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--foreground)]">{cmd.label}</p>
                        <p className="text-xs text-[var(--foreground)]/40">{cmd.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-white/5 flex items-center gap-4">
                  <span className="text-xs text-[var(--foreground)]/25">Press <kbd className="bg-white/5 px-1 rounded">/</kbd> to open</span>
                  <span className="text-xs text-[var(--foreground)]/25">↵ to select</span>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </CommandPaletteContext.Provider>
  );
}
