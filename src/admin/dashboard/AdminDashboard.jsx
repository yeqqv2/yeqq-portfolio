import React from "react";
import styles from "./style.module.css";
import AnimatedSplit from "../../components/animated split/AnimatedSplit";

export default function AdminDashboard() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>welcome yunus emre</div>
        <div className={styles.desc}>
          burada bugüne kadar yaptığın bütün projeleri & öğrendiğin bütün
          bilgileri görüntüleyebilirsin.
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.main_header}>
          <div className={styles.card}>
            <div className={styles.card_title}>total visitors</div>
            <div className={styles.card_content}>1.369</div>
          </div>
          <div className={styles.card}>
            <div className={styles.card_title}>total blogs</div>
            <div className={styles.card_content}>369</div>
          </div>
          <div className={styles.card}>
            <div className={styles.card_title}>total projects</div>
            <div className={styles.card_content}>9</div>
          </div>
        </div>
        <div className={styles.main_content}></div>
      </div>
    </div>
  );
}
