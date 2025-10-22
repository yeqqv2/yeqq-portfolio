import React, { useEffect, useRef } from "react";
import styles from "./style.module.css";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase"; // Daha standart import yolu

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

// Parent'tan 'onAnimationComplete' fonksiyonunu prop olarak alıyoruz.
export default function SplashScreen({ onAnimationComplete }) {
    const containerRef = useRef(null);

    // YENİ EFEKT: Arka plan kaydırmasını engellemek için
    useEffect(() => {
        // Bileşen ekrana geldiğinde body'e stil ekle
        document.body.style.overflow = 'hidden';

        // Bileşen ekrandan kaldırıldığında stili temizle (bu çok önemli!)
        return () => {
            document.body.style.overflow = 'auto'; // veya 'visible'
        };
    }, []); // Bu efekt sadece bir kez çalışacak

    // Animasyon efekti
    useEffect(() => {
        const ctx = gsap.context(() => {
            const vLines = gsap.utils.toArray(`.${styles.vertical}`);
            const hLines = gsap.utils.toArray(`.${styles.horizontal}`);
            const brackets = gsap.utils.toArray(`.${styles.bracket}`);
            const logo = `.${styles.logo}`;
            const titleSelector = `.${styles.title}`;
            const ball = `.${styles.ball}`;
            const content = `.${styles.content}`;
            const titleElement = containerRef.current.querySelector(titleSelector);

            gsap.set(ball, { scale: 0, y: -1000, transformOrigin: "50% 50%" });
            gsap.set(titleSelector, { scale: 0 });
            gsap.set(brackets, { opacity: 0 });
            gsap.set(content, { scale: 0 });
            gsap.set(containerRef.current, { clipPath: "circle(100% at 50% 50%)" });

            const tl = gsap.timeline({
                defaults: { ease: "hop" },
                // YENİ: Timeline bittiğinde 'onAnimationComplete' fonksiyonunu çağır
                onComplete: () => {
                    if (typeof onAnimationComplete === 'function') {
                        onAnimationComplete();
                    }
                }
            });

            tl.to([...vLines, ...hLines], {
                duration: 0.8,
                ease: 'hop',
                height: (i, target) => vLines.includes(target) ? '120vh' : '',
                width: (i, target) => hLines.includes(target) ? '120vw' : '',
                stagger: 0.05
            })
                .to(brackets, { opacity: 1, duration: 0.3 }, "+=0.5")
                .to(brackets, { filter: 'drop-shadow(0 0 30px #fff)', duration: 0.3 }, "+=0.5")
                .to(brackets, { filter: 'drop-shadow(0 0 0px #fff)', duration: 0.3 })
                .to(logo, { skewX: -15, duration: 0.3 })
                .to(logo, { skewX: 0, duration: 0.3 }, "<0.3")
                .to(logo, { width: '67.5%', duration: 0.8 }, "<")
                .call(() => {
                    if (titleElement) {
                        titleElement.textContent = "yeqq";
                    }
                }, null, "<")
                .to(titleSelector, { scale: 1 }, "<")
                .to(content, { scale: 1, duration: 1 })
                .to([...vLines, ...hLines], { opacity: 0, duration: 0.5, ease: 'hop' }, "<")
                .to(ball, { y: 0, scale: 0.1, duration: 0.8 }, "<")
                .to(ball, { scale: 1, ease: 'bounce', duration: 0.8 })
                .to(containerRef.current, { clipPath: "circle(0% at 50% 50%)", duration: 1.5 }, "<");
            // .set() ve .call() en sondan kaldırıldı çünkü onComplete kullandık.

        }, containerRef);

        return () => ctx.revert();
    }, [onAnimationComplete]); // prop'u dependency array'e ekledik

    return (
        <div className={styles.container} ref={containerRef} aria-hidden="true">
            <div className={styles.content} />
            <div className={styles.ball} />
            <div className={styles.title}>
                yeqq
            </div>
            <div className={styles.logo}>
                <img className={`${styles.bracket} ${styles.leftBracket}`} src="/left-bracket.svg" alt="left-bracket" />
                <img className={`${styles.bracket} ${styles.rightBracket}`} src="/right-bracket.svg" alt="right-bracket" />

                <div className={`${styles.vertical} ${styles.vertical_1}`} />
                <div className={`${styles.vertical} ${styles.vertical_2}`} />
                <div className={`${styles.vertical} ${styles.vertical_3}`} />
                <div className={`${styles.vertical} ${styles.vertical_4}`} />
                <div className={`${styles.horizontal} ${styles.horizontal_1}`} />
                <div className={`${styles.horizontal} ${styles.horizontal_2}`} />
                <div className={`${styles.horizontal} ${styles.horizontal_3}`} />
                <div className={`${styles.horizontal} ${styles.horizontal_4}`} />
            </div>
        </div>
    );
}
