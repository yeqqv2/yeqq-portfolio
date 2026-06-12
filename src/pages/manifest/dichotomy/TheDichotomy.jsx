import { Fragment, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import ReadMore from "@/pages/manifest/shared/ReadMore";
import { prefersReducedMotion } from "@/utils/motion";
import styles from "./style.module.css";

gsap.registerPlugin(CustomEase);
if (!gsap.parseEase("hop")) {
  CustomEase.create("hop", "0.9, 0, 0.1, 1");
}

/* lucide "brain" (isc lisansı): iki kapalı yarımküre yolu — sol ve sağ lob.
   yollar kapalı (z) olduğu için fill alanı tıklamayı yakalar. */
const LOBE_LEFT =
  "M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z";
const LOBE_RIGHT =
  "M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z";

const SHAPE_COUNT = 5; // renkli şekil çeşidi (css: .s0 … .s4)

export default function TheDichotomy() {
  const { t } = useTranslation();
  const [mode, setMode] = useState("rational");
  const isRational = mode === "rational";

  const titleRef = useRef(null);
  const wordRefs = useRef([]);
  const shapeRefs = useRef([]);
  wordRefs.current = [];
  shapeRefs.current = [];

  const title = isRational
    ? t("manifesto.dichotomy.left_title")
    : t("manifesto.dichotomy.right_title");
  const desc = isRational
    ? t("manifesto.dichotomy.left_desc")
    : t("manifesto.dichotomy.right_desc");

  // mod değişince metin animatedsplit diliyle gelir: maskeden yükselen kelimeler.
  // duygusal modda kelimelerin arasına renkli şekiller pıt pıt açılır.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const words = wordRefs.current.filter(Boolean);
    const shapes = shapeRefs.current.filter(Boolean);
    const tl = gsap.timeline();

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { y: "110%" },
        { y: "0%", duration: 0.8, ease: "hop" },
        0,
      );
    }

    tl.fromTo(
      words,
      { y: "110%" },
      { y: "0%", duration: 0.9, ease: "hop", stagger: 0.015 },
      0.05,
    );

    if (shapes.length) {
      // şekiller sırayla width 0'dan büyür; metin aralarında yumuşakça açılır
      tl.from(
        shapes,
        {
          delay: 1,
          width: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.2,
        },
        0.35,
      );
    }

    return () => tl.kill();
  }, [desc]); // eslint-disable-line react-hooks/exhaustive-deps

  // kelimeler tek tek maskelenir; duygusal modda her 3. kelimeden sonra şekil
  const renderWords = (text) =>
    text.split(" ").map((word, i, arr) => {
      const shapeIdx = (i + 1) / 3 - 1;
      const hasShape = !isRational && (i + 1) % 3 === 0 && i < arr.length - 1;

      return (
        <Fragment key={`${mode}-${i}`}>
          <span className={styles.mask}>
            <span
              ref={(el) => (wordRefs.current[i] = el)}
              className={styles.word}
            >
              {word}
            </span>
          </span>
          {hasShape && (
            <span
              ref={(el) => (shapeRefs.current[shapeIdx] = el)}
              className={`${styles.shape} ${styles[`s${shapeIdx % SHAPE_COUNT}`]}`}
              aria-hidden="true"
            />
          )}{" "}
        </Fragment>
      );
    });

  return (
    <div className={styles.container} data-mode={mode}>
      <div className={styles.annotation}>
        <h4>{t("manifesto.dichotomy.title")}</h4>
        <p>{t("manifesto.dichotomy.desc")}</p>
        <ReadMore slug="dichotomy" />
      </div>

      <div className={styles.stage}>
        <svg
          className={styles.brain}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            {/* var() svg niteliklerinde çözülmez; token karşılıkları hex */}
            <linearGradient id="dichoWarm" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffdd1b" /> {/* main-color400 */}
              <stop offset="100%" stopColor="#ffb432" /> {/* orange400 */}
            </linearGradient>
          </defs>
          <path
            className={`${styles.lobe} ${styles.lobeLeft}`}
            d={LOBE_LEFT}
            onClick={() => setMode("rational")}
          />
          <path
            className={`${styles.lobe} ${styles.lobeRight}`}
            d={LOBE_RIGHT}
            onClick={() => setMode("emotional")}
          />
        </svg>

        <div className={styles.labels}>
          <button
            type="button"
            className={styles.lobe_btn}
            aria-pressed={isRational}
            onClick={() => setMode("rational")}
          >
            {t("manifesto.dichotomy.left_label")}
          </button>
          <button
            type="button"
            className={styles.lobe_btn}
            aria-pressed={!isRational}
            onClick={() => setMode("emotional")}
          >
            {t("manifesto.dichotomy.right_label")}
          </button>
        </div>

        <div className={styles.readout} key={mode}>
          <h3 className={styles.mode_title}>
            <span className={styles.mask}>
              <span ref={titleRef} className={styles.word}>
                {title}
              </span>
            </span>
          </h3>
          <p className={styles.mode_text}>{renderWords(desc)}</p>
        </div>

        <span className={styles.hint}>{t("manifesto.dichotomy.hint")}</span>
      </div>
    </div>
  );
}
