import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/all";

import { useProjects } from "@/hooks/useProjects";
import { useProjectCursor } from "@/hooks/useProjectCursor";
import ProjectCard from "@/components/project card/ProjectCard";
import ProjectSkeleton from "@/animations/project skeleton/ProjectSkeleton";

// Styles
import styles from "./style.module.css";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const WorksHomePage = () => {
  const { t } = useTranslation();
  const { data: projects, isLoading, isError, error } = useProjects();

  const cursorWords = t("worksHome.cursorWords", { returnObjects: true });

  const {
    cursorRef,
    cursorStylesRef,
    cursorTextRef,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  } = useProjectCursor(cursorWords);

  const handleTouchStart = (e) => {
    const el = e.currentTarget;
    gsap.fromTo(el, { scale: 0.97 }, { scale: 1, duration: 0.3, ease: "hop" });
  };

  // DÜZELTME: projects undefined ise boş dizi döndür
  const lastThreeWorks = useMemo(() => projects?.slice(0, 6) || [], [projects]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.main}>
          {Array.from({ length: 6 }).map((_, index) => (
            <ProjectSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      </div>
    );
  }

  if (isError)
    return (
      <div className={styles.container}>
        <p
          style={{
            padding: "4em 1vw",
            color: "var(--wb500)",
            fontSize: "0.9em",
          }}
        >
          ● could not load projects — {error.message}
        </p>
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {lastThreeWorks.map((work, index) => (
          <ProjectCard
            key={work.link}
            work={work}
            index={index}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
          />
        ))}
      </div>

      <span
        ref={cursorRef}
        className={styles.customCursor}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          transform: "scale(0)",
          backgroundColor: cursorStylesRef.current.bg,
          color: cursorStylesRef.current.color,
          zIndex: 99999,
        }}
      >
        ● {cursorTextRef.current}
      </span>
    </div>
  );
};

export default WorksHomePage;
