import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { profile } from "../data";
import { Logo, scrollTo } from "./ui";
import { linkProps, socials } from "./socials";

const links = [
  { id: "#about", label: "About" },
  { id: "#services", label: "Services" },
  { id: "#skills", label: "Skills" },
  { id: "#projects", label: "Work" },
  { id: "#experience", label: "Experience" },
  { id: "#contact", label: "Contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 200 && !open);
    setScrolled(v > 40);
  });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive("#" + e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const el = document.querySelector(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-120%" : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
            scrolled ? "glass shadow-2xl shadow-black/40" : ""
          }`}
        >
          <Logo onClick={() => go("#home")} />

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                    active === l.id ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={profile.resume}
              download="Mithilesh_Patil_Resume.pdf"
              className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm transition-colors hover:bg-white/10"
            >
              <FiDownload /> Resume
            </a>
            <button
              onClick={() => go("#contact")}
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-transform hover:scale-105"
            >
              Hire Me
            </button>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label="Menu"
          >
            <motion.span animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} className="h-0.5 w-6 bg-white" />
            <motion.span animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} className="h-0.5 w-6 bg-white" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-gradient-to-br from-violet-950 via-ink to-cyan-950 px-8"
          >
            {links.map((l, i) => (
              <motion.button
                key={l.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.07 }}
                onClick={() => go(l.id)}
                className="py-3 text-left font-display text-5xl font-bold"
              >
                <span className="mr-4 text-base text-white/40">0{i + 1}</span>
                {l.label}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              {socials.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  {...linkProps(s)}
                  aria-label={s.label}
                  className="glass flex h-12 w-12 items-center justify-center rounded-full text-lg"
                >
                  <s.icon />
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
