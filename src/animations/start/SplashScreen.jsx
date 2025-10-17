import { useEffect, useRef } from "react";
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
    const tlRef = useRef(null); // keep timeline so we can kill on unmount

    useEffect(() => {
        // Guard: only run in browser
        if (typeof window === "undefined") return;

        // Robust session check (try/catch in case storage is restricted)
        let alreadyRan = false;
        try {
            alreadyRan = sessionStorage.getItem("splashRan") === "1";
        } catch (e) {
            alreadyRan = false;
        }

        // If it already ran in this tab/session, hide splash immediately and don't run animation
        if (alreadyRan) {
            if (containerRef.current) containerRef.current.style.display = "none";
            return;
        }

        // Prevent double-creating timeline if effect somehow runs twice
        if (tlRef.current) return;

        // Initial setup
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
                display: "", // ensure visible if CSS had it hidden
            });
        }

        const tl = gsap.timeline({ defaults: { ease: "hop" } });
        tlRef.current = tl;

        // Build timeline (kept structure from your original animation)
        tl.to(ballRef.current, { scale: 0 })
            .to(contentRef.current, { duration: 0.05 }, "+=1")
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
            // close animation (clipPaths + hide)
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
                // mark session as completed (wrapped in try/catch)
                try {
                    sessionStorage.setItem("splashRan", "1");
                } catch (e) {
                    // ignore storage failures (private mode, blocked, etc.)
                }
            })
            .set(containerRef.current, { display: "none" });

        // Fallback: if GSAP doesn't complete for any reason, hide after a timeout
        const fallbackMs = 10000; // 10s fallback
        const fallbackId = setTimeout(() => {
            if (tlRef.current) {
                try {
                    sessionStorage.setItem("splashRan", "1");
                } catch (e) { }
                if (containerRef.current) containerRef.current.style.display = "none";
                // Kill timeline if still alive
                if (tlRef.current) {
                    tlRef.current.kill();
                    tlRef.current = null;
                }
            }
        }, fallbackMs);

        // When timeline completes, clear fallback timer and cleanup reference
        tl.eventCallback("onComplete", () => {
            clearTimeout(fallbackId);
            tlRef.current = null;
        });

        // Cleanup on unmount
        return () => {
            clearTimeout(fallbackId);
            if (tlRef.current) {
                tlRef.current.kill();
                tlRef.current = null;
            }
        };
        // empty deps: run once per mount
    }, []);

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.content} ref={contentRef} />
            <div className={styles.title} ref={titleRef}>
                [ what if it goes wrong? ]
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