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
          style={{ background: "radial-gradient(circle, rgba(168,255,62,0.04) 0%, transparent 70%)" }}
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
            <span className="text-xs font-semibold uppercase tracking-widest text-[#A8FF3E] mb-3 block">
              About
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-6">
              You&apos;ve got this.
            </h2>

            <div className="space-y-5 text-[var(--foreground)]/60 leading-relaxed">
              <p className="text-lg">
                Flare Digital exists for one reason:{" "}
                <span className="text-[var(--foreground)] font-medium">
                  to give people the joy of realising they can do so much more than they
                  thought possible.
                </span>
              </p>
              <p>
                Technology should feel like a unlock, not an obstacle. We build AI-powered
                tools, automations, and systems that put capability back in your hands.
              </p>
              <p>
                We started with digital products and simple workflows. We&apos;re building toward
                a full ecosystem — knowledge systems, AI agents, growth engines — all designed
                around one idea: humans set the direction, smart systems do the heavy lifting.
              </p>
              <p>
                Inviting, not complicated. Human first. Tech second.
              </p>
            </div>

            <div className="mt-8 glass rounded-xl p-5 border-l-2 border-[#A8FF3E]">
              <p className="text-[var(--foreground)]/80 italic text-sm leading-relaxed">
                &ldquo;Discover what&apos;s possible. Then go further.&rdquo;
              </p>
              <p className="text-xs text-[#A8FF3E] mt-2 font-medium not-italic">— Flare Digital</p>
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
                  <div className="w-10 h-10 rounded-xl bg-[#A8FF3E]/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#A8FF3E]" />
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
