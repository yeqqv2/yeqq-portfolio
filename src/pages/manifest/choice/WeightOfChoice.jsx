import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import ReadMore from "@/pages/manifest/shared/ReadMore";
import styles from "./style.module.css";

gsap.registerPlugin(CustomEase);
const hop = CustomEase.create("hop", "0.9, 0, 0.1, 1");

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const coarsePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none), (pointer: coarse)").matches;

const DUST_PER_DOOR = 6;

export default function WeightOfChoice() {
  const { t } = useTranslation();
  const [chosen, setChosen] = useState(-1); // -1: henüz seçilmedi
  const [armed, setArmed] = useState(-1); // dokunmatik: ilk dokunuş fısıltıyı açar

  const doorRefs = useRef([]);
  const doorwayRefs = useRef([]);
  const glowRefs = useRef([]);
  const shadeRefs = useRef([]);
  const whisperRefs = useRef([]);
  const dustRefs = useRef([]); // kapı başına DUST_PER_DOOR adet
  const stageLineRef = useRef(null);
  const sentenceRef = useRef(null);
  const finalRef = useRef(null);

  const doors = t("manifesto.choice.doors", { returnObjects: true }) || [];

  // seçim: tek hamle, geri dönüşü yok. seçilen kapı ışığa açılır,
  // kalan dördü ufalanır ve yerlerinde bulanık birer gölge kalır.
  const choose = (idx) => {
    const open = doorRefs.current[idx];
    const whispers = whisperRefs.current.filter(Boolean);
    const otherIdx = doors.map((_, i) => i).filter((i) => i !== idx);

    if (reduceMotion()) {
      gsap.set(open, { rotateY: -78 });
      gsap.set(glowRefs.current[idx], { autoAlpha: 1 });
      otherIdx.forEach((i) => {
        gsap.set(doorRefs.current[i], { scaleY: 0, opacity: 0 });
        gsap.set(doorwayRefs.current[i], { autoAlpha: 0 });
        gsap.set(shadeRefs.current[i], { autoAlpha: 0.3 });
      });
      gsap.set([stageLineRef.current, ...whispers], { autoAlpha: 0 });
      gsap.set([sentenceRef.current, finalRef.current], { autoAlpha: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline();

    // sahne yazısı ve tüm fısıltılar söner
    tl.to([stageLineRef.current, ...whispers], {
      autoAlpha: 0,
      duration: 0.3,
      ease: "power2.out",
    });

    // seçilen kapı ışığa açılır; beyaz ışık dışarı taşar
    tl.to(open, { rotateY: -78, duration: 1.4, ease: hop }, 0.1);
    tl.to(
      glowRefs.current[idx],
      { autoAlpha: 1, duration: 1.2, ease: "power2.out" },
      0.5,
    );
    // ışık nefes alır
    tl.call(
      () => {
        gsap.to(glowRefs.current[idx], {
          opacity: 0.65,
          duration: 2.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      },
      null,
      1.8,
    );

    // diğerleri taşlaşır, titrer, tabana çöker; ışıkları söner
    otherIdx.forEach((i, k) => {
      const door = doorRefs.current[i];
      const at = 0.25 + k * 0.12;
      tl.to(
        door,
        {
          x: "+=2",
          duration: 0.16,
          repeat: 1,
          yoyo: true,
          ease: "power1.inOut",
        },
        at,
      );
      tl.to(
        doorwayRefs.current[i],
        { autoAlpha: 0, duration: 0.25, ease: "power1.out" },
        at,
      );
      tl.to(
        door,
        {
          scaleY: 0,
          opacity: 0,
          transformOrigin: "bottom center",
          duration: 0.7,
          ease: "power2.in",
        },
        at + 0.22,
      );
      // geriye kalan: bulanık siyah bir gölge
      tl.to(
        shadeRefs.current[i],
        { autoAlpha: 0.3, duration: 1.6, ease: "power2.out" },
        at + 0.85,
      );
      // toz: çöken kapının dibinden zerreler dökülür
      for (let k2 = 0; k2 < DUST_PER_DOOR; k2++) {
        const dust = dustRefs.current[i * DUST_PER_DOOR + k2];
        if (!dust) continue;
        tl.fromTo(
          dust,
          { x: gsap.utils.random(-12, 12), y: 0, autoAlpha: 0.6 },
          {
            y: gsap.utils.random(16, 44),
            x: `+=${gsap.utils.random(-10, 10)}`,
            autoAlpha: 0,
            duration: gsap.utils.random(0.6, 1.1),
            ease: "power1.in",
          },
          at + 0.3 + k2 * 0.05,
        );
      }
    });

    // ödül: seçilen geleceğin tamamı ve nihai cümle
    tl.fromTo(
      sentenceRef.current,
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 1, ease: hop },
      1.1,
    );
    tl.fromTo(
      finalRef.current,
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" },
      2.1,
    );
  };

  const handleClick = (idx) => {
    if (chosen !== -1) return;
    // dokunmatikte ilk dokunuş fısıltıyı gösterir, ikincisi kapıyı açar
    if (coarsePointer() && armed !== idx) {
      setArmed(idx);
      return;
    }
    setChosen(idx);
    choose(idx);
  };

  return (
    <div
      className={`${styles.container} ${chosen !== -1 ? styles.spent : ""}`}
    >
      <div className={styles.annotation}>
        <h4>{t("manifesto.choice.title")}</h4>
        <p>{t("manifesto.choice.desc")}</p>
        <ReadMore slug="choice" />
      </div>

      <div className={styles.stage}>
        <p ref={stageLineRef} className={styles.stage_line}>
          {t("manifesto.choice.stage")}
        </p>

        <div className={styles.doors}>
          {doors.map((door, i) => (
            <div
              key={i}
              className={`${styles.cell} ${armed === i ? styles.armed : ""}`}
            >
              <div className={styles.frame}>
                <span
                  className={styles.glow}
                  ref={(el) => (glowRefs.current[i] = el)}
                  aria-hidden="true"
                />
                <span
                  className={styles.doorway}
                  ref={(el) => (doorwayRefs.current[i] = el)}
                  aria-hidden="true"
                />
                <span
                  className={styles.shade}
                  ref={(el) => (shadeRefs.current[i] = el)}
                  aria-hidden="true"
                />
                <button
                  type="button"
                  ref={(el) => (doorRefs.current[i] = el)}
                  className={styles.door}
                  onClick={() => handleClick(i)}
                  disabled={chosen !== -1}
                  aria-label={door.whisper}
                >
                  {/* 3d levha: ön yüz + kalınlık veren yan yüz */}
                  <span className={styles.face_front} aria-hidden="true" />
                  <span className={styles.face_edge} aria-hidden="true" />
                </button>
                {Array.from({ length: DUST_PER_DOOR }).map((_, k) => (
                  <span
                    key={k}
                    ref={(el) =>
                      (dustRefs.current[i * DUST_PER_DOOR + k] = el)
                    }
                    className={styles.dust}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span
                ref={(el) => (whisperRefs.current[i] = el)}
                className={styles.whisper}
              >
                {door.whisper}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.outcome}>
          <p ref={sentenceRef} className={styles.sentence}>
            {chosen !== -1 ? doors[chosen]?.full : ""}
          </p>
          <p ref={finalRef} className={styles.final}>
            {t("manifesto.choice.final")}
          </p>
        </div>
      </div>
    </div>
  );
}
