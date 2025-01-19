import React from "react";
import styles from "./style.module.css";
import Carousel from "react-multi-carousel";

const me = ["0.jpeg", "1.JPG", "5.jpg"];

const WelcomeSec = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        Merhaba, ben Yunus Emre Korkmaz. Kullanıcı odaklı ve estetik tasarımlar
        oluşturuyorum.
      </div>
    </section>
  );
};

export default WelcomeSec;
