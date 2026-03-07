import styles from "./style.module.css";

export default function PrimerLink({
  href,
  buttonText,
  color,
  backgroundColor,
  onClick,
}) {
  return (
    <a
      href={href}
      className={styles.button}
      style={{ color: color, backgroundColor: backgroundColor }}
      onClick={onClick}
    >
      {buttonText}
    </a>
  );
}
