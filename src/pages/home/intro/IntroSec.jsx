import { useRef, useEffect, memo } from "react"; // memo'yu import et
import styles from "./style.module.css";
import Marquee from "react-double-marquee";
import { useTranslation } from "react-i18next";

const IntroSec = () => {
  const { t } = useTranslation();

  const marqueeProps = {
    children: t("intro.marqueeText"),
    speed: 0.375,
    direction: "left",
    childMargin: 15,
    scrollWhen: "always",
    delay: 0,
  };

  return (
    <div className={styles.container}>
      <video
        className={styles.vid}
        src="/assets/videos/homepage-video.webm"
        /* src="https://www.pexels.com/tr-tr/download/video/25935020/" */
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        fetchpriority="high"
        poster="/assets/loader/video-placeholder.webp"
      />

      <div className={styles.marquee_div}>
        <div className={styles.marquee_div_content}>
          <Marquee key={t("intro.marqueeText")} {...marqueeProps} />
        </div>
        <div className={styles.marquee_div_2}>
          <Marquee key={t("intro.marqueeText")} {...marqueeProps} />
        </div>
      </div>
    </div>
  );
};

// Bileşeni memo ile sarmalayarak dışarı aktar
export default memo(IntroSec);
