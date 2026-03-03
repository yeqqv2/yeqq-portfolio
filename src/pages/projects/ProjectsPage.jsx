import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { useTranslation } from "react-i18next";

// Components
import ProjectsHeader from "./header/ProjectsHeader";
import ProjectsFilter from "./filter/ProjectsFilter";
import ProjectCard from "../../components/project card/ProjectCard";
import ContactHomePage from "../home/contact/ContactHomePage";

// Context, Hooks & Styles
import styles from "./style.module.css";
import { useProjectCursor } from "../../hooks/useProjectCursor";
import { useProjects } from "../../context/ProjectContext";

gsap.registerPlugin(CustomEase, ScrollTrigger);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const ProjectsPage = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all");
  const { projects, loading } = useProjects();

  const cursorWords = t("projects.cursor", { returnObjects: true });

  // Cursor mantığını hook'tan çekiyoruz
  const {
    cursorRef,
    cursorStylesRef,
    cursorTextRef,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  } = useProjectCursor(cursorWords);

  const workRefs = useRef([]);
  const scrollTriggersRef = useRef([]);

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.tags?.includes(activeFilter));

  useEffect(() => {
    if (loading) return;

    scrollTriggersRef.current.forEach((trigger) => trigger.kill());
    scrollTriggersRef.current = [];

    workRefs.current.forEach((work, index) => {
      if (work) {
        const img = work.querySelector(`.${styles.work_img}`);
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
  }, [filteredProjects, loading]);

  if (loading) return null;

  return (
    <div className={styles.container}>
      <ProjectsHeader />

      <ProjectsFilter
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <main className={styles.main}>
        {filteredProjects.map((work, index) => (
          <ProjectCard
            key={work.id}
            work={work}
            index={index}
            ref={(el) => (workRefs.current[index] = el)}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </main>

      <ContactHomePage />

      {/* Global tek cursor burada durmaya devam ediyor */}
      <span
        ref={cursorRef}
        className={styles.customCursor}
        style={{
          left: 0,
          top: 0,
          backgroundColor: cursorStylesRef.current.bg,
          color: cursorStylesRef.current.color,
          transform: "translate(-50%, -50%) scale(0)",
          zIndex: 99999,
        }}
      >
        ● {cursorTextRef.current}
      </span>
    </div>
  );
};

export default ProjectsPage;
