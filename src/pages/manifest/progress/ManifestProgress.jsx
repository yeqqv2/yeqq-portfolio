import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function ManifestProgress() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const sectionsRef = useRef([]);

  const labels = t("manifesto.nav", { returnObjects: true });

  useEffect(() => {
    const sections = gsap.utils.toArray("[data-manifest-section]");
    sectionsRef.current = sections;
    if (!sections.length) return;

    // Hangi bölüm ekranın ortasındaysa onu aktif say (scroll-spy).
    const triggers = sections.map((sec, i) =>
      ScrollTrigger.create({
        trigger: sec,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => self.isActive && setActive(i),
      }),
    );

    ScrollTrigger.refresh();
    return () => triggers.forEach((trig) => trig.kill());
  }, []);

  const goTo = (i) => {
    const target = sectionsRef.current[i];
    if (!target) return;
    if (window.lenis) window.lenis.scrollTo(target);
    else target.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  if (!Array.isArray(labels)) return null;

  return (
    <nav className={styles.progress} aria-label="manifesto">
      {labels.map((label, i) => (
        <button
          key={i}
          type="button"
          className={`${styles.item} ${active === i ? styles.active : ""}`}
          onClick={() => goTo(i)}
          aria-current={active === i ? "true" : undefined}
        >
          <span className={styles.index}>{String(i).padStart(1, "0")}</span>
          <span className={styles.tick} />
          <span className={styles.label}>{label}</span>
        </button>
      ))}
    </nav>
  );
}
