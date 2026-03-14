import { memo } from "react";
import styles from "./style.module.css";
import Marquee from "react-fast-marquee"; // Sadece kütüphane değişti
import { useTranslation } from "react-i18next";

const IntroSec = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <video
        className={styles.vid}
        src="/assets/videos/homepage-video.webm"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        fetchpriority="high"
        poster="/assets/loader/video-placeholder.webp"
      />

      <div className={styles.marquee_div}>
        <div className={styles.marquee_div_content}>
          <Marquee speed={400} direction="left" autoFill={true}>
            <span style={{ paddingRight: "15px" }}>
              {t("intro.marqueeText")}
            </span>
          </Marquee>
        </div>

        <div className={styles.marquee_div_2}>
          <Marquee speed={400} direction="left" autoFill={true}>
            <span style={{ paddingRight: "15px" }}>
              {t("intro.marqueeText")}
            </span>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default memo(IntroSec);
