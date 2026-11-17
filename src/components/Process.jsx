import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiSearch, FiPenTool, FiCode, FiZap } from "react-icons/fi";
import { Reveal, SectionTitle } from "./ui";

const steps = [
  {
    icon: FiSearch,
    title: "Understand",
    text: "Break down the business flow — users, roles, data and edge cases — before writing a single line.",
  },
  {
    icon: FiPenTool,
    title: "Structure",
    text: "Plan reusable components, state shape, API contracts and RBAC rules so the app scales cleanly.",
  },
  {
    icon: FiCode,
    title: "Build",
    text: "Ship pixel-perfect, responsive React + Bootstrap UI with tables, forms, reports and real-time updates.",
  },
  {
    icon: FiZap,
    title: "Polish & Ship",
    text: "Optimise performance, test every role and flow, then iterate fast with feedback in Agile sprints.",
  },
];

export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.5"] });
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle index="05" kicker="How I work" title="From idea to production." />

        <div ref={ref} className="relative">
          {/* connecting line (desktop) */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-white/10 lg:block" />
          <motion.div
            style={{ width }}
            className="absolute left-0 top-8 hidden h-px bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 lg:block"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.12}>
                <div className="group relative">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -6 }}
                    className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-panel text-2xl text-violet-300 shadow-lg shadow-black/40 transition-colors group-hover:border-violet-400/50 group-hover:text-white"
                  >
                    <s.icon />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 font-display text-[11px] font-bold text-snow">
                      {i + 1}
                    </span>
                  </motion.div>
                  <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
