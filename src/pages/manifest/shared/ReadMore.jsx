import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";
import { randomColor } from "@/utils/colors";

// Manifesto bölümünün altından kendi deneme/okuma sayfasına geçiş.
export default function ReadMore({ slug }) {
  const { t } = useTranslation();
  // Instance başına rengi bir kez seç, hover'da göster (her render'da değişmesin).
  const [randomBg] = useState(() => randomColor().bg);
  return (
    <a
      href={`/manifest/${slug}`}
      className={styles.read_more}
      style={{ "--hover-color": randomBg }}
    >
      <span>● {t("manifesto.read_more")}</span>
    </a>
  );
}
