import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { FiLayout, FiShield, FiFileText, FiGrid, FiBarChart2, FiCalendar } from "react-icons/fi";
import { services } from "../data";
import { Reveal, SectionTitle } from "./ui";

const icons = {
  layout: FiLayout,
  shield: FiShield,
  file: FiFileText,
  table: FiGrid,
  chart: FiBarChart2,
  calendar: FiCalendar,
};

function SpotlightCard({ s, i }) {
  const ref = useRef(null);
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const border = useMotionTemplate`radial-gradient(240px circle at ${x}px ${y}px, rgba(167,139,250,0.7), transparent 70%)`;
  const glow = useMotionTemplate`radial-gradient(380px circle at ${x}px ${y}px, rgba(139,92,246,0.10), transparent 60%)`;
  const Icon = icons[s.icon];

  return (
    <Reveal delay={(i % 3) * 0.1} className="h-full">
      <div
        ref={ref}
        data-hover
        onMouseMove={(e) => {
          const r = ref.current.getBoundingClientRect();
          x.set(e.clientX - r.left);
          y.set(e.clientY - r.top);
        }}
        onMouseLeave={() => {
          x.set(-300);
          y.set(-300);
        }}
        className="group relative h-full rounded-3xl bg-white/[0.08] p-px transition-transform duration-500 hover:-translate-y-1.5"
      >
        <motion.span className="absolute inset-0 rounded-3xl" style={{ background: border }} />
        <div className="relative flex h-full min-h-[250px] flex-col rounded-[calc(1.5rem-1px)] bg-panel p-7">
          <motion.span className="absolute inset-0 rounded-[inherit]" style={{ background: glow }} />
          <div className="relative mb-6 flex items-center justify-between">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/25 to-cyan-400/20 text-xl text-violet-200 ring-1 ring-white/10 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
              <Icon />
            </span>
            <span className="font-display text-sm text-white/25">0{i + 1}</span>
          </div>
          <h3 className="relative font-display text-xl font-semibold">{s.title}</h3>
          <p className="relative mt-3 flex-1 text-[15px] leading-relaxed text-white/60">{s.text}</p>
          <p className="relative mt-6 border-t border-white/[0.07] pt-4 text-xs uppercase tracking-[0.15em] text-violet-300/80">
            {s.tag}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle index="02" kicker="What I do" title="What I build at work, every day." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <SpotlightCard key={s.title} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
