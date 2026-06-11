"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export function Contact() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(""); }
  };

  return (
    <section id="contact" className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-32 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="max-w-lg mx-auto w-full"
      >
        <p className="text-xs tracking-[0.2em] uppercase text-[var(--foreground)]/30 mb-8">
          Stay in the spark
        </p>
        <h2
          className="text-4xl sm:text-6xl font-extrabold text-[var(--foreground)] mb-4 leading-tight"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          You&apos;ve got this.
        </h2>
        <p className="text-[var(--foreground)]/40 text-sm mb-10 leading-relaxed">
          New tools, experiments, and ideas — straight to you.
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-2 text-[#A8FF3E] font-medium"
          >
            <Check className="w-5 h-5" />
            Welcome to Flare Digital.
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 bg-white/5 border border-white/8 text-[var(--foreground)] text-sm rounded-full px-5 py-3 outline-none focus:border-[#A8FF3E]/40 placeholder-[var(--foreground)]/20 transition-colors"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-3 bg-[#A8FF3E] text-[#121824] text-sm font-semibold rounded-full hover:bg-[#bfff5c] transition-colors"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="mt-8 text-xs text-[var(--foreground)]/20">
          hello@flare.digital · @flare_digital
        </p>
      </motion.div>
    </section>
  );
}
