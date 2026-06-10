import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/utils/motion";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const location = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    // Hareketi azalt tercihinde Lenis'i hiç başlatma; tarayıcının yerel kaydırması kalsın.
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(1.5, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1.4,
      smoothTouch: true,
      touchMultiplier: 1.4,
      autoResize: true,
    });

    lenisRef.current = lenis;
    // Sayfa içi yumuşak gezinme için (ör. manifesto bölüm göstergesi) global erişim.
    window.lenis = lenis;

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
      if (window.lenis === lenis) delete window.lenis;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return <>{children}</>;
}
