import React from "react";
import styles from "./style.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.logo}>(yeqq)</header>
        <main className={styles.links}>
          <div className={styles.links_header}>(links)</div>
          <div className={styles.links_content}>
            <a className={styles.link} href="/">
              anasayfa
            </a>
            <a className={styles.link} href="/about-me">
              hakkımda
            </a>
            <a className={styles.link} href="/">
              projeler
            </a>
          </div>
        </main>

        <main className={styles.links}>
          <div className={styles.links_header}>(connect)</div>
          <div className={styles.links_content}>
            <a className={styles.link} href="/">
              instagram
            </a>
            <a className={styles.link} href="/">
              dribbble
            </a>
            <a className={styles.link} href="/">
              linkedin
            </a>
            <a className={styles.link} href="/">
              spotify
            </a>
          </div>
        </main>
        <main className={styles.links}>
          <div className={styles.links_header}>(contact)</div>
          <div className={styles.links_content}>
            <a className={styles.link} href="/">
              contact with me
            </a>
          </div>
        </main>
      </div>
      <hr />
      <footer className={styles.footer}>
        Created by Yunus Emre Korkmaz © 2025
      </footer>
    </div>
  );
};

export default Footer;
