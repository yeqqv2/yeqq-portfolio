import React, { useEffect, useRef } from "react";
import styles from "./style.module.css";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { CustomEase } from "gsap/all";

gsap.registerPlugin(CustomEase, TextPlugin, MotionPathPlugin);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function SplashScreen() {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const ballRef = useRef(null);
    const titleRef = useRef(null);
    const tlRef = useRef(null);

    useEffect(() => {
        if (ballRef.current) {
            gsap.set(ballRef.current, {
                scale: 0,
                transformOrigin: "50% 50%",
            });
        }
        if (contentRef.current) {
            gsap.set(contentRef.current, {
                clipPath: "circle(100% at 50% 50%)",
                filter: "none",
            });
        }
        if (containerRef.current) {
            gsap.set(containerRef.current, {
                clipPath: "circle(100% at 50% 50%)",
                filter: "none",
            });
        }

        const tl = gsap.timeline({ defaults: { ease: "hop" } });
        tlRef.current = tl;

        tl.to(ballRef.current, { scale: 0 })
            .to(contentRef.current, { duration: 1 }, "+=1")
            .to(titleRef.current, { scale: 1, duration: 0 })
            .call(() => {
                if (titleRef.current) titleRef.current.textContent = "[ who cares? ]";
            })
            .to(contentRef.current, { duration: 0.05 }, "+=1")
            .call(() => {
                if (titleRef.current) titleRef.current.textContent = "[ you ]";
            })
            .to(contentRef.current, { duration: 0.05 }, "+=0.25")
            .call(() => {
                if (titleRef.current) titleRef.current.textContent = "[ are ]";
            })
            .to(contentRef.current, { duration: 0.05 }, "+=0.25")
            .call(() => {
                if (titleRef.current) titleRef.current.textContent = "[ here ]";
            })
            .to(titleRef.current, { scale: 1.5, duration: 0.25 }, "+=0.25")
            .to(titleRef.current, { scale: 2, duration: 0.25 }, "+=0.25")
            .to(titleRef.current, { scale: 3, duration: 0.25 }, "+=0.25")
            .to(titleRef.current, { y: -100 })
            .to(
                ballRef.current,
                {
                    scale: 0.25,
                    duration: 0.25,
                    ease: "bounce",
                },
                "<"
            )
            .to(contentRef.current, { duration: 0.05 }, "+=0.25")
            .call(() => {
                if (titleRef.current) titleRef.current.textContent = "[ so ]";
            })
            .to(titleRef.current, { scale: 1, duration: 0 })
            .to(contentRef.current, { duration: 0.05 }, "+=0.25")
            .call(() => {
                if (titleRef.current) titleRef.current.textContent = "[ never mind ]";
            })
        // .to(contentRef.current, { duration: 0.05 }, "+=0.25")
        // .to(
        //     ballRef.current,
        //     {
        //         scale: 1,
        //         duration: 1.5,
        //     },
        //     "+=1"
        // )
        // .set(titleRef.current, { display: "none" }, "<")
        // .to(
        //     contentRef.current,
        //     {
        //         clipPath: "circle(0% at 50% 50%)",
        //         duration: 1,
        //         ease: "hop",
        //     },
        //     "+=0.1"
        // )
        // .to(
        //     containerRef.current,
        //     {
        //         clipPath: "circle(0% at 50% 50%)",
        //         duration: 1.5,
        //         ease: "hop",
        //     },
        //     "<"
        // )
    }, []);

    return (
        <div className={styles.container} ref={containerRef} aria-hidden="false">
            <div className={styles.content} ref={contentRef} />
            <div className={styles.title} ref={titleRef}>
                [ what is art? ]
            </div>
            <img
                className={styles.ball}
                ref={ballRef}
                src="/assets/earth/8.webp"
                alt="earth"
                aria-hidden="true"
            />
        </div>
    );
}