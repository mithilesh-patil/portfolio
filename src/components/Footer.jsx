import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";
import { profile } from "../data";
import { Logo, scrollTo } from "./ui";
import { linkProps, socials } from "./socials";

const quick = [
  { id: "#about", label: "About" },
  { id: "#services", label: "Services" },
  { id: "#skills", label: "Skills" },
  { id: "#projects", label: "Work" },
  { id: "#process", label: "Process" },
  { id: "#experience", label: "Experience" },
  { id: "#contact", label: "Contact" },
];

function LocalTime() {
  const fmt = () =>
    new Date().toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="flex items-center gap-2 tabular-nums">
      <FiClock /> Surat, IN · {time} IST
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 px-6 pt-16">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-3">
        <div>
          <Logo onClick={() => scrollTo("#home")} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
            Frontend Developer crafting fast, secure and beautifully animated React experiences.
          </p>
        </div>

        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/40">Navigate</p>
          <ul className="grid grid-cols-2 gap-2">
            {quick.map((q) => (
              <li key={q.id}>
                <button
                  onClick={() => scrollTo(q.id)}
                  className="group flex items-center gap-2 text-white/70 transition-colors hover:text-white"
                >
                  <span className="h-px w-0 bg-violet-400 transition-all duration-300 group-hover:w-4" />
                  {q.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/40">Connect</p>
          <div className="flex flex-wrap gap-3">
            {socials.map((s) => (
              <motion.a
                key={s.key}
                href={s.href}
                {...linkProps(s)}
                aria-label={s.label}
                title={s.label}
                whileHover={{ y: -4, rotate: -6 }}
                className="glass flex h-11 w-11 items-center justify-center rounded-xl text-white/75 transition-colors hover:bg-gradient-to-br hover:from-violet-500 hover:to-cyan-400 hover:text-snow"
              >
                <s.icon />
              </motion.a>
            ))}
          </div>
          <a
            href={`mailto:${profile.email}`}
            className="mt-5 block text-sm text-white/60 transition-colors hover:text-white"
          >
            {profile.email}
          </a>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 pb-24 pt-8 text-center text-sm sm:pb-8 sm:text-left text-white/50 sm:flex-row">
        <span>Designed &amp; developed by {profile.fullName}</span>
        <LocalTime />
      </div>
    </footer>
  );
}
