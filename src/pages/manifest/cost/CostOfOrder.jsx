import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import styles from "./style.module.css";

export default function CostOfOrder() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  const dotsRef = useRef([]);
  const totalDots = 100;

  // Rastgele Kaos Fonksiyonu (Entropi)
  const animateChaos = (dot) => {
    if (!dot) return;
    gsap.to(dot, {
      x: () =>
        gsap.utils.random(-window.innerWidth * 0.4, window.innerWidth * 0.4),
      y: () =>
        gsap.utils.random(-window.innerHeight * 0.4, window.innerHeight * 0.4),
      duration: () => gsap.utils.random(3, 8),
      ease: "sine.inOut",
      overwrite: "auto",
      scale: () => gsap.utils.random(0.5, 1.5),
      opacity: () => gsap.utils.random(0.3, 0.7),
      force3D: true, // GPU Hızlandırmasını zorla
      onComplete: () => {
        // Doğrudan DOM'dan sınıf kontrolü (React re-render beklemez)
        if (!containerRef.current?.classList.contains(styles.ordered_bg)) {
          animateChaos(dot);
        }
      },
    });
  };

  // Kusursuz Matris Fonksiyonu (Düzen)
  const applyOrder = () => {
    gsap.killTweensOf(dotsRef.current);

    dotsRef.current.forEach((dot, i) => {
      const row = Math.floor(i / 10);
      const col = i % 10;
      const spacing = 24;

      const offsetX = (9 * spacing) / 2;
      const offsetY = (9 * spacing) / 2;

      gsap.to(dot, {
        x: col * spacing - offsetX,
        y: row * spacing - offsetY,
        duration: 0.8,
        ease: "expo.out",
        overwrite: true,
        scale: 1,
        opacity: 1,
        force3D: true,
      });
    });
  };

  // Etkileşim: React State YOK, Doğrudan DOM müdahalesi VAR.
  const handleDown = () => {
    containerRef.current?.classList.add(styles.ordered_bg);
    applyOrder();
  };

  const handleUp = () => {
    containerRef.current?.classList.remove(styles.ordered_bg);
    dotsRef.current.forEach((dot) => animateChaos(dot));
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      dotsRef.current.forEach((dot) => animateChaos(dot));
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.particle_system}>
        {Array.from({ length: totalDots }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (dotsRef.current[i] = el)}
            className={styles.dot}
          />
        ))}
      </div>

      <div className={styles.ui_layer}>
        <button
          className={styles.energy_btn}
          onMouseDown={handleDown}
          onMouseUp={handleUp}
          onMouseLeave={handleUp}
          onTouchStart={handleDown}
          onTouchEnd={handleUp}
        >
          {t("manifesto.cost_of_order.btn_label")}
        </button>

        <div className={styles.manifesto_block} key={i18n.language}>
          <h4>{t("manifesto.cost_of_order.title")}</h4>
          <p>{t("manifesto.cost_of_order.desc")}</p>
        </div>
      </div>
    </div>
  );
}
