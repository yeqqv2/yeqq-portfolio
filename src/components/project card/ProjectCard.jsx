import { useRef, useEffect } from "react";
import styles from "./style.module.css";
import { storageBaseUrl } from "../../utils/supabase";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase, ScrollTrigger);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const ProjectCard = ({
  work,
  index,
  className, // Dışarıdan özel CSS sınıfı alabilmesi için eklendi
  onTouchStart, // Ana sayfadaki dokunmatik animasyon için eklendi
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
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none none",
          },
        },
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <a
      href={`/projects/${work.slug}`}
      className={className || styles.work} // Dışarıdan class gelmezse varsayılanı kullanır
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart} // Yeni eklenen event
    >
      <div className={styles.work_img} ref={imgRef}>
        <img
          src={`${storageBaseUrl}${work.banner_url}`}
          alt={work.project_name}
          className={styles.img}
          fetchpriority={index === 0 ? "high" : "auto"}
          loading={index === 0 ? "eager" : "lazy"}
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
