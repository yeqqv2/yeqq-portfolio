import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SolidReveal({ children }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let ctx = gsap.context(() => {
      // Opacity YOK. Bileşen en başından beri %100 solid (katı).
      // Ancak "clip-path" ile bileşeni fiziksel olarak en tepesinden en altına kadar "kesiyoruz" (maskeliyoruz).
      // y: 150 ile de bileşeni fiziksel olarak aşağı itiyoruz.
      gsap.set(el, { 
        y: 150, 
        clipPath: "inset(100% 0% 0% 0%)" // Tamamen kapalı bir maske
      });

      ScrollTrigger.create({
        trigger: el,
        start: "top 85%", 
        animation: gsap.to(el, {
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)", // Maske yukarı doğru jilet gibi açılır
          duration: 1.2,
          ease: "expo.out", // Yağ gibi kayıp yerine sertçe oturan ivme
        }),
        toggleActions: "play none none reverse", 
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} style={{ width: "100%", willChange: "transform, clip-path" }}>
      {children}
    </div>
  );
}