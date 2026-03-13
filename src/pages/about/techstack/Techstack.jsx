import { useEffect, useRef } from "react";
import styles from "./style.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const techs = [
  { id: 1, asset: "/assets/svg/html.svg", name: "HTML5" },
  { id: 2, asset: "/assets/svg/css.svg", name: "CSS3" },
  { id: 3, asset: "/assets/svg/sass.svg", name: "SASS" },
  { id: 4, asset: "/assets/svg/js.svg", name: "JavaScript" },
  { id: 5, asset: "/assets/svg/ts.svg", name: "TypeScript" },
  { id: 6, asset: "/assets/svg/react.svg", name: "React" },
  { id: 7, asset: "/assets/svg/next.svg", name: "Next.js" },
  { id: 8, asset: "/assets/svg/expo.svg", name: "Expo" },
  { id: 9, asset: "/assets/svg/tailwind.svg", name: "Tailwind CSS" },
  { id: 10, asset: "/assets/svg/redux.svg", name: "Redux" },
  { id: 11, asset: "/assets/svg/git.svg", name: "Git" },
  { id: 12, asset: "/assets/svg/github.svg", name: "GitHub" },
  { id: 13, asset: "/assets/svg/gsap.svg", name: "GSAP" },
  { id: 14, asset: "/assets/svg/framer.svg", name: "Framer" },
  { id: 15, asset: "/assets/svg/motion.svg", name: "Motion" },
  { id: 16, asset: "/assets/svg/figma.svg", name: "Figma" },
  { id: 17, asset: "/assets/svg/ps.svg", name: "Photoshop" },
  { id: 18, asset: "/assets/svg/ai.svg", name: "Illustrator" },
];

export default function Techstack() {
  const containerRef = useRef(null);
  const iconRefs = useRef([]);
  const cursorRef = useRef(null);

  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
    xTo.current = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.1,
      ease: "power3",
    });
    yTo.current = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.1,
      ease: "power3",
    });

    let ctx = gsap.context(() => {
      gsap.fromTo(
        iconRefs.current,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.75,
          ease: "hop",
          stagger: 0.05,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Global mouse takibi (Cursor için)
  const handleMouseMoveGlobal = (e) => {
    if (xTo.current && yTo.current) {
      xTo.current(e.clientX);
      yTo.current(e.clientY);
    }
  };

  // --- MANYETİK FİZİK (YENİ EKLENEN KISIM) ---
  const handleMouseMoveIcon = (e, index) => {
    const icon = iconRefs.current[index];
    if (!icon) return;

    // İkonun merkezini bul
    const rect = icon.getBoundingClientRect();
    const iconCenterX = rect.left + rect.width / 2;
    const iconCenterY = rect.top + rect.height / 2;

    // Farenin merkeze olan uzaklığını hesapla
    const distanceX = e.clientX - iconCenterX;
    const distanceY = e.clientY - iconCenterY;

    // İkonu fareye doğru hafifçe çek (0.3 çarpanı manyetizma gücüdür)
    gsap.to(icon, {
      x: distanceX * 0.3,
      y: distanceY * 0.3,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseEnter = (techName) => {
    if (cursorRef.current) {
      cursorRef.current.textContent = `● ${techName}`;
    }
    gsap.to(cursorRef.current, { scale: 1, duration: 0.25, ease: "hop" });
  };

  const handleMouseLeaveIcon = (index) => {
    const icon = iconRefs.current[index];
    if (!icon) return;

    // Fare çıkınca logoyu bir yay gibi (elastic) eski konumuna fırlat
    gsap.to(icon, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)", // Yeqq tarzı titreyerek yerine oturma
    });

    // Cursor'ı gizle
    gsap.to(cursorRef.current, { scale: 0, duration: 0.25, ease: "hop" });
  };

  return (
    <div
      className={styles.container}
      ref={containerRef}
      onMouseMove={handleMouseMoveGlobal}
    >
      <header className={styles.header}>
        {techs.map((tech, index) => (
          <div
            key={tech.id}
            className={styles.icon}
            ref={(el) => (iconRefs.current[index] = el)}
            onMouseMove={(e) => handleMouseMoveIcon(e, index)}
            onMouseEnter={() => handleMouseEnter(tech.name)}
            onMouseLeave={() => handleMouseLeaveIcon(index)}
          >
            <img
              src={tech.asset}
              alt={tech.name}
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </header>

      <span
        ref={cursorRef}
        className={styles.customCursor}
        style={{ top: 0, left: 0, transform: "translate(-50%, -50%) scale(0)" }}
      >
        ●
      </span>
    </div>
  );
}
