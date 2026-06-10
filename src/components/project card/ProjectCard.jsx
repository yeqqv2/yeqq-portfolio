import { useRef, useEffect } from "react";
import styles from "./style.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase, ScrollTrigger);

CustomEase.create("hop", "0.25, 0.1, 0.25, 1");

const ProjectCard = ({
  work,
  index,
  className,
  onTouchStart,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
}) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { clipPath: "inset(100% 0% 0% 0%)", y: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          duration: 1.2,
          ease: "hop",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 50%",
            toggleActions: "play none none none",
          },
        },
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  const isPriority = index < 2;

  return (
    <a
      href={work.link}
      className={className || styles.work}
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
    >
      <div className={styles.work_img} ref={imgRef}>
        <img
          src={`/assets/banners/${work.banner}-800.webp`}
          srcSet={`/assets/banners/${work.banner}-400.webp 400w, /assets/banners/${work.banner}-800.webp 800w, /assets/banners/${work.banner}-1200.webp 1200w, /assets/banners/${work.banner}-1600.webp 1600w`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={work.project_name}
          className={styles.img}
          width="800"
          height="450"
          fetchpriority={isPriority ? "high" : "auto"}
          loading={isPriority ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
      <div className={styles.works}>
        <div className={styles.work_name}>{work.project_name}</div>
        <div className={styles.work_desc}>{work.company_name}</div>
      </div>
    </a>
  );
};

export default ProjectCard;
