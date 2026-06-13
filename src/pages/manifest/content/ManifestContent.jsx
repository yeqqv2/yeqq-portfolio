import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ManifestArc from "@/pages/manifest/arc/ManifestArc";
import ObserverEffect from "@/pages/manifest/observer/ObserverEffect";
import CostOfOrder from "@/pages/manifest/cost/CostOfOrder";
import WeightOfChoice from "@/pages/manifest/choice/WeightOfChoice";
import ContactHomePage from "@/pages/home/contact/ContactHomePage";
import AsymmetryOfLoss from "@/pages/manifest/assymetry/AsymmetryOfLoss";
import PrisonersDilemma from "@/pages/manifest/dilemma/PrisonersDilemma";
import ManifestProgress from "@/pages/manifest/progress/ManifestProgress";
import { prefersReducedMotion } from "@/utils/motion";
import styles from "./style.module.css";
import TheDichotomy from "../dichotomy/TheDichotomy";

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
  { id: "arc", labelIndex: 0, Component: ManifestArc },
  { id: "observer", labelIndex: 1, Component: ObserverEffect },
  { id: "cost", labelIndex: 2, Component: CostOfOrder },
  { id: "choice", labelIndex: 3, Component: TheDichotomy },
  { id: "dichotomy", labelIndex: 4, Component: WeightOfChoice },
  { id: "loss", labelIndex: 5, Component: AsymmetryOfLoss },
  { id: "dilemma", labelIndex: 6, Component: PrisonersDilemma },
  { id: "contact", labelIndex: 7, Component: ContactHomePage },
];

/* her geçişten sonra panel ekranda bir süre sabit dinlenir (plato).
   geçiş = 1 birim (%100 viewport scroll), plato = DWELL birim.
   plato fazla kaydırmayı emer: yeni panel oturduğunda bir sonraki
   hemen alttan görünmeye başlamaz. */
const DWELL = 1;
const SEG = 1 + DWELL;
const LAST = PANELS.length - 1;
const TOTAL = LAST * SEG; // son geçişten sonra da bir plato kalır
const PANEL_RENDER_RADIUS = 1;

/* timeline içindeki t anına göre aktif panel: geçişin yarısını
   aşınca gelen panel "aktif" sayılır */
const activeAt = (t) => {
  const i = Math.floor(t / SEG);
  const local = t - i * SEG;
  return Math.min(LAST, local >= 0.5 ? i + 1 : i);
};

export default function ManifestContent() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const [active, setActive] = useState(0);
  const [navVisible, setNavVisible] = useState(false);
  const renderAllPanels = prefersReducedMotion();

  const setActivePanel = useCallback((next) => {
    setActive((current) => (current === next ? current : next));
  }, []);

  const rawLabels = t("manifesto.nav", { returnObjects: true });
  const labels = PANELS.map(({ labelIndex }, i) =>
    Array.isArray(rawLabels) && rawLabels[labelIndex]
      ? rawLabels[labelIndex]
      : `section ${i + 1}`,
  );

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const panels = gsap.utils.toArray("[data-manifest-panel]", container);
    if (panels.length < 2) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        // intro'yu geçip içeriğe gelince progress nav belirir
        ScrollTrigger.create({
          trigger: container,
          start: "top 60%",
          end: "bottom 40%",
          onToggle: (self) => setNavVisible(self.isActive),
        });
        panels.forEach((panel, i) => {
          ScrollTrigger.create({
            trigger: panel,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => self.isActive && setActivePanel(i),
          });
        });
        return;
      }

      gsap.set(panels.slice(1), { yPercent: 100 });

      const tl = gsap.timeline({
        defaults: { ease: "none", duration: 1 },
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${TOTAL * 20}%`,
          pin: true,
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // perde pinlenince (intro geçilince) progress nav belirir
          onToggle: (self) => setNavVisible(self.isActive),
          onUpdate: (self) => {
            setActivePanel(activeAt(self.progress * TOTAL));
          },
        },
      });

      panels.slice(1).forEach((panel) => {
        tl.to(panel, { yPercent: 0 });
        tl.to({}, { duration: DWELL }); // plato: panel ekranda dinlenir
      });

      triggerRef.current = tl.scrollTrigger;
    }, container);

    /* kaydırma durunca yarım kalmış geçişi yakın platoya oturt.
       scrolltrigger'ın yerleşik snap'i yerine lenis.scrollTo:
       lenis'in iç hedefiyle çakışmaz (nav tıklamasıyla aynı yol). */
    const onScrollEnd = () => {
      const st = triggerRef.current;
      if (!st) return;

      const p = st.progress;
      if (p <= 0.0005 || p >= 0.9995) return;

      const t = p * TOTAL;
      const i = Math.floor(t / SEG);
      const local = t - i * SEG;
      if (local > 1) return; // zaten platoda: dokunma

      // yarıyı geçtiyse ileri, geçmediyse geri — hedef platonun ortası
      const settled =
        local < 0.5 ? Math.max(0, i * SEG - DWELL / 2) : i * SEG + 1 + DWELL / 2;
      const target = st.start + (st.end - st.start) * (settled / TOTAL);
      if (Math.abs(target - st.scroll()) < 2) return;

      if (window.lenis) {
        window.lenis.scrollTo(target, { duration: 0.9 });
      } else {
        window.scrollTo({ top: target, behavior: "smooth" });
      }
    };

    ScrollTrigger.addEventListener("scrollEnd", onScrollEnd);

    return () => {
      ScrollTrigger.removeEventListener("scrollEnd", onScrollEnd);
      triggerRef.current = null;
      ctx.revert();
    };
  }, [setActivePanel]);

  const scrollToPanel = useCallback((index) => {
    const st = triggerRef.current;

    if (st) {
      // panel i, (i-1). geçişin sonunda oturur; hedef o platonun ortası
      const settled = index === 0 ? 0 : (index - 1) * SEG + 1 + DWELL / 2;
      const y = st.start + (st.end - st.start) * (settled / TOTAL);

      if (window.lenis) {
        window.lenis.scrollTo(y, { duration: 1.2 });
      } else {
        window.scrollTo({ top: y, behavior: "smooth" });
      }

      return;
    }

    const panel = containerRef.current?.querySelectorAll(
      "[data-manifest-panel]",
    )[index];

    panel?.scrollIntoView({ behavior: "auto", block: "start" });
  }, []);

  return (
    <>
      <ManifestProgress
        active={active}
        sectionCount={PANELS.length}
        labels={labels}
        onSelect={scrollToPanel}
        visible={navVisible}
      />

      <div ref={containerRef} className={styles.manifest}>
        <div className={styles.stage}>
          {PANELS.map(({ id, Component }, i) => {
            const isActive = active === i;
            const shouldRender =
              renderAllPanels || Math.abs(active - i) <= PANEL_RENDER_RADIUS;

            return (
              <section
                key={id}
                data-active={isActive}
                data-manifest-panel
                className={styles.panel}
                inert={isActive ? undefined : ""}
              >
                <div className={styles.panelInner}>
                  {shouldRender && <Component isActive={isActive} />}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
