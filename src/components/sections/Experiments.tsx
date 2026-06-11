"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FlaskConical, Clock } from "lucide-react";

type ExpStatus = "Active" | "Paused" | "Completed" | "Scoping";

interface Experiment {
  title: string;
  description: string;
  status: ExpStatus;
  updated: string;
  tags: string[];
}

const statusStyle: Record<ExpStatus, string> = {
  Active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Paused: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Completed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Scoping: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const experiments: Experiment[] = [
  {
    title: "AI-Powered Etsy SEO Engine",
    description:
      "Automating product research, keyword analysis, and listing optimisation for Flare Digital Designs using LLM pipelines.",
    status: "Active",
    updated: "2 days ago",
    tags: ["AI", "Automation", "E-commerce"],
  },
  {
    title: "Acronym Lens v1 Prototype",
    description:
      "Testing Chrome extension architecture for real-time AI context injection — no page reload, zero friction.",
    status: "Active",
    updated: "5 days ago",
    tags: ["Chrome Extension", "AI", "Productivity"],
  },
  {
    title: "Personal Knowledge Graph",
    description:
      "Building a graph-based knowledge system that links notes, bookmarks, and ideas into a queryable AI knowledge base.",
    status: "Scoping",
    updated: "1 week ago",
    tags: ["Knowledge", "AI", "PKM"],
  },
  {
    title: "n8n Workflow Automation Templates",
    description:
      "Packaging reusable automation templates for common business workflows — email, social, CRM, and data pipelines.",
    status: "Active",
    updated: "3 days ago",
    tags: ["Automation", "n8n", "Workflows"],
  },
  {
    title: "Content Engine v0.1",
    description:
      "Agent-driven system for ideating, drafting, and scheduling content across LinkedIn, Twitter/X, and newsletters.",
    status: "Paused",
    updated: "2 weeks ago",
    tags: ["AI Agents", "Marketing", "Content"],
  },
  {
    title: "Flare Brand Identity System",
    description:
      "Defining visual language, voice, and positioning across all Flare sub-brands and products.",
    status: "Completed",
    updated: "1 month ago",
    tags: ["Design", "Brand", "Strategy"],
  },
];

export function Experiments() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experiments" className="py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#A8FF3E] mb-3 block">
                Experiments
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
                Building in public.
              </h2>
              <p className="text-[var(--foreground)]/50 max-w-xl">
                A live view of what Flare is testing, shipping, and learning from.
                Transparent by design.
              </p>
            </div>
            <div className="flex items-center gap-2 glass rounded-lg px-4 py-2">
              <FlaskConical className="w-4 h-4 text-[#A8FF3E]" />
              <span className="text-sm font-medium text-[var(--foreground)]/60">
                {experiments.filter((e) => e.status === "Active").length} Active
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {experiments.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="glass rounded-2xl p-5 card-hover flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-sm text-[var(--foreground)] leading-snug">
                  {exp.title}
                </h3>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap flex-shrink-0 ${statusStyle[exp.status]}`}
                >
                  {exp.status}
                </span>
              </div>

              <p className="text-xs text-[var(--foreground)]/50 leading-relaxed flex-1">
                {exp.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 bg-white/5 text-[var(--foreground)]/40 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-[var(--foreground)]/30 flex-shrink-0 ml-2">
                  <Clock className="w-3 h-3" />
                  <span className="text-[10px]">{exp.updated}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
