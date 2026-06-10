"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Target, Compass, Layers } from "lucide-react";

const principles = [
  {
    icon: Target,
    title: "Systems over hustle",
    desc: "We build leverage, not just output. Every tool and automation should multiply results, not just speed them up.",
  },
  {
    icon: Zap,
    title: "AI-first everything",
    desc: "Not AI for the sake of it — AI where it genuinely removes friction, surfaces insight, or replaces tedious work.",
  },
  {
    icon: Compass,
    title: "Long game thinking",
    desc: "This is a multi-year project. We build foundations that compound, not tactics that fade.",
  },
  {
    icon: Layers,
    title: "Modular by design",
    desc: "Everything we build is designed to connect and extend. One tool feeds the next. The ecosystem grows together.",
  },
];

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-28 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96"
          style={{ background: "radial-gradient(circle, rgba(255,106,0,0.04) 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-[#FF6A00] mb-3 block">
              About
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-6">
              A long-term experiment.
            </h2>

            <div className="space-y-5 text-[var(--foreground)]/60 leading-relaxed">
              <p className="text-lg">
                Flare is{" "}
                <span className="text-[var(--foreground)] font-medium">
                  a long-term experiment in building intelligent systems that help people do
                  more meaningful work with less friction.
                </span>
              </p>
              <p>
                We started with digital products and simple automations. We&apos;re building toward
                a full ecosystem of AI agents, knowledge systems, and growth tools — all
                connected under one platform.
              </p>
              <p>
                The goal isn&apos;t to build one product and stop. It&apos;s to build a compounding
                system where every tool, automation, and process makes the whole smarter.
              </p>
              <p>
                We think the future of work looks like humans setting direction and AI doing
                the heavy lifting. We&apos;re building the infrastructure for that future now.
              </p>
            </div>

            <div className="mt-8 glass rounded-xl p-5 border-l-2 border-[#FF6A00]">
              <p className="text-[var(--foreground)]/80 italic text-sm leading-relaxed">
                &ldquo;The goal is not to be busy. The goal is to build systems that work
                while you sleep, think, and create.&rdquo;
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="glass rounded-2xl p-5 card-hover"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FF6A00]/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#FF6A00]" />
                  </div>
                  <h3 className="font-bold text-sm text-[var(--foreground)] mb-2">{p.title}</h3>
                  <p className="text-xs text-[var(--foreground)]/50 leading-relaxed">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
