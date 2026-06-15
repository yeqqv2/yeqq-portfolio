import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ManifestArc from "@/pages/manifest/arc/ManifestArc";
import ObserverEffect from "@/pages/manifest/observer/ObserverEffect";
import CostOfOrder from "@/pages/manifest/cost/CostOfOrder";
import ParetoDistribution from "@/pages/manifest/pareto/ParetoDistribution";
import WeightOfChoice from "@/pages/manifest/choice/WeightOfChoice";
import AsymmetryOfLoss from "@/pages/manifest/assymetry/AsymmetryOfLoss";
import PrisonersDilemma from "@/pages/manifest/dilemma/PrisonersDilemma";
import ClosingWhite from "@/pages/manifest/closing/ClosingWhite";
import ManifestProgress from "@/pages/manifest/progress/ManifestProgress";
import { prefersReducedMotion } from "@/utils/motion";
import styles from "./style.module.css";
import TheDichotomy from "../dichotomy/TheDichotomy";

gsap.registerPlugin(ScrollTrigger);

/* sıra = manifestonun anlatı yayı: doğuş (beyaz) → dünyanın yasaları
   (entropi, pareto) → algı köprüsü (gözlemci) → benlik (ikilik, seçim,
   kayıp) → öteki (ikilem) → kalan (kapanış). labelIndex artık dizideki
   konumla aynı; nav etiketleriyle birebir. */
const PANELS = [
  { id: "white", labelIndex: 0, Component: ManifestArc },
  { id: "entropy", labelIndex: 1, Component: CostOfOrder },
  { id: "pareto", labelIndex: 2, Component: ParetoDistribution },
  { id: "observer", labelIndex: 3, Component: ObserverEffect },
  { id: "dichotomy", labelIndex: 4, Component: TheDichotomy },
  { id: "choice", labelIndex: 5, Component: WeightOfChoice },
  { id: "loss", labelIndex: 6, Component: AsymmetryOfLoss },
  { id: "dilemma", labelIndex: 7, Component: PrisonersDilemma },
  { id: "remains", labelIndex: 8, Component: ClosingWhite },
];

/* her geçişten sonra panel ekranda bir süre sabit dinlenir (plato).
   geçiş = 1 birim (%100 viewport scroll), plato = DWELL birim.
   plato fazla kaydırmayı emer: yeni panel oturduğunda bir sonraki
   hemen alttan görünmeye başlamaz. ilk panel (white on white) geçişle
   değil pin'le gelir; o yüzden başa da bir plato (LEAD) koyulur ki o da
   diğerleri gibi ekranda dursun, ilk scroll'da hemen kaymaya başlamasın. */
const DWELL = 1;
const SEG = 1 + DWELL;
const LAST = PANELS.length - 1;
const LEAD = DWELL; // ilk panelin baştaki platosu
const TOTAL = LEAD + LAST * SEG; // baştaki + her geçişten sonraki platolar
const PANEL_RENDER_RADIUS = 1;

/* timeline içindeki t anına göre aktif panel: baştaki plato boyunca ilk
   panel; sonrasında her geçişin yarısını aşınca gelen panel aktif sayılır */
const activeAt = (t) => {
  if (t <= LEAD) return 0;
  const u = t - LEAD;
  const b = Math.floor(u / SEG);
  const local = u - b * SEG;
  // local < 1: geçiş (yarıyı aşınca gelen panel); local >= 1: plato (gelen panel)
  const idx = local < 1 ? (local >= 0.5 ? b + 1 : b) : b + 1;
  return Math.min(LAST, idx);
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
          // düz yığın yerine sakin bir crossfade — reduced-motion'da hareket
          // değil yalnızca opaklık, yine de "büyüsüz" olmaktan çıkar
          gsap.fromTo(
            panel,
            { autoAlpha: 0 },
            {
              autoAlpha: 1,
              duration: 0.5,
              ease: "power1.out",
              scrollTrigger: { trigger: panel, start: "top 90%", once: true },
            },
          );
        });
        return;
      }

      gsap.set(panels.slice(1), { yPercent: 100 });

      const tl = gsap.timeline({
        defaults: { ease: "none", duration: 1 },
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${TOTAL * 40}%`,
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

      // baştaki plato: white on white paneli pin devreye girince ekranda
      // diğerleri gibi bir süre durur, ilk scroll'da hemen kaymaya başlamaz
      tl.to({}, { duration: LEAD });

      panels.slice(1).forEach((panel, i) => {
        const outgoing = panels[i]; // bir önceki panel
        // gelen panel alttan kayıp üste biner
        tl.to(panel, { yPercent: 0 });
        // çıkan panel aynı anda hafifçe geri çekilir: düz kayma değil,
        // katmanlı derinlik. zemin her yerde wb50, küçülen panelin etrafı
        // dikiş izi vermez — recede beyazın içinde okunur.
        tl.to(
          outgoing,
          { scale: 0.94, yPercent: -6, transformOrigin: "center center" },
          "<",
        );
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
      if (t <= LEAD) return; // baştaki platoda: dokunma
      const u = t - LEAD;
      const b = Math.floor(u / SEG);
      const local = u - b * SEG;
      if (local > 1) return; // zaten platoda: dokunma

      // yarıyı geçtiyse ileri (gelen panelin platosu), geçmediyse geri
      // (çıkan panelin platosu) — hedef o platonun ortası
      const settled =
        local < 0.5
          ? b === 0
            ? LEAD / 2
            : LEAD + b * SEG - DWELL / 2
          : LEAD + b * SEG + 1 + DWELL / 2;
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
      // ilk panel baştaki platoda oturur; panel i ise (i-1). geçişin
      // sonundaki platoda — hedef o platonun ortası
      const settled =
        index === 0 ? LEAD / 2 : LEAD + (index - 1) * SEG + 1 + DWELL / 2;
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
