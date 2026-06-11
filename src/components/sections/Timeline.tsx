"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookMarked, Workflow, Megaphone, ShoppingBag, Cpu } from "lucide-react";

const items = [
  {
    number: "01",
    title: "Flare Knowledge Vault",
    description:
      "A personal and team knowledge management system built on AI — connecting notes, research, and insights into a searchable, living brain.",
    icon: BookMarked,
    progress: 65,
    color: "#818CF8",
  },
  {
    number: "02",
    title: "AI Automation Framework",
    description:
      "A modular framework for building and deploying AI-powered automations across business workflows — from data collection to decision-making.",
    icon: Workflow,
    progress: 40,
    color: "#A8FF3E",
  },
  {
    number: "03",
    title: "Marketing Agent System",
    description:
      "An agent-driven marketing engine that creates, schedules, and optimises content across platforms — autonomously.",
    icon: Megaphone,
    progress: 25,
    color: "#34D399",
  },
  {
    number: "04",
    title: "Flare Digital Designs Growth Engine",
    description:
      "Automated systems driving product research, SEO, listing optimisation, and traffic growth for Flare's Etsy store.",
    icon: ShoppingBag,
    progress: 55,
    color: "#FBBF24",
  },
  {
    number: "05",
    title: "Future SaaS Products",
    description:
      "Multiple software products in research and scoping phases — building on top of the Flare ecosystem.",
    icon: Cpu,
    progress: 10,
    color: "#F472B6",
  },
];

export function Timeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 px-4 sm:px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96"
          style={{ background: "radial-gradient(circle, rgba(255,106,0,0.05) 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#A8FF3E] mb-3 block">
            What We&apos;re Building
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            The roadmap, live.
          </h2>
          <p className="text-[var(--foreground)]/50 max-w-xl mx-auto">
            No roadmap locked away in a doc. Here&apos;s exactly what Flare is building right now.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-white/5 hidden sm:block" />

          <div className="flex flex-col gap-8">
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative sm:pl-20"
                >
                  {/* Timeline dot */}
                  <div
                    className="hidden sm:flex absolute left-4 top-6 w-8 h-8 rounded-full items-center justify-center -translate-x-1/2 border"
                    style={{
                      background: `${item.color}15`,
                      borderColor: `${item.color}30`,
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: item.color }} />
                  </div>

                  <div className="glass rounded-2xl p-6 card-hover">
                    <div className="flex items-start gap-4">
                      <div
                        className="sm:hidden w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${item.color}15` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: item.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className="text-xs font-bold font-mono"
                            style={{ color: item.color }}
                          >
                            {item.number}
                          </span>
                          <h3 className="font-bold text-base text-[var(--foreground)]">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-sm text-[var(--foreground)]/50 leading-relaxed mb-4">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={inView ? { width: `${item.progress}%` } : {}}
                              transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                              className="h-full rounded-full"
                              style={{ background: item.color }}
                            />
                          </div>
                          <span
                            className="text-xs font-semibold tabular-nums"
                            style={{ color: item.color }}
                          >
                            {item.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
