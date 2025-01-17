import React from "react";
import styles from "./style.module.css";
import Terminal from "../../animations/opening/OpeningAnimation";
// CONTAINERS
import IntroSec from "../../containers/home/intro/IntroSec";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <Terminal />
      <IntroSec />
    </div>
  );
};

export default HomePage;
