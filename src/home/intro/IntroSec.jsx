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

  /* ------------------------------------------
     OPTIMIZED MOUSE TRACKING (RAF THROTTLED)
  -------------------------------------------*/
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId = null;

    const updateMouse = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const strength = 0.05;

      const offsetX = (e.clientX - centerX) * strength;
      const offsetY = (e.clientY - centerY) * strength;

      container.style.setProperty("--mouse-x-offset", `${offsetX}px`);
      container.style.setProperty("--mouse-y-offset", `${offsetY}px`);

      rafId = null;
    };

    const handleMouseMove = (e) => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => updateMouse(e));
    };

    const resetOffsets = () => {
      container.style.setProperty("--mouse-x-offset", "0px");
      container.style.setProperty("--mouse-y-offset", "0px");
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", resetOffsets);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", resetOffsets);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  /* ------------------------------------------
     OPTIMIZED VIDEO LOOP (MORE PERFORMANT)
  -------------------------------------------*/
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Daha performanslı → event gerekmez
    video.loop = true;
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
        preload="metadata"
        fetchpriority="high"
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
