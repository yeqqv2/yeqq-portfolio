import { useTranslation } from "react-i18next";
import gsap from "gsap";

// Context & Hooks
import { useProjects } from "../../../context/ProjectContext";
import { useProjectCursor } from "../../../hooks/useProjectCursor"; // Ortak cursor hook'umuz

// Components
import ProjectCard from "../../../components/project card/ProjectCard";

// Styles
import styles from "./style.module.css";

const WorksHomePage = () => {
  const { t } = useTranslation();
  const { projects, loading } = useProjects();

  const cursorWords = t("worksHome.cursorWords", { returnObjects: true });

  // Tüm cursor karmaşasını hook'a devrettik
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

  if (loading) return null;

  const lastThreeWorks = projects.slice(0, 6);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {lastThreeWorks.map((work, index) => (
          <ProjectCard
            key={work.id}
            work={work}
            index={index}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart} // Dokunmatik animasyonunu geçiriyoruz
          />
        ))}
      </main>

      <span
        ref={cursorRef}
        className={styles.customCursor}
        style={{
          left: 0,
          top: 0,
          backgroundColor: cursorStylesRef.current.bg,
          color: cursorStylesRef.current.color,
          transform: "translate(-50%, -50%) scale(0)", // opacity yerine scale mantığıyla gizliyoruz (hook ile uyumlu olması için)
        }}
      >
        ● {cursorTextRef.current}
      </span>
    </div>
  );
};

export default WorksHomePage;