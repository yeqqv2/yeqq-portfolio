import React, { useRef, useEffect } from 'react'; // useRef ve useEffect import edildi
import styles from "./style.module.css";
import Marquee from "react-double-marquee";

const IntroSec = () => {
  const marqueeProps = {
    children: "minimalism, ui/ux design, digital art,",
    speed: 0.25,
    direction: "left",
    childMargin: 15,
    scrollWhen: "always",
    delay: 0,
  };

  // 1. Ana container için bir ref oluştur
  const containerRef = useRef(null);

  // 2. Mouse hareketini dinleyen useEffect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return; // Container henüz render edilmemişse çık

    const handleMouseMove = (e) => {
      // Ekranın merkezini bul
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const strength = 0.05;
      const offsetX = (e.clientX - centerX) * strength;
      const offsetY = (e.clientY - centerY) * strength;

      // Hesaplanan değerleri CSS değişkenleri olarak ayarla
      container.style.setProperty('--mouse-x-offset', `${offsetX}px`);
      container.style.setProperty('--mouse-y-offset', `${offsetY}px`);
    };

    const handleMouseLeave = () => {
      // Mouse container'dan ayrıldığında pozisyonu sıfırla
      container.style.setProperty('--mouse-x-offset', '0px');
      container.style.setProperty('--mouse-y-offset', '0px');
    };

    // Event listener'ları ekle
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Component unmount olduğunda listener'ları temizle
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []); // [] boş dependency array, bu effect'in sadece bir kez çalışmasını sağlar

  return (
    // 3. Ref'i ana container'a bağla
    <div className={styles.container} ref={containerRef}>
      <video
        className={styles.vid}
        src="/assets/videos/homepage-video.webm"
        autoPlay
        preload="auto"
        loop
        muted
        playsInline
        poster="/assets/loader/video-placeholder.webp"
      />
      <div className={styles.marquee_div}>
        <div className={styles.marquee_div_content}>
          <Marquee {...marqueeProps} />
        </div>
        <div className={styles.marquee_div_2}>
          <Marquee {...marqueeProps} />
        </div>
      </div>
    </div>
  );
};

export default IntroSec;