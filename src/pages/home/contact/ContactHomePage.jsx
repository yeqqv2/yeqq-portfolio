/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useCallback } from "react";
import styles from "./style.module.css";
import gsap from "gsap";
import { throttle } from "lodash-es";
import { useTranslation } from "react-i18next";
import PrimerLink from "@/ui/link/PrimerLink";

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

  const minimumDistance = 60;

  // Tek bir kelimeyi verilen ekran konumunda (clientX/Y) patlat.
  const spawnWord = useCallback(
    (clientX, clientY) => {
      const context = contextRef.current;
      const container = containerRef.current;
      if (!context || !container || !sentencesData || sentencesData.length === 0)
        return;

      const rect = context.getBoundingClientRect();
      const x = clientX - rect.left + (Math.random() * 4 - 2);
      const y = clientY - rect.top + (Math.random() * 4 - 2);

      if (wordIndexRef.current >= sentencesData.length) wordIndexRef.current = 0;
      const word = sentencesData[wordIndexRef.current];
      wordIndexRef.current += 1;

      if (styleIndexRef.current >= stylesArray.length) styleIndexRef.current = 0;
      const styleClass = stylesArray[styleIndexRef.current];
      styleIndexRef.current += 1;

      // Her kelime için React render etmemek adına DOM'a doğrudan yazıyoruz.
      const span = document.createElement("span");
      span.textContent = word;
      span.className = styleClass;
      Object.assign(span.style, {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        display: "inline-block",
        pointerEvents: "none",
        zIndex: 2,
        willChange: "transform",
      });
      container.appendChild(span);

      gsap.fromTo(
        span,
        { scale: 0 },
        {
          duration: 0.45,
          scale: 1.25,
          ease: "butter",
          rotate: Math.random() * 20 - 10,
          force3D: true,
          onComplete: () => {
            gsap.to(span, {
              duration: 0.55,
              scale: 0,
              ease: "expo.in",
              delay: 0.25,
              force3D: true,
              onComplete: () => span.remove(),
            });
          },
        },
      );
    },
    [sentencesData],
  );

  // İmleç/parmak takibi: hareket ettikçe iz bırak (mouse hover + touch drag).
  const handlePointerMove = useCallback(
    throttle((e) => {
      const last = lastSpawnRef.current;
      if (last) {
        const distance = Math.hypot(e.clientX - last.x, e.clientY - last.y);
        if (distance < minimumDistance) return;
      }
      lastSpawnRef.current = { x: e.clientX, y: e.clientY };
      spawnWord(e.clientX, e.clientY);
    }, 30),
    [spawnWord],
  );

  // Dokunma/tıklama: mobilde "takip" yokken tek noktada küçük bir demet patlat.
  const handlePointerDown = useCallback(
    (e) => {
      lastSpawnRef.current = { x: e.clientX, y: e.clientY };
      const burst = e.pointerType === "touch" ? 3 : 1;
      for (let i = 0; i < burst; i++) {
        spawnWord(e.clientX + (Math.random() * 50 - 25), e.clientY + (Math.random() * 50 - 25));
      }
    },
    [spawnWord],
  );

  return (
    <div className={styles.container}>
      <div
        className={styles.context}
        ref={contextRef}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
      >
        <div className={styles.context_div}>
          <div className={styles.context_header}>
            <div className={styles.context_text}>{t("contactHome.header")}</div>
            <div className={styles.contact_me}>{t("contactHome.subtext")}</div>
          </div>
          <PrimerLink
            buttonText={t("contactHome.link")}
            href="/contact-me"
            random
          />
        </div>
        {/* Kelimelerin Vanilla JS ile içine basılacağı sabit container */}
        <div className={styles.sentences} ref={containerRef} />
      </div>
    </div>
  );
};

export default ContactHomePage;
