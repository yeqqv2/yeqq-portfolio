import React from "react";
import styles from "./style.module.css";
import Marquee from "react-double-marquee";

const IntroSec = () => {
  const marqueeProps = {
    children: "minimalism,cubism,user(interface,experience),",
    speed: 0.25,
    direction: "left",
    childMargin: 15,
    scrollWhen: "always",
    delay: 0,
  };

  return (
    <div className={styles.container}>
      <video
        className={styles.vid}
        src="https://videos.pexels.com/video-files/18069786/18069786-uhd_1440_2560_30fps.mp4"
        autoPlay
        preload="auto"
        loop
        muted
        playsInline
      />
      <div className={styles.marquee_div}>
        <Marquee {...marqueeProps} />
      </div>
      <div className={styles.marquee_div_2}>
        <Marquee {...marqueeProps} />
      </div>
    </div>
  );
};

export default IntroSec;
