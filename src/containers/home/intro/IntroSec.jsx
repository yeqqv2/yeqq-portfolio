import styles from "./style.module.css";
import Marquee from "react-double-marquee";

const IntroSec = () => {
  const marqueeProps = {
    children: "minimalism,cubism,user(interface,experience),",
    speed: 0.33,
    direction: "left",
    childMargin: 15,
    scrollWhen: "always",
    delay: 0,
  };

  return (
    <div className={styles.container}>
      <video
        className={styles.vid}
        src="https://deepmind.google/api/blob/website/media/veo__cover_s0RKXWX.mp4"
        autoPlay
        preload="auto"
        loop
        muted
        playsInline
      />
      <div className={styles.marquee_div}>
        <div className={styles.marquee_div_content}>
          <Marquee {...marqueeProps} />
        </div>
      </div>
      <div className={styles.marquee_div_2}>
        <Marquee {...marqueeProps} />
      </div>
    </div>
  );
};

export default IntroSec;
