import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import ReadMore from "@/pages/manifest/shared/ReadMore";
import styles from "./style.module.css";

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const MAX_UNITS = 12; // kefe kapasitesi (birim)
const TILT_PER_UNIT = 4; // derece / birim fark
const MAX_TILT = 22;

// ip fiziği: yük bindikçe ip gerilir; uzar ve incelir (hacim korunur)
const STRING_BASE_H = 46;
const STRING_BASE_W = 2;
const stringHeight = (units) => STRING_BASE_H + units * 1.4;
const stringWidth = (units) => Math.max(0.5, STRING_BASE_W - units * 0.12);

export default function AsymmetryOfLoss() {
  const { t } = useTranslation();

  // kazanç hamlesi 1 birim, kayıp hamlesi 2 birim kütle düşürür.
  // aynı sayıda hamleyle terazi asla dengede kalmaz: kahneman katsayısı.
  const [gains, setGains] = useState(0);
  const [losses, setLosses] = useState(0);

  const beamRef = useRef(null);
  const panLRef = useRef(null);
  const panRRef = useRef(null);
  const stringLRef = useRef(null);
  const stringRRef = useRef(null);
  const gainUnitRefs = useRef([]);
  const lossUnitRefs = useRef([]);

  // kiriş eğimi: pozitif fark kazanç kefesini, negatif fark kayıp kefesini indirir
  const settle = (g, l) => {
    const rot = gsap.utils.clamp(
      -MAX_TILT,
      MAX_TILT,
      (g - 2 * l) * TILT_PER_UNIT,
    );
    const pans = [panLRef.current, panRRef.current];

    if (reduceMotion()) {
      gsap.set(beamRef.current, { rotation: rot });
      gsap.set(pans, { rotation: -rot });
      return;
    }

    // kefeler sarkaç gibi ters dönerek hep yere paralel kalır
    gsap.to(beamRef.current, {
      rotation: rot,
      duration: 1.4,
      ease: "elastic.out(1, 0.45)",
      overwrite: "auto",
    });
    gsap.to(pans, {
      rotation: -rot,
      duration: 1.4,
      ease: "elastic.out(1, 0.45)",
      overwrite: "auto",
    });
  };

  // darbe: ip gerilir (uzar, incelir), tel gibi titreşir; kefe hafifçe çöker
  const strain = (stringEl, panEl, units) => {
    if (!stringEl) return;

    if (reduceMotion()) {
      gsap.set(stringEl, {
        height: stringHeight(units),
        width: stringWidth(units),
        skewX: 0,
      });
      return;
    }

    gsap.to(stringEl, {
      height: stringHeight(units),
      width: stringWidth(units),
      duration: 1.2,
      ease: "elastic.out(1, 0.35)",
      overwrite: "auto",
    });
    gsap.fromTo(
      stringEl,
      { skewX: 2.5 },
      { skewX: 0, duration: 0.9, ease: "elastic.out(2, 0.15)" },
    );
    if (panEl) {
      gsap.fromTo(
        panEl,
        { y: 5 },
        { y: 0, duration: 1, ease: "elastic.out(1.2, 0.3)" },
      );
    }
  };

  // kütle yukarıdan kefeye düşer; yere indiğinde ip gerilir, kiriş denge arar
  const drop = (el, after) => {
    if (!el || reduceMotion()) {
      if (el) gsap.set(el, { y: 0, autoAlpha: 1 });
      after();
      return;
    }
    gsap.fromTo(
      el,
      { y: -90, autoAlpha: 0.4 },
      { y: 0, autoAlpha: 1, duration: 0.4, ease: "power2.in", onComplete: after },
    );
  };

  const handleGain = () => {
    if (gains >= MAX_UNITS) return;
    const next = gains + 1;
    flushSync(() => setGains(next));
    drop(gainUnitRefs.current[next - 1], () => {
      strain(stringRRef.current, panRRef.current, next);
      settle(next, losses);
    });
  };

  const handleLose = () => {
    if (losses * 2 >= MAX_UNITS) return;
    const next = losses + 1;
    flushSync(() => setLosses(next));
    drop(lossUnitRefs.current[next - 1], () => {
      strain(stringLRef.current, panLRef.current, next * 2);
      settle(gains, next);
    });
  };

  const handleReset = () => {
    setGains(0);
    setLosses(0);
    settle(0, 0);
    [stringLRef.current, stringRRef.current].forEach((s) => {
      if (!s) return;
      gsap.to(s, {
        height: stringHeight(0),
        width: stringWidth(0),
        skewX: 0,
        duration: reduceMotion() ? 0 : 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.annotation}>
        <h4>{t("manifesto.asymmetry.title")}</h4>
        <p>{t("manifesto.asymmetry.desc")}</p>
        <ReadMore slug="loss" />
      </div>

      <div className={styles.stage}>
        <div className={styles.scale}>
          <div ref={beamRef} className={styles.beam}>
            {/* kayıp kefesi: her hamle 2 birimlik kütle */}
            <div className={`${styles.arm} ${styles.arm_left}`}>
              <span
                ref={stringLRef}
                className={styles.string}
                aria-hidden="true"
              />
              <div ref={panLRef} className={styles.pan_group}>
                <div className={styles.weights}>
                  {Array.from({ length: losses }).map((_, i) => (
                    <span
                      key={i}
                      ref={(el) => (lossUnitRefs.current[i] = el)}
                      className={styles.unit_loss}
                    />
                  ))}
                </div>
                <span className={styles.pan} aria-hidden="true" />
                <span className={styles.pan_mass}>{losses * 2}</span>
              </div>
            </div>

            {/* kazanç kefesi: her hamle 1 birimlik kütle */}
            <div className={`${styles.arm} ${styles.arm_right}`}>
              <span
                ref={stringRRef}
                className={styles.string}
                aria-hidden="true"
              />
              <div ref={panRRef} className={styles.pan_group}>
                <div className={styles.weights}>
                  {Array.from({ length: gains }).map((_, i) => (
                    <span
                      key={i}
                      ref={(el) => (gainUnitRefs.current[i] = el)}
                      className={styles.unit_gain}
                    />
                  ))}
                </div>
                <span className={styles.pan} aria-hidden="true" />
                <span className={styles.pan_mass}>{gains}</span>
              </div>
            </div>
          </div>

          <span className={styles.pivot} aria-hidden="true" />
        </div>

        <div className={styles.controls}>
          <button
            className={styles.action_btn}
            onClick={handleLose}
            disabled={losses * 2 >= MAX_UNITS}
          >
            {t("manifesto.asymmetry.destruct")}
          </button>
          <button
            className={styles.action_btn}
            onClick={handleGain}
            disabled={gains >= MAX_UNITS}
          >
            {t("manifesto.asymmetry.build")}
          </button>
        </div>

        <button
          className={`${styles.reset} ${
            gains + losses > 0 ? styles.reset_visible : ""
          }`}
          onClick={handleReset}
          tabIndex={gains + losses > 0 ? 0 : -1}
        >
          {t("manifesto.asymmetry.reset_label")}
        </button>
      </div>
    </div>
  );
}
