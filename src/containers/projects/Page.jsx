import { useState, useEffect, useRef } from "react";
import styles from "./style.module.css";
import projects from "../../utils/projects";
import colors from "../../utils/colors";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import AnimatedSplit from './../../components/animated split/AnimatedSplit';

gsap.registerPlugin(CustomEase, ScrollTrigger);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const cursorWords = [
  "see more",
  "case view",
  "view details",
  "open project",
  "quick peek",
  "discover more"
];

const filters = [
  { id: "all", label: "All" },
  { id: "municipal", label: "Municipal" },
  { id: "startup", label: "Startup" },
  { id: "dashboard", label: "Dashboard / Admin" },
  { id: "uiux", label: "UI/UX" },
  { id: "webapp", label: "Web Apps" },
];

const ProjectsContainer = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const workRefs = useRef([]);
  const cursorRef = useRef(null);
  const scrollTriggersRef = useRef([]);
  const cursorStylesRef = useRef({
    bg: 'var(--main-color500)',
    color: 'var(--wb950)',
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
      cursorRef.current.style.left = e.clientX + 'px';
      cursorRef.current.style.top = e.clientY + 'px';
    }
  };

  const handleMouseEnter = () => {
    // --- COLOR ---
    const newColorIndex = getRandomIndexExcept(colors.length, lastColorIndexRef.current);
    const newColor = colors[newColorIndex];
    lastColorIndexRef.current = newColorIndex;

    if (cursorRef.current) {
      cursorRef.current.style.backgroundColor = newColor.bg;
      cursorRef.current.style.color = newColor.color;
    }

    // --- WORD ---
    const newWordIndex = getRandomIndexExcept(cursorWords.length, lastWordIndexRef.current);
    lastWordIndexRef.current = newWordIndex;
    cursorTextRef.current = cursorWords[newWordIndex];

    if (cursorRef.current) {
      const textNode = cursorRef.current.childNodes[1];
      if (textNode) {
        textNode.textContent = cursorTextRef.current;
      }
    }

    // --- ANIMATION ---
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

  // Filter projects based on category
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.tags?.includes(activeFilter));

  useEffect(() => {
    // Önceki scroll trigger'ları temizle
    scrollTriggersRef.current.forEach(trigger => trigger.kill());
    scrollTriggersRef.current = [];

    workRefs.current.forEach((work, index) => {
      if (work) {
        const img = work.querySelector(`.${styles.work_img}`);
        if (img) {
          gsap.fromTo(
            img,
            {
              clipPath: "inset(100% 0% 0% 0%)",
              y: 0,
            },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              y: 0,
              duration: 1.2,
              ease: "hop",
              delay: (index) * 0.1,
              scrollTrigger: {
                trigger: work,
                start: "top 70%",
                end: "top 40%",
                toggleActions: "play none none none",
                onEnter: (self) => {
                  scrollTriggersRef.current.push(self);
                },
              },
            }
          );
        }
      }
    });

    return () => {
      // Component unmount olduğunda temizle
      scrollTriggersRef.current.forEach(trigger => trigger.kill());
      scrollTriggersRef.current = [];
    };
  }, [filteredProjects]);

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <AnimatedSplit
          text="[works]"
          className={styles.header_title}
          tagName="div"
          stagger={0.05}
          duration={1.5}
          start="top 80%"
        />

        <AnimatedSplit
          text={
            "a selection of professional projects i've designed and developed over the past years. " +
            "from municipal platforms to startup products, each project focuses on clean UI, accessibility, and meaningful interaction."
          }
          className={styles.header_desc}
          tagName="div"
          stagger={0.03}
          duration={1.5}
          start="top 80%"
        />
      </header>

      <section className={styles.filter_container}>
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`${styles.filter_btn} ${activeFilter === filter.id ? styles.active : ""
              }`}
            onClick={() => handleFilterClick(filter.id)}
          >
            • {filter.label}
          </button>
        ))}
      </section>

      <main className={styles.main}>
        {filteredProjects.map((work, index) => {
          return (
            <a
              href={work.link}
              className={styles.work}
              key={`${work.project_name}-${index}`}
              ref={(el) => (workRefs.current[index] = el)}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={styles.work_img}
                style={{ backgroundColor: work.color }}
              >
                <img
                  className={styles.img}
                  src={`${work.asset}/${work.banner}`}
                  alt={work.name}
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
          transform: 'translate(-50%, -50%) scale(0)',
        }}
      >
        ● {cursorTextRef.current}
      </span>
    </div>
  );
};

export default ProjectsContainer;