import { lazy, Suspense, useEffect, useState } from "react";
import SplashScreen from "@/components/splash-screen/SplashScreen";
import IntroSec from "./intro/IntroSec";
import styles from "./style.module.css";

const WelcomeSec = lazy(() => import("./welcome/WelcomeSec"));
const AboutmeHome = lazy(() => import("./aboutme/AboutmeHome"));
const Works = lazy(() => import("./works/Works"));
const PrinciplesSection = lazy(() => import("./principle/PrinciplesSection"));
const ManifestHomePage = lazy(() => import("./manifest/ManifestHomePage"));
const ContactHomePage = lazy(() => import("./contact/ContactHomePage"));

const HomePage = () => {
  const [isAnimationPlayed, setIsAnimationPlayed] = useState(
    () => sessionStorage.getItem("animationPlayed") === "true",
  );

  useEffect(() => {
    const warmHomeSections = () => {
      import("./welcome/WelcomeSec");
      import("./aboutme/AboutmeHome");
      import("./works/Works");
      import("./principle/PrinciplesSection");
      import("./manifest/ManifestHomePage");
      import("./contact/ContactHomePage");
    };

    if (typeof window === "undefined") return undefined;

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(warmHomeSections, {
        timeout: 1800,
      });
      return () => window.cancelIdleCallback(id);
    }

    const timeout = window.setTimeout(warmHomeSections, 900);
    return () => window.clearTimeout(timeout);
  }, []);

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
      <Suspense fallback={null}>
        <WelcomeSec />
        <AboutmeHome />
        <Works />
        <PrinciplesSection />
        <ManifestHomePage />
        <ContactHomePage />
      </Suspense>
    </div>
  );
};

export default HomePage;
