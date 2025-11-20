import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
    useEffect(() => {
        // const lenis = new Lenis({
        //     // ÖNEMLİ AYARLAR BURADA:
        //     duration: 2.0, // Standart 1.2'dir. 2.0 yaparak çok daha "uzun" ve "yumuşak" bir kayma sağlarız.
        //     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing (tok duruş)
        //     direction: 'vertical',
        //     gestureDirection: 'vertical',
        //     smooth: true,
        //     mouseMultiplier: 1, // Mouse tekerleği hassasiyeti (1 standarttır, artırırsan çok hızlı akar)
        //     smoothTouch: false, // Mobilde native bırakmak genelde UX için daha iyidir
        //     touchMultiplier: 2,
        // });

        const lenis = new Lenis({
            duration: 2.8,                       // daha yavaş, daha sinematik
            easing: (t) => 1 - Math.pow(1 - t, 5), // ultra smooth buttery quartic+
            smooth: true,
            direction: 'vertical',
            gestureDirection: 'vertical',
            mouseMultiplier: 0.55,              // mouse scroll daha ağırlıklı
            lerp: 0.06,                         // butter effect
            smoothTouch: true,                  // mobile/tablet butter mode
            touchMultiplier: 1.4,               // mobile hız dengesi
        });


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