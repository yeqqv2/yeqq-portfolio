import React from "react";
import styles from "./style.module.css";

const IntroSec = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <video
          className={styles.vid}
          src="/assets/videos/code-horizontal.mp4"
          autoPlay
          loop
          muted
          playsInline
        ></video>
      </header>
      <main className={styles.main}></main>
    </div>
  );
};

export default IntroSec;
