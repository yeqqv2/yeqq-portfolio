import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import AnimatedSplit from "@/components/animated split/AnimatedSplit";
import styles from "./style.module.css";
import PrimerLink from "@/ui/link/PrimerLink";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ManifestHomePage = () => {
  const { t, i18n } = useTranslation();

  // tek seferde tek ilke açık (radyo semantiği)
  const [activeTopic, setActiveTopic] = useState("aesthetic");

  const topics = t("manifest.topics", { returnObjects: true });
  const keys = Object.keys(topics);

  const listRef = useRef(null);
  const rowsRef = useRef([]);

  // satırlar sayfanın geri kalanı gibi girer: yüksel + hop, kademeli
  useEffect(() => {
    if (reduceMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rowsRef.current,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "hop",
          stagger: 0.08,
          scrollTrigger: { trigger: listRef.current, start: "top 85%" },
        },
      );
    }, listRef);
    return () => ctx.revert();
  }, [i18n.language]);

  return (
    <section className={styles.container} key={i18n.language}>
      <div className={styles.context}>
        <AnimatedSplit
          text={t("manifest.title")}
          className={styles.title}
          tagName="span"
          stagger={0.012}
          duration={1.5}
          start="top 80%"
        />

        <AnimatedSplit
          text={t("manifest.desc")}
          className={styles.desc}
          tagName="span"
          stagger={0.012}
          duration={1.5}
          start="top 80%"
        />

        <div className={styles.index} ref={listRef}>
          {keys.map((key, i) => {
            const isActive = activeTopic === key;
            return (
              <div
                key={key}
                className={styles.row}
                ref={(el) => (rowsRef.current[i] = el)}
              >
                <button
                  className={`${styles.rowButton} ${isActive ? styles.rowActive : ""}`}
                  onClick={() => setActiveTopic(key)}
                  aria-expanded={isActive}
                  aria-controls={`manifest-facet-${key}`}
                >
                  <span className={styles.rowIndex}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.rowLabel}>{topics[key].label}</span>
                </button>
                <div
                  id={`manifest-facet-${key}`}
                  role="region"
                  className={`${styles.panel} ${isActive ? styles.panelOpen : ""}`}
                >
                  <div className={styles.panelInner}>
                    <p className={styles.panelText}>{topics[key].text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* <div className={styles.action}>
          <PrimerLink
            href="/manifest"
            buttonText={t("manifest.button")}
            backgroundColor="var(--wb950)"
            color="var(--wb50)"
          />
        </div> */}
      </div>
    </section>
  );
};

export default ManifestHomePage;
