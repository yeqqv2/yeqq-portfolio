import { useState } from "react";
import styles from "./style.module.css";
import projects from "../../utils/projects";
import colors from "../../utils/colors";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/all";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");
gsap.registerPlugin(ScrollTrigger);

const ProjectsContainer = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [cursorStyles, setCursorStyles] = useState({
    bg: 'var(--main-color500)',
    color: 'var(--wb950)',
  });

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];
    setCursorStyles({ bg: randomColor.bg, color: randomColor.color });
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.header_title}>
          [projects,works]
        </div>
        <div className={styles.header_desc}>
          as a hybrid developer, i transform ideas into market-ready applications. here you'll find examples of my work, from defining a unified design language to engineering interfaces.
        </div>
      </header>
      <main className={styles.main}>
        {projects.map((work, index) => {
          return (
            <a
              href={work.link}
              className={styles.work}
              key={index}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={styles.work_img}
                style={{ backgroundColor: work.color }}
              >
                <video
                  className={styles.img}
                  src={work.banner}
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/assets/loader/video-placeholder.webp"
                  preload="metadata"
                  aria-describedby={work.name}
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
        className={styles.customCursor}
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          display: hovered ? 'flex' : 'none',
          backgroundColor: cursorStyles.bg,
          color: cursorStyles.color,
        }}
      >
        ● see more
      </span>
    </div>
  );
};

export default ProjectsContainer;
