/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useCallback } from "react";
import styles from "./style.module.css";
import gsap from "gsap";
import { throttle } from "lodash-es";
import { useTranslation } from "react-i18next";
import PrimerLink from "../../../ui/link/PrimerLink";

const ContactHomePage = () => {
  const { t } = useTranslation();

  // React State (useState) tamamen kaldırıldı! Re-render yok.

  const contextRef = useRef(null);
  const containerRef = useRef(null); // Kelimelerin basılacağı kapsayıcı
  const wordIndexRef = useRef(0);
  const styleIndexRef = useRef(0);
  const lastSpawnRef = useRef(null);

  const sentencesData = t("contactHome.sentences", { returnObjects: true });

  // CSS Module sınıflarını bir diziye aldık
  const stylesArray = [
    styles.style1,
    styles.style2,
    styles.style3,
    styles.style4,
    styles.style5,
    styles.style6,
    styles.style7,
    styles.style8,
  ];

  const minimumDistance = 50;

  const handleMouseMove = useCallback(
    throttle((e) => {
      const context = contextRef.current;
      const container = containerRef.current;
      if (
        !context ||
        !container ||
        !sentencesData ||
        sentencesData.length === 0
      )
        return;

      const rect = context.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;

      x += Math.random() * 4 - 2;
      y += Math.random() * 4 - 2;

      if (lastSpawnRef.current) {
        const dx = x - lastSpawnRef.current.x;
        const dy = y - lastSpawnRef.current.y;
        const distance = Math.hypot(dx, dy);
        if (distance < minimumDistance) {
          return;
        }
      }

      // Kelime ve stil indekslerini güncelle
      if (wordIndexRef.current >= sentencesData.length)
        wordIndexRef.current = 0;
      const word = sentencesData[wordIndexRef.current];
      wordIndexRef.current += 1;

      if (styleIndexRef.current >= stylesArray.length)
        styleIndexRef.current = 0;
      const styleClass = stylesArray[styleIndexRef.current];
      styleIndexRef.current += 1;

      lastSpawnRef.current = { x, y };

      // 1. VANILLA JS İLE ELEMENT YARAT (React'i bypass ediyoruz)
      const span = document.createElement("span");
      span.textContent = word;
      span.className = styleClass; // CSS module sınıfını ekle

      // Inline stilleri ekle
      Object.assign(span.style, {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        display: "inline-block",
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
      });

      // Container içine yerleştir
      container.appendChild(span);

      // 2. GSAP İLE ANİMASYON (Animasyon bitince elementi DOM'dan sil)
      gsap.fromTo(
        span,
        { scale: 0 },
        {
          duration: 0.33,
          scale: 1.25,
          ease: "expo.out",
          rotate: Math.random() * 20 - 10,
          force3D: true,
          onComplete: () => {
            gsap.to(span, {
              duration: 0.42,
              scale: 0,
              ease: "expo.in",
              delay: 0.25,
              force3D: true,
              onComplete: () => {
                // Animasyon tamamen bitince DOM'dan uçur
                span.remove();
              },
            });
          },
        },
      );
    }, 30), // Throttle süresini hafifçe 30ms'ye çektim, performans için daha sağlıklı
    [sentencesData],
  );

  return (
    <div className={styles.container}>
      <div
        className={styles.context}
        ref={contextRef}
        onMouseMove={handleMouseMove}
      >
        <div className={styles.context_div}>
          <div className={styles.context_header}>
            <div className={styles.context_text}>{t("contactHome.header")}</div>
            <div className={styles.contact_me}>{t("contactHome.subtext")}</div>
          </div>
          <PrimerLink
            color="var(--red50)"
            backgroundColor="var(--red500)"
            buttonText={t("contactHome.link")}
            href="/contact-me"
          />
        </div>
        {/* Kelimelerin Vanilla JS ile içine basılacağı sabit container */}
        <div className={styles.sentences} ref={containerRef} />
      </div>
    </div>
  );
};

export default ContactHomePage;
