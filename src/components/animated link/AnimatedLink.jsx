// AnimatedLink.js

import React, { useState, useRef, useCallback } from 'react';
import gsap from 'gsap';
import styles from './style.module.css';

const AnimatedLink = ({ href, defaultText, hoverText, arialabel, onClick, icon: IconComponent }) => {
    const [textLines, setTextLines] = useState([defaultText]);

    // Animasyonun uygulanacağı metin kapsayıcıları
    const textInnerRef = useRef(null);
    const textWrapRef = useRef(null);
    const textCycleAnimRef = useRef(null);

    // Animasyon mantığı
    const animateText = useCallback((isHovering) => {
        const inner = textInnerRef.current;
        if (!inner) return;

        textCycleAnimRef.current?.kill();

        // Hedef metinleri belirle: isHovering true ise -> default'tan hover'a geçiş
        const currentLabel = isHovering ? defaultText : hoverText;
        const targetLabel = isHovering ? hoverText : defaultText;
        const cycles = 2; // Kaç kez zıplayacağı

        // Animasyon sırasını (sequence) oluştur
        const seq = [currentLabel];
        let last = currentLabel;
        for (let i = 0; i < cycles; i++) {
            last = last === defaultText ? hoverText : defaultText;
            seq.push(last);
        }
        if (last !== targetLabel) seq.push(targetLabel);
        seq.push(targetLabel);

        setTextLines(seq);

        gsap.set(inner, { yPercent: 0 });

        const lineCount = seq.length;
        // Kaydırma yüzdesi: (Toplam satır - 1) / Toplam satır * 100
        const finalShift = ((lineCount - 1) / lineCount) * 100;

        textCycleAnimRef.current = gsap.to(inner, {
            yPercent: -finalShift,
            duration: 0.3 + lineCount * 0.05, // Hafif hızlı animasyon süresi
            ease: 'power4.out',
        });
    }, [defaultText, hoverText]);

    const handleMouseEnter = () => {
        animateText(true); // Hover başlar
    };

    const handleMouseLeave = () => {
        animateText(false); // Hover biter, başlangıç metnine döner
    };

    return (
        <a
            className={styles.sm_panel_item} // Kullanıcının sağladığı ana link stili
            href={href}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label={arialabel}
        >
            <span ref={textWrapRef} className={styles.sm_toggle_textWrap} aria-hidden="true">
                <span ref={textInnerRef} className={styles.sm_toggle_textInner}>
                    {textLines.map((text, index) => (
                        <span className={styles.sm_toggle_line} key={index}>
                            {text}
                        </span>
                    ))}
                </span>
            </span>
        </a>
    );
};

export default AnimatedLink;