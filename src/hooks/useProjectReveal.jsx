import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase, ScrollTrigger);

// 'hop' ease animasyonunu global olarak sadece bir kez tanımlıyoruz
if (!gsap.parseEase("hop")) {
  CustomEase.create("hop", "0.9, 0, 0.1, 1");
}

export const useProjectReveal = (loading, dependencies = [], imageSelector) => {
  const workRefs = useRef([]);
  const scrollTriggersRef = useRef([]);

  useEffect(() => {
    if (loading) return;

    // Önceki animasyonları öldür (Memory leak ve HMR üst üste binme hatalarını sıfırlar)
    scrollTriggersRef.current.forEach((trigger) => trigger.kill());
    scrollTriggersRef.current = [];

    workRefs.current.forEach((work, index) => {
      if (work) {
        const img = work.querySelector(imageSelector);
        if (img) {
          gsap.fromTo(
            img,
            { clipPath: "inset(100% 0% 0% 0%)", y: 0 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              y: 0,
              duration: 1.2,
              ease: "hop",
              delay: index * 0.1,
              scrollTrigger: {
                trigger: work,
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none none",
                onEnter: (self) => {
                  scrollTriggersRef.current.push(self);
                },
              },
            },
          );
        }
      }
    });

    return () => {
      scrollTriggersRef.current.forEach((trigger) => trigger.kill());
      scrollTriggersRef.current = [];
    };
  }, [loading, ...dependencies]);

  return { workRefs };
};
