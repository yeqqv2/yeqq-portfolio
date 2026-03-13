import { useState, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // GSAP eklendi
import SplashScreen from "../../animations/open/SplashScreen";
import IntroSec from "./intro/IntroSec";
import WelcomeSec from "./welcome/WelcomeSec";
import AboutmeHome from "./aboutme/AboutmeHome";
import Works from "./works/Works";
import PrinciplesSection from "./principle/PrinciplesSection";
import ManifestHomePage from "./manifest/ManifestHomePage";
import ContactHomePage from "./contact/ContactHomePage";
import styles from "./style.module.css";

const HomePage = () => {
  const [isAnimationPlayed, setIsAnimationPlayed] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("animationPlayed") === "true";
    }
    return false;
  });

  const handleAnimationComplete = () => {
    setIsAnimationPlayed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("animationPlayed", "true");
    }
  };

  // KUSURSUZ ÖLÇÜM MOTORU (Bunu ekliyorsun)
  useEffect(() => {
    // 1. İhtimal: Sayfadaki her şey (resimler vb.) yüklendiğinde ölçümleri tazele
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    // Eğer window zaten yüklendiyse direkt çalıştır, yüklenmediyse event dinle
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    // 2. İhtimal: React'in DOM'u render etmesi bazen load'dan sonra da sürebilir.
    // Garanti olsun diye 500ms sonra bir refresh daha çakıyoruz.
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(timeout);
    };
  }, []); // Sadece sayfa açıldığında 1 kez çalışır

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
