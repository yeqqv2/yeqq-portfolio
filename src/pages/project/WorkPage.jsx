import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom"; // Link kullanmak daha sağlıklı olabilir ama a etiketini korudum
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import styles from "./style.module.css";
import AnimatedSplit from "../../components/animated split/AnimatedSplit";
import { useTranslation } from "react-i18next";
// 1. Yeni importlarımızı ekliyoruz
import { useProjects } from "../../context/ProjectContext";
import { storageBaseUrl } from "../../utils/supabase";

gsap.registerPlugin(CustomEase, ScrollTrigger);
CustomEase.create("hop", "0, 0, 0.1, 1");

export default function WorkSinglePage() {
  const { t, i18n } = useTranslation();
  const { slug } = useParams();
  const currentLang = i18n.language; // Mevcut dil (tr veya en)

  // 2. Projeleri Supabase'den çekiyoruz
  const { projects, loading } = useProjects();

  const factsRef = useRef(null);
  const galleryRefs = useRef([]);

  // 3. Link yerine artık "slug" üzerinden arama yapıyoruz
  const work = projects.find((p) => p.slug === slug);
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  
  const nextProject =
    currentIndex === -1 || projects.length === 0
      ? null
      : projects[(currentIndex + 1) % projects.length];

  useEffect(() => {
    // Veriler veya sayfa yükleniyorsa GSAP'i boşuna tetikleme
    if (loading || !work) return;

    const ctx = gsap.context(() => {
      // Facts reveal
      if (factsRef.current) {
        gsap.from(factsRef.current.children, {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.8,
          ease: "hop",
          scrollTrigger: {
            trigger: factsRef.current,
            start: "top 90%",
          },
        });
      }

      // Gallery items clip-path reveal
      galleryRefs.current.forEach((el) => {
        if (!el) return;

        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "hop",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, [slug, currentLang, loading, work]); // Dependency'leri güncelledik

  // 4. Veriler yüklenirken beyaz ekran / loader göster (Çok önemli)
  if (loading) {
    return <div style={{ height: "100vh", backgroundColor: "var(--wb50)" }} />;
  }

  // Eğer proje gerçekten yoksa (URL yanlış yazılmışsa)
  if (!work) {
    return (
      <div className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.hero_header}>
            <AnimatedSplit
              className={styles.title}
              text={t("workSingle.labels.not_found") || "Project Not Found"}
            />
          </div>
          <a href="/projects">
            <AnimatedSplit text={t("workSingle.labels.back_link") || "Back to Projects"} />
          </a>
        </section>
      </div>
    );
  }

  // 5. Çoklu dil alanı çekici fonksiyonumuz
  const getL = (field) => {
    return work[`${field}_${currentLang}`] || work[field];
  };

  return (
    <div className={styles.container} key={currentLang}>
      {/* HERO */}
      <section className={styles.hero}>
        <img
          className={styles.hero_image}
          // 6. Supabase Storage'dan ana resmi alıyoruz
          src={`${storageBaseUrl}${work.banner_url}`}
          alt={work.project_name}
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
        <div className={styles.hero_context}>
          <div className={styles.hero_header}>
            <AnimatedSplit
              key={`title-${currentLang}`}
              className={styles.title}
              text={work.project_name}
              tagName="span"
              stagger={0.03}
              duration={1.5}
              start="top 80%"
            />

            <AnimatedSplit
              key={`subtitle-${currentLang}`}
              className={styles.subtitle}
              text={getL("desc") || work.company_name}
              tagName="span"
              stagger={0.03}
              duration={1.5}
              start="top 80%"
            />
          </div>
          <section className={styles.facts} ref={factsRef}>
            <div className={styles.fact}>
              <AnimatedSplit
                className={styles.factLabel}
                text={t("workSingle.labels.company")}
                tagName="span"
                stagger={0.03}
                duration={1.5}
                start="top 80%"
              />
              <AnimatedSplit
                className={styles.factValue}
                text={work.company_name}
                tagName="span"
                stagger={0.03}
                duration={1.5}
                start="top 80%"
              />
            </div>

            <div className={styles.fact}>
              <AnimatedSplit
                className={styles.factLabel}
                text={t("workSingle.labels.role")}
                tagName="span"
                stagger={0.03}
                duration={1.5}
                start="top 80%"
              />
              <AnimatedSplit
                key={`role-${currentLang}`}
                className={styles.factValue}
                text={getL("role") || t("workSingle.defaults.role")}
                tagName="span"
                stagger={0.03}
                duration={1.5}
                start="top 80%"
              />
            </div>

            <div className={styles.fact}>
              <AnimatedSplit
                className={styles.factLabel}
                text={t("workSingle.labels.type")}
                tagName="span"
                stagger={0.03}
                duration={1.5}
                start="top 80%"
              />
              <AnimatedSplit
                key={`type-${currentLang}`}
                className={styles.factValue}
                text={getL("type") || t("workSingle.defaults.type")}
                tagName="span"
                stagger={0.03}
                duration={1.5}
                start="top 80%"
              />
            </div>

            <div className={styles.fact}>
              <AnimatedSplit
                className={styles.factLabel}
                text={t("workSingle.labels.tech")}
                tagName="span"
                stagger={0.03}
                duration={1.5}
                start="top 80%"
              />
              <AnimatedSplit
                className={styles.factValue}
                // 7. tech yerine tags kullanıyoruz
                text={work.tags?.join(", ") || t("workSingle.defaults.tech")}
                tagName="span"
                stagger={0.03}
                duration={1.5}
                start="top 80%"
              />
            </div>
          </section>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className={styles.overview}>
        <AnimatedSplit
          className={styles.sectionTitle}
          text={t("workSingle.labels.overview")}
          tagName="span"
          stagger={0.03}
          duration={1.5}
          start="top 80%"
        />
        <AnimatedSplit
          key={`overview-${currentLang}`}
          className={styles.overviewText}
          // 8. PostgreSQL sütununu fulloverview olarak açmıştık, onu çağırıyoruz
          text={getL("fulloverview") || t("workSingle.defaults.overview")}
          tagName="span"
          stagger={0.03}
          duration={1.5}
          start="top 80%"
        />
      </section>

      {/* ACHIEVEMENTS */}
      {work.achievements && work.achievements.length > 0 && (
        <section className={styles.achievements}>
          <AnimatedSplit
            className={styles.sectionTitle}
            text={t("workSingle.labels.achievements")}
            tagName="span"
            stagger={0.03}
            duration={1.5}
            start="top 80%"
          />
          <ul className={styles.achievements_list}>
            {work.achievements.map((a, i) => (
              <li key={i} className={styles.achievement}>
                <AnimatedSplit
                  className={styles.achNumber}
                  text={a.number}
                  tagName="span"
                  stagger={0.03}
                  duration={1.5}
                  start="top 80%"
                />
                <div className={styles.achievement_context}>
                  <AnimatedSplit
                    key={`achTitle-${i}-${currentLang}`}
                    className={styles.achTitle}
                    text={a[`title_${currentLang}`] || a.title}
                    tagName="span"
                    stagger={0.03}
                    duration={1.5}
                    start="top 80%"
                  />
                  <AnimatedSplit
                    key={`achDesc-${i}-${currentLang}`}
                    className={styles.achDesc}
                    text={a[`desc_${currentLang}`] || a.desc}
                    tagName="span"
                    stagger={0.03}
                    duration={1.5}
                    start="top 80%"
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* GALLERY */}
      {work.images && work.images.length > 0 && (
        <section className={styles.gallery}>
          {work.images.map((img, i) => (
            <div
              key={i}
              className={`${styles.galleryItem} ${img.isWide ? styles.wide : ""}`}
              ref={(el) => (galleryRefs.current[i] = el)}
            >
              <img
                // 9. Galeri görsellerini Supabase'den çekiyoruz
                src={`${storageBaseUrl}${img.file}`}
                alt={work.project_name}
                aria-hidden="true"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </section>
      )}

      <section className={styles.conclusion}>
        <AnimatedSplit
          className={styles.sectionTitle}
          text={t("workSingle.labels.conclusion")}
          tagName="span"
          stagger={0.03}
          duration={1.5}
          start="top 80%"
        />
        <AnimatedSplit
          key={`conclusion-${currentLang}`}
          className={styles.conclusionText}
          text={getL("conclusion") || t("workSingle.defaults.conclusion")}
          tagName="span"
          stagger={0.03}
          duration={1.5}
          start="top 80%"
        />
      </section>

      <footer className={styles.next}>
        <a href="/projects" className={styles.button}>
          <AnimatedSplit
            text={t("workSingle.labels.back") || "Back"}
            tagName="span"
            stagger={0.03}
            duration={1.5}
            start="top 80%"
          />
        </a>
        <a href={nextProject ? `/projects/${nextProject.slug}` : "/projects"}>
          <AnimatedSplit
            key={`next-${currentLang}`}
            text={
              nextProject
                ? `${nextProject.project_name} ●`
                : `${t("workSingle.labels.next_project") || "Next Project"} ●`
            }
            className={styles.button}
            tagName="span"
            stagger={0.03}
            duration={1.5}
            start="top 80%"
          />
        </a>
      </footer>
    </div>
  );
}