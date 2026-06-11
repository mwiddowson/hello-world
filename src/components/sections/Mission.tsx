"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const sentence = "Technology should feel like an unlock.";

export function Mission() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.4"],
  });

  const words = sentence.split(" ");

  return (
    <section ref={ref} className="relative min-h-[60vh] flex items-center justify-center px-6 py-32">
      <div className="max-w-5xl mx-auto text-center">
        <h2
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {words.map((word, i) => (
            <WordReveal
              key={i}
              word={word}
              index={i}
              total={words.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 text-base text-[var(--foreground)]/35 max-w-xs mx-auto leading-relaxed"
        >
          That&apos;s why everything Flare Digital builds starts with the human, not the technology.
        </motion.p>
      </div>
    </section>
  );
}

function WordReveal({
  word,
  index,
  total,
  scrollYProgress,
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = start + 1 / total + 0.15;
  const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
  const color = useTransform(
    scrollYProgress,
    [start, end],
    ["rgba(249,249,249,0.12)", "rgba(249,249,249,1)"]
  );

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mr-[0.25em]"
    >
      {word}
    </motion.span>
  );
}
