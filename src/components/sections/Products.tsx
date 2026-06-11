"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const products = [
  {
    label: "Live now",
    labelColor: "#A8FF3E",
    name: "Flare Digital Designs",
    tagline: "Digital products that sell while you sleep.",
    description:
      "Premium templates, design assets, and digital downloads built for creators. Available on Etsy.",
    bg: "rgba(168,255,62,0.04)",
    border: "rgba(168,255,62,0.1)",
    accent: "#A8FF3E",
  },
  {
    label: "In development",
    labelColor: "#00C4B3",
    name: "Acronym Lens",
    tagline: "AI context, instantly. No tab-switching.",
    description:
      "A Chrome extension that explains acronyms and jargon in real time using AI — without ever leaving the page you're on.",
    bg: "rgba(0,196,179,0.04)",
    border: "rgba(0,196,179,0.1)",
    accent: "#00C4B3",
  },
  {
    label: "Beta",
    labelColor: "#A8FF3E",
    name: "Automation Lab",
    tagline: "Your workflows, intelligently automated.",
    description:
      "Plug-and-play automation templates built for real business tasks — from content pipelines to CRM updates.",
    bg: "rgba(168,255,62,0.04)",
    border: "rgba(168,255,62,0.1)",
    accent: "#A8FF3E",
  },
];

export function Products() {
  return (
    <section id="products" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.2em] uppercase text-[var(--foreground)]/30 mb-20 text-center"
        >
          What we build
        </motion.p>
        <div className="flex flex-col gap-4">
          {products.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.3"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5], [index % 2 === 0 ? -50 : 50, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, x }}>
      <div
        className="group rounded-2xl p-8 sm:p-12 transition-all duration-500 hover:scale-[1.01]"
        style={{ background: product.bg, border: `1px solid ${product.border}` }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <span
              className="text-[11px] font-semibold tracking-widest uppercase mb-5 block"
              style={{ color: product.labelColor }}
            >
              {product.label}
            </span>
            <h3
              className="text-3xl sm:text-5xl font-bold mb-3 text-[var(--foreground)]"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {product.name}
            </h3>
            <p className="text-base sm:text-lg font-medium mb-4" style={{ color: product.accent }}>
              {product.tagline}
            </p>
            <p className="text-sm text-[var(--foreground)]/40 leading-relaxed max-w-lg">
              {product.description}
            </p>
          </div>
          <ArrowUpRight
            className="w-6 h-6 opacity-10 group-hover:opacity-50 transition-opacity mt-1 flex-shrink-0"
            style={{ color: product.accent }}
          />
        </div>
      </div>
    </motion.div>
  );
}
