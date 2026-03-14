import React, { useState, useRef, useEffect } from "react";
// KRİTİK EKLENTİ: React Router Link bileşeni
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import MenuButton from "@/ui/menu/MenuButton";
import PrimerLink from "@/ui/link/PrimerLink";
import PrimerButton from "@/ui/button/PrimerButton";

import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { GoArrowRight } from "react-icons/go";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(CustomEase);

if (!gsap.parseEase("hop")) {
  CustomEase.create("hop", "0.9, 0, 0.1, 1");
}

const LAYER_COLORS = [
  "var(--red500)",
  "var(--pink300)",
  "var(--purple400)",
  "var(--orange600)",
  "var(--main-color500)",
  "var(--blue300)",
];

const LANGUAGES = ["tr", "en"];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarRef = useRef(null);
  const layersRef = useRef([]);

  useEffect(() => {
    gsap.set(sidebarRef.current, { x: "-100%" });
    gsap.set(layersRef.current, { x: "-100%" });
  }, []);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    gsap.killTweensOf([sidebarRef.current, ...layersRef.current]);
    const tl = gsap.timeline();

    if (isSidebarOpen) {
      tl.to(layersRef.current, {
        x: "0%",
        duration: 0.5,
        ease: "hop",
        stagger: 0.05,
      }).to(
        sidebarRef.current,
        { x: "0%", duration: 0.6, ease: "hop" },
        "-=0.4",
      );
    } else {
      tl.to(sidebarRef.current, { x: "-100%", duration: 0.5, ease: "hop" }).to(
        layersRef.current.slice().reverse(),
        { x: "-100%", duration: 0.5, ease: "hop", stagger: 0.04 },
        "-=0.4",
      );
    }
  }, [isSidebarOpen]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const toggleLanguage = () => {
    const currentIndex = LANGUAGES.indexOf(i18n.language.split("-")[0]);
    const nextIndex = (currentIndex + 1) % LANGUAGES.length;
    i18n.changeLanguage(LANGUAGES[nextIndex]);
  };

  // PREFETCH FONKSİYONLARI (Kullanıcı hover olduğunda ilgili sayfanın kodunu arka planda indirir)
  const prefetchAbout = () => import("@/pages/about/AboutPage");
  const prefetchManifest = () => import("@/pages/manifest/ManifestPage");
  const prefetchProjects = () => import("@/pages/projects/ProjectsPage");

  // Linke tıklandığında menüyü kapatması için yardımcı fonksiyon
  const handleLinkClick = () => {
    setIsSidebarOpen(false);
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
        {/* LOGO da bir Link olmalı */}
        <Link to="/" className={styles.logo} onClick={handleLinkClick}>
          [ yeqq ]
        </Link>
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

      <div className={styles.layersContainer}>
        {LAYER_COLORS.map((color, index) => (
          <div
            key={index}
            ref={(el) => (layersRef.current[index] = el)}
            className={styles.layer}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <section ref={sidebarRef} className={styles.sidebar}>
        <span className={styles.close}>
          <MenuButton
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />
        </span>
        <div className={styles.links}>
          {/* 'a' etiketleri Link ile değiştirildi, onMouseEnter ile prefetch eklendi */}
          <Link to="/" className={styles.link} onClick={handleLinkClick}>
            <span className={styles.link_icon}>
              <GoArrowRight />
            </span>
            {t("nav.home")}
          </Link>
          <Link
            to="/about-me"
            className={styles.link}
            onMouseEnter={prefetchAbout}
            onClick={handleLinkClick}
          >
            <span className={styles.link_icon}>
              <GoArrowRight />
            </span>
            {t("nav.about")}
          </Link>
          <Link
            to="/manifest"
            className={styles.link}
            onMouseEnter={prefetchManifest}
            onClick={handleLinkClick}
          >
            <span className={styles.link_icon}>
              <GoArrowRight />
            </span>
            {t("nav.manifest")}
          </Link>
          <Link
            to="/projects"
            className={styles.link}
            onMouseEnter={prefetchProjects}
            onClick={handleLinkClick}
          >
            <span className={styles.link_icon}>
              <GoArrowRight />
            </span>
            {t("nav.projects")}
          </Link>
        </div>
        <div className={styles.links}>
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
              {/* Harici linkler (Farklı sitelere gidenler) 'a' kalmalı, ancak aria-label eklenmeli */}
              <a
                className={styles.contact_link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile"
                href="https://www.instagram.com/1yunusewre"
                onClick={toggleSidebar}
              >
                instagram
              </a>
              ,
              <a
                className={styles.contact_link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                href="https://github.com/yeqqv2"
                onClick={toggleSidebar}
              >
                github
              </a>
              ,
              <a
                className={styles.contact_link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
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
