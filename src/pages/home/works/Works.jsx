import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import gsap from "gsap";

import { useProjects } from "@/context/ProjectContext";
import { useProjectCursor } from "@/hooks/useProjectCursor";
import ProjectCard from "@/components/project card/ProjectCard";
import ProjectSkeleton from "@/animations/project skeleton/ProjectSkeleton";

// Styles
import styles from "./style.module.css";

const WorksHomePage = () => {
  const { t } = useTranslation();
  const { projects, loading } = useProjects();

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

  const lastThreeWorks = useMemo(() => projects.slice(0, 6), [projects]);

  if (loading) return null;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ProjectSkeleton key={`skeleton-${index}`} />
            ))
          : lastThreeWorks.map((work, index) => (
              <ProjectCard
                key={work.id}
                work={work}
                index={index}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
              />
            ))}
      </main>

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
