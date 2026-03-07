import React, { useEffect, useRef, useMemo } from "react";
import styles from "./style.module.css";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
CustomEase.create("butter", "0.25, 0.1, 0.25, 1");
CustomEase.create("butterSlow", "0.14, 0.11, 0.11, 1");

export default function SplashScreen({ onAnimationComplete }) {
    const containerRef = useRef(null);
    const originalOverflow = useRef({ body: "", html: "" });

    const artImages = useMemo(() => {
        return Array.from({ length: 8 }, (_, i) => `/assets/modern-art/${i + 1}.webp`);
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        originalOverflow.current.body = document.body.style.overflow || "";
        originalOverflow.current.html = document.documentElement.style.overflow || "";
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        const cleanupAndClose = () => {
            document.body.style.overflow = originalOverflow.current.body;
            document.documentElement.style.overflow = originalOverflow.current.html;

            if (onAnimationComplete) {
                onAnimationComplete();
            }
        };

        let ctx = gsap.context(() => {
            const q = gsap.utils.selector(containerRef);
            const artCards = q(`.${styles.artCard}`);

            gsap.set(containerRef.current, {
                clipPath: "circle(100% at 50% 50%)"
            });

            gsap.set(artCards, {
                x: 0,
                y: 0,
                scale: 0.25,
                rotateZ: (i) => i * 2,
                borderRadius: "0%",
                clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
                transformOrigin: "50% 50%"
            });

            const tl = gsap.timeline({
                defaults: { ease: "butter" },
                onComplete: cleanupAndClose
            });

            tl.to(artCards, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 0.4,
                stagger: 0.2
            });

            tl.to(artCards, {
                rotateZ: 0,
                duration: 0.6,
                ease: "butterSlow"
            }, "-=0.2");

            tl.to(artCards, {
                borderRadius: "40vw",
                duration: 0.4,
                ease: "butterSlow"
            }, "-=0.4");

            tl.to(artCards, {
                scale: 1,
                duration: 0.8,
                ease: "butterSlow"
            }, "-=0.4");

            tl.to(containerRef.current, {
                clipPath: "circle(0% at 50% 50%)",
                duration: 0.8,
                ease: "butterSlow"
            }, "-=0.3");
        }, containerRef);

        return () => {
            ctx.revert();
            document.body.style.overflow = originalOverflow.current.body;
            document.documentElement.style.overflow = originalOverflow.current.html;
        };

    }, [artImages, onAnimationComplete]);

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.cardsWrapper}>
                {artImages.map((src, index) => (
                    <img key={index} className={styles.artCard} src={src} alt={`art-${index}`} loading="eager" />
                ))}
            </div>
        </div>
    );
}