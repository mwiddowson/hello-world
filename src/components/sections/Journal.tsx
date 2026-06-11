"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";

const categories = ["All", "Automation", "AI", "Productivity", "Building in Public", "Business Systems"];

const posts = [
  {
    category: "Automation",
    title: "How I Automated My Entire Etsy Research Process with AI",
    excerpt:
      "From manual keyword hunting to a fully automated research pipeline — the tools, prompts, and lessons learned.",
    date: "June 2025",
    readTime: "8 min read",
    color: "#A8FF3E",
  },
  {
    category: "AI",
    title: "Building an AI Agent That Actually Does Work",
    excerpt:
      "Most AI workflows don't work in the real world. Here's the architecture that changed that for me.",
    date: "May 2025",
    readTime: "12 min read",
    color: "#818CF8",
  },
  {
    category: "Building in Public",
    title: "Month 1: What I've Shipped, What Failed, What's Next",
    excerpt:
      "Raw numbers, honest lessons, and the mindset shift that made everything click.",
    date: "May 2025",
    readTime: "5 min read",
    color: "#34D399",
  },
  {
    category: "Productivity",
    title: "The Knowledge Vault System That Changed How I Think",
    excerpt:
      "A second brain that's actually useful — built on Obsidian, AI tagging, and a daily capture workflow.",
    date: "April 2025",
    readTime: "10 min read",
    color: "#FBBF24",
  },
  {
    category: "Business Systems",
    title: "Systematising Creative Work Without Killing the Creativity",
    excerpt:
      "The tension between structure and spontaneity — and how the right systems set creativity free.",
    date: "April 2025",
    readTime: "7 min read",
    color: "#F472B6",
  },
  {
    category: "AI",
    title: "Prompt Engineering Patterns That Actually Scale",
    excerpt:
      "The 5 prompting patterns I use in every production AI workflow and why they outperform the basics.",
    date: "March 2025",
    readTime: "9 min read",
    color: "#818CF8",
  },
];

const catColors: Record<string, string> = {
  Automation: "#A8FF3E",
  AI: "#818CF8",
  "Building in Public": "#34D399",
  Productivity: "#FBBF24",
  "Business Systems": "#F472B6",
};

export function Journal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="journal" className="py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#A8FF3E] mb-3 block">
            Journal
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Thinking out loud.
          </h2>
          <p className="text-[var(--foreground)]/50 max-w-xl mx-auto mb-8">
            Essays, experiments, and honest reflections on building with AI.
          </p>

          {/* Category pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-3 py-1.5 text-xs font-medium glass rounded-full text-[var(--foreground)]/60 hover:text-[var(--foreground)] hover:bg-white/8 transition-all"
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="glass rounded-2xl p-6 card-hover cursor-pointer group flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-[10px] font-semibold px-2 py-1 rounded-full"
                  style={{
                    background: `${catColors[post.category] || "#A8FF3E"}15`,
                    color: catColors[post.category] || "#A8FF3E",
                  }}
                >
                  {post.category}
                </span>
                <div className="flex items-center gap-1 text-[var(--foreground)]/30">
                  <BookOpen className="w-3 h-3" />
                  <span className="text-[10px]">{post.readTime}</span>
                </div>
              </div>

              <h3 className="font-bold text-base text-[var(--foreground)] leading-snug mb-3 group-hover:text-[#A8FF3E] transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-[var(--foreground)]/50 leading-relaxed flex-1">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                <span className="text-xs text-[var(--foreground)]/30">{post.date}</span>
                <ArrowRight className="w-4 h-4 text-[var(--foreground)]/20 group-hover:text-[#A8FF3E] group-hover:translate-x-0.5 transition-all" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
