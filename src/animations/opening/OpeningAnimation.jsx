import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./style.module.css";
import NeumorphismButton from "../../tools/neumorphism button/NeumorphismButton";

const Terminal = () => {
  const [start, setStart] = useState(false);
  const containerRef = useRef(null);
  const lightRef = useRef(null);
  const titleRef = useRef(null);

  const handleStart = () => {
    // Butonun yavaşça kaybolmasını sağla
    gsap.to(lightRef.current, {
      opacity: 0,
      duration: 2,
      onComplete: () => {
        if (lightRef.current) {
          lightRef.current.style.display = "none"; // display: none uygula
        }
        setStart(true); // "start" durumunu güncelle
      },
    });
  };

  useEffect(() => {
    if (start) {
      // Başlık animasyonunu başlat
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      );

      // 5 saniye sonra containerRef animasyonunu başlat
      const timer = setTimeout(() => {
        gsap.to(containerRef.current, {
          y: "-100%",
          duration: 2,
          ease: "expo.in",
          onComplete: () => {
            if (containerRef.current) {
              containerRef.current.style.display = "none";
            }
          },
        });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [start]);

  return (
    <div ref={containerRef} className={styles.container}>
      {!start && (
        <div ref={lightRef}>
          <NeumorphismButton handleStart={handleStart} />
        </div>
      )}
      <div
        ref={titleRef}
        className={`${styles.title} ${start ? styles.visible : styles.hidden}`}
      >
        <div className={styles.quote_icon}>❝</div>
        <div className={styles.p}>
          I have broken the blue boundary of color limits, come out into the
          white; beside me, comrade‐pilots, swim in this infinity.
        </div>
        <i className={styles.author}>Kazimir Malevich, White on White (1918)</i>
      </div>
    </div>
  );
};

export default Terminal;
