import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './style.module.css';

const Carousel = () => {
    const totalSlides = 6;
    const [currentIndex, setCurrentIndex] = useState(0);

    // Mevcut yapıdaki referanslar
    const sliderTitlesRef = useRef(null);
    const videoTopRef = useRef(null);
    const videoBottomRef = useRef(null);
    const overlayTopRef = useRef(null);
    const overlayBottomRef = useRef(null);

    // Video geçiş animasyonu (clipPath ve scale efektleri)
    const animateVideoTransition = () => {
        if (overlayTopRef.current && overlayBottomRef.current) {
            // Overlay'ları başlangıç konumuna getiriyoruz.
            gsap.set(overlayTopRef.current, { x: "0%" });
            gsap.set(overlayBottomRef.current, { x: "0%" });

            // videoTop: Overlay soldan sağa kayarak videoyu açacak.
            gsap.to(overlayTopRef.current, {
                x: "100%",
                duration: 2,
                ease: "power4.out"
            });

            // videoBottom: Overlay sağdan sola kayarak videoyu açacak.
            gsap.to(overlayBottomRef.current, {
                x: "-100%",
                duration: 2,
                ease: "power4.out"
            });
        }
    };

    // Slider geçişini yöneten fonksiyon
    const handleSlider = () => {
        setCurrentIndex(prevIndex => {
            const newIndex = (prevIndex + 1) % totalSlides;
            if (sliderTitlesRef.current) {
                gsap.to(sliderTitlesRef.current, {
                    x: `-${newIndex * (100 / totalSlides)}%`,
                    duration: 5,
                    ease: 'power4.out',
                });
            }
            animateVideoTransition();
            return newIndex;
        });
    };

    // İlk render'da video animasyonunu çalıştırıyoruz
    useEffect(() => {
        animateVideoTransition();
    }, []);

    useEffect(() => {
        const interval = setInterval(handleSlider, 5000);
        return () => clearInterval(interval);
    }, []);

    // currentIndex değiştiğinde video elementlerinin "src" attribute'unu manuel güncelliyoruz.
    // Böylece video elementleri yeniden render edilmeden, yalnızca kaynak URL'si değişiyor.
    useEffect(() => {
        const videoUrl = `/assets/interestes/${currentIndex + 1}.mp4`;
        if (videoTopRef.current) {
            // Eğer mevcut src farklı ise güncelle, ardından load() çağırarak video cache’de varsa hemen oynatılmasını sağlıyoruz.
            if (videoTopRef.current.src !== window.location.origin + videoUrl) {
                videoTopRef.current.src = videoUrl;
                videoTopRef.current.load();
            }
        }
        if (videoBottomRef.current) {
            if (videoBottomRef.current.src !== window.location.origin + videoUrl) {
                videoBottomRef.current.src = videoUrl;
                videoBottomRef.current.load();
            }
        }
    }, [currentIndex]);

    return (
        <div className={styles.slider} onClick={handleSlider}>
            <div className={styles.slider_titles} ref={sliderTitlesRef}>
                <div className={styles.title}>
                    <h1 className={`${styles.h1} ${currentIndex === 0 ? styles.active : ''}`}>
                        ( chess )
                    </h1>
                </div>
                <div className={styles.title}>
                    <h1 className={`${styles.h1} ${currentIndex === 1 ? styles.active : ''}`}>
                        ( drawing )
                    </h1>
                </div>
                <div className={styles.title}>
                    <h1 className={`${styles.h1} ${currentIndex === 2 ? styles.active : ''}`}>
                        ( music )
                    </h1>
                </div>
                <div className={styles.title}>
                    <h1 className={`${styles.h1} ${currentIndex === 3 ? styles.active : ''}`}>
                        ( movies )
                    </h1>
                </div>
                <div className={styles.title}>
                    <h1 className={`${styles.h1} ${currentIndex === 4 ? styles.active : ''}`}>
                        ( philosophy )
                    </h1>
                </div>
                <div className={styles.title}>
                    <h1 className={`${styles.h1} ${currentIndex === 5 ? styles.active : ''}`}>
                        ( psychology )
                    </h1>
                </div>
            </div>
            <div className={styles.slider_images}>
                <div className={styles.video_wrapper}>
                    <video
                        ref={videoTopRef}
                        preload="auto"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={`${styles.video} ${styles.vid_top}`}
                    />
                    <div className={styles.overlayTop} ref={overlayTopRef}></div>
                </div>
                <div className={styles.video_wrapper}>
                    <video
                        ref={videoBottomRef}
                        preload="auto"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={`${styles.video} ${styles.vid_bottom}`}
                    />
                    <div className={styles.overlayBottom} ref={overlayBottomRef}></div>
                </div>
            </div>
        </div>
    );
};

export default Carousel;
