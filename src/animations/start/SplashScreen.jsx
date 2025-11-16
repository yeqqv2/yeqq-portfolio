import React, { useEffect, useRef } from "react";
import styles from "./style.module.css";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase, TextPlugin, MotionPathPlugin);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function SplashScreen() {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const ballRef = useRef(null);
    const titleRef = useRef(null);
    const tlRef = useRef(null);
    const originalOverflow = useRef({ body: "", html: "" });

    useEffect(() => {
        if (typeof window === "undefined") return;

        let ranBefore = false;
        try {
            ranBefore = sessionStorage.getItem("splashRan") === "1";
        } catch (e) {
            ranBefore = false;
        }
        if (ranBefore) {
            if (containerRef.current) containerRef.current.style.display = "none";
            return;
        }

        originalOverflow.current.body = document.body.style.overflow || "";
        originalOverflow.current.html = document.documentElement.style.overflow || "";

        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        if (containerRef.current) {
            containerRef.current.style.display = "";
            containerRef.current.style.pointerEvents = "auto";
        }

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
            .to(contentRef.current, { duration: 0.05 }, "+=1")
            .call(() => {
                if (titleRef.current) titleRef.current.textContent = "[ who cares? ]";
            })
            .to(containerRef.current, { filter: 'invert(1)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(0)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(1)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(0)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(1)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(0)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(1)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(0)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(1)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(0)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(1)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(0)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(1)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(0)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(1)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(0)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(1)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(0)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(1)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(0)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(1)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(0)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(1)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(0)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(1)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(0)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(1)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(0)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(1)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(0)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(1)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(0)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(1)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(0)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(1)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(0)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(1)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(0)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(1)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(0)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(1)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(0)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(1)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(0)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(1)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(0)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(1)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(0)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(1)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(0)', duration: 0.005 })
            .to(containerRef.current, { filter: 'invert(1)', duration: 0.005 })
            .to(contentRef.current, { duration: 0.05 }, "+=0.75")
            .call(() => {
                if (titleRef.current) titleRef.current.textContent = "[ you ]";
            })
            .to(titleRef.current, { rotate: '0deg', duration: 0 })
            .to(contentRef.current, { duration: 0.05 }, "+=0.25")
            .call(() => {
                if (titleRef.current) titleRef.current.textContent = "[ are ]";
            })
            .to(contentRef.current, { duration: 0.05 }, "+=0.25")
            .call(() => {
                if (titleRef.current) titleRef.current.textContent = "[ here ]";
            })
            .to(titleRef.current, { scale: 1.5, duration: 0 }, "+=0.5")
            .to(titleRef.current, { scale: 2, duration: 0 }, "+=0.5")
            .to(titleRef.current, { scale: 3, duration: 0 }, "+=0.5")
            .to(titleRef.current, { y: -100 })
            .to(
                ballRef.current,
                {
                    scale: 0.25,
                    duration: 0.5,
                    ease: "bounce",
                },
                "<"
            )
            .to(contentRef.current, { duration: 0.05 }, "+=0.25")
            .call(() => {
                if (titleRef.current) titleRef.current.textContent = "[ with ]";
            })
            .to(titleRef.current, { scale: 1, duration: 0 })
            .to(contentRef.current, { duration: 0.05 }, "+=0.25")
            .call(() => {
                if (titleRef.current) titleRef.current.textContent = "[ yeqq ]";
            })
            .to(contentRef.current, { duration: 0.05 }, "+=0.25")
            .to(
                ballRef.current,
                {
                    scale: 1,
                    duration: 1.5,
                },
                "+=1"
            )
            .set(titleRef.current, { display: "none" }, "<")
            .to(
                contentRef.current,
                {
                    clipPath: "circle(0% at 50% 50%)",
                    duration: 1,
                    ease: "hop",
                },
                "+=0.1"
            )
            .to(
                containerRef.current,
                {
                    clipPath: "circle(0% at 50% 50%)",
                    duration: 1.5,
                    ease: "hop",
                },
                "<"
            )
            .call(() => {
                try {
                    sessionStorage.setItem("splashRan", "1");
                } catch (e) {
                }
                document.body.style.overflow = originalOverflow.current.body;
                document.documentElement.style.overflow = originalOverflow.current.html;
                if (containerRef.current) containerRef.current.style.display = "none";
            });

        const fallback = setTimeout(() => {
            if (tlRef.current) {
                try {
                    sessionStorage.setItem("splashRan", "1");
                } catch (e) { }
                document.body.style.overflow = originalOverflow.current.body;
                document.documentElement.style.overflow = originalOverflow.current.html;
                if (containerRef.current) containerRef.current.style.display = "none";
                tlRef.current.kill();
                tlRef.current = null;
            }
        }, 12000);

        tl.eventCallback("onComplete", () => {
            clearTimeout(fallback);
            tlRef.current = null;
        });

        return () => {
            clearTimeout(fallback);
            if (tlRef.current) {
                tlRef.current.kill();
                tlRef.current = null;
            }
            document.body.style.overflow = originalOverflow.current.body;
            document.documentElement.style.overflow = originalOverflow.current.html;
        };
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
                loading="lazy"
                decoding="async"
            />
        </div>
    );
}