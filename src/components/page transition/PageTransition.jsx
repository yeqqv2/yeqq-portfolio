import { startTransition, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/utils/motion";
import styles from "./style.module.css";

gsap.registerPlugin(CustomEase, ScrollTrigger);

if (!gsap.parseEase("hop")) {
  CustomEase.create("hop", "0.9, 0, 0.1, 1");
}

/* her geçişte kavis çizgisi + köşeli parantezler paletten
   rastgele bir accent alır */
const ACCENT_COLORS = [
  "var(--red500)",
  "var(--pink400)",
  "var(--purple500)",
  "var(--orange600)",
  "var(--main-color500)",
  "var(--blue400)",
  "var(--green400)",
  "var(--darkblue500)",
];

/* gidilen rotanın adı perdede gösterilir (nav ile aynı sözlük) */
const routeLabelKey = (pathname) => {
  if (pathname === "/") return "nav.home";
  if (pathname.startsWith("/about-me")) return "nav.about";
  if (pathname.startsWith("/manifest")) return "nav.manifest";
  if (pathname.startsWith("/projects")) return "nav.projects";
  if (pathname.startsWith("/contact-me")) return "nav.contact";
  return null;
};

/* hedef rotanın lazy chunk'ı perde kapanırken indirilir; perde, kod
   gelmeden soyulmaz. vite aynı modül URL'sini tek chunk'a bağladığı için
   App.jsx'teki lazy() ile aynı dosya paylaşılır. */
const ROUTE_LOADERS = [
  [(p) => /^\/manifest\/./.test(p), () => import("@/pages/manifest/article/ManifestArticle")],
  [(p) => p.startsWith("/manifest"), () => import("@/pages/manifest/ManifestPage")],
  [(p) => /^\/projects\/./.test(p), () => import("@/pages/project/WorkPage")],
  [(p) => p.startsWith("/projects"), () => import("@/pages/projects/ProjectsPage")],
  [(p) => p.startsWith("/about-me"), () => import("@/pages/about/AboutPage")],
  [(p) => p.startsWith("/contact-me"), () => import("@/pages/contact/ContactPage")],
  [(p) => p === "/", () => Promise.resolve()],
  [() => true, () => import("@/pages/not-found/NotFoundPage")],
];

const preloadRoute = (pathname) => {
  const entry = ROUTE_LOADERS.find(([match]) => match(pathname));
  return entry ? entry[1]() : Promise.resolve();
};

/* perde geometrisi: viewBox 0..100, preserveAspectRatio="none".
   kavis sin(p·π) ile yolculuğun ortasında büyür, varışta sıfırlanır —
   merkez kenarlardan önde gider (sıvı hissi). */
const BULGE = 12;

const coverShape = (p) => {
  const top = 100 - p * 100; // öncü kenar
  const c = Math.sin(p * Math.PI) * BULGE;
  return {
    fill: `M 0 ${top} Q 50 ${top - c} 100 ${top} L 100 100 L 0 100 Z`,
    edge: `M 0 ${top} Q 50 ${top - c} 100 ${top}`,
  };
};

const exitShape = (p) => {
  const bottom = 100 - p * 100; // artçı kenar yukarı toplanır
  const c = Math.sin(p * Math.PI) * BULGE;
  return {
    fill: `M 0 0 L 100 0 L 100 ${bottom} Q 50 ${bottom + c} 0 ${bottom} Z`,
    edge: `M 0 ${bottom} Q 50 ${bottom + c} 100 ${bottom}`,
  };
};

/* Rota geçişi: siyah perde alttan kavisli kenarla yükselir, üzerinde
   hedef sayfanın adı maske içinden açılır. Perde kapalıyken (1) hedef
   chunk indirilmiş olur, (2) sayfa startTransition ile değişir — loading
   ekranı hiç görünmez — (3) scroll sıfırlanır. Sonra perde artçı kenarı
   sarkarak yukarı soyulur ve yeni sayfayı açar.

   Adres çubuğundaki rota ile ekranda render edilen rota ayrıştırılır:
   children bir fonksiyondur ve "görünen" location'ı alır
   (<Routes location={displayed}>). Eski sayfa, perde onu örtene kadar
   ekranda kalır. */
export default function PageTransition({ children }) {
  const location = useLocation();
  const { t } = useTranslation();
  const [displayed, setDisplayed] = useState(location);

  const overlayRef = useRef(null);
  const fillRef = useRef(null);
  const edgeRef = useRef(null);
  const labelRef = useRef(null);
  const labelTextRef = useRef(null);
  const bracketLeftRef = useRef(null);
  const bracketRightRef = useRef(null);
  const tlRef = useRef(null);
  const animatingRef = useRef(false);
  const pendingRef = useRef(location);
  const displayedRef = useRef(location);

  useLayoutEffect(() => {
    if (location.key === displayedRef.current.key) return;
    pendingRef.current = location;

    /* perde örtmüşken sayfayı değiştir + scroll'u sıfırla
       (scroll reset SmoothScroll'dan buraya taşındı) */
    const swap = () => {
      const target = pendingRef.current;
      displayedRef.current = target;
      startTransition(() => setDisplayed(target));

      const scrollTop = () => {
        window.scrollTo(0, 0);
        window.lenis?.scrollTo(0, { immediate: true, force: true });
      };

      scrollTop();
      requestAnimationFrame(() => {
        scrollTop();
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });
    };

    if (prefersReducedMotion()) {
      preloadRoute(location.pathname).catch(() => {});
      swap();
      return;
    }

    if (animatingRef.current) return; // akan geçiş pendingRef'i kullanır

    const setShape = ({ fill, edge }, edgeOpacity) => {
      fillRef.current?.setAttribute("d", fill);
      if (edgeRef.current) {
        edgeRef.current.setAttribute("d", edge);
        edgeRef.current.style.opacity = edgeOpacity;
      }
    };

    const runTransition = () => {
      animatingRef.current = true;

      const overlay = overlayRef.current;
      const label = labelRef.current;
      const target = pendingRef.current;

      // hedef sayfanın kodu perde kapanırken arka planda iner
      const preload = preloadRoute(target.pathname).catch(() => {});

      const labelKey = routeLabelKey(target.pathname);
      if (labelTextRef.current) {
        labelTextRef.current.textContent = ` ${labelKey ? t(labelKey) : "404"} `;
      }

      const accent =
        ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)];
      if (edgeRef.current) edgeRef.current.style.stroke = accent;
      [bracketLeftRef, bracketRightRef].forEach((ref) => {
        if (ref.current) ref.current.style.color = accent;
      });

      tlRef.current?.kill();
      const cover = gsap.timeline({ defaults: { ease: "hop" } });
      tlRef.current = cover;

      const rise = { p: 0 };
      setShape(coverShape(0), 0);
      cover.set(overlay, { autoAlpha: 1 });
      cover.set(label, { yPercent: 115 });

      // perde kavisli kenarla yükselir; aksan çizgisi yolculukta görünür
      cover.to(rise, {
        p: 1,
        duration: 0.7,
        onUpdate: () =>
          setShape(coverShape(rise.p), Math.sin(rise.p * Math.PI)),
      });

      // hedef sayfanın adı maske içinden yerine oturur
      cover.to(label, { yPercent: 0, duration: 0.45 }, "-=0.3");

      const coverDone = new Promise((resolve) => {
        cover.eventCallback("onComplete", resolve);
      });

      const peel = () => {
        const tl = gsap.timeline({
          defaults: { ease: "hop" },
          onComplete: () => {
            animatingRef.current = false;
            gsap.set(overlay, { autoAlpha: 0 });
            setShape(coverShape(0), 0);
            // geçiş sürerken yeni bir rota istendiyse arkasından yetiş
            if (pendingRef.current.key !== displayedRef.current.key) {
              runTransition();
            }
          },
        });
        tlRef.current = tl;

        const fall = { p: 0 };

        // ad yukarı süzülür, perde artçı kenarı sarkarak soyulur
        tl.to(label, { yPercent: -115, duration: 0.3 });
        tl.to(
          fall,
          {
            p: 1,
            duration: 0.65,
            onUpdate: () =>
              setShape(exitShape(fall.p), Math.sin(fall.p * Math.PI)),
          },
          "-=0.1",
        );
      };

      // perde ancak hem kapanmış hem hedef kod inmişken değişim yapar;
      // commit + bir kare sonrasında soyulmaya başlar
      Promise.all([coverDone, preload]).then(() => {
        swap();
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setTimeout(peel, 80));
        });
      });
    };

    runTransition();
  }, [location, t]);

  useLayoutEffect(() => {
    return () => {
      tlRef.current?.kill();
    };
  }, []);

  /* perde #main'in (z-index: 1) stacking context'inden kaçması için
     body'ye portal ile basılır */
  const overlay = (
    <div ref={overlayRef} className={styles.overlay} aria-hidden="true">
      <svg
        className={styles.curtain}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          ref={fillRef}
          className={styles.curtainFill}
          d="M 0 100 Q 50 100 100 100 L 100 100 L 0 100 Z"
        />
        <path
          ref={edgeRef}
          className={styles.curtainEdge}
          d="M 0 100 Q 50 100 100 100"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className={styles.labelMask}>
        <span ref={labelRef} className={styles.label}>
          <span ref={bracketLeftRef} className={styles.bracket}>
            [
          </span>
          <span ref={labelTextRef}> </span>
          <span ref={bracketRightRef} className={styles.bracket}>
            ]
          </span>
        </span>
      </div>
    </div>
  );

  return (
    <>
      {children(displayed)}
      {createPortal(overlay, document.body)}
    </>
  );
}
