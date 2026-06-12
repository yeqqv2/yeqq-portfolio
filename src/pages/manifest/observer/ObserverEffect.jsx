import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import ReadMore from "@/pages/manifest/shared/ReadMore";
import styles from "./style.module.css";

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const coarsePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none), (pointer: coarse)").matches;

const TAGS = ["<div>", "<canvas>", "<span>", "<a>"];
const MAX_BLUR = 4;

// yörünge tanımları: yarıçap (atom yarı genişliğine oran), açısal hız (rad/sn), faz.
// 3. ve 4. elektron aynı yörüngeyi paylaşır: eş hız, zıt faz — çarpışmazlar.
const ORBITS = [
  { radius: 0.36, omega: 0.55, phase: 0.8 },
  { radius: 0.58, omega: -0.4, phase: 2.4 },
  { radius: 0.8, omega: 0.3, phase: 0 },
  { radius: 0.8, omega: 0.3, phase: Math.PI },
];

export default function ObserverEffect({ isActive = true }) {
  const { t, i18n } = useTranslation();
  const atomRef = useRef(null);
  const nucleusRef = useRef(null);
  const electronRefs = useRef([]);
  const tagRefs = useRef([]);
  const truthRefs = useRef([]);

  const lines = t("manifesto.observer.lines", { returnObjects: true }) || [];

  useEffect(() => {
    const atom = atomRef.current;
    const nucleus = nucleusRef.current;
    const electrons = electronRefs.current.filter(Boolean);
    if (!atom || !nucleus || !electrons.length) return;

    const tags = tagRefs.current;
    const truths = truthRefs.current;

    gsap.set(electrons, { xPercent: -50, yPercent: -50 });

    // hareket azaltılmış: elektronlar yörüngelerinde sabit, hepsi okunur
    if (reduceMotion()) {
      electrons.forEach((el, i) => {
        const o = ORBITS[i % ORBITS.length];
        const R = (atom.offsetWidth / 2) * o.radius;
        gsap.set(el, {
          x: Math.cos(o.phase) * R,
          y: Math.sin(o.phase) * R,
          "--blur": "0px",
          opacity: 1,
        });
      });
      gsap.set(truths, { opacity: 1 });
      gsap.set(tags, { opacity: 0 });
      nucleus.classList.add(styles.observing);
      return;
    }

    if (!isActive) {
      gsap.set(electrons, { "--blur": `${MAX_BLUR}px`, opacity: 0.45 });
      gsap.set(truths, { opacity: 0 });
      gsap.set(tags, { opacity: 1 });
      nucleus.classList.remove(styles.observing);
      return;
    }

    // dalga durumu: bulanık, yarı saydam, sadece kod etiketi görünür
    gsap.set(electrons, { "--blur": `${MAX_BLUR}px`, opacity: 0.55 });
    gsap.set(truths, { opacity: 0 });
    gsap.set(tags, { opacity: 1 });

    const angles = electrons.map((_, i) => ORBITS[i % ORBITS.length].phase);
    const F = electrons.map(() => 0); // 0: dalga, 1: gözlemlenmiş
    const targetF = electrons.map(() => 0);
    let bag = [];
    let observing = false;

    // torba: dördü de görülmeden aynı elektron tekrar seçilmez
    const pick = () => {
      if (!bag.length) bag = gsap.utils.shuffle(electrons.map((_, i) => i));
      const idx = bag.pop();
      targetF.fill(0);
      targetF[idx] = 1;
    };

    const observe = () => {
      observing = true;
      nucleus.classList.add(styles.observing);
      pick();
    };

    const release = () => {
      observing = false;
      nucleus.classList.remove(styles.observing);
      targetF.fill(0);
    };

    // tık: gözlem sürerken sıradaki elektrona geç
    const cycle = () => (observing ? pick() : observe());

    const setters = electrons.map((el, i) => ({
      x: gsap.quickSetter(el, "x", "px"),
      y: gsap.quickSetter(el, "y", "px"),
      blur: gsap.quickSetter(el, "--blur", "px"),
      alpha: gsap.quickSetter(el, "opacity"),
      tag: gsap.quickSetter(tags[i], "opacity"),
      truth: gsap.quickSetter(truths[i], "opacity"),
    }));

    const tick = () => {
      const half = atom.offsetWidth / 2;
      const dt = gsap.ticker.deltaRatio(60) / 60;

      electrons.forEach((_, i) => {
        const o = ORBITS[i % ORBITS.length];
        F[i] += (targetF[i] - F[i]) * 0.1;
        // gözlem dalgayı durdurur: çöküşle birlikte yörünge hızı sıfıra iner
        angles[i] += o.omega * dt * (1 - F[i] * 0.98);
        const R = half * o.radius;
        setters[i].x(Math.cos(angles[i]) * R);
        setters[i].y(Math.sin(angles[i]) * R);
        setters[i].blur(MAX_BLUR * (1 - F[i]));
        setters[i].alpha(0.55 + 0.45 * F[i]);
        setters[i].tag(1 - F[i]);
        setters[i].truth(F[i]);
      });
    };

    gsap.ticker.add(tick);

    const cleanups = [() => gsap.ticker.remove(tick)];
    const on = (el, ev, fn) => {
      el.addEventListener(ev, fn);
      cleanups.push(() => el.removeEventListener(ev, fn));
    };

    if (coarsePointer()) {
      // dokunmatik: dokunuş gözlemi açar, tekrar dokunuş bırakır
      on(nucleus, "click", () => (observing ? release() : observe()));
    } else {
      on(nucleus, "mouseenter", observe);
      on(nucleus, "mouseleave", release);
      on(nucleus, "click", cycle);
      // klavye odağı da bir gözlemdir
      on(nucleus, "focus", () => {
        if (nucleus.matches(":focus-visible")) observe();
      });
      on(nucleus, "blur", release);
    }

    return () => cleanups.forEach((fn) => fn());
  }, [i18n.language, isActive]);

  return (
    <div className={styles.container}>
      <div className={styles.annotation}>
        <h4>{t("manifesto.observer.title")}</h4>
        <p>{t("manifesto.observer.desc")}</p>
        <ReadMore slug="observer" />
      </div>

      <div className={styles.stage}>
        <div className={styles.atom} ref={atomRef}>
          <span className={`${styles.ring} ${styles.ring1}`} aria-hidden="true" />
          <span className={`${styles.ring} ${styles.ring2}`} aria-hidden="true" />
          <span className={`${styles.ring} ${styles.ring3}`} aria-hidden="true" />

          <button
            type="button"
            ref={nucleusRef}
            className={styles.nucleus}
            aria-label={t("manifesto.observer.eye_label")}
          >
            <span className={styles.lid} aria-hidden="true">
              <span className={styles.eye_shape}>
                <span className={styles.pupil} />
              </span>
            </span>
          </button>

          {lines.map((line, i) => (
            <div
              key={i}
              ref={(el) => (electronRefs.current[i] = el)}
              className={styles.electron}
            >
              <span
                className={styles.tag}
                ref={(el) => (tagRefs.current[i] = el)}
                aria-hidden="true"
              >
                {TAGS[i]}
              </span>
              <span
                className={styles.truth}
                ref={(el) => (truthRefs.current[i] = el)}
              >
                {line}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
