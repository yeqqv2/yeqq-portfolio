import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import styles from "./style.module.css";
import colors from "@/utils/colors";
import { useTranslation } from "react-i18next";
// 1. Yeni importlarımız
import { useProjects } from "@/context/ProjectContext"; 
import { storageBaseUrl } from "@/utils/supabase"; 

gsap.registerPlugin(CustomEase, ScrollTrigger);
CustomEase.create("hop", "0, 0, 0.1, 1");

const WorksHomePage = () => {
  const { t, i18n } = useTranslation();
  // 2. Supabase'den verileri çek
  const { projects, loading } = useProjects();

  const [cursorText, setCursorText] = useState("");
  const [lastColorIndex, setLastColorIndex] = useState(null);
  const [lastWordIndex, setLastWordIndex] = useState(null);

  const cursorWords = t("worksHome.cursorWords", { returnObjects: true });

  const cursorRef = useRef(null);
  const workRefs = useRef([]);
  const cursorStylesRef = useRef({
    bg: "var(--main-color500)",
    color: "var(--wb950)",
  });

  useEffect(() => {
    if (cursorWords && cursorWords.length > 0) {
      setCursorText(cursorWords[0]);
    }
  }, [i18n.language]);

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
    const newColorIndex = getRandomIndexExcept(colors.length, lastColorIndex);
    const newColor = colors[newColorIndex];
    setLastColorIndex(newColorIndex);

    if (cursorRef.current) {
      cursorRef.current.style.backgroundColor = newColor.bg;
      cursorRef.current.style.color = newColor.color;
    }

    const newWordIndex = getRandomIndexExcept(
      cursorWords.length,
      lastWordIndex,
    );
    setLastWordIndex(newWordIndex);
    setCursorText(cursorWords[newWordIndex]);

    gsap.to(cursorRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.25,
      ease: "hop",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cursorRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.25,
      ease: "hop",
    });
  };

  const handleTouchStart = (e) => {
    const el = e.currentTarget;
    gsap.fromTo(el, { scale: 0.97 }, { scale: 1, duration: 0.3, ease: "hop" });
  };

  useEffect(() => {
    // Sadece projeler yüklendikten sonra animasyonları kur
    if (loading || projects.length === 0) return;

    let ctx = gsap.context(() => {
      const items = workRefs.current.filter(Boolean);

      items.forEach((work, i) => {
        const img = work.querySelector(`.${styles.work_img}`);
        if (!img) return;

        gsap.fromTo(
          img,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.3,
            ease: "hop",
            delay: i * 0.15,
            scrollTrigger: {
              trigger: work,
              start: "top 85%",
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, [i18n.language, projects, loading]);

  // 3. Yükleniyorsa boş döndür (veya bir loader koyabilirsin)
  if (loading) return null;

  // Son eklenen 6 projeyi al
  const lastThreeWorks = projects.slice(0, 6);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {lastThreeWorks.map((work, index) => {
          return (
            <a
              href={`/projects/${work.slug}`} // Artık link değil, slug kullanıyoruz
              className={styles.main_div}
              key={work.id} // Index yerine benzersiz veritabanı ID'si
              ref={(el) => (workRefs.current[index] = el)}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
            >
              <div className={styles.work_img}>
                <img
                  // 4. Supabase Storage URL'sini kullanarak resmi çekiyoruz
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
          opacity: 0,
          transform: "translate(-50%, -50%)",
        }}
      >
        ● {cursorText}
      </span>
    </div>
  );
};

export default WorksHomePage;
