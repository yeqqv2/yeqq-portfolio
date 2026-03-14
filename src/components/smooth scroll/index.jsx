import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const lenisRef = useRef(null);

  useEffect(() => {
    if (isAdmin) return;

    const lenis = new Lenis({
      orientation: "vertical",
      gestureOrientation: "vertical",
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      normalizeWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.1,
      touchInertiaMultiplier: 35,
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isAdmin]);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    ScrollTrigger.refresh();
  }, [location.pathname]);

  return <>{children}</>;
}
