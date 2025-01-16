import React from "react";
import styles from "./style.module.css";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";

const SocialHomePage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.header_title}>SOCIAL 👌</div>
        <div className={styles.header_desc}>
          Sosyal medya hesaplarıma ve benimle iletişime geçebileceğiniz
          platformlara burada erişebilirsiniz.
        </div>
      </header>
      <main className={styles.main}>
        <a
          href="mailto:huseyincanbay10@gmail.com"
          target="__blank"
          className={`${styles.card} ${styles.gmail}`}
        >
          <BiLogoGmail />
          Gmail
        </a>
        <a
          href="https://github.com/huseyincanbay"
          target="__blank"
          className={`${styles.card} ${styles.github}`}
        >
          <FaGithub />
          Github
        </a>
        <a
          href="https://www.linkedin.com/in/huseyincanbay10/"
          target="__blank"
          className={`${styles.card} ${styles.linkedin}`}
        >
          <FaLinkedin />
          Linkedin
        </a>
        <a
          href="https://www.instagram.com/hcanbay_"
          target="__blank"
          className={`${styles.card} ${styles.instagram}`}
        >
          <FaInstagram />
          Instagram
        </a>
      </main>
    </div>
  );
};

export default SocialHomePage;
