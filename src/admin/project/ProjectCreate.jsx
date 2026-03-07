import React from "react";
import styles from "./style.module.css";
import AnimatedSplit from "../../components/animated split/AnimatedSplit";

export default function ProjectCreate() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>create a new project</div>
        <div className={styles.desc}>
          fill in the details below to add a new case study to your portfolio.
        </div>
      </header>

      <form className={styles.form}>
        <div className={styles.form_section}></div>
        <div className={styles.form_section}></div>
        <div className={styles.form_section}></div>
        <div className={styles.form_section}></div>
        <div className={styles.form_section}></div>
      </form>
    </div>
  );
}
