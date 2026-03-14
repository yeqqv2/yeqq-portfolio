import React from "react";
import styles from "./style.module.css";
// 1. Hook'u import et
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  // 2. t fonksiyonunu al
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.logo}>[ yeqq ]</header>
        <section className={styles.links_container}>
          <main className={styles.links}>
            <div className={styles.links_header}>
              {t("footer.links_header")}
            </div>
            <div className={styles.links_content}>
              <Link className={styles.link} to="/">
                {t("footer.home")}
              </Link>
              <Link className={styles.link} to="/about-me">
                {t("footer.about")}
              </Link>
              <Link className={styles.link} to="/manifest">
                {t("footer.manifest")}
              </Link>
              <Link className={styles.link} to="/projects">
                {t("footer.projects")}
              </Link>
            </div>
          </main>

          <main className={styles.links}>
            <div className={styles.links_header}>
              {t("footer.connect_header")}
            </div>
            <div className={styles.links_content}>
              <a
                className={styles.link}
                target="__blank"
                href="https://www.instagram.com/1yunusewre"
              >
                instagram
              </a>
              <a
                className={styles.link}
                target="__blank"
                href="https://github.com/yeqqv2"
              >
                github
              </a>
              <a
                className={styles.link}
                target="__blank"
                href="https://tr.linkedin.com/in/yeqq"
              >
                linkedin
              </a>
            </div>
          </main>

          <main className={styles.links}>
            <div className={styles.links_header}>
              {t("footer.contact_header")}
            </div>
            <div className={styles.links_content}>
              <Link className={styles.link} to="/contact-me">
                {t("footer.contact_btn")}
              </Link>
            </div>
          </main>
        </section>
      </div>
      <hr />
      <footer className={styles.footer}>
        {t("footer.signature")}© {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Footer;
