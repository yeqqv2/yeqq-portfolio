import styles from "./style.module.css";
import AnimatedSplit from "../../../components/animated split/AnimatedSplit";
import { useTranslation } from "react-i18next";

export default function Aboutme() {
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <AnimatedSplit
          // Koca bir metin yerine, dil koduyla temiz bir re-render tetikleyicisi
          key={`${i18n.language}-aboutme-title`}
          text={t("aboutmePage.title")}
          className={styles.header_title}
          tagName="span"
          stagger={0.03}
          duration={1.5}
          start="top 80%"
        />
      </header>
      <div className={styles.context}>
        <AnimatedSplit
          key={`${i18n.language}-aboutme-bio1`}
          text={t("aboutmePage.bio_1")}
          className={styles.desc}
          tagName="span"
          stagger={0.03}
          duration={1.5}
          start="top 80%"
        />
      </div>
      <div className={styles.context}>
        <AnimatedSplit
          key={`${i18n.language}-aboutme-bio2`}
          text={t("aboutmePage.bio_2")}
          className={styles.desc}
          tagName="span"
          stagger={0.03}
          duration={1.5}
          start="top 70%"
        />
      </div>
    </div>
  );
}
