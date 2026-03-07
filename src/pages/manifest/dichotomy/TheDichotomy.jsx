import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";

export default function TheDichotomy() {
  const { t } = useTranslation();
  const [activeBrain, setActiveBrain] = useState("left");

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

        <div className={styles.dummy_element}></div>
        <button className={styles.action_btn}>
          {t("manifesto.dichotomy.action_btn")}
        </button>
      </div>
    </div>
  );
}
