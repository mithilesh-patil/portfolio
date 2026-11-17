import { useEffect, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { FiArrowDownRight, FiDownload } from "react-icons/fi";
import { SiReact, SiNextdotjs, SiBootstrap, SiJavascript } from "react-icons/si";
import { profile } from "../data";
import { Magnetic, scrollTo } from "./ui";
import { linkProps, socials } from "./socials";

function Typewriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[idx];
    const t = setTimeout(
      () => {
        if (!del) {
          setText(word.slice(0, text.length + 1));
          if (text.length + 1 === word.length) setTimeout(() => setDel(true), 1400);
        } else {
          setText(word.slice(0, text.length - 1));
          if (text.length - 1 === 0) {
            setDel(false);
            setIdx((idx + 1) % words.length);
          }
        }
      },
      del ? 45 : 90
    );
    return () => clearTimeout(t);
  }, [text, del, idx, words]);

  return (
    <span>
      {text}
      <span className="blink ml-0.5 text-cyan-300">|</span>
    </span>
  );
}

const letter = {
  hidden: { y: "120%", rotate: 8 },
  show: (i) => ({ y: 0, rotate: 0, transition: { delay: 0.2 + i * 0.045, duration: 0.9, ease: [0.22, 1, 0.36, 1] } }),
};

function BigName({ text, ready, offset = 0, className = "" }) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          custom={i + offset}
          variants={letter}
          initial="hidden"
          animate={ready ? "show" : "hidden"}
          className="inline-block"
        >
          {c === " " ? " " : c}
        </motion.span>
      ))}
    </span>
  );
}

const chips = [
  { icon: SiReact, label: "React", color: "#61dafb", pos: "-left-6 top-10", delay: 0 },
  { icon: SiNextdotjs, label: "Next.js", color: "#ffffff", pos: "-right-8 top-24", delay: 0.6 },
  { icon: SiBootstrap, label: "Bootstrap", color: "#a78bfa", pos: "-left-10 bottom-20", delay: 1.2 },
  { icon: SiJavascript, label: "ES6+", color: "#f7df1e", pos: "-right-4 bottom-8", delay: 1.8 },
];

function AvatarCard({ ready, mx, my }) {
  const rotX = useTransform(my, (v) => v * -14);
  const rotY = useTransform(mx, (v) => v * 14);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
      animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 900 }}
      className="relative mx-auto h-[400px] w-[300px] sm:h-[460px] sm:w-[345px]"
    >
      {/* glow behind the photo */}
      <div className="absolute inset-6 rounded-[2.5rem] bg-gradient-to-br from-violet-600/50 to-cyan-500/40 blur-3xl" />

      {/* gradient spinning border */}
      <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] p-[3px]">
        <div className="spin-slow absolute -inset-1/2 bg-[conic-gradient(from_0deg,#8b5cf6,#22d3ee,#f0abfc,#8b5cf6)]" />
        <div className="group relative h-full w-full overflow-hidden rounded-[calc(2.5rem-3px)] bg-ink">
          <img
            src={profile.photo}
            alt={profile.fullName}
            className="h-full w-full object-cover object-[50%_25%] transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
          <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md">
            <div>
              <p className="font-display text-base font-semibold">{profile.name}</p>
              <p className="text-xs text-white/60">Frontend Developer · DCPL</p>
            </div>
          </div>
        </div>
      </div>

      {/* floating tech chips */}
      {chips.map((c) => (
        <motion.div
          key={c.label}
          className={`glass absolute ${c.pos} z-10 hidden items-center sm:flex gap-2 rounded-xl px-3 py-2 text-sm shadow-xl shadow-black/40`}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: c.delay }}
        >
          <c.icon style={{ color: c.color }} />
          {c.label}
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function Hero({ ready }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 40, damping: 20 });
  const smy = useSpring(my, { stiffness: 40, damping: 20 });
  const b1x = useTransform(smx, (v) => v * 60);
  const b1y = useTransform(smy, (v) => v * 60);
  const b2x = useTransform(smx, (v) => v * -80);
  const b2y = useTransform(smy, (v) => v * -80);

  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 600], [0, 160]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const heroSocials = socials.filter((s) => ["linkedin", "github", "whatsapp", "email"].includes(s.key));

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pb-24 pt-32"
      onMouseMove={(e) => {
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      <div className="grid-bg absolute inset-0" />
      <motion.div
        style={{ x: b1x, y: b1y }}
        className="absolute -left-32 top-10 h-[480px] w-[480px] rounded-full bg-violet-600/30 blur-[120px]"
      />
      <motion.div
        style={{ x: b2x, y: b2y }}
        className="absolute -right-20 bottom-0 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]"
      />

      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.35fr_1fr]"
      >
        <div>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={ready ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="mb-4 flex items-center gap-3 font-display text-sm uppercase tracking-[0.3em] text-violet-300"
          >
            <span className="h-px w-8 bg-gradient-to-r from-violet-400 to-transparent" />
            Frontend Developer · ReactJS
          </motion.p>

          <h1 className="font-display text-[17vw] font-bold leading-[0.9] tracking-tighter sm:text-[13vw] lg:text-[7.5rem]">
            <BigName text="Mithilesh" ready={ready} />
            <BigName text="Patil." ready={ready} offset={9} className="text-gradient" />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <p className="mt-6 font-display text-2xl leading-snug text-white/90 md:text-3xl">
              I build enterprise admin panels
              <br className="hidden sm:block" /> for{" "}
              <span className="text-gradient font-semibold">
                <Typewriter words={profile.domains} />
              </span>
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/60">
              ReactJS developer at <span className="text-white">DCPL Technology</span>, shipping RBAC-secured
              dashboards, smart data tables and instant PDF / Excel reports that real teams use every day.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <button
                  onClick={() => scrollTo("#projects")}
                  className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-4 font-semibold text-black"
                >
                  <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-transform duration-500 group-hover:translate-y-0" />
                  <span className="relative transition-colors group-hover:text-white">View my work</span>
                  <FiArrowDownRight className="relative transition-transform duration-300 group-hover:rotate-[-45deg] group-hover:text-white" />
                </button>
              </Magnetic>
              <Magnetic>
                <a
                  href={profile.resume}
                  download="Mithilesh_Patil_Resume.pdf"
                  className="group flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 font-semibold transition-colors hover:border-white/60 hover:bg-white/5"
                >
                  <FiDownload className="transition-transform group-hover:translate-y-0.5" />
                  Download CV
                </a>
              </Magnetic>
            </div>

            <div className="mt-8 flex items-center gap-3">
              {heroSocials.map((s, i) => (
                <Magnetic key={s.key}>
                  <motion.a
                    href={s.href}
                    {...linkProps(s)}
                    aria-label={s.label}
                    title={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={ready ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.3 + i * 0.1 }}
                    className="glass flex h-12 w-12 items-center justify-center rounded-full text-lg text-white/80 transition-colors hover:bg-gradient-to-br hover:from-violet-500 hover:to-cyan-400 hover:text-white"
                  >
                    <s.icon />
                  </motion.a>
                </Magnetic>
              ))}
              <span className="ml-2 hidden h-px w-16 bg-white/20 sm:block" />
              <span className="hidden text-sm text-white/40 sm:block">{profile.location}</span>
            </div>
          </motion.div>
        </div>

        <div className="pt-4 lg:pt-0">
          <AvatarCard ready={ready} mx={smx} my={smy} />
        </div>
      </motion.div>

      <motion.button
        onClick={() => scrollTo("#about")}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/40"
      >
        Scroll
        <span className="flex h-10 w-6 justify-center rounded-full border border-white/30 pt-2">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="h-2 w-1 rounded-full bg-white"
          />
        </span>
      </motion.button>
    </section>
  );
}
