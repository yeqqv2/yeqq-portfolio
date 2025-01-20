import React from "react";
import styles from "./style.module.css";
import Terminal from "../../animations/opening/OpeningAnimation";
// CONTAINERS
import IntroSec from "../../containers/home/intro/IntroSec";
import WelcomeSec from "./../../containers/home/welcome/WelcomeSec";
import { IntroduceHome } from "../../containers/home/introduce/IntroduceHome";
import AboutmeHome from "../../containers/home/aboutme/AboutmeHome";
import WorksHomePage from "../../containers/home/works/Works";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <Terminal />
      <IntroSec />
      <WelcomeSec />
      <IntroduceHome />
      <AboutmeHome />
      <WorksHomePage />
    </div>
  );
};

export default HomePage;
