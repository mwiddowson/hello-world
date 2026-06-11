"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Workflow, TrendingUp, Package, FlaskConical } from "lucide-react";

const nodes = [
  {
    id: "knowledge",
    label: "Knowledge",
    desc: "Personal knowledge systems and vaults",
    icon: Brain,
    color: "#818CF8",
    x: 50,
    y: 15,
  },
  {
    id: "automations",
    label: "Automations",
    desc: "Workflows and intelligent agents",
    icon: Workflow,
    color: "#A8FF3E",
    x: 82,
    y: 50,
  },
  {
    id: "growth",
    label: "Growth",
    desc: "Marketing systems and content engines",
    icon: TrendingUp,
    color: "#34D399",
    x: 65,
    y: 82,
  },
  {
    id: "products",
    label: "Products",
    desc: "Digital tools and software",
    icon: Package,
    color: "#FBBF24",
    x: 35,
    y: 82,
  },
  {
    id: "experiments",
    label: "Experiments",
    desc: "Rapid testing and innovation",
    icon: FlaskConical,
    color: "#F472B6",
    x: 18,
    y: 50,
  },
];

const connections = [
  [0, 1], [0, 4], [1, 2], [2, 3], [3, 4], [0, 2], [1, 3],
];

export function Ecosystem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="ecosystem" className="py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#A8FF3E] mb-3 block">
            The Ecosystem
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Everything is connected.
          </h2>
          <p className="text-[var(--foreground)]/50 max-w-xl mx-auto">
            Flare is not a single product — it&apos;s an interconnected system of tools,
            knowledge, automations, and growth engines.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Node diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative aspect-square max-w-md mx-auto w-full"
          >
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              {connections.map(([a, b], i) => {
                const na = nodes[a];
                const nb = nodes[b];
                const isActive = active === na.id || active === nb.id;
                return (
                  <motion.line
                    key={i}
                    x1={na.x} y1={na.y}
                    x2={nb.x} y2={nb.y}
                    stroke={isActive ? "rgba(255,106,0,0.5)" : "rgba(255,255,255,0.06)"}
                    strokeWidth={isActive ? "0.5" : "0.3"}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  />
                );
              })}
            </svg>

            {/* Central Flare node */}
            <div
              className="absolute node-pulse"
              style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
            >
              <div className="w-12 h-12 rounded-full bg-[#A8FF3E] flex items-center justify-center shadow-lg shadow-orange-500/30">
                <span className="text-white font-bold text-sm">F</span>
              </div>
            </div>

            {nodes.map((node, i) => {
              const Icon = node.icon;
              return (
                <motion.button
                  key={node.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                  style={{
                    position: "absolute",
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseEnter={() => setActive(node.id)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() => setActive(active === node.id ? null : node.id)}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl glass flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                    style={{
                      border: `1px solid ${active === node.id ? node.color : "rgba(255,255,255,0.08)"}`,
                      boxShadow: active === node.id ? `0 0 20px ${node.color}40` : "none",
                    }}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: node.color }} />
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-medium text-[var(--foreground)]/60 whitespace-nowrap">
                    {node.label}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Node details */}
          <div className="grid grid-cols-1 gap-3">
            {nodes.map((node, i) => {
              const Icon = node.icon;
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  onMouseEnter={() => setActive(node.id)}
                  onMouseLeave={() => setActive(null)}
                  className={`flex items-center gap-4 p-4 glass rounded-xl card-hover cursor-default transition-all duration-200 ${
                    active === node.id ? "border-opacity-50" : ""
                  }`}
                  style={{
                    borderColor: active === node.id ? `${node.color}40` : undefined,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${node.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: node.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-[var(--foreground)]">
                      {node.label}
                    </h3>
                    <p className="text-xs text-[var(--foreground)]/50 mt-0.5">{node.desc}</p>
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
