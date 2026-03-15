import { useRef } from "react";
import gsap from "gsap";
import styles from "./style.module.css";
import { useTranslation } from "react-i18next";

export default function ObserverEffect() {
  const { t } = useTranslation();
  const elementsRef = useRef([]);

  const observerLines =
    t("manifesto.observer.lines", { returnObjects: true }) || [];
  const tags = ["<div>", "<canvas>", "<span>", "<a>"];

  const handleEnter = (el) => {
    if (!el) return;
    gsap.to(el, {
      filter: "blur(0px)",
      duration: 0.25,
      ease: "expo.out",
    });
  };

  const handleLeave = (el) => {
    if (!el) return;
    gsap.to(el, {
      filter: "blur(12px)",
      duration: 0.25,
      ease: "sine.inOut",
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.quantum_field}>
        {observerLines.map((line, i) => (
          <div
            key={i}
            ref={(el) => (elementsRef.current[i] = el)}
            className={styles.quantum_item}
            onMouseEnter={() => handleEnter(elementsRef.current[i])}
            onMouseLeave={() => handleLeave(elementsRef.current[i])}
          >
            <div className={styles.tag_morph}>{tags[i]}</div>
            <div className={styles.hidden_truth}>{line}</div>
          </div>
        ))}
      </div>

      <div className={styles.annotation}>
        <h4>{t("manifesto.observer.title")}</h4>
        <p>{t("manifesto.observer.desc")}</p>
      </div>
    </div>
  );
}
