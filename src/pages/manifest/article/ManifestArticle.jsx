import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import AnimatedSplit from "@/components/animated split/AnimatedSplit";
import SmoothReveal from "@/components/smooth reveal/SmoothReveal";
import styles from "./style.module.css";

gsap.registerPlugin(CustomEase);
if (!gsap.parseEase("hop")) {
  CustomEase.create("hop", "0.9, 0, 0.1, 1");
}

// Kavramların sıralı listesi (landing ile aynı sıra). "sıradaki" gezinmesi bunu kullanır.
const ORDER = ["white", "observer", "entropy", "dichotomy", "choice", "loss"];

export default function ManifestArticle() {
  const { t, i18n } = useTranslation();
  const { slug } = useParams();

  const article = t(`manifesto.articles.${slug}`, { returnObjects: true });
  const isValid =
    article && typeof article === "object" && Boolean(article.title);

  if (!isValid) {
    return (
      <div className={styles.container}>
        <div className={styles.notfound}>
          <h1 className={styles.nf_title}>{t("manifesto.article_not_found")}</h1>
          <Link to="/manifest" className={styles.back}>
            ← {t("manifesto.article_back")}
          </Link>
        </div>
      </div>
    );
  }

  // Yalnızca içeriği olan kavramlar arasında dön (henüz yazılmamışlara link verme).
  const existing = ORDER.filter((s) => {
    const a = t(`manifesto.articles.${s}`, { returnObjects: true });
    return a && typeof a === "object" && Boolean(a.title);
  });
  const pos = existing.indexOf(slug);
  const nextSlug =
    existing.length > 1 && pos !== -1
      ? existing[(pos + 1) % existing.length]
      : null;

  const sections = Array.isArray(article.sections) ? article.sections : [];

  return (
    <article className={styles.container} key={`${slug}-${i18n.language}`}>
      <Link to="/manifest" className={styles.back}>
        ← {t("manifesto.article_back")}
      </Link>

      <header className={styles.header}>
        <span className={styles.label}>[ {article.label} ]</span>
        <AnimatedSplit
          text={article.title}
          tagName="h1"
          className={styles.title}
          stagger={0.03}
          duration={1.5}
          start="top 95%"
        />
        {article.lead && (
          <AnimatedSplit
            text={article.lead}
            tagName="p"
            className={styles.lead}
            stagger={0.01}
            duration={1.4}
            start="top 95%"
          />
        )}
      </header>

      <div className={styles.body}>
        {sections.map((s, i) => (
          <SmoothReveal key={i}>
            <section className={styles.section}>
              {s.heading && <h2 className={styles.heading}>{s.heading}</h2>}
              {s.body && <p className={styles.text}>{s.body}</p>}
            </section>
          </SmoothReveal>
        ))}
      </div>

      <footer className={styles.footer}>
        <Link to="/manifest" className={styles.foot_link}>
          ← {t("manifesto.article_back")}
        </Link>
        {nextSlug && (
          <Link to={`/manifest/${nextSlug}`} className={styles.foot_link}>
            {t("manifesto.article_next")} <span aria-hidden="true">→</span>
          </Link>
        )}
      </footer>
    </article>
  );
}
