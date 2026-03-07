import { useEffect, useRef } from "react";
import styles from "./style.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";
import AnimatedSplit from "../../../components/animated split/AnimatedSplit";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function HeroAbout() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  const workImages = [
    "/assets/modern-art/9.webp",
    "/assets/modern-art/10.webp",
    "/assets/modern-art/11.webp",
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Callback ref'ler yerine, context içindeki class'ları doğrudan, güvenli bir şekilde seçiyoruz
      const workItems = gsap.utils.toArray(`.${styles.work_item}`);

      workItems.forEach((work, index) => {
        const img = work.querySelector(`.${styles.work_img}`);
        if (!img) return;

        gsap.set(img, { clipPath: "inset(100% 0% 0% 0%)" });

        gsap.fromTo(
          img,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "hop",
            delay: index * 0.15,
            scrollTrigger: {
              trigger: work,
              start: "top 100%",
              // Manuel trigger takibine gerek yok, ctx.revert() hallediyor
            },
          },
        );

        gsap.fromTo(
          work,
          { y: 20 },
          {
            y: 0,
            duration: 0.8,
            ease: "hop",
            delay: index * 0.12,
            scrollTrigger: {
              trigger: work,
              start: "top 85%",
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <header className={styles.header} ref={headerRef}>
        <AnimatedSplit
          key={`${i18n.language}-hero-title`}
          text={t("heroAbout.title")}
          className={styles.title}
          tagName="span"
          stagger={0.03}
          duration={1.5}
          start="top 80%"
        />
        <div className={styles.desc}>
          <div className={styles.text_and_imgs}>
            <div className={styles.content_desc_text}>
              {/* SplitType hayaleti silindi, metinleri AnimatedSplit sorunsuzca çözer */}
              <AnimatedSplit
                key={`${i18n.language}-hero-desc-1`}
                text={t("heroAbout.content_text_1")}
                className={styles.content_desc_text_p}
                tagName="span"
                stagger={0.03}
                duration={1.5}
                start="top 100%"
              />
              <AnimatedSplit
                key={`${i18n.language}-hero-desc-2`}
                text={t("heroAbout.content_text_2")}
                className={styles.content_desc_text_p}
                tagName="span"
                stagger={0.03}
                duration={1.5}
                start="top 100%"
              />
            </div>

            <div className={styles.work_container}>
              {workImages.map((src, idx) => (
                <div key={idx} className={styles.work_item}>
                  <img
                    src={src}
                    alt={`work-${idx + 1}`}
                    className={styles.work_img}
                    aria-hidden="true"
                    loading={idx === 0 ? "eager" : "lazy"} // Optimizasyon
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
