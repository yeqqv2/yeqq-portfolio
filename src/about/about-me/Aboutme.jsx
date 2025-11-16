import { useEffect, useRef } from 'react';
import styles from "./style.module.css";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import CustomEase from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0, 0, 0.1, 1");

export default function Aboutme() {
    const containerRef = useRef(null);
    const headerRef = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const contentDescRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const titleSplit = new SplitType(titleRef.current, {
                types: 'lines, words',
                tagName: 'span'
            });

            const descSplit = new SplitType(descRef.current, {
                types: 'lines, words',
                tagName: 'span'
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                }
            });

            tl.from(titleSplit.words, {
                y: '110%',
                duration: 0.75,
                ease: 'hop',
                stagger: 0.05,
                delay: 0.5,
            });

            tl.from(descSplit.words, {
                y: '110%',
                duration: 0.75,
                ease: 'hop',
                stagger: 0.05,
            }, "<0.3");

            tl.to(titleRef.current, {
                height: '100%',
                duration: .75,
                ease: 'hop',
            }, "+=0.5");

            const contentSplit = new SplitType(contentDescRef.current, {
                types: 'lines, words',
                tagName: 'span'
            });

            const scrubSettings = {
                trigger: contentDescRef.current,
                start: 'top center',
                scrub: true,
                end: 'bottom 40%'
            };

            const scrollSettings = {
                trigger: contentDescRef.current,
                start: 'top center',
                scrub: false,
                end: 'bottom 40%'
            };

            gsap.from(contentSplit.words, {
                opacity: 0.15,
                duration: 0.01,
                ease: 'power1.out',
                stagger: 0.01,
                scrollTrigger: scrubSettings
            });

            gsap.from(`.${styles.logo}`, {
                width: 0,
                opacity: 0.15,
                padding: 0,
                margin: 0,
                duration: 0.33,
                ease: 'power1.out',
                stagger: 0.66,
                scrollTrigger: scrollSettings
            });

        }, containerRef); // <-- 2. CONTEXT BURAYA BAĞLANDI

        return () => ctx.revert();

    }, []);

    return (
        // 1. REF ANA KAPSAYICIYA ATANDI
        <div className={styles.container} ref={containerRef}>
            <header className={styles.header} ref={headerRef}>
                <div className={styles.title} ref={titleRef}>
                    merging design thinking with frontend engineering.
                </div>
                <div className={styles.desc} ref={descRef}>
                    obsessively crafted.
                    <br />
                    engineered with intent.
                </div>
            </header>
            <main className={styles.content}>
                <h3 className={styles.content_desc} ref={contentDescRef}>
                    skilled in crafting web and mobile interfaces using React
                    <span className={styles.logo}>
                        <img
                            className={styles.logo_img}
                            src="/assets/svg/react.svg"
                            alt="React Logo" />
                    </span>
                    ,
                    React Native
                    <span className={styles.logo}>
                        <img
                            className={styles.logo_img}
                            src="/assets/svg/expo.svg"
                            alt="React Native (Expo) Logo"
                        />
                    </span>
                    , and TypeScript
                    <span className={styles.logo}>
                        <img
                            className={styles.logo_img}
                            src="/assets/svg/ts.svg"
                            alt="Typescript Logo"
                        />
                    </span>
                    .
                </h3>
            </main>
            <main className={styles.tech_container}>

            </main>
        </div>
    );
}