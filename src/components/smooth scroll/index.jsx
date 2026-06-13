import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/utils/motion";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.055,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      syncTouch: true,
      touchMultiplier: 0.8,
      orientation: "vertical",
      gestureOrientation: "vertical",
      overscroll: false,
      prevent: (node) => node.closest("[data-lenis-prevent]"),
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
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();

      lenisRef.current = null;

      if (window.lenis === lenis) {
        delete window.lenis;
      }
    };
  }, []);

  useEffect(() => {
    if (typeof ResizeObserver === "undefined") return;

    /* Lazy yüklenen rotalar ve geç gelen görseller sayfa boyunu değiştirince
       ScrollTrigger pozisyonları (footer reveal dahil) bayatlıyor;
       boy değişimini izleyip debounce ile tazele. */
    let timeout;

    const observer = new ResizeObserver(() => {
      clearTimeout(timeout);
      timeout = setTimeout(() => ScrollTrigger.refresh(), 200);
    });

    observer.observe(document.body);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  /* Rota değişiminde scroll sıfırlama PageTransition'a taşındı:
     perde ekranı örtmüşken sıfırlanır, böylece eski sayfa görünürken
     yukarı zıplama olmaz. */

  return <>{children}</>;
}
