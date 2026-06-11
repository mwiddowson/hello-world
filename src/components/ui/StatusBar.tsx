"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  "Flare Knowledge Vault",
  "AI Automation Framework",
  "Marketing Agent System",
  "Flare Digital Designs Growth Engine",
];

export function StatusBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.4 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 glass rounded-full px-4 py-2 flex items-center gap-3 shadow-lg shadow-black/30"
    >
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#A8FF3E] node-pulse" />
        <span className="text-xs text-[var(--foreground)]/50 font-medium uppercase tracking-widest">
          Currently Building
        </span>
      </div>
      <div className="w-px h-4 bg-white/10" />
      <div className="overflow-hidden max-w-[200px] sm:max-w-xs">
        <motion.div
          animate={{ x: ["0%", "-100%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 whitespace-nowrap"
        >
          {[...projects, ...projects].map((p, i) => (
            <span key={i} className="text-xs text-[var(--foreground)]/60 flex items-center gap-1.5">
              <Image src="/logo-spark.png" alt="" width={12} height={12} className="opacity-80" />
              {p}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
