import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { FiCheck, FiLock, FiMaximize2, FiX } from "react-icons/fi";
import { projects } from "../data";
import { SectionTitle, TiltCard } from "./ui";

function BrowserShot({ p, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group/shot relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 text-left shadow-2xl shadow-black/50"
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
        <span className="ml-3 min-w-0 flex-1 truncate rounded-md bg-white/5 px-3 py-0.5 text-[11px] text-white/40">
          {p.title.toLowerCase().replace(/\s+/g, "-")}.app/dashboard
        </span>
      </div>
      <div className="relative aspect-[16/9] overflow-hidden bg-white">
        <motion.img
          src={p.image}
          alt={`${p.title} screenshot`}
          loading="lazy"
          initial={{ scale: 1.15, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover/shot:scale-[1.06]"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover/shot:bg-black/40">
          <span className="flex translate-y-4 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black opacity-0 transition-all duration-300 group-hover/shot:translate-y-0 group-hover/shot:opacity-100">
            <FiMaximize2 /> View full screen
          </span>
        </div>
      </div>
    </button>
  );
}

function Lightbox({ p, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    window.__lenis?.stop();
    return () => {
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md md:p-10"
    >
      <motion.div
        initial={{ scale: 0.85, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl"
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="font-display text-lg font-semibold">
            {p.title} <span className="text-sm font-normal text-white/50">· {p.domain}</span>
          </p>
          <button
            onClick={onClose}
            aria-label="Close"
            className="glass flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10"
          >
            <FiX />
          </button>
        </div>
        <img src={p.image} alt={`${p.title} screenshot`} className="w-full rounded-2xl border border-white/10" />
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ p, i, total, progress, onOpen }) {
  const start = i / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - i) * 0.04]);

  return (
    <div className="flex items-center justify-center py-4 md:sticky md:top-24 md:min-h-[calc(100vh-6rem)]">
      <motion.div style={{ scale, top: i * 20 }} className="relative w-full origin-top">
        <TiltCard className="group rounded-[2rem]">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-panel p-6 shadow-2xl shadow-black/60 md:p-8">
            <div
              className="absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-30 blur-[100px]"
              style={{ background: p.accent }}
            />
            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-10">
              <div className="flex min-w-0 flex-col">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-display text-sm text-white/40">0{i + 1} / 0{total}</span>
                  <span className={`rounded-full bg-gradient-to-r ${p.color} px-3 py-1 text-xs font-semibold text-black`}>
                    {p.domain}
                  </span>
                </div>
                <h3 className="font-display text-3xl font-bold md:text-4xl">{p.title}</h3>
                <p className="mt-2 text-white/60">{p.blurb}</p>
                <ul className="mt-5 space-y-2.5">
                  {p.points.map((pt, k) => (
                    <motion.li
                      key={k}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + k * 0.08 }}
                      className="flex gap-3 text-sm leading-relaxed text-white/75"
                    >
                      <FiCheck className="mt-1 shrink-0" style={{ color: p.accent }} />
                      {pt}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="flex min-w-0 flex-col gap-5">
                <BrowserShot p={p} onOpen={onOpen} />
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center border-t border-white/10 pt-4">
                  <span className="flex items-center gap-2 text-xs text-white/45">
                    <FiLock /> Private client project · built at DCPL
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const [open, setOpen] = useState(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="projects" className="relative px-6 pt-16 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle index="04" kicker="Selected work" title="Enterprise panels, built to scale." />
        <div ref={ref} className="relative pb-12 md:pb-24">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.title}
              p={p}
              i={i}
              total={projects.length}
              progress={scrollYProgress}
              onOpen={() => setOpen(p)}
            />
          ))}
        </div>
      </div>
      <AnimatePresence>{open && <Lightbox key={open.title} p={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
