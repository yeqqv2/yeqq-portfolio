import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './style.module.css';

const Carousel = () => {
    const totalSlides = 6;
    const [currentIndex, setCurrentIndex] = useState(0);

    const sliderTitlesRef = useRef(null);
    const videoTopRef = useRef(null);
    const videoBottomRef = useRef(null);

    const animateVideoTransition = () => {
        if (videoTopRef.current && videoBottomRef.current) {
            gsap.set([videoTopRef.current, videoBottomRef.current], {
                clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
                scale: 2,
            });
            gsap.to([videoTopRef.current, videoBottomRef.current], {
                clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
                scale: 1,
                duration: 2,
                ease: 'power4.out',
                stagger: 0.15,
            });
        }
    };

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

    useEffect(() => {
        animateVideoTransition();
    }, []);

    useEffect(() => {
        const interval = setInterval(handleSlider, 5000);
        return () => clearInterval(interval);
    }, []);

    const videoSrc = `/assets/interestes/${currentIndex + 1}.mp4`;

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
                <video
                    ref={videoTopRef}
                    key={`video-top-${currentIndex}`}
                    src={videoSrc}
                    preload="auto"
                    poster="/assets/posters/video-placeholder.webp"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`${styles.video} ${styles.vid_top}`}
                />
                <video
                    ref={videoBottomRef}
                    key={`video-bottom-${currentIndex}`}
                    src={videoSrc}
                    preload="auto"
                    poster="/assets/posters/video-placeholder.webp"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`${styles.video} ${styles.vid_bottom}`}
                />

            </div>
        </div >
    );
};

export default Carousel;
