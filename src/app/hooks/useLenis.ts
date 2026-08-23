import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";

export function useLenis(isStopped = false) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.8,
    });

    lenisRef.current = lenis;

    const onRaf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onRaf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!lenisRef.current) return;
    if (isStopped) {
      lenisRef.current.stop();
      document.documentElement.classList.add("lenis-stopped");
    } else {
      lenisRef.current.start();
      document.documentElement.classList.remove("lenis-stopped");
    }
  }, [isStopped]);

  return lenisRef;
}
