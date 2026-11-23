import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiBriefcase, FiLayers, FiGrid, FiBookOpen } from "react-icons/fi";
import { glance, profile } from "../data";
import { Reveal, SectionTitle } from "./ui";

const glanceIcons = { briefcase: FiBriefcase, layers: FiLayers, grid: FiGrid, book: FiBookOpen };

function ScrollWord({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = profile.summary.split(" ");

  return (
    <section id="about" className="relative px-6 py-16 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle index="01" kicker="About me" title="Code that feels as good as it looks." />

        <p ref={ref} className="font-display text-2xl leading-snug text-white md:text-4xl">
          {words.map((w, i) => (
            <ScrollWord
              key={i}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
            >
              {w}
            </ScrollWord>
          ))}
        </p>

        <Reveal delay={0.1}>
          <div className="mt-12 md:mt-20 grid overflow-hidden rounded-3xl border border-white/10 bg-panel/70 sm:grid-cols-2 lg:grid-cols-4">
            {glance.map((g, i) => {
              const Icon = glanceIcons[g.icon];
              return (
                <motion.div
                  key={g.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  data-hover
                  className="group relative flex items-start gap-4 border-white/10 p-6 transition-colors hover:bg-white/[0.03] max-lg:[&:nth-child(-n+2)]:border-b sm:max-lg:[&:nth-child(odd)]:border-r lg:[&:not(:last-child)]:border-r max-sm:[&:not(:last-child)]:border-b"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/25 to-cyan-400/20 text-lg text-violet-200 ring-1 ring-white/10 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-semibold text-white">
                      {g.title}
                    </span>
                    <span className="mt-1 block text-sm leading-snug text-white/50">{g.text}</span>
                  </span>
                </motion.div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
