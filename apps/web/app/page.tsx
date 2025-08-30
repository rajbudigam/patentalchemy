"use client";
import Shell from "../components/Shell";
import DopamineButton from "../components/DopamineButton";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, QrCode, FlaskConical, BookOpenText } from "lucide-react";

export default function Page() {
  return (
    <Shell>
      <section className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl"
        >
          <h1 className="text-4xl sm:text-6xl font-semibold leading-tight tracking-tight">
            Patent → Passport, reimagined
          </h1>
          <p className="mt-4 text-lg opacity-85 max-w-2xl">
            Analyze patents, compose materials, compute climate impact, and mint living Digital Product Passports with jaw‑dropping clarity.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/workbench">
              <DopamineButton className="">
                Launch Workbench <ArrowRight size={16} />
              </DopamineButton>
            </Link>
            <Link href="/about">
              <DopamineButton className="bg-white/10 hover:bg-white/15">
                Learn the System <BookOpenText size={16} />
              </DopamineButton>
            </Link>
          </div>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {[
            {
              title: "Analyze",
              icon: <FlaskConical size={18} />,
              desc: "Extract functional blocks from public patents with crisp structure.",
              href: "/workbench",
            },
            {
              title: "Screen",
              icon: <QrCode size={18} />,
              desc: "Estimate kg CO₂e using sector factors and USEEIO mapping.",
              href: "/workbench",
            },
            {
              title: "Passport",
              icon: <QrCode size={18} />,
              desc: "Mint GS1 Digital Link + EPCIS‑flavored JSON. Scan instantly.",
              href: "/workbench",
            },
          ].map((c, i) => (
            <motion.a
              key={i}
              href={c.href}
              whileHover={{ y: -4 }}
              className="card rounded-xl2 p-5 block"
            >
              <div className="text-sm opacity-70 flex items-center gap-2">{c.icon} {c.title}</div>
              <div className="mt-2 text-base opacity-85">{c.desc}</div>
            </motion.a>
          ))}
        </div>
      </section>
    </Shell>
  );
}

