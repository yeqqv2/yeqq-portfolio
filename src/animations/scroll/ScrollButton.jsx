import React from "react";
import styles from "./style.module.css";

const ScrollButton = () => {
  return (
    <div className={styles.scrolldown}>
      <div className={styles.chevrons}>
        <div className={styles.chevrondown}></div>
        <div className={styles.chevrondown}></div>
      </div>
    </div>
  );
};

export default ScrollButton;
