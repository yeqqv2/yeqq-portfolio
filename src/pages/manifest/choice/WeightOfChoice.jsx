import { useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";
import PrimerButton from "../../../ui/button/PrimerButton";

gsap.registerPlugin(CustomEase);
const hop = CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function WeightOfChoice() {
  const { t } = useTranslation();
  const shapesRef = useRef([]);
  const decisionRef = useRef(null);

  const applyDecision = () => {
    const tl = gsap.timeline();

    tl.to(
      decisionRef.current,
      {
        width: "10vw",
        height: "10vw",
        rotate: 0,
        backgroundColor: "var(--wb950)",
        duration: 1.88,
        ease: hop,
      },
      0,
    );

    tl.to(
      shapesRef.current,
      {
        height: 0,
        duration: 1.88,
        ease: hop,
      },
      0,
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.entropy_field}>
        {/* Dağınık çizgiler (Olasılıklar) */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (shapesRef.current[i] = el)}
            className={styles.stray_shape}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}

        {/* Ortadaki Ana Çizgi (Karar Çekirdeği) */}
        <div ref={decisionRef} className={styles.decision_core} />
      </div>

      <div className={styles.annotation}>
        <h4>{t("manifesto.choice.title")}</h4>
        <p>{t("manifesto.choice.desc")}</p>
        <PrimerButton
          color="var(--wb50)"
          backgroundColor="var(--wb950)"
          onClick={applyDecision}
          buttonText={t("manifesto.choice.button")}
        />
      </div>
    </div>
  );
}
