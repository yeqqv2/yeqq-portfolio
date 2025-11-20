import { useEffect, useRef } from 'react';
import styles from "./style.module.css";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import CustomEase from 'gsap/CustomEase';
import AnimatedSplit from '../../components/animated split/AnimatedSplit';

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
        "/assets/art/9.webp",
        "/assets/art/10.webp",
        "/assets/art/11.webp",
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
                    start: "top 100%",
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

            workRefs.current.forEach((work, index) => {
                if (!work) return;
                const img = work.querySelector(`.${styles.work_img}`);
                if (!img) return;

                gsap.set(img, { clipPath: "inset(100% 0% 0% 0%)" });

                const st = gsap.fromTo(
                    img,
                    { clipPath: "inset(100% 0% 0% 0%)" },
                    {
                        clipPath: "inset(0% 0% 0% 0%)",
                        duration: 1.5,
                        ease: "hop",
                        delay: index * 0.15,
                        scrollTrigger: {
                            trigger: work,
                            start: "top 100%",
                            onEnter: (self) => {
                                scrollTriggersRef.current.push(self);
                            },
                        },
                    }
                );

                // optional: animate wrapper for slight translate/fade to emphasize entrance
                gsap.fromTo(
                    work,
                    { y: 20 },
                    {
                        y: 0,
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
                <AnimatedSplit
                    text="merging design thinking with frontend engineering."
                    className={styles.title}
                    tagName="span"
                    stagger={0.03}
                    duration={1.5}
                    start="top 80%"
                />
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
                                        aria-hidden="true"
                                        loading="lazy"
                                        decoding="async"
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