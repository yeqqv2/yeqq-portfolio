import { useTranslation } from "react-i18next";
import styles from "./style.module.css";

export default function ManifestProgress({
  active = 0,
  sectionCount = 0,
  onSelect,
}) {
  const { t } = useTranslation();

  const rawLabels = t("manifesto.nav", { returnObjects: true });

  const labels = Array.from({ length: sectionCount }, (_, i) => {
    if (Array.isArray(rawLabels) && rawLabels[i]) {
      return rawLabels[i];
    }

    return `Section ${i + 1}`;
  });

  return (
    <nav className={styles.progress} aria-label="manifesto progress">
      {labels.map((label, i) => (
        <button
          key={i}
          type="button"
          className={`${styles.item} ${active === i ? styles.active : ""}`}
          onClick={() => onSelect?.(i)}
        >
          <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>

          <span className={styles.tick} />

          <span className={styles.label}>{label}</span>
        </button>
      ))}
    </nav>
  );
}
