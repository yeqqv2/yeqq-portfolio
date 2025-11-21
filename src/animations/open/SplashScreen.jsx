import React, { useEffect, useRef, useMemo } from "react";
import styles from "./style.module.css";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
CustomEase.create("butter", "0.25, 0.1, 0.25, 1");
CustomEase.create("butterSlow", "0.14, 0.11, 0.11, 1");

export default function SplashScreen({ onAnimationComplete }) {
    const containerRef = useRef(null);
    const imagesContainerRef = useRef(null);
    const tlRef = useRef(null);
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
            tlRef.current = tl;

            // 1) KARTLARIN SOFT AÇILMASI (clipPath reveal)
            tl.to(artCards, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: .66,
                stagger: .5
            });

            // 2) ROTATION YUMUŞAKÇA SIFIRLANIR
            tl.to(artCards, {
                rotateZ: 0,
                duration: 1.2,
                ease: "butterSlow"
            }, "-=0.9");

            tl.to(artCards, {
                borderRadius: "40vw",
                duration: 0.65,
                ease: "butterSlow"
            }, "-=0.7");

            tl.to(artCards, {
                scale: 1,
                duration: 1.45,
                ease: "butterSlow"
            }, "-=0.9");

            tl.to(containerRef.current, {
                clipPath: "circle(0% at 50% 50%)",
                duration: 1.6,
                ease: "butterSlow"
            }, "-=0.65");
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