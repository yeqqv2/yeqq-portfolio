import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./style.module.css";
import { prefersReducedMotion } from "@/utils/motion";

const AnimatedSplit = ({
    text,
    children,
    className = "",
    tagName = "span",
    stagger = 0.05,
    duration = 1.5,
    start = "top 80%",
    ease = "hop",
    ...rest
}) => {
    const elRef = useRef(null);
    const content = text != null ? text : children;
    const accessibleText = typeof content === "string" ? content : undefined;

    useEffect(() => {
        if (!elRef.current) return;
        if (prefersReducedMotion()) return;

        const wordElements = elRef.current.querySelectorAll("[data-split-word-inner]");
        if (!wordElements.length) return;

        gsap.set(wordElements, { y: "110%" });

        const tween = gsap.fromTo(
            wordElements,
            {
                y: "110%",
            },
            {
                y: "0%",
                duration,
                ease,
                stagger,
                scrollTrigger: {
                    trigger: elRef.current,
                    start,
                },
            }
        );

        return () => {
            try {
                if (tween && tween.scrollTrigger) {
                    tween.scrollTrigger.kill();
                }
                tween.kill();
            } catch (e) {
                // noop
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessibleText, stagger, duration, start, ease]);

    const renderedContent =
        typeof content === "string"
            ? content.split(/(\s+)/).map((segment, index) => {
                if (!segment) return null;
                if (/\s+/.test(segment)) return segment;

                return (
                    <span
                        className={styles.wordMask}
                        data-split-word
                        key={`${segment}-${index}`}
                    >
                        <span className={styles.word} data-split-word-inner>
                            {segment}
                        </span>
                    </span>
                );
            })
            : content;

    return React.createElement(
        tagName,
        {
            ref: elRef,
            className: `${styles.animatedText} ${className}`.trim(),
            "aria-label": rest["aria-label"] ?? accessibleText,
            ...rest,
        },
        renderedContent
    );
};

export default AnimatedSplit; 
