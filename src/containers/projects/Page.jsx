import React, { useState } from "react";
import styles from "./style.module.css";
import works from "../../utils/works";
import colors from "../../utils/colors";
import { useNavigate } from "react-router-dom";

const ProjectsContainer = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [cursorStyles, setCursorStyles] = useState({
    bg: 'var(--main-color500)',
    color: 'var(--wb950)',
  });

  const navigate = useNavigate();

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
          (projects & works)
        </div>
        <div className={styles.header_desc}>
          for all web-based projects, I took on the role of frontend developer
          and UI/UX designer. for any project that didn’t require a backend
          (NoSQL, one-page, landing page, etc.), I developed them using React or
          Next.js.
        </div>
      </header>
      <main className={styles.main}>
        {/* <div
          className={styles.project}
          onClick={() => {
            navigate(works[0].link);
            window.scrollTo(0, 0);
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={styles.work_img}
            style={{ backgroundColor: works[0].color }}
          >
            <img
              src={`${works[0].asset}/1.gif`}
              alt={works[0].desc}
              className={styles.project_img}
            />
          </div>
          <div className={styles.works}>
            <div className={styles.work_name}>({works[0].name})</div>
            <div className={styles.work_desc}>{works[0].desc}</div>
          </div>
        </div> */}
        {/* <div className={styles.content}> */}
        {works.map((work, index) => {
          return (
            <div
              className={`${styles.work} keen-slider__slide`}
              key={index}
              onClick={() => {
                navigate(work.link);
                window.scrollTo(0, 0); // Yönlendirme sonrası sayfa en üste kaydırılır.
              }}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={styles.work_img}
                style={{ backgroundColor: work.color }}
              >
                <img
                  src={`${work.asset}/1.gif`}
                  alt={work.desc}
                  className={styles.img}
                />
              </div>
              <div className={styles.works}>
                <div className={styles.work_name}>({work.name})</div>
                <div className={styles.work_desc}>{work.desc}</div>
              </div>
            </div>
          );
        })}
        {/* </div> */}
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
