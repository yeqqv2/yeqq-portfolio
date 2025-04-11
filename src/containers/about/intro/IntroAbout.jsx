import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from "./style.module.css";
import Carousel from '../../../components/carousel/Carousel';

gsap.registerPlugin(ScrollTrigger);

const IntroAbout = () => {
    const containerRef = useRef(null);
    const wrapperRef = useRef(null);
    const cardsRefs = useRef([]);
    const [viewportHeight, setViewportHeight] = useState(0);

    useEffect(() => {
        const updateHeight = () => {
            setViewportHeight(window.innerHeight);
            ScrollTrigger.refresh();
        };

        updateHeight();

        window.addEventListener('resize', updateHeight);
        window.addEventListener('orientationchange', updateHeight);
        return () => {
            window.removeEventListener('resize', updateHeight);
            window.removeEventListener('orientationchange', updateHeight);
        };
    }, []);

    const addToCardsRefs = (el) => {
        if (el && !cardsRefs.current.includes(el)) {
            cardsRefs.current.push(el);
        }
    };

    const cardsConfig = [
        { endTranslateX: 0, rotate: 45 },
        { endTranslateX: 0, rotate: 30 },
        { endTranslateX: 0, rotate: 20 },
        { endTranslateX: 0, rotate: 10 },
        { endTranslateX: 0, rotate: 0 },
    ];

    useLayoutEffect(() => {
        if (viewportHeight === 0 || !wrapperRef.current) return;

        let context = gsap.context(() => {
            ScrollTrigger.create({
                trigger: wrapperRef.current,
                start: "top top",
                end: `+=${viewportHeight}vh`,
                scrub: 1,
                pin: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    gsap.to(wrapperRef.current, {
                        x: `${-550 * progress}vw`,
                        duration: 0.5,
                        ease: "power3.out"
                    });
                }
            });

            cardsRefs.current.forEach((card, idx) => {
                const { endTranslateX = 0, rotate = 0 } = cardsConfig[idx] || {};
                ScrollTrigger.create({
                    trigger: wrapperRef.current,
                    start: "top top",
                    end: `+=${viewportHeight}vh`,
                    scrub: 1,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        gsap.to(card, {
                            x: `${endTranslateX * progress}px`,
                            rotate: rotate + progress * 2,
                            duration: 0.5,
                            ease: "power3.out"
                        });
                    }
                });
            });
        }, containerRef);

        return () => {
            context.revert();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [viewportHeight]); 

    return (
        <div className={styles.container} ref={containerRef}>
            {/* Animasyonun gerçekleştiği bölüm */}
            <section className={styles.wrapper} ref={wrapperRef}>
                <h1 className={styles.h1}>(yunusemrekorkmaz)</h1>
                {cardsConfig.map((config, index) => (
                    <div className={styles.card} key={index} ref={addToCardsRefs}>
                        <img className={styles.img} src={`/assets/images/me/${index}.webp`} alt="" />
                    </div>
                ))}
            </section>
            {/* Animasyon tamamlandıktan sonra görünen outro bölümü */}
            <section className={styles.outro}>
                <div className={styles.outro_text}>
                    hey, it's yunus emre korkmaz, I create aesthetic and easy designs.
                    these are my interestes in life
                </div>
                <Carousel />
            </section>
        </div>
    );
};

export default IntroAbout;
