import React from "react";
import styles from "./style.module.css";

const NeumorphismButton = ({ handleStart }) => {
  return (
    <div className={styles.light}>
      <label className={styles.circle}>
        <input
          onChange={handleStart}
          type="checkbox"
          className={styles.input}
        />
      </label>
    </div>
  );
};

export default NeumorphismButton;
