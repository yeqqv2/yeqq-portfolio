import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./style.module.css";
import NeumorphismButton from "../../tools/neumorphism button/NeumorphismButton";

const Terminal = () => {
  const [start, setStart] = useState(false);
  const containerRef = useRef(null);
  const lightRef = useRef(null);
  const titleRef = useRef(null);
  const progressBarRef = useRef(null);

  const loadingDuration = 5;

  const handleStart = () => {
    gsap.to(lightRef.current, {
      opacity: 0,
      duration: 2,
      onComplete: () => {
        if (lightRef.current) {
          lightRef.current.style.display = "none";
        }
        setStart(true);
      },
    });
  };

  useEffect(() => {
    if (start) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      );
      gsap.fromTo(
        progressBarRef.current,
        { width: "0%" },
        {
          width: "100%",
          duration: loadingDuration,
          ease: "linear",
          onComplete: () => {
            gsap.to(containerRef.current, {
              y: "-100%",
              duration: 2,
              ease: "expo.inOut",
              onComplete: () => {
                if (containerRef.current) {
                  containerRef.current.style.display = "none";
                }
              },
            });
          },
        }
      );
    }
  }, [start]);

  return (
    <div
      ref={containerRef}
      className={styles.container}>
      {!start && (
        <div ref={lightRef}>
          <NeumorphismButton handleStart={handleStart} />
        </div>
      )}
      <div
        ref={titleRef}
        className={`${styles.content} ${
          start ? styles.visible : styles.hidden
        }`}>
        <div className={styles.img_div}></div>
        <div className={styles.title}>
          <div className={styles.p}>
            “ Gökyüzünü renklerle bezemenin üstesinden geldim. Beyaz boşlukta
            yüzün, sonsuzluk karşınızda. ”
          </div>
          <i className={styles.author}>(Kazimir Malevich, White on White)</i>
        </div>
      </div>
      {/* Start durumu true olduğunda altta sabit bulunan yükleme çubuğu */}
      {start && (
        <div
          ref={progressBarRef}
          className={styles.progressBar}></div>
      )}
    </div>
  );
};

export default Terminal;
