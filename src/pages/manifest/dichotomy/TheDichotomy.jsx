import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import styles from "./style.module.css";
import CustomEase from "gsap/CustomEase.js";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function TheDichotomy() {
  const { t } = useTranslation();
  const [activeBrain, setActiveBrain] = useState("left");

  const logRef = useRef([]);
  const moodRef = useRef([]);

  const logLines = t("manifesto.dichotomy.log_lines", { returnObjects: true });
  const moodWords = t("manifesto.dichotomy.mood_words", {
    returnObjects: true,
  });

  // Rasyonel: günlük satırlarını soldan sağa, sırayla "yaz" (kusursuz süreç).
  const playLog = () => {
    const lines = logRef.current.filter(Boolean);
    gsap.fromTo(
      lines,
      { clipPath: "inset(0 100% 0 0)", opacity: 0.2 },
      {
        clipPath: "inset(0 0% 0 0)",
        opacity: 1,
        duration: 0.45,
        stagger: 0.12,
        ease: "hop",
      },
    );
  };

  // Duygusal: his etiketlerini kaotik biçimde sars, sonra yerine bırak (entropi).
  const playMood = () => {
    const chips = moodRef.current.filter(Boolean);
    gsap.killTweensOf(chips);
    gsap.fromTo(
      chips,
      { x: 0, y: 0, rotate: 0 },
      {
        x: () => gsap.utils.random(-40, 40),
        y: () => gsap.utils.random(-28, 28),
        rotate: () => gsap.utils.random(-18, 18),
        duration: 0.4,
        ease: "hop",
        yoyo: true,
        repeat: 1,
        stagger: { each: 0.03, from: "random" },
      },
    );
  };

  const handleExecute = () => {
    if (activeBrain === "left") playLog();
    else playMood();
  };

  useEffect(() => {
    if (activeBrain === "left") playLog();
    else playMood();
  }, [activeBrain]);

  return (
    <div className={styles.container}>
      {/* SOL BEYİN (Rational) */}
      <div
        className={`${styles.left_brain} ${activeBrain === "left" ? styles.active : ""}`}
      >
        <div className={styles.brain_content}>
          <div className={styles.toggle_container}>
            <div className={styles.toggle_title}>
              {t("manifesto.dichotomy.left_title")}
            </div>
            <label className={styles.label}>
              <div className={styles.toggle}>
                <input
                  className={styles.toggle_state}
                  type="radio"
                  name="brain"
                  checked={activeBrain === "left"}
                  onChange={() => setActiveBrain("left")}
                />
                <div className={styles.indicator} />
              </div>
            </label>
          </div>

          <div className={styles.annotation}>
            <h4 className={styles.annotation_title}>
              {t("manifesto.dichotomy.left_annotation_title")}
            </h4>
            <p className={styles.annotation_desc}>
              {t("manifesto.dichotomy.left_annotation_desc")}
            </p>
          </div>
        </div>
        <span className={styles.blob} />
        <span className={styles.blob} />
        <span className={styles.blob} />
      </div>

      <div className={styles.divider} />

      {/* SAĞ BEYİN (Emotional) */}
      <div
        className={`${styles.right_brain} ${activeBrain === "right" ? styles.active : ""}`}
      >
        <div className={styles.brain_content}>
          <div className={styles.toggle_container}>
            <div className={styles.toggle_title}>
              {t("manifesto.dichotomy.right_title")}
            </div>
            <label className={styles.label}>
              <div className={styles.toggle}>
                <input
                  className={styles.toggle_state}
                  type="radio"
                  name="brain"
                  checked={activeBrain === "right"}
                  onChange={() => setActiveBrain("right")}
                />
                <div className={styles.indicator} />
              </div>
            </label>
          </div>

          <div className={styles.annotation}>
            <h4 className={styles.annotation_title}>
              {t("manifesto.dichotomy.right_annotation_title")}
            </h4>
            <p className={styles.annotation_desc}>
              {t("manifesto.dichotomy.right_annotation_desc")}
            </p>
          </div>
        </div>

        <span className={styles.blob} />
        <span className={styles.blob} />
        <span className={styles.blob} />
        <span className={styles.blob} />
        <span className={styles.blob} />
        <span className={styles.blob} />
      </div>

      {/* MERKEZ KART (The Transformation) */}
      <div
        className={`${styles.card} ${activeBrain === "left" ? styles.rational : styles.emotional}`}
      >
        <div className={styles.card_header}>
          <h2>
            {activeBrain === "left"
              ? t("manifesto.dichotomy.card_rational")
              : t("manifesto.dichotomy.card_emotional")}
          </h2>
        </div>

        <div className={styles.card_body}>
          {activeBrain === "left" ? (
            <div className={styles.log}>
              {(Array.isArray(logLines) ? logLines : []).map((line, i) => (
                <span
                  key={i}
                  ref={(el) => (logRef.current[i] = el)}
                  className={styles.log_line}
                >
                  {line}
                </span>
              ))}
            </div>
          ) : (
            <div className={styles.mood}>
              {(Array.isArray(moodWords) ? moodWords : []).map((word, i) => (
                <span
                  key={i}
                  ref={(el) => (moodRef.current[i] = el)}
                  className={styles.mood_chip}
                >
                  {word}
                </span>
              ))}
            </div>
          )}
        </div>

        <button className={styles.action_btn} onClick={handleExecute}>
          {t("manifesto.dichotomy.action_btn")}
        </button>
      </div>
    </div>
  );
}
