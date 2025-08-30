"use client";
import Shell from "../../components/Shell";
import { motion } from "framer-motion";

const cards = [
  { title: "Liquid Glass", desc: "Gooey buttons and fluid highlights.", cls: "demo-liquid" },
  { title: "Entropy Grid", desc: "Glitch‑free but alive — ordered chaos.", cls: "demo-entropy" },
  { title: "Aurora Flow", desc: "Conic gradients drifting like water.", cls: "demo-aurora" },
];

export default function Gallery() {
  return (
    <Shell>
      <div className="max-w-5xl">
        <h1 className="text-4xl font-semibold tracking-tight">Interface Gallery</h1>
        <p className="opacity-85 mt-3 max-w-2xl">
          A playground of motion and material — fluid backdrops, shimmering surfaces, and animated affordances.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {cards.map((c, i) => (
            <motion.div key={i} whileHover={{ y: -6 }} className={`card rounded-xl2 p-5 h-48 relative overflow-hidden ${c.cls}`}>
              <div className="relative z-10">
                <div className="text-sm opacity-70">{c.title}</div>
                <div className="opacity-90 mt-1 text-sm">{c.desc}</div>
              </div>
              <div className="demo-surface absolute inset-0" />
            </motion.div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

