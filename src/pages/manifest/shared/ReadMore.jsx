import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";

// Manifesto bölümünün altından kendi deneme/okuma sayfasına geçiş.
export default function ReadMore({ slug }) {
  const { t } = useTranslation();
  return (
    <Link to={`/manifest/${slug}`} className={styles.read_more}>
      <span>{t("manifesto.read_more")}</span>
      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
    </Link>
  );
}
