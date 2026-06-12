import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import styles from "./style.module.css";
import AnimatedSplit from "@/components/animated split/AnimatedSplit";
import { useTranslation } from "react-i18next";
import { useProjects } from "@/hooks/useProjects";
import LoadingPage from "@/components/loading/LoadingPage";

gsap.registerPlugin(CustomEase, ScrollTrigger);
CustomEase.create("hop", "0, 0, 0.1, 1");

export default function WorkSinglePage() {
  const { t, i18n } = useTranslation();
  const { slug } = useParams();
  const currentLang = i18n.language;

  const { data: projects, isLoading, isError, error } = useProjects();

  const factsRef = useRef(null);
  const galleryRefs = useRef([]);

  const safeProjects = projects || [];
  const work = safeProjects.find((p) => p.link === `/projects/${slug}`);
  const currentIndex = safeProjects.findIndex(
    (p) => p.link === `/projects/${slug}`,
  );

  const nextProject =
    currentIndex === -1 || safeProjects.length === 0
      ? null
      : safeProjects[(currentIndex + 1) % safeProjects.length];

  const prefetchProjects = () => import("@/pages/projects/ProjectsPage");

  useEffect(() => {
    if (isLoading || !work) return;

    const ctx = gsap.context(() => {
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
  }, [slug, currentLang, isLoading, work]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!work) {
    return (
      <div className={styles.container} key={`${slug}-${currentLang}`}>
        <section className={styles.hero}>
          <div className={styles.hero_header}>
            <AnimatedSplit
              className={styles.title}
              text={t("workSingle.labels.not_found") || "Project Not Found"}
            />
          </div>
          <Link to="/projects" onMouseEnter={prefetchProjects}>
            <AnimatedSplit
              text={t("workSingle.labels.back_link") || "Back to Projects"}
            />
          </Link>
        </section>
      </div>
    );
  }

  const caseStudySections = [
    {
      id: "challenge",
      label: t("workSingle.labels.challenge"),
      body: work.challenge,
    },
    {
      id: "approach",
      label: t("workSingle.labels.approach"),
      body: work.approach,
    },
    {
      id: "impact",
      label: t("workSingle.labels.impact"),
      body: work.impact,
    },
  ].filter((section) => section.body);

  return (
    <div className={styles.container} key={`${slug}-${currentLang}`}>
      {/* HERO */}
      <section className={styles.hero}>
        <img
          className={styles.hero_image}
          src={`${work.asset}/banner.webp`}
          alt={work.project_name}
          loading="lazy"
          decoding="async"
        />
        <div className={styles.hero_context}>
          <div className={styles.hero_header}>
            <AnimatedSplit
              key={`title-${currentLang}`}
              className={styles.title}
              text={work.project_name}
              tagName="h1"
              stagger={0.03}
              duration={1.5}
              start="top 80%"
            />

            <AnimatedSplit
              key={`subtitle-${currentLang}`}
              className={styles.subtitle}
              text={work.desc || work.company_name}
              tagName="p"
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
                text={work.role || t("workSingle.defaults.role")}
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
                text={work.type || t("workSingle.defaults.type")}
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

      {caseStudySections.length > 0 && (
        <section className={styles.caseStudy}>
          {caseStudySections.map((section) => (
            <article key={section.id} className={styles.caseStudyItem}>
              <AnimatedSplit
                className={styles.sectionTitle}
                text={section.label}
                tagName="h2"
                stagger={0.03}
                duration={1.5}
                start="top 85%"
              />
              <AnimatedSplit
                className={styles.caseText}
                text={section.body}
                tagName="p"
                stagger={0.02}
                duration={1.2}
                start="top 85%"
              />
            </article>
          ))}
        </section>
      )}

      {work.achievements && work.achievements.length > 0 && (
        <section className={styles.achievements}>
          <AnimatedSplit
            className={styles.sectionTitle}
            text={t("workSingle.labels.achievements")}
            tagName="h2"
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
                    text={a.title}
                    tagName="h3"
                    stagger={0.03}
                    duration={1.5}
                    start="top 80%"
                  />
                  <AnimatedSplit
                    key={`achDesc-${i}-${currentLang}`}
                    className={styles.achDesc}
                    text={a.desc}
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
                src={`${work.asset}/${img.file}`}
                alt={`${work.project_name} screen ${i + 1}`}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </section>
      )}

      <footer className={styles.next}>
        <Link
          to="/projects"
          onMouseEnter={prefetchProjects}
          className={styles.button}
        >
          <AnimatedSplit
            text={t("workSingle.labels.back") || "Back"}
            tagName="span"
            stagger={0.03}
            duration={1.5}
            start="top 80%"
          />
        </Link>
        <Link to={nextProject ? nextProject.link : "/projects"}>
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
        </Link>
      </footer>
    </div>
  );
}
