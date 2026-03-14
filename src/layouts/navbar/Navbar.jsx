import React, { useState, useRef, useEffect } from "react";
import styles from "./style.module.css";
import MenuButton from "../../ui/menu/MenuButton";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { GoArrowRight } from "react-icons/go";
import { useTranslation } from "react-i18next";
import PrimerLink from "../../ui/link/PrimerLink";
import PrimerButton from "../../ui/button/PrimerButton";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarRef = useRef(null);
  const layersRef = useRef([]);

  const layerColors = [
    "var(--red500)",
    "var(--pink300)",
    "var(--purple400)",
    "var(--orange600)",
    "var(--main-color500)",
    "var(--blue300)",
  ];

  useEffect(() => {
    gsap.set(sidebarRef.current, { x: "-100%" });
    gsap.set(layersRef.current, { x: "-100%" });
  }, []);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isSidebarOpen]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setIsSidebarOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // KUSURSUZ KOREOGRAFİ (TIMELINE)
  useEffect(() => {
    // Çakışmaları önlemek için çalışan animasyonları temizle
    gsap.killTweensOf([sidebarRef.current, ...layersRef.current]);

    const tl = gsap.timeline();

    if (isSidebarOpen) {
      // 1. Önce renkli katmanlar iskambil gibi dizilerek açılır
      tl.to(layersRef.current, {
        x: "0%",
        duration: 0.5,
        ease: "hop",
        stagger: 0.05,
      }).to(
        sidebarRef.current,
        {
          x: "0%",
          duration: 0.6,
          ease: "hop",
        },
        "-=0.4",
      );
    } else {
      // 1. Kapanırken önce asıl sidebar içeriği çekilir
      tl.to(sidebarRef.current, {
        x: "-100%",
        duration: 0.5,
        ease: "hop",
      })
        // 2. Ardından arkadaki renkli katmanlar ters sırayla toplanır
        .to(
          layersRef.current.slice().reverse(),
          {
            x: "-100%",
            duration: 0.5,
            ease: "hop",
            stagger: 0.04,
          },
          "-=0.4",
        );
    }
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const languages = ["tr", "en"];

  const toggleLanguage = () => {
    const currentIndex = languages.indexOf(i18n.language.split("-")[0]);
    const nextIndex = (currentIndex + 1) % languages.length;
    i18n.changeLanguage(languages[nextIndex]);
  };

  return (
    <>
      <div className={styles.container}>
        <main className={`${styles.menu_item} ${styles.left}`}>
          <MenuButton
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />
        </main>
        <a href="/" className={styles.logo}>
          [ yeqq ]
        </a>
        <main className={`${styles.right} ${styles.menu_item}`}>
          <PrimerLink
            href="/contact-me"
            buttonText={t("nav.contact_btn")}
            backgroundColor="var(--green300)"
            color="var(--green800)"
          />
          <PrimerButton
            onClick={toggleLanguage}
            buttonText={i18n.language.split("-")[0]}
            backgroundColor="var(--green300)"
            color="var(--green800)"
          />
        </main>
      </div>

      {/* ARKAPLAN KATMANLARI (Yeni Eklendi) */}
      <div className={styles.layersContainer}>
        {layerColors.map((color, index) => (
          <div
            key={index}
            ref={(el) => (layersRef.current[index] = el)}
            className={styles.layer}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* SIDEBAR (Ana İçerik) */}
      <section ref={sidebarRef} className={styles.sidebar}>
        <span className={styles.close}>
          <MenuButton
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />
        </span>
        <div className={styles.links}>
          <a href="/" className={styles.link}>
            <span className={styles.link_icon}>
              <GoArrowRight />
            </span>
            {t("nav.home")}
          </a>
          {/* Diğer linkler aynen kalıyor */}
          <a href="/about-me" className={styles.link}>
            <span className={styles.link_icon}>
              <GoArrowRight />
            </span>
            {t("nav.about")}
          </a>
          <a href="/manifest" className={styles.link}>
            <span className={styles.link_icon}>
              <GoArrowRight />
            </span>
            {t("nav.manifest")}
          </a>
          <a href="/projects" className={styles.link}>
            <span className={styles.link_icon}>
              <GoArrowRight />
            </span>
            {t("nav.projects")}
          </a>
        </div>
        <div className={styles.links}>
          {/* İletişim blokların aynen kalıyor... */}
          <div className={styles.contact_link_sec}>
            <div className={styles.contact_link_header}>
              {t("nav.contact_header")}
            </div>
            <div className={styles.contact_links}>
              <PrimerLink
                href="/contact-me"
                buttonText={t("nav.contact")}
                backgroundColor="var(--blue400)"
                color="var(--blue50)"
                onClick={toggleSidebar}
              />
            </div>
          </div>
          <div className={styles.contact_link_sec}>
            <div className={styles.contact_link_header}>{t("nav.connect")}</div>
            <div className={styles.contact_links}>
              <a
                className={styles.contact_link}
                target="__blank"
                href="https://www.instagram.com/1yunusewre"
                onClick={toggleSidebar}
              >
                instagram
              </a>
              ,
              <a
                className={styles.contact_link}
                target="__blank"
                href="https://github.com/yeqqv2"
                onClick={toggleSidebar}
              >
                github
              </a>
              ,
              <a
                className={styles.contact_link}
                target="__blank"
                href="https://tr.linkedin.com/in/yeqq"
                onClick={toggleSidebar}
              >
                linkedin
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
