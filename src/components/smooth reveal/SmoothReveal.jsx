import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function SolidReveal({ children }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let ctx = gsap.context(() => {
      gsap.set(el, {
        y: 150,
        clipPath: "inset(100% 0% 0% 0%)",
      });

      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        animation: gsap.to(el, {
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "hop",
        }),
        toggleActions: "play none none reverse",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{ width: "100%", willChange: "transform, clip-path" }}
    >
      {children}
    </div>
  );
}
