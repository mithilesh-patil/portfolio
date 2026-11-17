import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 500, damping: 35, mass: 0.3 });
  const ry = useSpring(y, { stiffness: 500, damping: 35, mass: 0.3 });
  const gx = useSpring(x, { stiffness: 60, damping: 20 });
  const gy = useSpring(y, { stiffness: 60, damping: 20 });
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setHover(!!e.target.closest("a, button, input, textarea, [data-hover]"));
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* soft background glow */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-0 h-[500px] w-[500px] rounded-full"
        style={{
          x: gx,
          y: gy,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.09), transparent 60%)",
        }}
      />
      {/* ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full border"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hover ? 48 : 30,
          height: hover ? 48 : 30,
          opacity: visible ? 1 : 0,
          borderColor: hover ? "rgba(167,139,250,0.9)" : "rgba(255,255,255,0.35)",
          backgroundColor: hover ? "rgba(139,92,246,0.12)" : "rgba(139,92,246,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
      {/* dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[91] h-1.5 w-1.5 rounded-full bg-violet-300"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: hover ? 0 : 1, opacity: visible ? 1 : 0 }}
      />
    </>
  );
}
