import { useEffect, useRef } from 'react';
import styles from "./style.module.css"
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { CustomEase } from "gsap/all";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(MotionPathPlugin);

export default function SplashScreen() {
    const containerRef = useRef(null);
    const ballRef = useRef(null);

    useEffect(() => {
        gsap.to(ballRef.current, {
            duration: 1,
            ease: "hop",
            scale: 1,
            onComplete: () => {
                gsap.to(containerRef.current, {
                    filter: "invert(1)",
                    duration: 0.5,
                    delay: 0.5,
                    onComplete: () => {
                        gsap.to(containerRef.current, {
                            "clip-path": "circle(0% at 50% 50%)",
                            duration: 1,
                            ease: "hop",
                            onComplete: () => {
                                gsap.to(containerRef.current, {
                                    display: "none",
                                })
                            }
                        })
                    }

                })
            }
        })

    }, []);


    return (
        <div className={styles.container} ref={containerRef}>
            <video
                className={styles.ball}
                ref={ballRef}
                src="https://deepmind.google/api/blob/website/media/veo__cover_s0RKXWX.mp4"
                autoPlay
                preload="auto"
                loop
                muted
                playsInline
            />
        </div>
    )
}
