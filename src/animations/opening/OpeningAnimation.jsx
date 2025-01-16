import React from "react";
import styles from "./style.module.css";
import NeumorphismButton from "../../tools/neumorphism button/NeumorphismButton";

const Terminal = () => {
  return (
    <div className={styles.container}>
      {/* <div className={styles.title}>
        <div className={styles.quote_icon}>❝</div>
        <div className={styles.quote}>
          I have broken the blue boundary of color limits,
        </div>
        <div className={styles.quote}>come out into the white; beside me,</div>
        <div className={styles.quote}>
          comrade‐pilots, swim in this infinity.
        </div>
      </div> */}
      <NeumorphismButton />
    </div>
  );
};

export default Terminal;
