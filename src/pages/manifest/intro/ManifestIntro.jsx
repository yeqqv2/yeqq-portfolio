import { useTranslation } from "react-i18next";
import AnimatedSplit from "@/components/animated-split/AnimatedSplit";
import styles from "./style.module.css";

/* pinli interaktif panel dizisinden önce gelen sakin açılış. mevcut iki
   dilli tezi (manifesto.header) okutur, sonra kullanıcıyı aşağıdaki
   panellere yönlendirir. key={dil} ile dil değişiminde reveal yeniden oynar. */
export default function ManifestIntro() {
  const { t, i18n } = useTranslation();

  return (
    <section className={styles.intro} key={i18n.language}>
      <div className={styles.top}>
        <AnimatedSplit
          text={t("manifesto.header.title")}
          className={styles.eyebrow}
          tagName="span"
          stagger={0.03}
          duration={1.2}
          start="top bottom"
        />
      </div>

      <AnimatedSplit
        text={t("manifesto.header.desc")}
        className={styles.statement}
        tagName="p"
        stagger={0.012}
        duration={1.4}
        start="top bottom"
      />

      <div className={styles.foot}>
        <AnimatedSplit
          text={t("manifesto.intro.scroll")}
          className={styles.cue}
          tagName="span"
          stagger={0.03}
          duration={1.2}
          start="top bottom"
        />
        <span className={styles.arrow} aria-hidden="true" />
      </div>
    </section>
  );
}
