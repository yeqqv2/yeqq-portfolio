import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";
import { randomColor } from "@/utils/colors";

// Manifesto bölümünün altından kendi deneme/okuma sayfasına geçiş.
// react-router <Link>: client-side gezinme — düz <a> tam sayfa reload yapıp
// ağaç dışındaki singleton'ları (örn. arka plan müziği) sıfırlardı.
export default function ReadMore({ slug }) {
  const { t } = useTranslation();
  // Instance başına rengi bir kez seç, hover'da göster (her render'da değişmesin).
  const [randomBg] = useState(() => randomColor().bg);
  return (
    <Link
      to={`/manifest/${slug}`}
      className={styles.read_more}
      style={{ "--hover-color": randomBg }}
    >
      <span>● {t("manifesto.read_more")}</span>
    </Link>
  );
}
