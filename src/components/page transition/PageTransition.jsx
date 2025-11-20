import { useEffect, useRef } from "react";
import styles from "./style.module.css";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

CustomEase.create("butterSlow", "0.14, 0.11, 0.11, 1");

export default function PageTransition({ trigger }) {
    const circleRef = useRef(null);
    const tlRef = useRef(null);

    useEffect(() => {
        if (!trigger) return;
        if (!circleRef.current) return;

        // timeline reset
        if (tlRef.current) tlRef.current.kill();

        const tl = gsap.timeline();
        tlRef.current = tl;

        tl.set(circleRef.current, {
            clipPath: "circle(0% at 50% 50%)",
            display: "block",
        });

        // PAGE EXIT (circle grows)
        tl.to(circleRef.current, {
            clipPath: "circle(140% at 50% 50%)",
            duration: 0.45,
            ease: "butterSlow",
        });

        // PAGE ENTER (circle shrinks)
        tl.to(circleRef.current, {
            clipPath: "circle(0% at 50% 50%)",
            duration: 0.45,
            ease: "butterSlow",
            onComplete: () => {
                circleRef.current.style.display = "none";
            },
        });

    }, [trigger]);

    return <div ref={circleRef} className={styles.transitionCircle}></div>;
}
