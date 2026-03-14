import { useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import NeumorphismButton from "@/ui/neumorphismButton/NeumorphismButton";
import AnimatedSplit from "@/components/animated split/AnimatedSplit";
import styles from "./style.module.css";

gsap.registerPlugin(CustomEase);
const hop = CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function ManifestArc() {
  const { t, i18n } = useTranslation();
  const footerRef = useRef(null);

  const handleStart = (isChecked) => {
    if (isChecked) {
      // Metni soldan sağa bir perde gibi açar
      gsap.to(footerRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.8,
        ease: hop,
      });
    } else {
      // Metni sağ kenara doğru pürüzsüzce kapatır
      gsap.to(footerRef.current, {
        clipPath: "inset(0% 0% 0% 100%)",
        duration: 1.2,
        ease: "power2.inOut",
      });
    }
  };

  return (
    <div className={styles.container}>
      <a
        href="https://www.moma.org/collection/works/80385"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.header}
      >
        {/* RASYONEL DÜZELTME: key={t()} yerine key={i18n.language} kullanıyoruz.
            Böylece animasyon sadece dil gerçekten değiştiğinde tetiklenir.
        */}
        <AnimatedSplit
          key={i18n.language}
          text={t("manifesto.white_on_white.question")}
          className={styles.title}
          tagName="span"
          stagger={0.03}
          duration={1.5}
          start="top 80%"
        />
      </a>

      <main className={styles.main}>
        <NeumorphismButton handleStart={handleStart} />
      </main>

      <p className={styles.footer} ref={footerRef}>
        {t("manifesto.white_on_white.footer")}
      </p>
    </div>
  );
}
