import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

// Components
import ProjectsHeader from "@/pages/projects/header/ProjectsHeader";
import ProjectsFilter from "@/pages/projects/filter/ProjectsFilter";
import ProjectCard from "@/components/project card/ProjectCard";
import ProjectSkeleton from "@/animations/project skeleton/ProjectSkeleton";
import ContactHomePage from "@/pages/home/contact/ContactHomePage";

// Context, Hooks & Styles
import styles from "./style.module.css";
import { useProjectCursor } from "@/hooks/useProjectCursor";
import { useProjects } from "@/hooks/useProjects"; // DÜZELTME: Eski Context yerine yeni hook
import { useProjectReveal } from "@/hooks/useProjectReveal";

const ProjectsPage = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all");

  // DÜZELTME: React Query'den gelen verileri alıyoruz
  const { data: projects, isLoading, isError, error } = useProjects();

  const cursorWords = t("projects.cursor", { returnObjects: true });

  const {
    cursorRef,
    cursorStylesRef,
    cursorTextRef,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  } = useProjectCursor(cursorWords);

  // DÜZELTME: projects undefined ise çökmeyi engellemek için güvenlik eklendi
  const filteredProjects = useMemo(() => {
    const safeProjects = projects || [];
    return activeFilter === "all"
      ? safeProjects
      : safeProjects.filter((project) => project.tags?.includes(activeFilter));
  }, [projects, activeFilter]);

  // DÜZELTME: loading yerine isLoading kullanıldı
  const { workRefs } = useProjectReveal(
    isLoading,
    [filteredProjects],
    `.${styles.work_img}`,
  );

  if (isError) return <div>Hata oluştu: {error.message}</div>;

  return (
    <div className={styles.container}>
      <ProjectsHeader />

      <ProjectsFilter
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <main className={styles.main}>
        {isLoading
          ? // Veri beklenirken iskeletleri gösterir
            Array.from({ length: 6 }).map((_, index) => (
              <ProjectSkeleton key={`skeleton-${index}`} />
            ))
          : // Veri geldiğinde gerçek projeleri render eder
            filteredProjects.map((work, index) => (
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

export default ProjectsPage;
