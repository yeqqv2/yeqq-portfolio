import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './style.module.css';

// Videoların URL'lerini içeren dizi
const videos = [
    {
        id: 1,
        // src: 'https://videos.pexels.com/video-files/6688641/6688641-uhd_2560_1440_25fps.mp4'
        src: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnB1ajlqa2phNzVva2Z0eXl4eWFpZnc1NHdpbHJoZnFjbGdrdGxwOCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/QW9gued0UndbeUrr8S/giphy.gif'
    },
    {
        id: 2,
        // src: 'https://videos.pexels.com/video-files/4360158/4360158-uhd_2560_1440_24fps.mp4'
        src: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGNsZXg1OWZyc3JxYjNoMTFoenF4b3l0N2Zqam5oMDk0d2c3MXhsaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/M52wyuahvQfJK/giphy.gif'
    },
    {
        id: 3,
        // src: 'https://videos.pexels.com/video-files/2022395/2022395-hd_1920_1080_30fps.mp4'
        src: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDRscmR6OXVqcDY3aDF6YTVnbG85YXN0eTJ3aWIxcDI5dHNneWx2ZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/tqfS3mgQU28ko/giphy.gif'
    },
    {
        id: 4,
        // src: 'https://videos.pexels.com/video-files/5427565/5427565-uhd_2732_1440_25fps.mp4'
        src: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWF6eTNvOHZkNG42a3U5bzRpd3NpaHA4dnZid2Y3NmNleG5sZTBydCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l6mBchxYZc7Sw/giphy.gif'
    },
    {
        id: 5,
        // src: 'https://videos.pexels.com/video-files/9329520/9329520-uhd_1440_2732_25fps.mp4'
        src: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWdxY2d2eGs5M21ob2E0ZGU1ZHZwb3Q1YWlub3puNThlcGtweGxhMiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/11LmeD33ETXN1C/giphy.gif'
    },
    {
        id: 6,
        // src: 'https://videos.pexels.com/video-files/6491258/6491258-uhd_2732_1440_25fps.mp4'
        src: 'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NmdrYWswcWtycjAwNjBqZnU4M28wdGZnd3Y5aWxyMWNrbWQ5Z3BxZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Mj4dUgN1pzJjq/giphy.gif'
    },
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
                duration: 1,
                ease: "power4.out"
            });

            // videoBottom: Overlay sağdan sola kayarak videoyu açacak.
            gsap.to(overlayBottomRef.current, {
                x: "-100%",
                duration: 1,
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
                    duration: 1,
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
        const interval = setInterval(handleSlider, 10000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        [chess]
                    </h1>
                </div>
                <div className={styles.title}>
                    <h1 className={`${styles.h1} ${currentIndex === 1 ? styles.active : ''}`}>
                        [art]
                    </h1>
                </div>
                <div className={styles.title}>
                    <h1 className={`${styles.h1} ${currentIndex === 2 ? styles.active : ''}`}>
                        [music]
                    </h1>
                </div>
                <div className={styles.title}>
                    <h1 className={`${styles.h1} ${currentIndex === 3 ? styles.active : ''}`}>
                        [movies]
                    </h1>
                </div>
                <div className={styles.title}>
                    <h1 className={`${styles.h1} ${currentIndex === 4 ? styles.active : ''}`}>
                        [philosophy]
                    </h1>
                </div>
                <div className={styles.title}>
                    <h1 className={`${styles.h1} ${currentIndex === 5 ? styles.active : ''}`}>
                        [psychology]
                    </h1>
                </div>
            </div>
            <div className={styles.slider_images}>
                <div className={styles.video_wrapper}>
                    {/* <video
                        ref={videoTopRef}
                        preload="auto"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={`${styles.video} ${styles.vid_top}`}
                    /> */}
                    <img
                        ref={videoTopRef}
                        src={videos[currentIndex].src}
                        className={`${styles.video} ${styles.vid_top}`}
                        alt='top gif'
                    />
                    <div className={styles.overlayTop} ref={overlayTopRef}></div>
                </div>
                <div className={styles.video_wrapper}>
                    {/* <video
                        ref={videoBottomRef}
                        preload="auto"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={`${styles.video} ${styles.vid_bottom}`}
                    /> */}
                    <img
                        ref={videoTopRef}
                        src={videos[currentIndex].src}
                        className={`${styles.video} ${styles.vid_bottom}`}
                        alt='top gif'
                    />
                    <div className={styles.overlayBottom} ref={overlayBottomRef}></div>
                </div>
            </div>
        </div>
    );
};

export default Carousel;
