import { useRef, useEffect } from 'react';
import styles from "./style.module.css";
import Marquee from "react-double-marquee";

const IntroSec = () => {
  const marqueeProps = {
    children: "MINIMALISM, UI/UX DESIGN, DIGITAL ART,",
    speed: 0.25,
    direction: "left",
    childMargin: 15,
    scrollWhen: "always",
    delay: 0,
  };

  const containerRef = useRef(null);
  const videoRef = useRef(null);

  // Mouse Move Efekti (Senin kodun - korundu)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const strength = 0.05;
      const offsetX = (e.clientX - centerX) * strength;
      const offsetY = (e.clientY - centerY) * strength;
      container.style.setProperty('--mouse-x-offset', `${offsetX}px`);
      container.style.setProperty('--mouse-y-offset', `${offsetY}px`);
    };

    const handleMouseLeave = () => {
      container.style.setProperty('--mouse-x-offset', '0px');
      container.style.setProperty('--mouse-y-offset', '0px');
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Video Loop (Senin kodun - korundu)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleEnded = () => {
      video.currentTime = 0;
      video.play();
    };
    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <video
        ref={videoRef}
        className={styles.vid}
        src="/assets/videos/homepage-video.webm"
        autoPlay
        muted
        playsInline
        poster="/assets/loader/video-placeholder.webp"
      />

      <div className={styles.marquee_div}>
        <div className={styles.marquee_div_content}>
          <Marquee {...marqueeProps} />
        </div>
        <div className={styles.marquee_div_2}>
          <Marquee {...marqueeProps} />
        </div>
      </div>
    </div>
  );
};

export default IntroSec;