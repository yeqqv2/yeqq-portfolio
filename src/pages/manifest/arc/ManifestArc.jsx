import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import SplitType from "split-type";
import NeumorphismButton from "@/ui/neumorphismButton/NeumorphismButton";
import AnimatedSplit from "@/components/animated split/AnimatedSplit";
import ReadMore from "@/pages/manifest/shared/ReadMore";
import styles from "./style.module.css";

gsap.registerPlugin(CustomEase);
const hop = CustomEase.create("hop", "0.9, 0, 0.1, 1");

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function ManifestArc() {
  const { t, i18n } = useTranslation();
  const footerRef = useRef(null);
  const readMoreRef = useRef(null);
  const wordsRef = useRef([]);
  const openRef = useRef(false);

  // cevap metni, sorudaki AnimatedSplit ile aynı teknikle bölünür;
  // fark: scroll yerine butona bağlı tetiklenir.
  useEffect(() => {
    if (!footerRef.current) return;

    const split = new SplitType(footerRef.current, {
      types: "lines, words",
      tagName: "span",
    });
    wordsRef.current = split.words || [];

    // dil değişiminde mevcut duruma sadık kal: buton açıksa metin açık kalır
    gsap.set(wordsRef.current, { y: openRef.current ? "0%" : "110%" });
    gsap.set(footerRef.current, { autoAlpha: 1 });

    return () => {
      try {
        split.revert();
      } catch (e) {
        // noop
      }
    };
  }, [i18n.language]);

  const handleStart = (isChecked) => {
    openRef.current = isChecked;
    const words = wordsRef.current;

    // hareket azaltılmışsa animasyonsuz aç/kapat
    if (reduceMotion()) {
      gsap.set(words, { y: isChecked ? "0%" : "110%" });
      gsap.set(readMoreRef.current, { autoAlpha: isChecked ? 1 : 0, y: 0 });
      return;
    }

    if (isChecked) {
      // cevap kelime kelime maskeden yükselir; ardından detay bağlantısı belirir
      gsap.to(words, {
        y: "0%",
        duration: 1.2,
        ease: hop,
        stagger: 0.02,
        overwrite: true,
      });
      gsap.to(readMoreRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        delay: 0.8,
        ease: "power2.out",
        overwrite: true,
      });
    } else {
      // kelimeler maskeye geri iner, bağlantı da onlarla kaybolur
      gsap.to(words, {
        y: "110%",
        duration: 0.6,
        ease: "power2.inOut",
        stagger: 0.006,
        overwrite: true,
      });
      gsap.to(readMoreRef.current, {
        autoAlpha: 0,
        y: 8,
        duration: 0.4,
        ease: "power2.inOut",
        overwrite: true,
      });
    }
  };

  return (
    <div className={styles.container}>
      {/* eser: devasa boşlukta tek başına, duvarda asılı */}
      <div className={styles.main}>
        <NeumorphismButton handleStart={handleStart} />
      </div>

      {/* müze etiketi: sol altta, eseri açıklayan placard */}
      <div className={styles.placard}>
        <h4 className={styles.label}>{t("manifesto.white_on_white.title")}</h4>
        <AnimatedSplit
          key={`question-${i18n.language}`}
          text={t("manifesto.white_on_white.question")}
          className={styles.title}
          tagName="span"
          stagger={0.03}
          duration={1.5}
          start="top 80%"
        />
        <p
          className={styles.footer}
          ref={footerRef}
          key={`footer-${i18n.language}`}
        >
          {t("manifesto.white_on_white.footer")}
        </p>
        <div className={styles.read_more} ref={readMoreRef}>
          <ReadMore slug="white" />
        </div>
      </div>
    </div>
  );
}
