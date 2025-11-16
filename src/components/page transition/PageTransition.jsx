import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import styles from "./style.module.css"

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const PageTransition = ({ children }) => {
    const location = useLocation();
    const overlayRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        // Overlay başta tam ekranı kaplıyor, sonra yukarı kayıp yok oluyor
        gsap.fromTo(
            overlayRef.current,
            { y: '0%' },
            { y: '-100%', duration: 0.8, ease: 'hop', delay: 0.2 }
        );

        // Content fade in
        gsap.fromTo(
            contentRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.6, delay: 0.3, ease: 'power2.out' }
        );

        // Scroll to top
        window.scrollTo(0, 0);

    }, [location.pathname]);

    return (
        <>
            <div
                ref={overlayRef}
                className={styles.container}
            />
            <div ref={contentRef}>{children}</div>
        </>
    );
};

export default PageTransition;