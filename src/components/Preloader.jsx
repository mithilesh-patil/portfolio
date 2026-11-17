import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const words = ["Hello", "नमस्ते", "નમસ્તે", "नमस्कार", "Welcome"];

export default function Preloader({ onDone }) {
  const [i, setI] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => Math.min(v + 1, words.length - 1)), 380);
    const p = setInterval(() => setPct((v) => Math.min(v + Math.ceil(Math.random() * 9), 100)), 40);
    const t = setTimeout(onDone, 2200);
    return () => {
      clearInterval(id);
      clearInterval(p);
      clearTimeout(t);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
    >
      <motion.p
        key={i}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-5xl font-bold md:text-7xl"
      >
        <span className="mr-3 inline-block h-3 w-3 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 align-middle" />
        {words[i]}
      </motion.p>
      <div className="absolute bottom-12 left-1/2 w-64 -translate-x-1/2">
        <div className="mb-2 flex justify-between font-display text-xs tracking-widest text-white/50">
          <span>LOADING</span>
          <span>{pct}%</span>
        </div>
        <div className="h-[2px] w-full overflow-hidden rounded bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-100"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
