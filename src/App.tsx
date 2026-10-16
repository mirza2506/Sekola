import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";

import Navbaar from "./components/Navbaar";
import Hero from "./components/Hero";
import About from "./components/About";
import ClassStructure from "./components/ClassStructure";
import Footer from "./components/Footer";

export default function App() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -16 } });
    const raf = (time: number) => lenis.raf(time * 1000);

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [reduce]);

  return (
    <>
      {/* Background grid + glow */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(800px_420px_at_70%_-10%,rgba(255,255,255,0.09),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_50%_20%,#000_20%,transparent_75%)]" />
      </div>

      <Navbaar />
      <main>
        <Hero />
        <About />
        <ClassStructure />
      </main>
      <Footer />
    </>
  );
}