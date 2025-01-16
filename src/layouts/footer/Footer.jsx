import React from "react";
import styles from "./style.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <header className={styles.logo}>
        Hüseyin CANBAY | Software Developer
      </header>
      <hr />
      <footer className={styles.footer}>
        Created by Hüseyin Canbay & Yunus Emre Korkmaz © 2025
      </footer>
    </div>
  );
};

export default Footer;
