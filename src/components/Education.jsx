import { motion } from "framer-motion";
import { FiBookOpen, FiGlobe, FiMapPin } from "react-icons/fi";
import { education, languages } from "../data";
import { Reveal, SectionTitle } from "./ui";

export default function Education() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle index="07" kicker="Education & languages" title="The foundation." />

        <div className="grid gap-6 md:grid-cols-[1.5fr_1fr]">
          <Reveal className="h-full">
            <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-panel/80 p-8 transition-colors hover:border-violet-400/30 md:p-10">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet-600/15 blur-3xl" />
              <div className="relative flex items-start gap-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/25 to-cyan-400/20 text-2xl text-violet-200 ring-1 ring-white/10">
                  <FiBookOpen />
                </span>
                <div>
                  <span className="inline-block rounded-full bg-violet-400/10 px-3 py-1 text-xs font-medium text-violet-300">
                    {education.year}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-bold md:text-3xl">{education.degree}</h3>
                  <p className="text-gradient mt-1 text-lg font-medium">{education.field}</p>
                  <p className="mt-4 text-white/70">{education.school}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-white/45">
                    <FiMapPin /> {education.city}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="h-full">
            <div className="h-full rounded-3xl border border-white/10 bg-panel/80 p-8 md:p-10">
              <div className="mb-6 flex items-center gap-2 text-white/70">
                <FiGlobe /> Languages I speak
              </div>
              <div className="grid grid-cols-2 gap-3">
                {languages.map((l, i) => (
                  <motion.span
                    key={l}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4 }}
                    data-hover
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center font-display text-base"
                  >
                    {l}
                  </motion.span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
