import { motion } from "framer-motion";
import { SiReact, SiNextdotjs, SiJavascript, SiHtml5, SiCss, SiTailwindcss, SiGit, SiBootstrap } from "react-icons/si";
import {
  FiShield,
  FiDatabase,
  FiLink,
  FiFileText,
  FiUsers,
  FiSmartphone,
  FiGrid,
  FiBarChart2,
} from "react-icons/fi";
import { skills } from "../data";
import { Reveal, SectionTitle } from "./ui";

const icons = {
  ReactJS: [SiReact, "#61dafb"],
  NextJS: [SiNextdotjs, "var(--color-white)"],
  JavaScript: [SiJavascript, "#f7df1e"],
  HTML5: [SiHtml5, "#e34f26"],
  CSS3: [SiCss, "#2965f1"],
  Bootstrap: [SiBootstrap, "#8b5cf6"],
  "Tailwind CSS": [SiTailwindcss, "#38bdf8"],
  "Responsive UI": [FiSmartphone, "#f472b6"],
  Git: [SiGit, "#f05032"],
  "REST APIs": [FiLink, "#22d3ee"],
  "State Mgmt": [FiDatabase, "#f472b6"],
  RBAC: [FiShield, "#34d399"],
  "PDF Reports": [FiFileText, "#f87171"],
  "Excel Export": [FiGrid, "#22c55e"],
  "Agile / Scrum": [FiUsers, "#a78bfa"],
  Dashboards: [FiBarChart2, "#fbbf24"],
};

function SkillCard({ name, i }) {
  const [Icon, color] = icons[name] || [FiLink, "var(--color-white)"];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05, duration: 0.5 }}
      whileHover={{ y: -6 }}
      data-hover
      className="group relative flex h-[118px] flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] px-2 text-center"
    >
      <span
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at 50% 0%, ${color}30, transparent 70%)` }}
      />
      <Icon className="relative text-3xl transition-transform duration-500 group-hover:scale-110" style={{ color }} />
      <span className="relative whitespace-nowrap text-sm text-white/80">{name}</span>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-16 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle index="03" kicker="Toolbox" title="Skills I bring to the table." />
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:gap-12 lg:grid-cols-2">
        {Object.entries(skills).map(([group, list], gi) => (
          <Reveal key={group} delay={gi * 0.15}>
            <h3 className="mb-5 flex items-center gap-3 font-display text-lg text-white/80">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
              {group}
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {list.map((s, i) => (
                <SkillCard key={s} name={s} i={i} />
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
