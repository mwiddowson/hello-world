"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShoppingBag, Globe, Workflow, Rocket, ExternalLink } from "lucide-react";

type Status = "Live" | "Beta" | "Building" | "Experiment";

interface Product {
  name: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  status: Status;
  color: string;
  link?: string;
}

const statusStyles: Record<Status, string> = {
  Live: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Beta: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  Building: "bg-[#FF6A00]/15 text-[#FF6A00] border-[#FF6A00]/20",
  Experiment: "bg-purple-500/15 text-purple-400 border-purple-500/20",
};

const statusDot: Record<Status, string> = {
  Live: "bg-emerald-400",
  Beta: "bg-blue-400",
  Building: "bg-[#FF6A00]",
  Experiment: "bg-purple-400",
};

const products: Product[] = [
  {
    name: "Flare Digital Designs",
    tagline: "Digital downloads and creative assets",
    description:
      "Premium digital products, templates, and design assets for creators and entrepreneurs. Available on Etsy.",
    icon: <ShoppingBag className="w-6 h-6" />,
    status: "Live",
    color: "#FF6A00",
  },
  {
    name: "Acronym Lens",
    tagline: "Chrome extension with AI context",
    description:
      "A Chrome extension that explains acronyms and jargon in real-time using AI, giving you instant context without leaving the page.",
    icon: <Globe className="w-6 h-6" />,
    status: "Building",
    color: "#818CF8",
  },
  {
    name: "Automation Lab",
    tagline: "Workflow templates and productivity systems",
    description:
      "A growing library of automation templates, productivity frameworks, and AI-powered workflow systems for individuals and teams.",
    icon: <Workflow className="w-6 h-6" />,
    status: "Beta",
    color: "#34D399",
  },
  {
    name: "Future Projects",
    tagline: "More coming from the Flare ecosystem",
    description:
      "SaaS tools, lifestyle brands, e-commerce ventures, and AI agents. The ecosystem keeps growing.",
    icon: <Rocket className="w-6 h-6" />,
    status: "Experiment",
    color: "#FBBF24",
  },
];

export function Products() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="products" className="py-28 px-4 sm:px-6 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#FF6A00] mb-3 block">
            Products
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Tools built for real work.
          </h2>
          <p className="text-[var(--foreground)]/50 max-w-xl mx-auto">
            From digital assets to AI-powered Chrome extensions — everything Flare ships
            solves a real problem.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 card-hover group flex flex-col"
            >
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${product.color}18` }}
                >
                  <div style={{ color: product.color }}>{product.icon}</div>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-1 rounded-full border ${statusStyles[product.status]}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${statusDot[product.status]}`} />
                  {product.status}
                </span>
              </div>

              <h3 className="font-bold text-base text-[var(--foreground)] mb-1">
                {product.name}
              </h3>
              <p className="text-xs text-[#FF6A00] font-medium mb-3">{product.tagline}</p>
              <p className="text-sm text-[var(--foreground)]/50 leading-relaxed flex-1">
                {product.description}
              </p>

              {product.link && (
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[var(--foreground)]/40 hover:text-[#FF6A00] transition-colors"
                >
                  View <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
