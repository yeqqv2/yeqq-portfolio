import React from "react";
import styles from "./style.module.css";

const NeumorphismButton = () => {
  return (
    <div className={styles.light}>
      <label className={styles.circle}>
        <input type="checkbox" className={styles.input} />
      </label>
    </div>
  );
};

export default NeumorphismButton;
