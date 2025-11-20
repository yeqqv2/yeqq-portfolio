import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import styles from "./style.module.css";

/**
 * AnimatedSplit
 *
 * Props:
 * - text: string (opsiyonel). children varsa children kullanılır.
 * - children: JSX | string (opsiyonel)
 * - className: dışarıdan verilen stil sınıfı (opsiyonel)
 * - tagName: wrapper için HTML tag (default: "span")
 * - types: SplitType için types (default: "lines, words")
 * - stagger: kelime stagger değeri (default: 0.05)
 * - duration: animasyon süresi (default: 1.5)
 * - start: ScrollTrigger start (default: "top 80%")
 * - ease: easing key (default: "hop")
 *
 * Not: GSAP plugin (ScrollTrigger, CustomEase) ve CustomEase.create("hop", ...) üst seviye bir dosyada
 * (ör. ProjectsContainer) bir kez tanımlanmış olmalı; aksi takdirde "hop" custom ease bulunamayabilir.
 */
const AnimatedSplit = ({
    text,
    children,
    className = "",
    tagName = "span",
    types = "lines, words",
    stagger = 0.05,
    duration = 1.5,
    start = "top 80%",
    ease = "hop",
    ...rest
}) => {
    const elRef = useRef(null);
    const splitRef = useRef(null);

    useEffect(() => {
        if (!elRef.current) return;

        let split;
        let tween;

        try {
            // Eğer önceden bir split uygulanmışsa temizle
            SplitType.revert(elRef.current);
        } catch (e) {
            // noop
        }

        // Yeni split oluştur
        split = new SplitType(elRef.current, { types, tagName });
        splitRef.current = split;

        // Başlangıç pozisyonu
        gsap.set(split.words, { y: "110%" });

        // Animasyon (ScrollTrigger ile)
        tween = gsap.fromTo(
            split.words,
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
            // Tween / ScrollTrigger temizliği
            try {
                if (tween && tween.scrollTrigger) {
                    tween.scrollTrigger.kill();
                }
            } catch (e) {
                // noop
            }

            // SplitType revert
            try {
                if (split && typeof split.revert === "function") {
                    split.revert();
                }
            } catch (e) {
                // noop
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, types, tagName, stagger, duration, start, ease]);

    const content = text != null ? text : children;

    return React.createElement(
        tagName,
        { ref: elRef, className: `${styles.animatedText} ${className}`.trim(), ...rest },
        content
    );
};

export default AnimatedSplit; 