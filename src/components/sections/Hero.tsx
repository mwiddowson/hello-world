"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const words = ["Do", "more", "than", "you", "think."];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const y = useTransform(smoothProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(smoothProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#121824" }}
    >
      {/* Subtle radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(168,255,62,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Grid */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-60" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center justify-center gap-2 mb-10"
        >
          <Image src="/logo-spark.png" alt="" width={14} height={14} />
          <span className="text-xs tracking-[0.2em] uppercase text-[var(--foreground)]/40 font-medium">
            Flare Digital
          </span>
        </motion.div>

        {/* Headline — word-by-word reveal */}
        <h1
          className="text-6xl sm:text-8xl lg:text-[108px] font-extrabold leading-[0.95] tracking-tight mb-10"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {words.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className={`inline-block mr-[0.2em] ${
                i === words.length - 1 ? "gradient-text" : "text-[var(--foreground)]"
              }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-base sm:text-lg text-[var(--foreground)]/40 max-w-md mx-auto mb-12 leading-relaxed"
        >
          Unlocking confidence and possibility through technology.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <button
            onClick={() => scrollTo("what-we-do")}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-[#A8FF3E] text-[#121824] rounded-full font-semibold text-sm hover:bg-[#bfff5c] transition-all duration-200"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Discover what&apos;s possible
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={() => scrollTo("products")}
            className="text-sm text-[var(--foreground)]/40 hover:text-[var(--foreground)]/70 transition-colors"
          >
            See what we&apos;re building →
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll nudge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#A8FF3E]/40" />
      </motion.div>
    </section>
  );
}
