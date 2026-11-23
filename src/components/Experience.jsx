import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { FiBriefcase, FiMapPin, FiCalendar, FiArrowUpRight, FiCheckCircle } from "react-icons/fi";
import { experience, projects } from "../data";
import { Reveal, SectionTitle, scrollTo } from "./ui";

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });

  return (
    <section id="experience" className="relative px-6 py-16 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle index="06" kicker="Experience" title="Where I've been shipping." />

        <div ref={ref} className="relative pl-10 md:pl-16">
          <div className="absolute left-3 top-0 h-full w-px bg-white/10 md:left-6" />
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute left-3 top-0 h-full w-px origin-top bg-gradient-to-b from-violet-500 via-fuchsia-500 to-cyan-400 md:left-6"
          />

          {experience.map((e) => (
            <div key={e.company} className="relative">
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="absolute -left-[34px] top-8 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 md:-left-[50px]"
              >
                <span className="absolute h-full w-full animate-ping rounded-full bg-violet-500/50" />
              </motion.span>

              <Reveal>
                <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-panel/80">
                  {/* header */}
                  <div className="relative border-b border-white/10 p-6 md:p-10">
                    <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />
                    <div className="relative flex flex-col justify-between gap-4 md:flex-row md:items-start">
                      <div className="flex items-start gap-4">
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 font-display text-xl font-bold text-snow">
                          D
                        </span>
                        <div>
                          <h3 className="font-display text-2xl font-bold md:text-3xl">{e.role}</h3>
                          <p className="mt-1 text-lg text-white/80">{e.company}</p>
                          <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/50">
                            <span className="flex items-center gap-1.5">
                              <FiMapPin /> {e.place}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <FiBriefcase /> {e.type}
                            </span>
                          </p>
                        </div>
                      </div>
                      <span className="flex w-fit items-center gap-2 rounded-full bg-emerald-400/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
                        <FiCalendar /> {e.period}
                      </span>
                    </div>
                    <p className="relative mt-6 max-w-3xl leading-relaxed text-white/65">{e.summary}</p>
                  </div>

                  {/* body */}
                  <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-[1.4fr_1fr]">
                    <div>
                      <p className="mb-5 text-xs uppercase tracking-[0.25em] text-white/40">Key contributions</p>
                      <ul className="space-y-3.5">
                        {e.highlights.map((h, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06 }}
                            className="flex gap-3 text-[15px] leading-relaxed text-white/75"
                          >
                            <FiCheckCircle className="mt-1 shrink-0 text-violet-400" />
                            {h}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/40">Products delivered</p>
                        <div className="space-y-2.5">
                          {projects.map((p, i) => (
                            <motion.button
                              key={p.title}
                              type="button"
                              onClick={() => scrollTo("#projects")}
                              initial={{ opacity: 0, y: 12 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.2 + i * 0.08 }}
                              className="group flex w-full items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 text-left transition-colors hover:border-white/20 hover:bg-white/[0.05]"
                            >
                              <span className="h-9 w-1 rounded-full" style={{ background: p.accent }} />
                              <span className="flex-1">
                                <span className="block text-sm font-medium text-white/90">{p.title}</span>
                                <span className="block text-xs text-white/45">{p.domain}</span>
                              </span>
                              <FiArrowUpRight className="text-white/30 transition-all group-hover:rotate-45 group-hover:text-white" />
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/40">Tech used daily</p>
                        <div className="flex flex-wrap gap-2">
                          {e.stack.map((t) => (
                            <span key={t} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/75">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
