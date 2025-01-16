import React from "react";
import styles from "./style.module.css";

const ServicesHomePage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.header_title}>SERVICES</div>
        <div className={styles.header_desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
          quibusdam amet qui quidem magni incidunt accusamus autem nisi,
          deserunt doloribus odit labore possimus beatae vero quaerat modi,
          voluptate, aut consectetur nostrum iure? A, itaque ad modi magni
          voluptate voluptatem, dolores vitae, veniam delectus fuga laboriosam
          blanditiis nostrum consectetur non mollitia!
        </div>
      </header>
      <hr />
      <main className={styles.main}>
        <div className={styles.outer}>
          <div className={styles.dot} />
          <div className={styles.card}>
            <div className={styles.text}>Backend API</div>
            <div>Development</div>
            <div className={`${styles.topl} ${styles.line}`} />
            <div className={`${styles.leftl} ${styles.line}`} />
            <div className={`${styles.bottoml} ${styles.line}`} />
            <div className={`${styles.rightl} ${styles.line}`} />
          </div>
        </div>
        <div className={styles.outer}>
          <div className={styles.dot} />
          <div className={styles.card}>
            <div className={styles.text}>Web Application</div>
            <div>Development</div>
            <div className={`${styles.topl} ${styles.line}`} />
            <div className={`${styles.leftl} ${styles.line}`} />
            <div className={`${styles.bottoml} ${styles.line}`} />
            <div className={`${styles.rightl} ${styles.line}`} />
          </div>
        </div>
        <div className={styles.outer}>
          <div className={styles.dot} />
          <div className={styles.card}>
            <div className={styles.text}>Mobile Application</div>
            <div>Development</div>
            <div className={`${styles.topl} ${styles.line}`} />
            <div className={`${styles.leftl} ${styles.line}`} />
            <div className={`${styles.bottoml} ${styles.line}`} />
            <div className={`${styles.rightl} ${styles.line}`} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServicesHomePage;
