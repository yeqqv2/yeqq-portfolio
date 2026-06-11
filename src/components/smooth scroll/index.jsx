import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/utils/motion";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const location = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.055,
      smoothWheel: true,
      wheelMultiplier: 0.75,
      syncTouch: true,
      touchMultiplier: 1,
      orientation: "vertical",
      gestureOrientation: "vertical",
      overscroll: false,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();

      lenisRef.current = null;

      if (window.lenis === lenis) {
        delete window.lenis;
      }
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;

    if (lenis) {
      lenis.scrollTo(0, {
        immediate: true,
        force: true,
      });
    } else {
      window.scrollTo(0, 0);
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });
  }, [location.pathname]);

  return <>{children}</>;
}
