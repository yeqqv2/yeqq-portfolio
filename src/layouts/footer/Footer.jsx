import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/utils/motion";
import styles from "./style.module.css";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const innerRef = useRef(null);

  /* Footer sticky olduğu için trigger olarak kendisi kullanılamaz
     (gsap sticky/fixed elemanların pozisyonunu yanlış ölçer);
     reveal mesafesi main'in bitişinden itibaren footer yüksekliği kadardır. */
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const container = containerRef.current;
    const inner = innerRef.current;
    const main = document.getElementById("main");
    if (!container || !inner || !main) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { yPercent: -14 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: main,
            start: "bottom bottom",
            end: () => `+=${container.offsetHeight}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={containerRef} className={styles.container}>
      <div ref={innerRef} className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.contact}>
            <span className={styles.label}>{t("footer.contact_header")}</span>
            <Link className={styles.contact_link} to="/contact-me">
              {t("footer.contact_btn")}
            </Link>
          </div>

          <nav className={styles.columns} aria-label="footer">
            <div className={styles.links}>
              <span className={styles.label}>{t("footer.links_header")}</span>
              <Link className={styles.link} to="/">
                {t("footer.home")}
              </Link>
              <Link className={styles.link} to="/about-me">
                {t("footer.about")}
              </Link>
              <Link className={styles.link} to="/manifest">
                {t("footer.manifest")}
              </Link>
              <Link className={styles.link} to="/projects">
                {t("footer.projects")}
              </Link>
            </div>

            <div className={styles.links}>
              <span className={styles.label}>{t("footer.connect_header")}</span>
              <a
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/1yunusewre"
              >
                instagram
              </a>
              <a
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/yeqqv2"
              >
                github
              </a>
              <a
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
                href="https://tr.linkedin.com/in/yeqq"
              >
                linkedin
              </a>
            </div>
          </nav>
        </div>

        <div className={styles.wordmark} aria-hidden="true">
          <span className={styles.bracket}>[</span> yeqq{" "}
          <span className={styles.bracket}>]</span>
        </div>

        <div className={styles.bottom}>
          {t("footer.signature")} © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
