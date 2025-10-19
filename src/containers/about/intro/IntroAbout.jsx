import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from "./style.module.css";
import Carousel from '../../../components/carousel/Carousel';

gsap.registerPlugin(ScrollTrigger);

const IntroAbout = () => {
    const containerRef = useRef(null);
    const wrapperRef = useRef(null);
    const h1Ref = useRef(null);
    const cardsRefs = useRef([]);
    const [viewportHeight, setViewportHeight] = useState(0);

    // Viewport yüksekliğini güncel tut ve ScrollTrigger'ı yenile
    useEffect(() => {
        const updateHeight = () => {
            setViewportHeight(window.innerHeight);
            ScrollTrigger.refresh();
        };

        updateHeight();

        window.addEventListener('resize', updateHeight);
        window.addEventListener('orientationchange', updateHeight);
        return () => {
            window.removeEventListener('resize', updateHeight);
            window.removeEventListener('orientationchange', updateHeight);
        };
    }, []);

    // Kart referanslarını ekle (aynı referansın iki kez eklenmesini önle)
    const addToCardsRefs = (el) => {
        if (el && !cardsRefs.current.includes(el)) {
            cardsRefs.current.push(el);
        }
    };

    // Her kart için dönüş (rotate) limiti—burada istediğiniz değeri ayarlayabilirsiniz.
    // Örneğin, ilk kart 45deg, ikinci 30deg, vb.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const cardsConfig = [
        { rotate: 45 },
        { rotate: 30 },
        { rotate: 20 },
        { rotate: 10 },
        { rotate: 0 },
    ];

    // İlk render aşamasında h1 statik görünsün; LCP gecikmesini azaltmak için animasyonu kısa bir süre sonra başlat.
    useEffect(() => {
        if (h1Ref.current) {
            setTimeout(() => {
                gsap.fromTo(
                    h1Ref.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
                );
            }, 150);
        }
    }, []);

    // GSAP ve ScrollTrigger animasyonlarını uygulamak için useLayoutEffect kullanıyoruz.
    useLayoutEffect(() => {
        if (viewportHeight === 0 || !wrapperRef.current) return;

        let ctx = gsap.context(() => {
            // Wrapper üzerindeki parallax animasyonu
            ScrollTrigger.create({
                trigger: wrapperRef.current,
                start: "top top",
                end: `+=${viewportHeight}vh`,
                scrub: 1,
                pin: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    gsap.to(wrapperRef.current, {
                        x: `${-550 * progress}vw`,
                        duration: 0.5,
                        ease: "power3.out",
                    });
                },
            });

            // Her kart için ayrı ScrollTrigger oluşturuyoruz;
            // Kart, ekranın içine girdiği andan (start: "top bottom")
            // ekranın dışına çıkana kadar (end: "bottom top") progress 0'dan 1'e çıkacak
            // ve bu progress ile kartın rotate değeri animasyonla uygulanacak.
            cardsRefs.current.forEach((card, idx) => {
                const maxRotate = cardsConfig[idx]?.rotate || 0;
                ScrollTrigger.create({
                    trigger: card,
                    start: "top bottom", // kartın üst kısmı viewportun altına girince
                    end: "bottom top",   // kartın alt kısmı viewportun üstünden çıkınca
                    scrub: true,
                    onUpdate: (self) => {
                        // self.progress 0 ile 1 arasında değişiyor;
                        // bu değeri maxRotate ile çarparak kartın dönüşünü ayarlıyoruz.
                        gsap.to(card, {
                            rotate: maxRotate * self.progress,
                            ease: "none",
                        });
                    },
                });
            });
        }, containerRef);

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewportHeight]);

    return (
        <div className={styles.container} ref={containerRef}>
            <section className={styles.wrapper} ref={wrapperRef}>
                <h1 ref={h1Ref} className={styles.h1}>[i,am,yunusemrekorkmaz]</h1>
                {cardsConfig.map((config, index) => (
                    <div className={styles.card} key={index} ref={addToCardsRefs}>
                        <img className={styles.img} src={`/assets/images/me/${index}.webp`} alt="" loading="lazy" />
                    </div>
                ))}
            </section>

            {/* <section className={styles.outro}>
                <div className={styles.outro_text}>
                    hey, it's yunus emre korkmaz, I create aesthetic and easy designs.
                    these are my interestes in life
                </div>
                <Carousel />
            </section> */}
        </div>
    );
};

export default IntroAbout;
