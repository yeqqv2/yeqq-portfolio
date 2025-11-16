import { useEffect, useRef } from 'react';
import styles from "./style.module.css";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const LOOPING_FONTS = [
    'system-ui',
    'sans-serif',
    'serif',
];

export default function AboutIntro() {
    const containerRef = useRef(null);
    const descRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const split = new SplitType(descRef.current, {
                types: 'lines, words',
                tagName: 'span'
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                }
            });

            tl.from(split.words, {
                y: '110%',
                duration: 0.75,
                ease: 'back.out(1.8)',
                stagger: 0.05,
                delay: 0.5,
            });

            const designWord = split.words.find(word => word.textContent === 'design');

            if (designWord) {
                const originalFont = getComputedStyle(designWord).fontFamily;
                const allFonts = [...LOOPING_FONTS, originalFont];

                tl.to(designWord, {
                    keyframes: allFonts.map(font => ({ fontFamily: font })),
                    duration: allFonts.length * 0.3,
                    ease: `steps(${allFonts.length - 1})`,
                    repeat: -1,
                }, ">");
            }

        }, containerRef);
        return () => ctx.revert();

    }, []);

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.header_title} ref={descRef}>
                merging design thinking with frontend engineering.
            </div>
        </div>
    );
}