import { useState } from "react";
import SplashScreen from "@/animations/open/SplashScreen";
import IntroSec from "./intro/IntroSec";
import WelcomeSec from "./welcome/WelcomeSec";
import AboutmeHome from "./aboutme/AboutmeHome";
import Works from "./works/Works";
import PrinciplesSection from "./principle/PrinciplesSection";
import ManifestHomePage from "./manifest/ManifestHomePage";
import ContactHomePage from "./contact/ContactHomePage";
import styles from "./style.module.css";

const HomePage = () => {
  const [isAnimationPlayed, setIsAnimationPlayed] = useState(
    () => sessionStorage.getItem("animationPlayed") === "true",
  );

  const handleAnimationComplete = () => {
    setIsAnimationPlayed(true);
    sessionStorage.setItem("animationPlayed", "true");
  };

  return (
    <div className={styles.container}>
      {!isAnimationPlayed && (
        <SplashScreen onAnimationComplete={handleAnimationComplete} />
      )}
      <IntroSec />
      <WelcomeSec />
      <AboutmeHome />
      <Works />
      <PrinciplesSection />
      <ManifestHomePage />
      <ContactHomePage />
    </div>
  );
};

export default HomePage;
