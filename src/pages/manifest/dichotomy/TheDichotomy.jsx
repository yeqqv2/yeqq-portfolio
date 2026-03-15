import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";

export default function TheDichotomy() {
  const { t } = useTranslation();
  const [activeBrain, setActiveBrain] = useState("left");

  return (
    <div className={styles.container}>
      <div className={styles.content}></div>
      <div className={styles.choise}>
        <div className={styles.header}></div>
      </div>
    </div>
  );
}
