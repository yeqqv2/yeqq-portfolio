import React from "react";
import styles from "./style.module.css";
import IntroSec from "../../containers/home/intro/IntroSec";
import WelcomeSec from "../../containers/home/welcome/WelcomeSec";
import WorksHomePage from "../../containers/home/works/Works";
import SocialHomePage from "../../containers/home/social/SocialHomePage";
import ServicesHomePage from "../../containers/home/services/ServicesHomePage";
import Terminal from "../../animations/opening/OpeningAnimation";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <Terminal />
      <IntroSec />
      <WelcomeSec />
      <ServicesHomePage />
      <WorksHomePage />
      <hr />
      <SocialHomePage />
    </div>
  );
};

export default HomePage;
