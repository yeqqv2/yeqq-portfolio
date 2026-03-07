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

  useEffect(() => {
    gsap.set(sidebarRef.current, { x: "-100%" });
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

  useEffect(() => {
    if (isSidebarOpen) {
      gsap.to(sidebarRef.current, {
        x: "0%",
        duration: 0.5,
        ease: "hop",
      });
    } else {
      gsap.to(sidebarRef.current, {
        x: "-100%",
        duration: 0.5,
        ease: "hop",
      });
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
        {/* <section className={styles.nav_links}>
					<a href="/" className={styles.nav_link}>
						home
					</a>
					,
					<a href="/about-me" className={styles.nav_link}>
						aboutme
					</a>
					,
					<a href="/projects" className={styles.nav_link}>
						projects
					</a>
				</section> */}
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
      {/* SIDEBAR */}
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
                aria-label="My Instagram Profile"
              >
                instagram
              </a>
              ,
              <a
                className={styles.contact_link}
                target="__blank"
                href="https://github.com/yeqqv2"
                onClick={toggleSidebar}
                aria-label="My Github Profile"
              >
                github
              </a>
              ,
              <a
                className={styles.contact_link}
                target="__blank"
                href="https://tr.linkedin.com/in/yeqq"
                onClick={toggleSidebar}
                aria-label="My Linkedin Profile"
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
