import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from "./style.module.css";

gsap.registerPlugin(ScrollTrigger);

const IntroAbout = () => {
    const containerRef = useRef(null);
    const wrapperRef = useRef(null);
    const h1Ref = useRef(null);
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
        { rotate: 45 },
        { rotate: 30 },
        { rotate: 20 },
        { rotate: 10 },
        { rotate: 0 },
    ];

    useEffect(() => {
        if (h1Ref.current) {
            setTimeout(() => {
                gsap.fromTo(
                    h1Ref.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
                );
            }, 150);
        }
    }, []);

    useLayoutEffect(() => {
        if (viewportHeight === 0 || !wrapperRef.current) return;

        let ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: wrapperRef.current,
                start: "top top",
                end: `+=${viewportHeight}vh`,
                scrub: 1,
                pin: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    gsap.to(wrapperRef.current, {
                        x: `${-600 * progress}vw`,
                        duration: 0.5,
                        ease: "power3.out",
                    });
                },
            });
            cardsRefs.current.forEach((card, idx) => {
                const maxRotate = cardsConfig[idx]?.rotate || 0;
                ScrollTrigger.create({
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                    onUpdate: (self) => {
                        gsap.to(card, {
                            rotate: maxRotate * self.progress,
                            ease: "none",
                        });
                    },
                });
            });
        }, containerRef);

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [viewportHeight]);

    return (
        <div className={styles.container} ref={containerRef}>
            <section className={styles.wrapper} ref={wrapperRef}>
                <h1 ref={h1Ref} className={styles.h1}>[i,am,yunusemrekorkmaz]</h1>
                {cardsConfig.map((config, index) => (
                    <div className={styles.card} key={index} ref={addToCardsRefs}>
                        <img className={styles.img} src={`/assets/images/me/${index}.webp`} alt="" loading="lazy" />
                    </div>
                ))}
            </section>
        </div>
    );
};

export default IntroAbout;
