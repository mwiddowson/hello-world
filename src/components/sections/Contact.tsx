"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, ArrowRight, Check, ExternalLink } from "lucide-react";

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section id="contact" className="py-28 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#A8FF3E] mb-3 block">
            Contact
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Let&apos;s connect.
          </h2>
          <p className="text-[var(--foreground)]/50 max-w-lg mx-auto">
            Have an idea, a question, or want to collaborate? Reach out — or subscribe
            to follow the build.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {/* Email */}
          <motion.a
            href="mailto:hello@flare.build"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass rounded-2xl p-6 card-hover group text-center block"
          >
            <div className="w-12 h-12 rounded-xl bg-[#A8FF3E]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#A8FF3E]/20 transition-colors">
              <Mail className="w-5 h-5 text-[#A8FF3E]" />
            </div>
            <h3 className="font-semibold text-sm text-[var(--foreground)] mb-1">Email</h3>
            <p className="text-xs text-[var(--foreground)]/40">hello@flare.build</p>
          </motion.a>

          {/* Twitter */}
          <motion.a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass rounded-2xl p-6 card-hover group text-center block"
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/10 transition-colors">
              <ExternalLink className="w-5 h-5 text-[var(--foreground)]/60" />
            </div>
            <h3 className="font-semibold text-sm text-[var(--foreground)] mb-1">Twitter / X</h3>
            <p className="text-xs text-[var(--foreground)]/40">@flare_build</p>
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass rounded-2xl p-6 card-hover group text-center block"
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/10 transition-colors">
              <ExternalLink className="w-5 h-5 text-[var(--foreground)]/60" />
            </div>
            <h3 className="font-semibold text-sm text-[var(--foreground)] mb-1">LinkedIn</h3>
            <p className="text-xs text-[var(--foreground)]/40">Flare</p>
          </motion.a>
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-2xl p-8 text-center"
        >
          <h3 className="font-bold text-xl text-[var(--foreground)] mb-2">
            Stay in the spark.
          </h3>
          <p className="text-[var(--foreground)]/50 text-sm mb-6">
            New tools, experiments, and ideas — straight to you. Short, useful, always on point.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 text-emerald-400"
            >
              <Check className="w-5 h-5" />
              <span className="font-medium">You&apos;re in. Welcome to Flare Digital.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 bg-white/5 border border-white/10 text-[var(--foreground)] text-sm rounded-lg px-4 py-2.5 outline-none focus:border-[#A8FF3E]/50 placeholder-[var(--foreground)]/25 transition-colors"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#A8FF3E] text-[#121824] text-sm font-semibold rounded-lg hover:bg-[#bfff5c] transition-colors whitespace-nowrap"
              >
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
