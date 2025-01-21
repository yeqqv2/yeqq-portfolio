import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import Terminal from "../../animations/opening/OpeningAnimation";
// CONTAINERS
import IntroSec from "../../containers/home/intro/IntroSec";
import WelcomeSec from "./../../containers/home/welcome/WelcomeSec";
import { IntroduceHome } from "../../containers/home/introduce/IntroduceHome";
import AboutmeHome from "../../containers/home/aboutme/AboutmeHome";
import WorksHomePage from "../../containers/home/works/Works";
import ContactHomePage from "../../containers/home/contact/ContactHomePage";
import SocialHomePage from "./../../containers/home/social/SocialHomePage";

const HomePage = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const alreadyShown = localStorage.getItem("terminalShown") === "true";
    // Eğer daha önce gösterilmediyse, animasyonu bir kez göster
    if (!alreadyShown) {
      setShowAnimation(true);
      localStorage.setItem("terminalShown", "true");
    }
  }, []);
  return (
    <div className={styles.container}>
      {showAnimation && <Terminal />}
      <IntroSec />
      <WelcomeSec />
      <IntroduceHome />
      <AboutmeHome />
      <WorksHomePage />
      <SocialHomePage />
      <ContactHomePage />
    </div>
  );
};

export default HomePage;
