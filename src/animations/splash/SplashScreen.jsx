import React, { useEffect, useRef } from "react";
import styles from "./style.module.css";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { CustomEase } from "gsap/all";

gsap.registerPlugin(CustomEase, TextPlugin, MotionPathPlugin);
CustomEase.create("hop", "0.1, 0, 0.1, 1");

export default function SplashScreen() {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const ballRef = useRef(null);
    const titleRef = useRef(null);
    const vLine1Ref = useRef(null);
    const vLine2Ref = useRef(null);
    const vLine3Ref = useRef(null);
    const vLine4Ref = useRef(null);
    const hLine1Ref = useRef(null);
    const hLine2Ref = useRef(null);
    const hLine3Ref = useRef(null);
    const hLine4Ref = useRef(null);
    const leftBracketRef = useRef(null);
    const righttBracketRef = useRef(null);
    const tlRef = useRef(null);

    useEffect(() => {
        if (ballRef.current) {
            gsap.set(ballRef.current, {
                scale: 0,
                transformOrigin: "50% 50%",
                y: -1000
            });
        }
        if (titleRef.current) {
            gsap.set(titleRef.current, {
                skewX: -45,
                skewY: -45,
                scale: 0,
                y: 400,
                x: -500,
            });
        }
        if (contentRef.current) {
            gsap.set(contentRef.current, {
                clipPath: "circle(100% at 50% 50%)",
                filter: "none",
                width: 0,
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

        tl
            // .to(titleRef.current,
            // {
            //     skewX: -45,
            //     skewY: -45,
            //     scale: 0,
            //     y: 400,
            //     x: -500,
            // })
            // .to(titleRef.current,
            //     {
            //         duration: 1.8,
            //         ease: 'hop',
            //         skewX: 0,
            //         skewY: 0,
            //         scale: 1,
            //         y: -400,
            //         x: 0,
            //         rotate: '10deg',
            //     })
            // .to(titleRef.current,
            //     {
            //         duration: 1.8,
            //         ease: 'power1.in',
            //         skewX: 45,
            //         skewY: 45,
            //         scale: 0,
            //         y: 400,
            //         x: 500,
            //         rotate: '20deg',
            //     })
            .set(titleRef.current,
                {
                    skewX: 0,
                    skewY: 0,
                    scale: 1,
                    y: '-10%',
                    x: 0,
                    rotate: 0
                })
            .set(leftBracketRef.current,
                {
                    opacity: 0
                })
            .set(righttBracketRef.current,
                {
                    opacity: 0
                })
            .to(vLine1Ref.current,
                {
                    duration: 0.8,
                    ease: 'power1.in',
                    height: '100vh'
                })
            .to(hLine3Ref.current,
                {
                    duration: 0.8,
                    ease: 'power1.in',
                    width: '100vw',
                    delay: 0.3
                }, "<")
            .to(vLine3Ref.current,
                {
                    duration: 0.8,
                    ease: 'power1.in',
                    height: '100vh',
                    delay: 0.3
                }, "<")
            .to(hLine1Ref.current,
                {
                    duration: 0.8,
                    ease: 'power1.in',
                    width: '100vw',
                    delay: 0.3
                }, "<")

            .to(vLine2Ref.current,
                {
                    duration: 0.8,
                    ease: 'power1.in',
                    height: '100vh',
                    delay: 0.3
                }, "<")
            .to(hLine4Ref.current,
                {
                    duration: 0.8,
                    ease: 'power1.in',
                    width: '100vw',
                    delay: 0.3
                }, "<")
            .to(vLine4Ref.current,
                {
                    duration: 0.8,
                    ease: 'power1.in',
                    height: '100vh',
                    delay: 0.3
                }, "<")
            .to(hLine2Ref.current,
                {
                    duration: 0.8,
                    ease: 'power1.in',
                    width: '100vw',
                    delay: 0.3
                }, "<")
            .to(leftBracketRef.current,
                {
                    duration: 0.3,
                    opacity: 1
                }, "+=0.5")
            .to(righttBracketRef.current,
                {
                    duration: 0.3,
                    opacity: 1
                }, "<")




        // .to(contentRef.current,
        //     {
        //         duration: 1,
        //         width: '100%'
        //     }, "+=1")
        // .to(titleRef.current,
        //     {
        //         duration: 0.8,
        //         width: '100%'
        //     }, "+=1")
        // .to(ballRef.current, { duration: 1, scale: 0.1, y: 0 }, "+=1")

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
            <div className={styles.ball} ref={ballRef} />
            <div className={styles.title} ref={titleRef}>
                yeqq
            </div>
            <div className={styles.logo}>
                <img
                    ref={leftBracketRef}
                    className={styles.bracket}
                    src="/left-bracket.svg"
                    alt="left-bracket"
                />
                <img
                    ref={righttBracketRef}
                    className={styles.bracket}
                    src="/right-bracket.svg"
                    alt="right-bracket"
                />
                <div
                    className={`${styles.vertical} ${styles.vertical_1}`}
                    ref={vLine1Ref}
                />
                <div
                    className={`${styles.vertical} ${styles.vertical_2}`}
                    ref={vLine2Ref}
                />
                <div
                    className={`${styles.vertical} ${styles.vertical_3}`}
                    ref={vLine3Ref}
                />
                <div
                    className={`${styles.vertical} ${styles.vertical_4}`}
                    ref={vLine4Ref}
                />
                <div
                    className={`${styles.horizontal} ${styles.horizontal_1}`}
                    ref={hLine1Ref}
                />
                <div
                    className={`${styles.horizontal} ${styles.horizontal_2}`}
                    ref={hLine2Ref}
                />
                <div
                    className={`${styles.horizontal} ${styles.horizontal_3}`}
                    ref={hLine3Ref}
                />
                <div
                    className={`${styles.horizontal} ${styles.horizontal_4}`}
                    ref={hLine4Ref}
                />
            </div>
        </div>
    );
}