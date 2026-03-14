import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { CustomEase } from "gsap/CustomEase";
import styles from "./style.module.css";
import colors from "@/utils/colors";
import AnimatedSplit from "@/components/animated split/AnimatedSplit";
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger, TextPlugin, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const WelcomeSec = () => {
    const { t } = useTranslation();
    
    // State sadece hover sırasındaki renkler için tutuldu, 
    // fare hareketi (x, y) state'ten çıkarıldı.
    const [cursorStyles, setCursorStyles] = useState({
        bg: "var(--main-color500)",
        color: "var(--wb950)",
    });

    const cursorRef = useRef(null);
    const imgRef = useRef(null);

    /* --------------------------
        CURSOR LOGIC (OPTIMIZED)
    --------------------------- */
    const handleMouseMove = (e) => {
        // State güncellemesi yerine doğrudan DOM manipülasyonu
        // Bu sayede bileşen farenin her milim hareketinde RE-RENDER olmaz.
        if (cursorRef.current) {
            cursorRef.current.style.left = `${e.clientX}px`;
            cursorRef.current.style.top = `${e.clientY}px`;
        }
    };

    const handleMouseEnter = () => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        const randomColor = colors[randomIndex];

        setCursorStyles({
            bg: randomColor.bg,
            color: randomColor.color,
        });

        gsap.to(cursorRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.25,
            ease: "hop",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(cursorRef.current, {
            scale: 0,
            opacity: 0,
            duration: 0.25,
            ease: "hop",
        });
    };

    /* --------------------------
       SCROLL ANIMATIONS (OPTIMIZED)
    --------------------------- */
    useEffect(() => {
        // gsap.context kullanımı: Component unmount olduğunda animasyonlar temizlenir (memory leak engellenir)
        let ctx = gsap.context(() => {
            gsap.fromTo(
                imgRef.current,
                { clipPath: "inset(50% 50% 50% 50%)" },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 1.2,
                    ease: "hop",
                    scrollTrigger: {
                        trigger: imgRef.current,
                        start: "top 80%",
                    },
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <AnimatedSplit
                    key={t('welcome.greeting')}
                    text={t('welcome.greeting')}
                    className={styles.content_text}
                    tagName="span"
                    stagger={0.03}
                    duration={1.5}
                    start="top 80%"
                />
                <a
                    href="/about-me"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={styles.link}
                    data-animate
                >
                    <AnimatedSplit
                        key={t('welcome.name')}
                        text={t('welcome.name')}
                        tagName="span"
                        stagger={0.03}
                        duration={1.5}
                        start="top 80%"
                    />
                </a>
            </div>

            <div className={styles.side_image_container}>
                <img
                    ref={imgRef}
                    className={styles.img}
                    src="/assets/yunus-emre-korkmaz/6.webp"
                    alt="Yunus Emre Korkmaz"
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                />
            </div>

            <div className={styles.content}>
                <AnimatedSplit
                    key={t('welcome.description')}
                    text={t('welcome.description')}
                    className={styles.link}
                    tagName="span"
                    stagger={0.03}
                    duration={1.5}
                    start="top 80%"
                />
            </div>

            <span
                ref={cursorRef}
                className={styles.customCursor}
                style={{
                    backgroundColor: cursorStyles.bg,
                    color: cursorStyles.color,
                    opacity: 0,
                    scale: 0 // Başlangıçta görünmez olması için scale 0
                }}
            >
                {t('welcome.cursor')}
            </span>
        </section>
    );
};

export default WelcomeSec;