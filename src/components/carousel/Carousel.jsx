import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './style.module.css';

// Videoların URL'lerini içeren dizi
const videos = [
    { id: 1, src: 'https://videos.pexels.com/video-files/6688641/6688641-uhd_2560_1440_25fps.mp4' },
    { id: 2, src: 'https://videos.pexels.com/video-files/4360158/4360158-uhd_2560_1440_24fps.mp4' },
    { id: 3, src: 'https://videos.pexels.com/video-files/2022395/2022395-hd_1920_1080_30fps.mp4' },
    { id: 4, src: 'https://videos.pexels.com/video-files/5427565/5427565-uhd_2732_1440_25fps.mp4' },
    { id: 5, src: 'https://videos.pexels.com/video-files/9329520/9329520-uhd_1440_2732_25fps.mp4' },
    { id: 6, src: 'https://videos.pexels.com/video-files/6491258/6491258-uhd_2732_1440_25fps.mp4' },
];

const Carousel = () => {
    const totalSlides = videos.length;
    const [currentIndex, setCurrentIndex] = useState(0);

    // Referanslar
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
                    duration: 2,
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

    // Otomatik slider geçişi
    useEffect(() => {
        const interval = setInterval(handleSlider, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (videoTopRef.current && videoBottomRef.current) {
            
            videoTopRef.current.src = videos[currentIndex].src;
            videoBottomRef.current.src = videos[currentIndex].src;

            videoTopRef.current.load();
            videoBottomRef.current.load();
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
