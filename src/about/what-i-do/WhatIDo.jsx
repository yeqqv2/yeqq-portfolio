import { useEffect, useRef } from 'react';
import styles from "./style.module.css";
import AnimatedSplit from './../../components/animated split/AnimatedSplit';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomEase from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function WhatIDo() {
    const containerRef = useRef(null);
    const imageRefs = useRef([]);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Ortadan dışarı doğru sıralama: [image_2, image_1, image_3, image_4]
            const orderedImages = [
                imageRefs.current[1], // image_2 (sol üst)
                imageRefs.current[0], // image_1 (sol alt)
                imageRefs.current[2], // image_3 (sağ üst)
                imageRefs.current[3], // image_4 (sağ alt)
            ];

            orderedImages.forEach((img, index) => {
                if (!img) return;

                // Başlangıç durumu
                gsap.set(img, { clipPath: "inset(50% 50% 50% 50%)" });

                // Clip-path animasyonu
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

                // Ek fade ve transform animasyonu
                gsap.fromTo(
                    img,
                    { y: 16, },
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
                        text={
                            "[what i do]"
                        }
                        tagName="span"
                        stagger={0.03}
                        duration={1.5}
                        start="top 80%"
                    />
                </header>
                <div className={styles.context}>
                    <AnimatedSplit
                        text={
                            "I design and build digital interfaces with structure, intention, and expression."
                        }
                        className={styles.desc}
                        tagName="span"
                        stagger={0.03}
                        duration={1.5}
                        start="top 80%"
                    />
                </div>
                <div className={styles.context}>
                    <AnimatedSplit
                        text={
                            "my work focuses on clarity, usability, and motion-led visual identity."
                        }
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