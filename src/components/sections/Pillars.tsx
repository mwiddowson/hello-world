"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const pillars = [
  {
    word: "Automate.",
    body: "Repetitive work, gone. AI workflows handle the tedious so you can focus on the work that actually matters.",
    color: "#A8FF3E",
  },
  {
    word: "Create.",
    body: "Digital products, tools, and systems built from scratch — each one designed to give you an edge.",
    color: "#00C4B3",
  },
  {
    word: "Grow.",
    body: "From Etsy storefronts to full SaaS platforms — intelligent systems that scale alongside your ambition.",
    color: "#A8FF3E",
  },
];

export function Pillars() {
  return (
    <section id="what-we-do" className="relative py-8">
      {pillars.map((p, i) => (
        <PillarRow key={p.word} pillar={p} index={i} />
      ))}
    </section>
  );
}

function PillarRow({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.2"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.94, 1]);

  const isRight = index % 2 !== 0;

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      className={`min-h-[70vh] flex flex-col justify-center px-6 sm:px-16 max-w-6xl mx-auto ${
        isRight ? "items-end text-right" : "items-start text-left"
      }`}
    >
      <motion.h2
        className="text-6xl sm:text-8xl lg:text-[120px] font-extrabold leading-none mb-6"
        style={{ fontFamily: "var(--font-poppins)", color: pillar.color }}
      >
        {pillar.word}
      </motion.h2>
      <p className="text-base sm:text-lg text-[var(--foreground)]/45 max-w-sm leading-relaxed">
        {pillar.body}
      </p>
    </motion.div>
  );
}
