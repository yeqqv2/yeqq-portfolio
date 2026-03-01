import { useEffect, useRef } from 'react';
import styles from "./style.module.css";
import AnimatedSplit from '../../../components/animated split/AnimatedSplit';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomEase from 'gsap/CustomEase';
// 1. Hook'u import et
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function WhatIDo() {
    // 2. t fonksiyonunu al
    const { t } = useTranslation();
    const containerRef = useRef(null);
    const imageRefs = useRef([]);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const orderedImages = [
                imageRefs.current[1], 
                imageRefs.current[0], 
                imageRefs.current[2], 
                imageRefs.current[3], 
            ];

            orderedImages.forEach((img, index) => {
                if (!img) return;

                gsap.set(img, { clipPath: "inset(50% 50% 50% 50%)" });

                gsap.fromTo(
                    img,
                    { clipPath: "inset(50% 50% 50% 50%)" },
                    {
                        clipPath: "inset(0% 0% 0% 0%)",
                        duration: 1.5,
                        ease: "hop",
                        delay: index * 0.15,
                        scrollTrigger: {
                            trigger: img,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    }
                );

                gsap.fromTo(
                    img,
                    { y: 16 },
                    {
                        y: 0,
                        duration: 0.8,
                        ease: "hop",
                        delay: index * 0.12,
                        scrollTrigger: {
                            trigger: img,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });
        }, containerRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.image_container}>
                <img
                    src="/assets/yunus-emre-korkmaz/12.webp"
                    alt="yunus emre korkmaz"
                    className={styles.image_1}
                    ref={(el) => (imageRefs.current[0] = el)}
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                />
                <img
                    src="/assets/yunus-emre-korkmaz/5.webp"
                    alt="yunus emre korkmaz"
                    className={styles.image_2}
                    ref={(el) => (imageRefs.current[1] = el)}
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                />
            </div>
            <div className={styles.content}>
                <header className={styles.header}>
                    <AnimatedSplit
                        // 3. Key ekleyerek dil değişimini takip et
                        key={t('whatIDo.title')}
                        text={t('whatIDo.title')}
                        tagName="span"
                        stagger={0.03}
                        duration={1.5}
                        start="top 80%"
                    />
                </header>
                <div className={styles.context}>
                    <AnimatedSplit
                        key={t('whatIDo.desc_1')}
                        text={t('whatIDo.desc_1')}
                        className={styles.desc}
                        tagName="span"
                        stagger={0.03}
                        duration={1.5}
                        start="top 80%"
                    />
                </div>
                <div className={styles.context}>
                    <AnimatedSplit
                        key={t('whatIDo.desc_2')}
                        text={t('whatIDo.desc_2')}
                        className={styles.desc}
                        tagName="span"
                        stagger={0.03}
                        duration={1.5}
                        start="top 80%"
                    />
                </div>
            </div>
            <div className={styles.image_container}>
                <img
                    src="/assets/yunus-emre-korkmaz/3.webp"
                    alt="yunus emre korkmaz"
                    className={styles.image_3}
                    ref={(el) => (imageRefs.current[2] = el)}
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                />
                <img
                    src="/assets/yunus-emre-korkmaz/11.webp"
                    alt="yunus emre korkmaz"
                    className={styles.image_4}
                    ref={(el) => (imageRefs.current[3] = el)}
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                />
            </div>
        </div>
    );
}