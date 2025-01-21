import React from "react";
import styles from "./style.module.css";
import { IntroduceHome } from "../../containers/home/introduce/IntroduceHome";
import WelcomeSec from "../../containers/home/welcome/WelcomeSec";
import AboutmeHome from "../../containers/home/aboutme/AboutmeHome";

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <IntroduceHome />
      <WelcomeSec />
    </div>
  );
};

export default AboutPage;
