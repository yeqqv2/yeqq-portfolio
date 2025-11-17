import { useEffect, useRef } from 'react';
import styles from "./style.module.css";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import CustomEase from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function HeroAbout() {
    const containerRef = useRef(null);
    const headerRef = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const contentDescRef = useRef(null);

    // refs for the work item wrappers
    const workRefs = useRef([]);
    // do NOT reset workRefs.current = [] here — we use callback refs below

    // collect ScrollTrigger instances (optional, for manual cleanup/debug)
    const scrollTriggersRef = useRef([]);

    const workImages = [
        "/assets/images/projects/balikesir-etkinlik/1.jpg",
        "/assets/images/projects/skynotech/1.jpg",
        "/assets/images/projects/yakin-kart/1.jpg",
    ];

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Split text for title/desc (apply to contentDescRef for textual split)
            const titleSplit = new SplitType(titleRef.current, {
                types: "lines, words",
                tagName: "span",
            });

            const descSplit = new SplitType(contentDescRef.current, {
                types: "lines, words",
                tagName: "span",
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none",
                },
            });

            tl.from(titleSplit.words, {
                y: "110%",
                duration: 0.75,
                ease: "hop",
                stagger: 0.05,
                delay: 0.5,
            });

            tl.from(
                descSplit.words,
                {
                    y: "110%",
                    duration: 0.75,
                    ease: "hop",
                    stagger: 0.05,
                },
                "<0.3"
            );


            // ————— Per-image clip-path reveal (snippet-style) —————
            // Loop through wrappers and create individual ScrollTriggers (like the snippet you provided)
            workRefs.current.forEach((work, index) => {
                if (!work) return;
                const img = work.querySelector(`.${styles.work_img}`);
                if (!img) return;

                // ensure starting state (hidden from bottom)
                gsap.set(img, { clipPath: "inset(100% 0% 0% 0%)" });

                const st = gsap.fromTo(
                    img,
                    { clipPath: "inset(100% 0% 0% 0%)" },
                    {
                        clipPath: "inset(0% 0% 0% 0%)",
                        duration: 1.5,
                        ease: "power3.out",
                        delay: index * 0.15, // stagger-like delay per index on enter
                        scrollTrigger: {
                            trigger: work,
                            start: "top 85%",
                            onEnter: (self) => {
                                scrollTriggersRef.current.push(self);
                            },
                        },
                    }
                );

                // optional: animate wrapper for slight translate/fade to emphasize entrance
                gsap.fromTo(
                    work,
                    { y: 20, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power2.out",
                        delay: index * 0.12,
                        scrollTrigger: {
                            trigger: work,
                            start: "top 85%",
                        },
                    }
                );
            });
        }, containerRef);

        return () => {
            // revert gsap.context (kills animations created in context)
            ctx.revert();
            // clear stored triggers references
            scrollTriggersRef.current = [];
        };
    }, []);

    return (
        <div className={styles.container} ref={containerRef}>
            <header className={styles.header} ref={headerRef}>
                <div className={styles.title} ref={titleRef}>
                    merging design thinking with frontend engineering.
                </div>

                <div className={styles.desc} ref={descRef}>
                    <div className={styles.text_and_imgs}>
                        <div ref={contentDescRef} className={styles.content_desc_text}>
                            obsessively crafted.
                            <br />
                            engineered with intent.
                        </div>

                        <div className={styles.work_container}>
                            {workImages.map((src, idx) => (
                                <div
                                    key={idx}
                                    className={styles.work_item}
                                    ref={(el) => {
                                        workRefs.current[idx] = el;
                                    }}
                                >
                                    <img
                                        src={src}
                                        alt={`work-${idx + 1}`}
                                        className={styles.work_img}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}