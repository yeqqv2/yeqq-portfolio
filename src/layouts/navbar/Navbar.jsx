import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import MenuButton from "@/ui/menu/MenuButton";
import PrimerLink from "@/ui/link/PrimerLink";
import PrimerButton from "@/ui/button/PrimerButton";

import gsap from "gsap";
import { GoArrowRight } from "react-icons/go";
import { useTranslation } from "react-i18next";

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
  const firstSidebarLinkRef = useRef(null);
  const layersRef = useRef([]);

  useEffect(() => {
    gsap.set(sidebarRef.current, { x: "-100%" });
    gsap.set(layersRef.current, { x: "-100%" });
  }, []);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    const main = document.getElementById("main");
    const footer = document.querySelector("footer");

    [main, footer].forEach((el) => {
      if (!el) return;
      el.inert = isSidebarOpen;
      if (isSidebarOpen) {
        el.setAttribute("aria-hidden", "true");
      } else {
        el.removeAttribute("aria-hidden");
      }
    });

    if (sidebarRef.current) {
      sidebarRef.current.inert = !isSidebarOpen;
    }

    if (isSidebarOpen) {
      requestAnimationFrame(() => firstSidebarLinkRef.current?.focus());
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isSidebarOpen) {
        setIsSidebarOpen(false);
      }

      if (e.key !== "Tab" || !isSidebarOpen || !sidebarRef.current) return;

      const focusable = sidebarRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      [main, footer].forEach((el) => {
        if (!el) return;
        el.inert = false;
        el.removeAttribute("aria-hidden");
      });
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

  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.menu_item} ${styles.left}`}>
          <MenuButton
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
            label={isSidebarOpen ? t("nav.menu_close") : t("nav.menu_open")}
          />
        </div>
        <Link to="/" className={styles.logo} onClick={handleLinkClick}>
          [ yeqq ]
        </Link>
        <div className={`${styles.right} ${styles.menu_item}`}>
          <PrimerLink
            href="/contact-me"
            buttonText={t("nav.contact_btn")}
            backgroundColor="var(--main-color400)"
            color="var(--main-color900)"
          />
          <PrimerButton
            onClick={toggleLanguage}
            buttonText={i18n.language.split("-")[0]}
            backgroundColor="var(--orange500)"
            color="var(--wb50)"
            ariaLabel={t("nav.language_toggle")}
          />
        </div>
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

      <section
        ref={sidebarRef}
        className={styles.sidebar}
        aria-hidden={!isSidebarOpen}
        aria-label={t("nav.menu_label")}
      >
        <span className={styles.close}>
          <MenuButton
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
            label={t("nav.menu_close")}
          />
        </span>
        <div className={styles.links}>
          <Link
            ref={firstSidebarLinkRef}
            to="/"
            className={styles.link}
            onClick={handleLinkClick}
          >
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
              <span aria-hidden="true">,</span>
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
              <span aria-hidden="true">,</span>
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
