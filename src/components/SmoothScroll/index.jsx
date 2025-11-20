import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 2.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: true,
            touchMultiplier: 1.4,
        });

        // const lenis = new Lenis({
        //     duration: 2.8,
        //     easing: (t) => 1 - Math.pow(1 - t, 5),
        //     smooth: true,
        //     direction: 'vertical',
        //     gestureDirection: 'vertical',
        //     mouseMultiplier: 0.55,
        //     lerp: 0.06,
        //     smoothTouch: true,
        //     touchMultiplier: 1.4,
        // });


        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Animasyonlarda titremeyi önlemek için lagSmoothing'i kapatıyoruz
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(lenis.raf);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}