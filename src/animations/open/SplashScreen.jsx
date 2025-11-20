import React, { useEffect, useRef, useMemo } from "react";
import styles from "./style.module.css";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");
CustomEase.create("superSmooth", "0.15, 0.85, 0.25, 1");

export default function SplashScreen({ onAnimationComplete }) {
    const containerRef = useRef(null);
    const imagesContainerRef = useRef(null);
    const tlRef = useRef(null);
    const originalOverflow = useRef({ body: "", html: "" });

    const artImages = useMemo(() => {
        return Array.from({ length: 8 }, (_, i) => `/assets/art/${i + 1}.webp`);
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

            if (containerRef.current) {
                containerRef.current.style.display = "none";
            }

            if (onAnimationComplete) {
                onAnimationComplete();
            }
        };

        let ctx = gsap.context(() => {
            const q = gsap.utils.selector(containerRef);
            const artCards = q(`.${styles.artCard}`);

            gsap.set(containerRef.current, { clipPath: "circle(100% at 50% 50%)" });

            gsap.set(artCards, {
                x: 0, y: 0, scale: 0.25, zIndex: (i) => i + 1,
                rotateZ: (i) => i * 2, borderRadius: '0%',
                clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)"
            });

            const tl = gsap.timeline({
                defaults: { ease: "hop" },
                onComplete: cleanupAndClose
            });
            tlRef.current = tl;

            tl.to(artCards, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", scale: 0.25, duration: 0.5, stagger: 0.3, ease: "hop" })
                .to(artCards, { rotateZ: 0, duration: 1, ease: "hop" }, "+=0.25")
                .to(artCards, { borderRadius: '50%', duration: 0.25, ease: "none" }, ">-0.25")
                .to(artCards, { scale: 1, duration: .33, ease: "hop" }, "+=0.33")
                .to(containerRef.current, {
                    clipPath: "circle(0% at 50% 50%)",
                    duration: 0.5,
                    ease: "superSmooth"
                }, "<")
                .to(containerRef.current, {
                    delay: 0.25,
                }, ">")

        }, containerRef);

        return () => {
            ctx.revert();
            document.body.style.overflow = originalOverflow.current.body;
            document.documentElement.style.overflow = originalOverflow.current.html;
        };

    }, [artImages, onAnimationComplete]);

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.cardsWrapper} ref={imagesContainerRef}>
                {artImages.map((src, index) => (
                    <img key={index} className={styles.artCard} src={src} alt={`art-${index}`} loading="eager" />
                ))}
            </div>
        </div>
    );
}