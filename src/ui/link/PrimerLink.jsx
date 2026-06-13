import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { randomColor } from "@/utils/colors";

export default function PrimerLink({
  href,
  buttonText,
  color,
  backgroundColor,
  onClick,
  random = false,
}) {
  // Instance başına rengi bir kez seç, sabit kalsın (her render'da değişmesin).
  const [randomBg] = useState(() => (random ? randomColor().bg : null));
  const isInternal = href?.startsWith("/");
  const commonProps = {
    className: random ? `${styles.button} ${styles.random}` : styles.button,
    style: random ? { "--hover-color": randomBg } : { color, backgroundColor },
    onClick,
  };

  if (isInternal) {
    return (
      <Link to={href} {...commonProps}>
        {buttonText}
      </Link>
    );
  }

  return (
    <a
      href={href}
      {...commonProps}
    >
      {buttonText}
    </a>
  );
}
