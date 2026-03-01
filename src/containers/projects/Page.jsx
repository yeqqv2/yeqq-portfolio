import { useState, useEffect, useRef } from "react";
import styles from "./style.module.css";
import colors from "../../utils/colors";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import AnimatedSplit from "./../../components/animated split/AnimatedSplit";
import { useTranslation } from "react-i18next";
// 1. Yeni importlar
import { useProjects } from "../../context/ProjectContext";
import { storageBaseUrl } from "../../utils/supabase";

gsap.registerPlugin(CustomEase, ScrollTrigger);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const ProjectsContainer = () => {
  const { t, i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all");

  // 2. Context'ten verileri al
  const { projects, loading } = useProjects();

  const filters = [
    { id: "all", label: t("projects.filters.all") },
    { id: "municipal", label: t("projects.filters.municipal") },
    { id: "startup", label: t("projects.filters.startup") },
    { id: "dashboard", label: t("projects.filters.dashboard") },
    { id: "uiux", label: t("projects.filters.uiux") },
    { id: "webapp", label: t("projects.filters.webapp") },
  ];

  const cursorWords = t("projects.cursor", { returnObjects: true });

  const workRefs = useRef([]);
  const cursorRef = useRef(null);
  const scrollTriggersRef = useRef([]);
  const cursorStylesRef = useRef({
    bg: "var(--main-color500)",
    color: "var(--wb950)",
  });
  const cursorTextRef = useRef("see more");
  const lastColorIndexRef = useRef(null);
  const lastWordIndexRef = useRef(null);

  const getRandomIndexExcept = (length, except) => {
    let newIndex = Math.floor(Math.random() * length);
    while (newIndex === except) {
      newIndex = Math.floor(Math.random() * length);
    }
    return newIndex;
  };

  const handleMouseMove = (e) => {
    if (cursorRef.current) {
      cursorRef.current.style.left = e.clientX + "px";
      cursorRef.current.style.top = e.clientY + "px";
    }
  };

  const handleMouseEnter = () => {
    const newColorIndex = getRandomIndexExcept(colors.length, lastColorIndexRef.current);
    const newColor = colors[newColorIndex];
    lastColorIndexRef.current = newColorIndex;

    if (cursorRef.current) {
      cursorRef.current.style.backgroundColor = newColor.bg;
      cursorRef.current.style.color = newColor.color;
    }

    const newWordIndex = getRandomIndexExcept(cursorWords.length, lastWordIndexRef.current);
    lastWordIndexRef.current = newWordIndex;
    cursorTextRef.current = cursorWords[newWordIndex];

    if (cursorRef.current) {
      const textNode = cursorRef.current.childNodes[1];
      if (textNode) {
        textNode.textContent = cursorTextRef.current;
      }
    }

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

  // 3. Filtreleme mantığını Supabase verilerine göre güncelle
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.tags?.includes(activeFilter));

  useEffect(() => {
    // Veriler henüz yüklenmediyse animasyonu çalıştırma
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
  }, [filteredProjects, loading]); // loading'i dependency olarak ekledik

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
  };

  // 4. Yükleme ekranı (isteğe bağlı, şimdilik null)
  if (loading) return null;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <AnimatedSplit
          key={`title-${i18n.language}`}
          text={t("projects.header_title")}
          className={styles.header_title}
          tagName="span"
          stagger={0.05}
          duration={1.5}
          start="top 90%"
        />

        <AnimatedSplit
          key={`desc-${i18n.language}`}
          text={t("projects.header_desc")}
          className={styles.header_desc}
          tagName="span"
          stagger={0.03}
          duration={1.5}
          start="top 90%"
        />
      </header>

      <section className={styles.filter_container}>
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`${styles.filter_btn} ${
              activeFilter === filter.id ? styles.active : ""
            }`}
            onClick={() => handleFilterClick(filter.id)}
          >
            <AnimatedSplit
              key={`${filter.id}-${i18n.language}`}
              text={`• ${filter.label}`}
              tagName="span"
              stagger={0.025}
              duration={1.5}
              start="top 90%"
            />
          </button>
        ))}
      </section>

      <main className={styles.main}>
        {filteredProjects.map((work, index) => {
          return (
            <a
              href={`/projects/${work.slug}`} // link yerine slug
              className={styles.work}
              key={work.id} // Daha güvenli bir key
              ref={(el) => (workRefs.current[index] = el)}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className={styles.work_img}>
                <img
                  // 5. Supabase Storage URL ve Banner yolu
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
        })}
      </main>

      <span
        ref={cursorRef}
        className={styles.customCursor}
        style={{
          left: 0,
          top: 0,
          backgroundColor: cursorStylesRef.current.bg,
          color: cursorStylesRef.current.color,
          transform: "translate(-50%, -50%) scale(0)",
        }}
      >
        ● {cursorTextRef.current}
      </span>
    </div>
  );
};

export default ProjectsContainer;