import { useRef, useEffect } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import styles from "./style.module.css";
import ReflectiveCard from "@/components/mirror/ReflectiveCard";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function BackstageAnimation() {
  const mirrorRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // React'in komponenti unmount ettiğinde animasyonları temizlemesi için context şart
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // 1. Ayna Animasyonu: Perde gibi yukarıdan aşağı açılma
      tl.fromTo(
        mirrorRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "hop" }, // Bitiş: Tamamen açık
      ).fromTo(
        textRef.current,
        { clipPath: "inset(100% 0% 0% 0%)", y: 50 },
        { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 1, ease: "hop" },
        "-=1.2",
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.container}>
      {/* Metin katmanı */}
      <div className={styles.ui_layer} ref={textRef}>
        <h1 className={styles.title}>look at the mirror</h1>
        <p className={styles.desc}>look & say somethin to yourself</p>
      </div>

      {/* Ayna katmanı */}
      <div ref={mirrorRef} className={styles.mirror_wrapper}>
        <ReflectiveCard
          blurStrength={2}
          glassDistortion={0}
          metalness={0.6}
          roughness={0.4}
          displacementStrength={1}
          noiseScale={2}
          specularConstant={1.5}
          grayscale={0.2}
        />
      </div>
    </div>
  );
}
