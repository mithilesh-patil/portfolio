import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { Analytics } from "@vercel/analytics/react";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Process from "./components/Process";
import Experience from "./components/Experience";
import BackToTop from "./components/BackToTop";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);
  const finishLoading = useCallback(() => setLoading(false), []);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    if (loading) window.__lenis?.stop();
    else window.__lenis?.start();
  }, [loading]);

  return (
    <div className="noise relative">
      <AnimatePresence mode="wait">
        {loading && <Preloader key="pre" onDone={finishLoading} />}
      </AnimatePresence>
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero ready={!loading} />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Process />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <Analytics />
    </div>
  );
}
