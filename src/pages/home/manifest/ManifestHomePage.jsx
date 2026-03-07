import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import AnimatedSplit from "../../../components/animated split/AnimatedSplit";
import styles from "./style.module.css";
import PrimerLink from "../../../ui/link/PrimerLink";

const ManifestHomePage = () => {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);

  // Radyo buton state'i (Varsayılan olarak estetik seçili)
  const [activeTopic, setActiveTopic] = useState("aesthetic");

  // JSON'dan topicleri çekiyoruz
  const topics = t("manifest.topics", { returnObjects: true });

  return (
    <div ref={containerRef} className={styles.container} key={i18n.language}>
      <div className={styles.context}>
        <div className={styles.content}>
          <AnimatedSplit
            key={t("manifest.title")}
            text={t("manifest.title")}
            tagName="span"
            stagger={0.03}
            duration={1.5}
            className={styles.title}
            start="top 80%"
          />
          <AnimatedSplit
            key={t("manifest.desc")}
            text={t("manifest.desc")}
            tagName="span"
            stagger={0.03}
            duration={1.5}
            className={styles.desc}
            start="top 80%"
          />
        </div>

        <div className={styles.content}>
          <div className={styles.radio_group}>
            {Object.keys(topics).map((key) => (
              <label
                key={key}
                className={`${styles.radio_label} ${activeTopic === key ? styles.active_label : ""}`}
              >
                <input
                  type="radio"
                  name="manifesto_topic"
                  value={key}
                  checked={activeTopic === key}
                  onChange={(e) => setActiveTopic(e.target.value)}
                  className={styles.hidden_radio}
                />
                {topics[key].label}
              </label>
            ))}
          </div>

          <AnimatedSplit
            key={topics[activeTopic].text}
            text={topics[activeTopic].text}
            tagName="span"
            stagger={0.03}
            duration={1.5}
            className={styles.link_desc}
            start="top 80%"
          />

          <div className={styles.action_wrapper}>
            <PrimerLink
              href="/manifest"
              buttonText={t("manifest.button")}
              backgroundColor="var(--darkblue900)"
              color="var(--darkblue50)"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManifestHomePage;
