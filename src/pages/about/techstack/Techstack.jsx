import { useEffect, useRef } from 'react';
import styles from "./style.module.css";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomEase from 'gsap/CustomEase';

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

    const handleMouseMove = (e) => {
        if (cursorRef.current) {
            cursorRef.current.style.left = e.clientX + 'px';
            cursorRef.current.style.top = e.clientY + 'px';
        }
    };

    const handleMouseEnter = (techName) => {
        // Set tech name directly in cursor text
        if (cursorRef.current) {
            cursorRef.current.textContent = `● ${techName}`;
        }

        // Animate in
        gsap.to(cursorRef.current, {
            scale: 1,
            duration: 0.25,
            ease: "hop",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(cursorRef.current, {
            scale: 0,
            duration: 0.25,
            ease: "hop",
        });
    };

    useEffect(() => {
        let ctx = gsap.context(() => {
            iconRefs.current.forEach((icon, index) => {
                if (!icon) return;

                gsap.fromTo(
                    icon,
                    { scale: 0 },
                    {
                        scale: 1,
                        duration: 0.75,
                        ease: "hop",
                        delay: index * 0.05,
                        scrollTrigger: {
                            trigger: icon,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });
        }, containerRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <div className={styles.container} ref={containerRef}>
            <header className={styles.header}>
                {techs.map((tech, index) => (
                    <div
                        key={tech.id}
                        className={styles.icon}
                        ref={(el) => (iconRefs.current[index] = el)}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => handleMouseEnter(tech.name)}
                        onMouseLeave={handleMouseLeave}
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
                style={{
                    left: 0,
                    top: 0,
                    transform: 'translate(-50%, -50%) scale(0)',
                }}
            >
                ●
            </span>
        </div>
    );
}