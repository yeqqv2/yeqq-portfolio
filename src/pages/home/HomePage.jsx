import React from "react";
import styles from "./style.module.css";
import Terminal from "../../animations/opening/OpeningAnimation";
// CONTAINERS
import IntroSec from "../../containers/home/intro/IntroSec";
import WelcomeSec from "./../../containers/home/welcome/WelcomeSec";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <Terminal />
      <IntroSec />
      <WelcomeSec />
    </div>
  );
};

export default HomePage;
