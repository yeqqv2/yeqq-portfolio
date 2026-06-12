import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import AnimatedSplit from "@/components/animated split/AnimatedSplit";
import styles from "./style.module.css";

gsap.registerPlugin(CustomEase);
if (!gsap.parseEase("hop")) {
  CustomEase.create("hop", "0.9, 0, 0.1, 1");
}

// kavramların sıralı listesi (landing ile aynı sıra).
// "sıradaki" gezinmesi ve sayfa indeksi (01 / 06) bunu kullanır.
const ORDER = ["white", "observer", "entropy", "dichotomy", "choice", "loss"];

const pad = (n) => String(n).padStart(2, "0");

/* sitedeki read_more kalıbının aynısı: küçük metin + hairline + kayan ok */
function NavLink({ to, children, back = false }) {
  return (
    <Link to={to} className={styles.nav_link}>
      {back && (
        <span className={`${styles.arrow} ${styles.arrow_l}`} aria-hidden="true">
          ●
        </span>
      )}
      <span>{children}</span>
      {!back && (
        <span className={`${styles.arrow} ${styles.arrow_r}`} aria-hidden="true">
          ●
        </span>
      )}
    </Link>
  );
}

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
          <NavLink to="/manifest" back>
            {t("manifesto.article_back")}
          </NavLink>
        </div>
      </div>
    );
  }

  // yalnızca içeriği olan kavramlar arasında dön
  const existing = ORDER.filter((s) => {
    const a = t(`manifesto.articles.${s}`, { returnObjects: true });
    return a && typeof a === "object" && Boolean(a.title);
  });
  const pos = existing.indexOf(slug);
  const nextSlug =
    existing.length > 1 && pos !== -1
      ? existing[(pos + 1) % existing.length]
      : null;

  const idx = ORDER.indexOf(slug);
  const sections = Array.isArray(article.sections) ? article.sections : [];

  return (
    <article className={styles.container} key={`${slug}-${i18n.language}`}>
      <div className={styles.back}>
        <NavLink to="/manifest" back>
          {t("manifesto.article_back")}
        </NavLink>
      </div>

      <header className={styles.header}>
        <div className={styles.meta_row}>
          <span className={styles.label}>[ {article.label} ]</span>
          {idx !== -1 && (
            <span className={styles.index}>
              {pad(idx + 1)} / {pad(ORDER.length)}
            </span>
          )}
        </div>

        <h1 className={styles.title}>
          <AnimatedSplit
            text={article.title}
            tagName="span"
            stagger={0.03}
            duration={1.5}
            start="top 80%"
          />
        </h1>

        {article.lead && (
          <p className={styles.lead}>
            <AnimatedSplit
              text={article.lead}
              tagName="span"
              stagger={0.012}
              duration={1.5}
              start="top 80%"
            />
          </p>
        )}
      </header>

      {/* gövde: her blok bir öncekinden küçük bir adım sağda (--i) —
          diyagonali boşluk taşır; dar ekranda tek kolona iner */}
      <div className={styles.body}>
        {sections.map((s, i) => {
          if (s.quote) {
            return (
              <blockquote key={i} className={styles.quote} style={{ "--i": i }}>
                <p className={styles.quote_text}>
                  <AnimatedSplit
                    text={s.quote}
                    tagName="span"
                    stagger={0.02}
                    duration={1.5}
                    start="top 85%"
                  />
                </p>
                {s.cite && <cite className={styles.cite}>— {s.cite}</cite>}
              </blockquote>
            );
          }

          // alıntılar numara almaz; düzyazı blokları kendi arasında sayılır
          const proseNo = sections.slice(0, i).filter((x) => !x.quote).length + 1;

          return (
            <section key={i} className={styles.section} style={{ "--i": i }}>
              <div className={styles.heading_row}>
                <span className={styles.sec_index} aria-hidden="true">
                  {pad(proseNo)}
                </span>
                {s.heading && (
                  <h2 className={styles.heading}>
                    <AnimatedSplit
                      text={s.heading}
                      tagName="span"
                      stagger={0.02}
                      duration={1.5}
                      start="top 85%"
                    />
                  </h2>
                )}
              </div>
              {s.body && (
                <p className={styles.text}>
                  <AnimatedSplit
                    text={s.body}
                    tagName="span"
                    stagger={0.008}
                    duration={1.5}
                    start="top 85%"
                  />
                </p>
              )}
            </section>
          );
        })}
      </div>

      <footer className={styles.footer}>
        <NavLink to="/manifest" back>
          {t("manifesto.article_back")}
        </NavLink>
        {nextSlug && (
          <NavLink to={`/manifest/${nextSlug}`}>
            {t("manifesto.article_next")}
          </NavLink>
        )}
      </footer>
    </article>
  );
}
